// 這是部署時需要的配置範例
// 請將此配置複製到 keystatic.config.ts

import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'YOUR_GITHUB_USERNAME',  // ⚠️ 請替換為您的 GitHub 用戶名
      name: 'YOUR_REPO_NAME',        // ⚠️ 請替換為您的 Repository 名稱
    },
    pathPrefix: 'content',
  },
  // ... 其他配置保持不變（collections 等）
})

// ========================================
// 修改步驟：
// ========================================
// 1. 打開 keystatic.config.ts 文件
// 2. 找到第 4-6 行的 storage 配置
// 3. 將 kind: 'local' 改為 kind: 'github'
// 4. 填入您的 GitHub 用戶名和 Repository 名稱
// 5. 保存文件
// ========================================

