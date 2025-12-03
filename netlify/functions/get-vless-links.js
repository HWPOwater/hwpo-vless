import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NETLIFY_DATABASE_URL);

export async function handler(event, context) {
  try {
    const rows = await sql`SELECT links FROM "vless-links" WHERE id = 1`;
    if (!rows.length) {
      return { statusCode: 404, body: "no data" };
    }

    const text = rows[0].links;
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      body: text,
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "db error" };
  }
}
