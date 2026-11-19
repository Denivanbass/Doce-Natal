import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://loyal-khaki-locust-87.hostingersite.com/'

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}