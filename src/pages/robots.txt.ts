import type { APIRoute } from "astro";

const DEFAULT_SITE_ORIGIN = "https://aifabriek.be";

export const GET: APIRoute = ({ site }) => {
  const siteOrigin = site?.origin || DEFAULT_SITE_ORIGIN;
  const body = `User-agent: *
Allow: /

Sitemap: ${siteOrigin}/sitemap-index.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
