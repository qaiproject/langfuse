/**
 * Custom _document.tsx (Pages Router) - Qosmo whitelabel.
 *
 * Wstawia w <Head>:
 *  - <link> do naszych CSS (tokens, components, overrides/langfuse) - RUNTIME load,
 *    bez kosztu Tailwind v4 build (prepend do globals.css wywalał OOM 137)
 *  - <link> Google Fonts (Quicksand + Manrope)
 *  - <script src="/branding/js/qosmoai-user-prefs.js"> (cookie qosmoai_user reader,
 *    applies theme/accent/text_size do <html>, exposes window.QosmoaiUser API)
 *
 * Langfuse upstream NIE MA _document.tsx (sprawdzone), więc dodanie pliku
 * nie generuje konfliktu rebase - to oficjalny Next.js Pages Router
 * extension point.
 *
 * Strategia bez Tailwind: nasze CSS ma `!important` na shadcn vars
 * (--background, --card, --sidebar-background, --primary itd.), więc cascade
 * runtime override'uje defaults Langfuse'a. Brak potrzeby integracji z
 * @theme inline mapowaniem.
 */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Qosmo design tokens + shared components + Langfuse-specific overrides.
            Kolejność istotna: tokens → components → overrides (overrides
            wygrywają specyficznością + !important). */}
        <link rel="stylesheet" href="/branding/tokens.css" />
        <link rel="stylesheet" href="/branding/components.css" />
        <link rel="stylesheet" href="/branding/overrides/langfuse.css" />

        {/* Google Fonts dla Quicksand (--font-sans) + Manrope (--font-heading).
            CSP font-src spatchowany w Dockerfile.langfuse.dev */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Shared user prefs reader (cookie qosmoai_user). */}
        <script src="/branding/js/qosmoai-user-prefs.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
