# 项目主规范（Project Charter）

## 1. 项目范围（Scope）

- **产品名称**: 藏语学习网站
- **目标用户**: 藏语学习者、文化旅游爱好者
- **主要功能**: 课程购买、H5P互动、进度同步、支付流程、PWA支持
- **包含模块**: 前端页面、CMS集成、LRS(xAPI)、支付、备份与监控
- **不包含模块**: 高级社区、AI助教初期版本、App Store/Play 商店上架

### 2. 项目目标与 KPI

- **MVP 上线时限**: 3 个月内
- **核心 KPI**: MVP 阶段 ≥ 100 名付费用户
- **质量要求**:
  - Lighthouse Performance ≥ 90
  - E2E 测试覆盖率 ≥ 90%
  - 进度同步误差 ≤ 1 条/1000

### 3. 里程碑（Milestones）

| 阶段 | 时间节点   | 交付内容                  | 验收标准                     |
|------|------------|---------------------------|------------------------------|
| W1   | Day 0–Day 7  | 骨架搭建、支付闭环           | 首页 + 支付流程全链路绿灯       |
| W2   | Day 8–Day 14 | 首门付费课上线               | ≥ 6 个 H5P 互动单元            |
| W3   | Day 15–Day 21| 监控与备份部署               | 漏斗监控与夜间备份脚本可用       |
| W12  | Day 22–Day 90| ≥ 100 名付费用户            | KPI 达成回顾报告               |

### 4. 版本策略（Versioning）

- **主版本** (Major): 架构层面或模块切换（如 Phase‑1 切 Supabase）
- **次版本** (Minor): 新功能或里程碑交付
- **补丁** (Patch): Bug 修复或文档更新
- **分支模型**: `main`、`develop`、`feature/*`；发布时打标签 `v{MAJOR}.{MINOR}.{PATCH}`

- **A-2**: GitHub 组织 & 仓库
  - 组织名称: `tibetan-language-site`
  - 仓库名称: `tibetan-site-monorepo`
  - 分支保护:
    - `main`: 禁止强推；Require pull request with at least 2 reviewers; must pass CI.
    - `develop`: Require pull request with at least 1 reviewer.
    - `feature/*`: 可自由推送，但合并前需 rebase 最新 `develop`。
  - PR 模板:
    - Location: `.github/PULL_REQUEST_TEMPLATE.md`
    - Fields: 目的, 变更, 测试步骤, 影响范围, 关联任务号。
  - CI/CD 流程:
    - Push to `develop`: 执行 lint, unit tests, preview deploy.
    - Merge to `main`: 执行 full test suite, production deploy.
- **A-3**: SaaS 账号列表及权限分配
  - CF_R2_BUCKET_NAME=tibetan-site-r2

- **A-4**: Secrets 管理规范 (`secrets.sample.env`)
- **A-5**: 品牌手册 (Logo、色彩、字体 Token)
