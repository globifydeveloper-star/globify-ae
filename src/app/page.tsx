import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "360° Digital Commerce & Technology Partner | Globify",
  description: "We build high-performance Web Apps, Shopify stores, and AI Automations.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Globify",
            "image": "https://globify.ae/logo.png",
            "url": "https://globify.ae",
            "telephone": "+971501234567",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Dubai Silicon Oasis",
              "addressLocality": "Dubai",
              "addressRegion": "Dubai",
              "addressCountry": "AE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 25.1256,
              "longitude": 55.3854
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          })
        }}
      />
      <HomeClient />
    </>
  );
}
