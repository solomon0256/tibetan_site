/**
 * ⚙️ Astro 配置文件说明：
 *
 * 1. 适配平台：使用 `@astrojs/cloudflare` 适配器部署到 Cloudflare Workers。
 * 2. 样式集成：集成 Tailwind CSS 插件（@astrojs/tailwind）。
 * 
 * 🧠 注意事项：
 * - `adapter: cloudflare()` 是部署到 Workers 的必要配置，若改为静态站点请切换为 `adapter-static`。
 * - `integrations` 中如需加入其他插件（如 MDX、Sitemap），需一并注册在数组中。
 * - Astro 配置更新后需重新构建项目。
 */
//astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare(),
  integrations: [tailwind()]
});