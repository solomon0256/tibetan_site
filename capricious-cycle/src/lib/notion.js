import { Client } from "@notionhq/client";

const notion = new Client({ auth: import.meta.env.ASTRO_NOTION_TOKEN });

export async function getCourses() {
  const response = await notion.databases.query({
    database_id: import.meta.env.ASTRO_NOTION_DATABASE_ID,
    sorts: [{ property: "updatedAt", direction: "descending" }],
  });
  return response.results.map(page => ({
    id: page.id,
    title: page.properties.title?.title[0]?.plain_text ?? "",
    slug: page.properties.slug?.rich_text?.[0]?.plain_text ?? "",
    category: page.properties.category?.rich_text?.[0]?.plain_text ?? "",
    price: page.properties.price?.number ?? 0,
    updatedAt: page.properties.updatedAt?.date?.start ?? ""
  }));
}