# 开发指南（Development Guidelines）

## 1. 标签与版本管理（Tagging & Versioning）

- **语义化版本**（Semantic Versioning）
  - 格式：`v{MAJOR}.{MINOR}.{PATCH}`，例如：`v1.0.0`。
  - **主要版本（MAJOR）**：架构或模块级重大变更，向后不兼容。
  - **次要版本（MINOR）**：增加新功能，向后兼容。
  - **补丁版本（PATCH）**：Bug 修复或文档更新。
- **发布流程**
  1. 在 `main` 分支上创建 Release 分支：`release/vMAJOR.MINOR`。
  2. 完成交付后，合并到 `main`，并通过 GitHub Release 页面创建 tag。
  3. CI 自动构建并发布至生产环境。
  4. 合并至 `develop` 并更新 `CHANGELOG.md`。  

## 2. PR 模板（Pull Request Template）

文件路径：`.github/PULL_REQUEST_TEMPLATE.md`

```markdown
## 目的
- 描述本次变更的背景与需求

## 变更点
-

## 测试步骤
1.
2.

## 影响范围
- 可能影响的模块或页面

## 关联任务号
- 如 A-2, B-5, #123 等
```

## 3. CI/CD 流程（CI/CD Workflow）

文件路径：`.github/workflows/ci-cd.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - develop
  pull_request:
    branches:
      - develop
  workflow_dispatch:

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: pnpm install
      - name: Lint
        run: pnpm lint
      - name: Unit Tests
        run: pnpm test

  preview-deploy:
    needs: lint-and-test
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Preview
        run: pnpm deploy:preview
        env:
          CF_PAGES_TOKEN: ${{ secrets.CF_PAGES_TOKEN }}

  production-deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    needs: [lint-and-test]
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Production
        run: pnpm deploy:prod
        env:
          CF_PAGES_TOKEN: ${{ secrets.CF_PAGES_TOKEN }}
```
