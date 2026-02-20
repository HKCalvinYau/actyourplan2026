import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  LogOut, 
  Plus, 
  Save, 
  Trash2, 
  X, 
  Search,
  ChevronLeft,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { marked } from 'marked';

interface Post {
  id: number;
  slug: string;
  type: 'blueprints' | 'armory' | 'signals' | 'experiments';
  title: string;
  content: string;
  metadata: string;
  created_at: number;
  updated_at: number;
}

export default function AdminDashboard() {
  const [view, setView] = useState<'login' | 'dashboard'>('login');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dashboard State
  const [activeTab, setActiveTab] = useState<'posts' | 'media'>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Check Session on Mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    // 簡單檢查：嘗試獲取 posts，如果 401 則需要登入
    try {
      const res = await fetch('/api/posts');
      if (res.ok) {
        setView('dashboard');
        const data = await res.json();
        setPosts(data);
      } else {
        setView('login');
      }
    } catch (e) {
      setView('login');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setView('dashboard');
        fetchPosts();
      } else {
        setError('Invalid Access Code');
      }
    } catch (e) {
      setError('Connection Error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setView('login');
    setPassword('');
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    setLoading(true);
    try {
      const isNew = !editingPost.id;
      const url = isNew ? '/api/posts' : `/api/posts/${editingPost.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost),
      });

      if (res.ok) {
        setEditingPost(null);
        fetchPosts();
      } else {
        alert('Save Failed');
      }
    } catch (e) {
      console.error(e);
      alert('Save Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this intel?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
      } else {
        alert('Delete Failed');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Helper to parse metadata
  const getMetadata = (post: Partial<Post>) => {
    try {
      return JSON.parse(post.metadata || '{}');
    } catch {
      return {};
    }
  };

  const updateMetadata = (key: string, value: any) => {
    if (!editingPost) return;
    const currentMeta = getMetadata(editingPost);
    const newMeta = { ...currentMeta, [key]: value };
    setEditingPost({ ...editingPost, metadata: JSON.stringify(newMeta) });
  };

  if (view === 'login') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-surface border-2 border-border p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-mono font-bold text-primary mb-2">ACCESS CONTROL</h1>
            <p className="text-text-muted font-mono text-sm">RESTRICTED AREA</p>
          </div>
          
          <div>
            <label className="block text-sm font-mono text-text-muted mb-2">ACCESS CODE</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border p-3 text-text-main font-mono focus:border-primary focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 font-mono text-sm text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-background font-bold py-3 hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'VERIFYING...' : 'GRANT ACCESS'}
          </button>
        </form>
      </div>
    );
  }

  // Edit View
  if (editingPost) {
    const meta = getMetadata(editingPost);
    
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setEditingPost(null)}
            className="flex items-center text-text-muted hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            BACK TO LIST
          </button>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 border border-border text-text-muted hover:text-primary hover:border-primary transition-colors font-mono text-sm"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'EDIT' : 'PREVIEW'}
            </button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-background font-bold hover:bg-primary/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              {loading ? 'SAVING...' : 'SAVE INTEL'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface border border-border p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-text-muted mb-1 uppercase">Title</label>
                <input 
                  type="text" 
                  value={editingPost.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    // Auto-generate slug if it's empty or looks like a slug of the title
                    if (!editingPost.slug) {
                      setEditingPost({ ...editingPost, title, slug: title.toLowerCase().replace(/\s+/g, '-') });
                    } else {
                      setEditingPost({ ...editingPost, title });
                    }
                  }}
                  className="w-full bg-background border border-border p-3 text-text-main font-bold text-lg focus:border-primary focus:outline-none"
                />
              </div>
              
              {showPreview ? (
                <div className="prose prose-invert max-w-none min-h-[500px] border border-border p-4 bg-background overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: marked.parse(editingPost.content || '') as string }} />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-mono text-text-muted mb-1 uppercase">Content (Markdown)</label>
                  <textarea 
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full h-[500px] bg-background border border-border p-4 text-text-main font-mono text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-surface border border-border p-6 space-y-4">
              <h3 className="font-mono font-bold text-text-muted uppercase text-sm border-b border-border pb-2">Configuration</h3>
              
              <div>
                <label className="block text-xs font-mono text-text-muted mb-1 uppercase">Slug</label>
                <input 
                  type="text" 
                  value={editingPost.slug || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                  className="w-full bg-background border border-border p-2 text-sm text-text-muted focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted mb-1 uppercase">Type</label>
                <select 
                  value={editingPost.type || 'blueprints'}
                  onChange={(e) => setEditingPost({ ...editingPost, type: e.target.value as any })}
                  className="w-full bg-background border border-border p-2 text-sm text-text-main focus:border-primary focus:outline-none"
                >
                  <option value="blueprints">BLUEPRINTS</option>
                  <option value="armory">ARMORY</option>
                  <option value="signals">SIGNALS</option>
                  <option value="experiments">EXPERIMENTS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted mb-1 uppercase">Rank</label>
                <select 
                  value={meta.rank || 'PVT'}
                  onChange={(e) => updateMetadata('rank', e.target.value)}
                  className="w-full bg-background border border-border p-2 text-sm text-text-main focus:border-primary focus:outline-none"
                >
                  <option value="PVT">PVT (Private)</option>
                  <option value="SGT">SGT (Sergeant)</option>
                  <option value="LT">LT (Lieutenant)</option>
                  <option value="CPT">CPT (Captain)</option>
                  <option value="CDR">CDR (Commander)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted mb-1 uppercase">Tags (Comma separated)</label>
                <input 
                  type="text" 
                  value={(meta.tags || []).join(', ')}
                  onChange={(e) => updateMetadata('tags', e.target.value.split(',').map((t: string) => t.trim()))}
                  className="w-full bg-background border border-border p-2 text-sm text-text-main focus:border-primary focus:outline-none"
                  placeholder="strategy, tool, ai"
                />
              </div>
            </div>

            {/* Media Helper */}
            <div className="bg-surface border border-border p-6 space-y-4">
               <h3 className="font-mono font-bold text-text-muted uppercase text-sm border-b border-border pb-2">Media Assets</h3>
               <p className="text-xs text-text-muted leading-relaxed">
                 R2 storage is currently <strong>Offline</strong>. 
                 Use external URLs or ensure images are in <code>public/images</code> (local only).
               </p>
               <button 
                 onClick={() => window.open('https://dash.cloudflare.com', '_blank')}
                 className="w-full border border-border text-text-muted text-xs py-2 hover:border-primary hover:text-primary transition-colors"
               >
                 OPEN CLOUDFLARE DASH
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-mono font-bold text-primary">DASHBOARD</h2>
          <div className="flex bg-surface border border-border p-1">
            <button 
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-1 text-sm font-mono ${activeTab === 'posts' ? 'bg-primary text-background font-bold' : 'text-text-muted hover:text-primary'}`}
            >
              POSTS
            </button>
            <button 
              onClick={() => setActiveTab('media')}
              className={`px-4 py-1 text-sm font-mono ${activeTab === 'media' ? 'bg-primary text-background font-bold' : 'text-text-muted hover:text-primary'}`}
            >
              MEDIA
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchPosts}
            className="p-2 text-text-muted hover:text-primary transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => setEditingPost({ type: 'blueprints', content: '', metadata: '{}' })}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-background font-bold hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            NEW INTEL
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-border text-text-muted hover:border-primary hover:text-primary transition-colors ml-4"
          >
            <LogOut className="w-4 h-4" />
            LOGOUT
          </button>
        </div>
      </div>

      {activeTab === 'posts' ? (
        <div className="bg-surface border border-border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border text-xs font-mono text-text-muted uppercase">
                <th className="p-4">Status</th>
                <th className="p-4">Type</th>
                <th className="p-4">Title / Slug</th>
                <th className="p-4">Rank</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono text-sm">
              {posts.map((post) => {
                const meta = getMetadata(post);
                return (
                  <tr key={post.id} className="hover:bg-background/50 transition-colors group">
                    <td className="p-4">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span>
                      Active
                    </td>
                    <td className="p-4 uppercase text-xs tracking-wider text-text-muted">{post.type}</td>
                    <td className="p-4">
                      <div className="font-bold text-text-main">{post.title}</div>
                      <div className="text-xs text-text-muted">/{post.slug}</div>
                    </td>
                    <td className="p-4">
                      {meta.rank && (
                        <span className="px-2 py-0.5 border border-primary/30 text-primary text-xs bg-primary/5">
                          {meta.rank}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-text-muted text-xs">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setEditingPost(post)}
                          className="p-1 hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="p-1 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {posts.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-text-muted">
                    NO INTEL FOUND. START A NEW OPERATION.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-surface border border-border p-8 text-center">
          <ImageIcon className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-xl font-mono font-bold text-text-main mb-2">MEDIA VAULT LOCKED</h3>
          <p className="text-text-muted max-w-md mx-auto mb-6">
            R2 Bucket configuration not found. To enable media uploads, configure 'r2_buckets' in wrangler.toml and bind it to the application.
          </p>
          <div className="inline-block p-4 bg-background border border-border text-left font-mono text-xs text-text-muted">
             <p className="mb-2 text-primary"># wrangler.toml</p>
             <p>[[r2_buckets]]</p>
             <p>binding = "BUCKET"</p>
             <p>bucket_name = "your-bucket-name"</p>
          </div>
        </div>
      )}
    </div>
  );
}

