import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./tailwind.css";
import { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/logo.png"
  }
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NoNameNotes" },
    { name: "description", content: "No names. No pressure. Just pure thoughts." },
    { property: "og:url", content: "https://nonamenote.vercel.app" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "NoNameNotes" },
    { property: "og:description", content: "No names. No pressure. Just pure thoughts." },
    { property: "og:image", content: "https://nonamenote.vercel.app/opengraph.png" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: "NoNameNotes" },
    { property: "twitter:description", content: "No names. No pressure. Just pure thoughts." },
    { property: "twitter:image", content: "https://nonamenote.vercel.app/opengraph.png" },
    { property: "twitter:site", content: "@emmathedev" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={"dark"}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
