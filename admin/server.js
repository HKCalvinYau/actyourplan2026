import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import sharp from 'sharp';
import Cloudflare from 'cloudflare';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const cf = new Cloudflare({ apiToken: process.env.CLOUDFLARE_API_TOKEN });
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const databaseId = process.env.D1_DATABASE_ID;
const bucket = process.env.R2_BUCKET;

/** R2 object API is S3-compatible; lazy-init so the server can boot without R2 keys. */
let s3Client;
function getS3() {
  if (!s3Client) {
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error(
        'R2 uploads require CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY',
      );
    }
    s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
    });
  }
  return s3Client;
}

app.use(express.json({ limit: '50mb' }));
app.use(express.static(join(__dirname, 'public')));

// Ensure uploads directory exists
const uploadsDir = join(__dirname, 'uploads');
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });

// ============ D1 Database Operations ============

function d1ParamStrings(params) {
  return params.map((p) => (p === null || p === undefined ? '' : String(p)));
}

async function d1Query(sql, params = []) {
  const paramStrings = d1ParamStrings(params);
  const pager = cf.d1.database.query(databaseId, {
    account_id: accountId,
    sql,
    ...(paramStrings.length ? { params: paramStrings } : {}),
  });
  const results = [];
  for await (const page of pager) {
    if (Array.isArray(page?.results)) {
      results.push(...page.results);
    }
  }
  return { results };
}

async function d1Execute(sql, params = []) {
  const paramStrings = d1ParamStrings(params);
  const pager = cf.d1.database.query(databaseId, {
    account_id: accountId,
    sql,
    ...(paramStrings.length ? { params: paramStrings } : {}),
  });
  for await (const _ of pager) {
    /* drain pages */
  }
}

// ============ R2 Operations ============

async function uploadToR2(key, buffer, contentType) {
  await getS3().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );
}

async function deleteFromR2(key) {
  await getS3().send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );
}

// ============ Image Processing ============

async function processImage(buffer, options = {}) {
  const { maxWidth = 1920, maxHeight = 1920, quality = 85 } = options;
  return sharp(buffer)
    .resize(maxWidth, maxHeight, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();
}

// ============ Content Auto-format ============

function autoFormatContent(content) {
  // Extract title from first H1
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Auto-generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // Extract frontmatter from content
  let frontmatter = {};
  let body = content;

  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (fmMatch) {
    const fmContent = fmMatch[1];
    body = fmMatch[2];
    fmContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        frontmatter[key.trim()] = valueParts.join(':').trim();
      }
    });
  }

  // Clean markdown
  body = body
    .replace(/^---\n[\s\S]*?\n---\n/, '') // Remove existing frontmatter
    .replace(/^#\s+.+\n/, '') // Remove first H1 (title)
    .trim();

  return { title, slug, body, frontmatter };
}

// ============ API Routes ============

// Auth
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  if (password === adminPassword) {
    res.json({ success: true, token: 'admin-session-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const result = await d1Query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.results || []);
  } catch (error) {
    console.error('D1 query error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get single post
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const result = await d1Query('SELECT * FROM posts WHERE slug = ?', [req.params.slug]);
    res.json(result.results?.[0] || null);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Create post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, slug, type, content, metadata = {} } = req.body;
    const now = Date.now();
    await d1Execute(
      'INSERT INTO posts (slug, type, title, content, metadata, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [slug, type, title, content, JSON.stringify(metadata), now, now]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Update post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, slug, type, content, metadata } = req.body;
    const now = Date.now();
    await d1Execute(
      'UPDATE posts SET title = ?, slug = ?, type = ?, content = ?, metadata = ?, updated_at = ? WHERE id = ?',
      [title, slug, type, content, JSON.stringify(metadata), now, req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    await d1Execute('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Upload image
app.post('/api/upload', async (req, res) => {
  try {
    const { image, filename, folder = 'images' } = req.body;
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Process image (resize, convert to webp)
    const processedBuffer = await processImage(buffer);
    const ext = '.webp';
    const timestamp = Date.now();
    const safeFilename = filename.replace(/[^\w.-]/g, '_').replace(/\s+/g, '_');
    const key = `${folder}/${timestamp}-${safeFilename}${ext}`;

    // Upload to R2
    await uploadToR2(key, processedBuffer, 'image/webp');

    // Return CDN URL
    const cdnUrl = `https://imagedelivery.net/${process.env.CLOUDFLARE_IMAGES_HASH}/${key}`;
    res.json({ success: true, url: cdnUrl, key });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Delete image
app.delete('/api/upload/:key', async (req, res) => {
  try {
    await deleteFromR2(req.params.key);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Auto-format content endpoint
app.post('/api/format', (req, res) => {
  const { content } = req.body;
  const formatted = autoFormatContent(content);
  res.json(formatted);
});

// Serve admin HTML
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Admin server running on http://localhost:${PORT}`);
  console.log(`Connected to D1: ${databaseId}`);
  console.log(`R2 Bucket: ${bucket}`);
});