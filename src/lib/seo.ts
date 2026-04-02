export type SeoInput = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  canonicalPath?: string;
  imageUrl?: string;
  imagePath?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export type ResolvedSeo = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: "website" | "article";
  ogImage: string;
  robots: string;
  siteName: string;
};

const DEFAULT_SITE_NAME = "AIFabriek";
const DEFAULT_SITE_ORIGIN = "https://aifabriek.be";
const DEFAULT_DESCRIPTION = "AIFabriek helpt Belgische KMO's AI operationeel maken.";
const DEFAULT_SOCIAL_IMAGE_PATH = "/social/og-default.svg";

function resolveSiteOrigin(site: URL | string | undefined): string {
  if (!site) return DEFAULT_SITE_ORIGIN;
  const parsedSite = typeof site === "string" ? new URL(site) : site;
  return parsedSite.origin;
}

function withSiteOrigin(value: string, siteOrigin: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return new URL(normalizedPath, siteOrigin).toString();
}

export function buildSeo(
  input: SeoInput,
  options: {
    site?: URL | string;
    pathname?: string;
  }
): ResolvedSeo {
  const siteOrigin = resolveSiteOrigin(options.site);
  const canonicalUrl = input.canonicalUrl
    ? withSiteOrigin(input.canonicalUrl, siteOrigin)
    : withSiteOrigin(input.canonicalPath || options.pathname || "/", siteOrigin);
  const ogImage = input.imageUrl
    ? withSiteOrigin(input.imageUrl, siteOrigin)
    : withSiteOrigin(input.imagePath || DEFAULT_SOCIAL_IMAGE_PATH, siteOrigin);

  return {
    title: input.title?.trim() || DEFAULT_SITE_NAME,
    description: input.description?.trim() || DEFAULT_DESCRIPTION,
    canonicalUrl,
    ogType: input.type || "website",
    ogImage,
    robots: input.noindex ? "noindex, nofollow" : "index, follow",
    siteName: DEFAULT_SITE_NAME
  };
}
