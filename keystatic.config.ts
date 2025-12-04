import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'HKCalvinYau',
      name: 'actyourplan2026',
    },
    pathPrefix: 'content',
  },
  collections: {
    // Tags 管理系統
    tags: collection({
      label: 'Tags (標籤管理)',
      path: 'content/tags/*',
      slugField: 'name',
      schema: {
        name: fields.text({
          label: 'Tag Name (標籤名稱)',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description (描述)',
          multiline: true,
        }),
        color: fields.select({
          label: 'Color (顏色)',
          options: [
            { label: 'Primary (主要綠)', value: 'primary' },
            { label: 'Yellow (黃色)', value: 'yellow' },
            { label: 'Blue (藍色)', value: 'blue' },
            { label: 'Red (紅色)', value: 'red' },
            { label: 'Purple (紫色)', value: 'purple' },
          ],
          defaultValue: 'primary',
        }),
      },
    }),
    // Categories 管理系統
    categories: collection({
      label: 'Categories (分類管理)',
      path: 'content/categories/*',
      slugField: 'name',
      schema: {
        name: fields.text({
          label: 'Category Name (分類名稱)',
          validation: { isRequired: true },
        }),
        type: fields.select({
          label: 'Category Type (分類類型)',
          options: [
            { label: 'Blueprints (戰略藍圖)', value: 'blueprints' },
            { label: 'Armory (數位軍火庫)', value: 'armory' },
            { label: 'Signals (情報訊號)', value: 'signals' },
            { label: 'Experiments (實驗室)', value: 'experiments' },
          ],
          defaultValue: 'blueprints',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description (描述)',
          multiline: true,
        }),
      },
    }),
    blueprints: collection({
      label: 'Blueprints (戰略藍圖)',
      path: 'content/blueprints/*',
      slugField: 'title',
      schema: {
        title: fields.text({
          label: 'Title (標題)',
          validation: { isRequired: true },
        }),
        rank: fields.select({
          label: 'Rank (軍階)',
          options: [
            { label: '🔰 PVT (新兵)', value: 'PVT' },
            { label: '🎖️ SGT (士官)', value: 'SGT' },
            { label: '⭐️ CDR (指揮官)', value: 'CDR' },
          ],
          defaultValue: 'PVT',
          validation: { isRequired: true },
        }),
        category: fields.relationship({
          label: 'Category (分類)',
          collection: 'categories',
          validation: { isRequired: false },
          description: '選擇一個分類（可選，建議先建立分類）',
        }),
        views: fields.integer({
          label: 'Views (閱讀量)',
          description: '可手動調整的閱讀次數',
          defaultValue: 0,
          validation: { min: 0 },
        }),
        realViews: fields.integer({
          label: 'Real Views (真實閱讀量)',
          description: '系統自動統計的真實閱讀次數（不可手動修改）',
          defaultValue: 0,
          validation: { min: 0 },
        }),
        status: fields.select({
          label: 'Status (狀態)',
          options: [
            { label: 'Reading (閱讀中)', value: 'Reading' },
            { label: 'Deployed (已部署)', value: 'Deployed' },
            { label: 'Archived (已歸檔)', value: 'Archived' },
          ],
          defaultValue: 'Reading',
          validation: { isRequired: true },
        }),
        difficulty: fields.select({
          label: 'Difficulty (難度)',
          options: [
            { label: '1星', value: '1' },
            { label: '2星', value: '2' },
            { label: '3星', value: '3' },
            { label: '4星', value: '4' },
            { label: '5星', value: '5' },
          ],
          defaultValue: '1',
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: 'Author (作者)',
        }),
        date: fields.date({
          label: 'Date (日期)',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description (描述)',
          multiline: true,
        }),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'tags',
            validation: { isRequired: false },
          }),
          {
            label: 'Tags (標籤)',
            itemLabel: (props) => props.value || '未選擇',
            description: '選擇或新增標籤（可在 Tags 管理中新增新標籤）',
          }
        ),
        content: fields.document({
          label: 'Content (內容)',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images',
            publicPath: '/images',
          },
        }),
      },
    }),

    armory: collection({
      label: 'Armory (數位軍火庫)',
      path: 'content/armory/*',
      slugField: 'title',
      schema: {
        title: fields.text({
          label: 'Title (標題)',
          validation: { isRequired: true },
        }),
        rank: fields.select({
          label: 'Rank (軍階)',
          options: [
            { label: '🔰 PVT (新兵)', value: 'PVT' },
            { label: '🎖️ SGT (士官)', value: 'SGT' },
            { label: '⭐️ CDR (指揮官)', value: 'CDR' },
          ],
          defaultValue: 'PVT',
          validation: { isRequired: true },
        }),
        category: fields.relationship({
          label: 'Category (分類)',
          collection: 'categories',
          validation: { isRequired: false },
          description: '選擇一個分類（可選，建議先建立分類）',
        }),
        views: fields.integer({
          label: 'Views (閱讀量)',
          description: '工具查看次數',
          defaultValue: 0,
          validation: { min: 0 },
        }),
        cost: fields.select({
          label: 'Cost (費用)',
          options: [
            { label: 'Free (免費)', value: 'Free' },
            { label: 'Freemium (免費增值)', value: 'Freemium' },
            { label: 'Paid (付費)', value: 'Paid' },
          ],
          defaultValue: 'Free',
          validation: { isRequired: true },
        }),
        rating: fields.select({
          label: 'Rating (評分)',
          options: [
            { label: '1星', value: '1' },
            { label: '2星', value: '2' },
            { label: '3星', value: '3' },
            { label: '4星', value: '4' },
            { label: '5星', value: '5' },
          ],
          defaultValue: '3',
          validation: { isRequired: true },
        }),
        link: fields.url({
          label: 'Link (連結)',
          description: '前往工具的連結',
        }),
        date: fields.date({
          label: 'Date (日期)',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description (描述)',
          multiline: true,
        }),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'tags',
            validation: { isRequired: false },
          }),
          {
            label: 'Tags (標籤)',
            itemLabel: (props) => props.value || '未選擇',
            description: '選擇或新增標籤（可在 Tags 管理中新增新標籤）',
          }
        ),
        content: fields.document({
          label: 'Content (內容)',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images',
            publicPath: '/images',
          },
        }),
      },
    }),

    signals: collection({
      label: 'Signals (情報訊號)',
      path: 'content/signals/*',
      slugField: 'title',
      schema: {
        title: fields.text({
          label: 'Title (標題)',
          validation: { isRequired: true },
        }),
        rank: fields.select({
          label: 'Rank (軍階)',
          options: [
            { label: '🔰 PVT (新兵)', value: 'PVT' },
            { label: '🎖️ SGT (士官)', value: 'SGT' },
            { label: '⭐️ CDR (指揮官)', value: 'CDR' },
          ],
          defaultValue: 'PVT',
          validation: { isRequired: true },
        }),
        category: fields.relationship({
          label: 'Category (分類)',
          collection: 'categories',
          validation: { isRequired: false },
          description: '選擇一個分類（可選，建議先建立分類）',
        }),
        views: fields.integer({
          label: 'Views (閱讀量)',
          description: '訊號查看次數',
          defaultValue: 0,
          validation: { min: 0 },
        }),
        source: fields.text({
          label: 'Source (來源)',
          description: '例如: Twitter @elonmusk',
          validation: { isRequired: true },
        }),
        sourceUrl: fields.url({
          label: 'Source URL (來源連結)',
        }),
        impact: fields.select({
          label: 'Impact (影響力)',
          options: [
            { label: 'Low (低)', value: 'Low' },
            { label: 'Med (中)', value: 'Med' },
            { label: 'High (高)', value: 'High' },
          ],
          defaultValue: 'Low',
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: 'Date (日期)',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description (描述)',
          multiline: true,
        }),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'tags',
            validation: { isRequired: false },
          }),
          {
            label: 'Tags (標籤)',
            itemLabel: (props) => props.value || '未選擇',
            description: '選擇或新增標籤（可在 Tags 管理中新增新標籤）',
          }
        ),
        content: fields.document({
          label: 'Content (內容)',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images',
            publicPath: '/images',
          },
        }),
      },
    }),

    experiments: collection({
      label: 'Experiments (實驗室)',
      path: 'content/experiments/*',
      slugField: 'title',
      schema: {
        title: fields.text({
          label: 'Title (標題)',
          validation: { isRequired: true },
        }),
        rank: fields.select({
          label: 'Rank (軍階)',
          options: [
            { label: '🔰 PVT (新兵)', value: 'PVT' },
            { label: '🎖️ SGT (士官)', value: 'SGT' },
            { label: '⭐️ CDR (指揮官)', value: 'CDR' },
          ],
          defaultValue: 'PVT',
          validation: { isRequired: true },
        }),
        category: fields.relationship({
          label: 'Category (分類)',
          collection: 'categories',
          validation: { isRequired: false },
          description: '選擇一個分類（可選，建議先建立分類）',
        }),
        views: fields.integer({
          label: 'Views (閱讀量)',
          description: '實驗查看次數',
          defaultValue: 0,
          validation: { min: 0 },
        }),
        techStack: fields.multiselect({
          label: 'Tech Stack (技術棧)',
          options: [
            { label: 'Next.js', value: 'Next.js' },
            { label: 'TypeScript', value: 'TypeScript' },
            { label: 'Python', value: 'Python' },
            { label: 'Tailwind', value: 'Tailwind' },
            { label: 'React', value: 'React' },
            { label: 'Node.js', value: 'Node.js' },
            { label: 'AI', value: 'AI' },
            { label: 'MDX', value: 'MDX' },
            { label: 'Cloudflare', value: 'Cloudflare' },
          ],
          defaultValue: [],
        }),
        progress: fields.integer({
          label: 'Progress (進度)',
          description: '0-100',
          validation: {
            min: 0,
            max: 100,
            isRequired: true,
          },
          defaultValue: 0,
        }),
        status: fields.select({
          label: 'Status (狀態)',
          options: [
            { label: 'Idea (構思)', value: 'Idea' },
            { label: 'Alpha (測試版)', value: 'Alpha' },
            { label: 'Beta (公測版)', value: 'Beta' },
            { label: 'Live (上線)', value: 'Live' },
            { label: 'Failed (失敗)', value: 'Failed' },
          ],
          defaultValue: 'Idea',
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: 'Date (日期)',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description (描述)',
          multiline: true,
        }),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'tags',
            validation: { isRequired: false },
          }),
          {
            label: 'Tags (標籤)',
            itemLabel: (props) => props.value || '未選擇',
            description: '選擇或新增標籤（可在 Tags 管理中新增新標籤）',
          }
        ),
        content: fields.document({
          label: 'Content (內容)',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images',
            publicPath: '/images',
          },
        }),
      },
    }),
  },
})

