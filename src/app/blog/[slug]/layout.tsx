import { blogPosts } from "@/data/blogData";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Post Not Found | Globify' };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      url: `https://globify.ae/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    }
  };
}

export default function Layout({ children, params }: { children: React.ReactNode, params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "description": post.excerpt,
              "author": {
                "@type": "Organization",
                "name": post.author,
              },
              "publisher": {
                "@type": "Organization",
                "name": "Globify",
              "sameAs": ["https://www.linkedin.com/company/globify", "https://www.instagram.com/globify"],
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://globify.ae/logo.png"
                }
              },
              "mainEntityOfPage": `https://globify.ae/blog/${post.slug}`,
              "datePublished": post.date,
            })
          }}
        />
      )}
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{"@type":"ListItem","position":1,"name":"Home","item":"https://globify.ae"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://globify.ae/blog"},{"@type":"ListItem","position":3,"name":"Current Article"}]
          })
        }}
      />
      {children}
    </>
  );
}
