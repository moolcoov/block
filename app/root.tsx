import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import "~/styles/globals.css";
import { Loading } from "./shared/ui/Loading";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

export function meta() {
  return [{ title: "Block — Тренировки, чтобы держать себя в форме" }];
}

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/icon-96x96.png", type: "image/png", sizes: "96x96" },
  {
    rel: "icon",
    href: "/icon.svg",
    type: "image/svg+xml",
  },
  {
    rel: "shortcut icon",
    href: "/icon.ico",
  },
  {
    rel: "apple-touch-icon",
    href: "/apple-touch-icon.png",
    sizes: "180x180",
  },
  {
    rel: "manifest",
    href: "/manifest.webmanifest",
  },

  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "preload",
    href: "/fonts/Medium.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/Medium.woff",
    as: "font",
    type: "font/woff",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-title" content="Block" />
        <Meta />
        <Links />
      </head>
      <body>
        <div data-vaul-drawer-wrapper>{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <Loading />;
}
