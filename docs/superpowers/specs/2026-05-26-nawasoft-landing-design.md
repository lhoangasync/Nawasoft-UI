# NawaSoft Landing Page — Design Spec
**Date:** 2026-05-26  
**Status:** Approved

---

## 1. Overview

A multi-page marketing site for NawaSoft's 4 AI products (Nawa Deploy, Nawa SEO, Nawa Facebook, Nawa Zalo). Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui (radix-nova style), and Magic UI.

**Implementation approach:** Architecture from the original plan, all code written fresh to match the actual installed stack — no copy-paste of plan code snippets.

---

## 2. Decisions

| Decision | Choice | Reason |
|---|---|---|
| Brand colors | violet-600 → cyan-400 gradient | As planned |
| Folder structure | No `src/` — files at `app/`, `components/`, `lib/` | Project initialized without `--src-dir` |
| Font | Be Vietnam Pro (weights 300–900, subsets: vietnamese, latin) | Vietnamese support + B2B feel |
| Hero layout | Centered + app preview window | Text + CTAs centered, browser-window stats mockup below |
| Build approach | Architecture from plan, code written fresh | Avoids copy-paste bugs from mismatched stack versions |

---

## 3. Tech Stack (actual installed versions)

- **Next.js** 16.2.6 (App Router, Turbopack)
- **React** 19.2.4
- **Tailwind CSS** v4 — config via `globals.css` `@theme inline {}`, no `tailwind.config.ts`
- **shadcn/ui** — `radix-nova` style, `neutral` base, CSS variables, `radix-ui` unified package
- **Magic UI** — components added via CLI or manual copy
- **next-themes** 0.4.6 — already installed
- **lucide-react** 1.16.0 — already installed

**Dependencies to install:**
```bash
npm install framer-motion
npm install react-hook-form @hookform/resolvers zod
npx shadcn@latest add sonner sheet navigation-menu badge separator
npx shadcn@latest add form input textarea select label
npx magicui-cli@latest add animated-gradient-text blur-fade marquee number-ticker border-beam
```

---

## 4. Folder Structure

```
client/
├── app/
│   ├── layout.tsx                    # Root: ThemeProvider, Navbar, Footer, Toaster
│   ├── globals.css                   # @theme inline + brand tokens + utility classes
│   ├── page.tsx                      # Home — imports only from ./_components/
│   ├── _components/
│   │   ├── HeroSection.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── MarqueeSection.tsx
│   │   └── CtaSection.tsx
│   ├── nawa-deploy/
│   │   ├── page.tsx
│   │   └── _components/
│   │       ├── ProductHero.tsx
│   │       ├── ProductFeatures.tsx
│   │       └── ProductCta.tsx
│   ├── nawa-seo/         (same structure)
│   ├── nawa-facebook/    (same structure)
│   ├── nawa-zalo/        (same structure)
│   ├── contact/
│   │   ├── page.tsx
│   │   └── _components/
│   │       ├── ContactForm.tsx       # "use client"
│   │       └── ContactInfo.tsx
│   └── api/
│       └── contact/
│           └── route.ts              # POST → Google Apps Script
├── components/
│   ├── shared/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── theme-provider.tsx        # Already exists
│   │   └── mode-toggle.tsx           # Already exists
│   └── ui/                           # shadcn + Magic UI components
├── lib/
│   ├── utils.ts                      # Already exists (cn helper)
│   ├── products.ts                   # Product data + types + getProductBySlug()
│   └── validations.ts                # Zod contactSchema
└── types/
    └── index.ts                      # Re-exports + ContactFormData type
```

---

## 5. CSS & Theming

**File:** `app/globals.css`

Strategy: extend the existing `@theme inline {}` block with brand tokens. Update shadcn `--primary` to violet. Add brand gradient tokens, custom animations, and utility classes.

**Brand color tokens (oklch):**
```css
--primary:             oklch(0.49 0.27 293);   /* violet-600 */
--primary-foreground:  oklch(0.985 0 0);
--brand-from:          oklch(0.49 0.27 293);   /* violet-600 */
--brand-to:            oklch(0.85 0.18 195);   /* cyan-400 */
```

**Dark mode defaults:**
```css
/* :root — light */
--background: oklch(1 0 0);

/* .dark */
--background: oklch(0.07 0.02 265);   /* deep navy-black #050510 */
--card:        oklch(0.14 0.03 265);
```

**ThemeProvider:** Change `defaultTheme` from `"system"` to `"dark"`.

**Custom animations in `@theme inline`:**
- `--animate-fade-up`, `--animate-float`, `--animate-glow`
- `--animate-marquee` (for Magic UI Marquee)
- `--animate-border-beam` (for Magic UI BorderBeam)

**Utility classes:**
```css
.gradient-text  { background: linear-gradient(to right, violet, cyan); -webkit-background-clip: text; ... }
.glass-card     { background: color-mix(in oklch, var(--card) 80%, transparent); backdrop-filter: blur(16px); ... }
.grid-bg        { /* subtle violet grid lines via background-image repeating linear-gradient */ }
```

**Font:**
```typescript
// app/layout.tsx
import { Be_Vietnam_Pro } from "next/font/google";
const font = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300","400","500","600","700","800","900"],
  variable: "--font-sans",
});
```

---

## 6. Data Layer

**File:** `lib/products.ts`

```typescript
export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;          // lucide icon name
  color: string;         // tailwind color token
  link?: string;         // external product URL
  badge?: string;        // "AI" | "Hot" | "New"
  problems: string[];    // 3 bullets
  featureGroups: Array<{
    groupTitle: string;
    features: string[];
  }>;
}

export function getProductBySlug(slug: string): Product | undefined
```

Products: `nawa-deploy` (violet, Rocket, "New"), `nawa-seo` (cyan, Search, "AI"), `nawa-facebook` (blue, Facebook, "Hot"), `nawa-zalo` (indigo, MessageCircle, "Hot").

**File:** `lib/validations.ts`

```typescript
export const contactSchema = z.object({
  fullName:    z.string().min(2),
  phone:       z.string().min(9).regex(/^[0-9+\s-]+$/),
  email:       z.string().email(),
  product:     z.string().min(1),
  message:     z.string().min(10),
  inquiryType: z.string().optional(),
});
```

---

## 7. Shared Components

### Navbar (`components/shared/Navbar.tsx`)
- `"use client"` — needs scroll detection (`useEffect` + `window.scrollY`) and Sheet open state
- Logo: gradient square `N` + "Nawa**Soft**"
- Desktop: `NavigationMenu` — Products dropdown (4 items: icon + name + tagline), Trang chủ, Liên hệ
- Right: `ModeToggle` + "Dùng thử miễn phí" Button → `/contact`
- Mobile: `Sheet` from right — full nav links + CTA
- Sticky + `backdrop-blur-xl` + semi-transparent bg on scroll (`useEffect` + `scrollY`)

### Footer (`components/shared/Footer.tsx`)
- Server Component
- 4-column grid (collapses to 2 on mobile, 1 on small):
  1. Logo + tagline + social icons
  2. Sản phẩm links (4 product pages)
  3. Công ty links (Trang chủ, Liên hệ)
  4. Contact info (address, phone, email, hours)
- Bottom bar: copyright

### ProductCard (`components/shared/ProductCard.tsx`)
- Props: `product: Product`
- Icon (colored) + Badge + name + tagline + 3 `problems` bullets (CheckCircle2 icons)
- "Xem chi tiết" Button → `/{product.slug}`
- `BorderBeam` always rendered, opacity `0.4` default → `1.0` on `group-hover`
- `group` hover: `translateY(-4px)` + glow border with product color

---

## 8. Homepage (`app/page.tsx` + `_components/`)

### HeroSection
- `BlurFade` stagger: badge (delay 0) → headline (0.1) → subtext (0.2) → buttons (0.3) → preview (0.4)
- Badge: "🚀 Hệ Sinh Thái AI Marketing #1 Việt Nam" (violet pill border)
- Headline: "Tăng Trưởng Vượt Bậc Với" + `AnimatedGradientText` "AI Marketing"
- 2 CTAs: primary gradient button + outline button
- App preview: browser-window mockup with 3 stat tiles (500+ Khách hàng, 4 Sản phẩm, 80% Tiết kiệm) using `NumberTicker`
- Background: radial violet glow (absolute positioned) + `.grid-bg`

### ProductsSection
- Section heading + 2×2 grid (1 col mobile) of `ProductCard`
- `BlurFade` stagger per card

### FeaturesSection
- 3-column grid (1 col mobile): AI-Powered / 80% Tiết kiệm / Made for Vietnam
- Each: icon + title + description
- `BlurFade` stagger

### StatsSection
- 4 stats with `NumberTicker`: 500 (Khách hàng), 4 (Sản phẩm AI), 80 (% Tiết kiệm), 24 (Hỗ trợ 24/7)
- `useInView` to trigger NumberTicker when scrolled into view

### MarqueeSection
- `Marquee` with two rows: row 1 scrolls left, row 2 scrolls right
- Tags: "Landing Page", "SEO Content", "Facebook Auto", "Zalo Marketing", "Google Sheet", "WordPress", "SePay Payment", "AI Content", "Auto Post", "Lead Form", …

### CtaSection
- Gradient background overlay
- Headline + 2 buttons + `BlurFade`

---

## 9. Product Detail Pages

**Pattern** (identical for all 4 routes):

```typescript
// app/nawa-deploy/page.tsx
import { getProductBySlug } from "@/lib/products";
import ProductHero     from "./_components/ProductHero";
import ProductFeatures from "./_components/ProductFeatures";
import ProductCta      from "./_components/ProductCta";

export default function NawaDeployPage() {
  const product = getProductBySlug("nawa-deploy")!;
  return (<><ProductHero product={product} /><ProductFeatures product={product} /><ProductCta product={product} /></>);
}
```

### ProductHero
- Large icon + radial glow in product color + badge
- `AnimatedGradientText` product name
- Description paragraph
- 3 `problems` bullets (CheckCircle2)
- CTAs: "Dùng thử ngay" (→ `product.link`, opens new tab) + "Liên hệ tư vấn" (→ `/contact?product={slug}`)

### ProductFeatures
- Loops `product.featureGroups`
- Each group: large group title + feature list (CheckCircle2 per feature)
- `BlurFade` stagger per group

### ProductCta
- "Bắt đầu với {product.name} ngay hôm nay"
- Button → `/contact?product={product.slug}`

---

## 10. Contact Page (`app/contact/`)

### ContactInfo (Server Component)
- Address: 431 Tô Hiến Thành, P. Diên Hồng, Q.10, TP.HCM
- Phone: 0847 755 599
- Email: info@2dd.asia
- Website: 2dd.asia
- Hours: T2–T7: 8:00–22:00
- Animated green dot "Đang trực tuyến"

### ContactForm (`"use client"`)
- `useSearchParams()` to pre-fill `product` field from URL `?product=slug`
- `react-hook-form` + `zodResolver(contactSchema)`
- Fields: fullName (Input), phone (Input tel), email (Input email), product (Select), inquiryType (4 toggle Buttons: Tư vấn/Demo/Báo giá/Hỗ trợ), message (Textarea)
- Submit: `POST /api/contact` → loading spinner → `toast.success()` or `toast.error()` (Sonner)

### API Route (`app/api/contact/route.ts`)
- `POST` handler
- Validate with `contactSchema.safeParse()`
- Read `process.env.GOOGLE_SCRIPT_URL` (server-only, no NEXT_PUBLIC_)
- Forward to Apps Script with `submittedAt` + `source: "nawasoft-landing"`
- Returns `{ success: true }` or `{ error: "..." }`

---

## 11. Root Layout

```typescript
// app/layout.tsx
import { Be_Vietnam_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
```

- `lang="vi"`, `suppressHydrationWarning`
- `ThemeProvider attribute="class" defaultTheme="dark" enableSystem`
- Structure: `<Navbar /> <main>{children}</main> <Footer /> <Toaster richColors position="bottom-right" />`

---

## 12. Environment Variables

**`.env.local`** (never committed):
```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
GOOGLE_SHEET_ID=your_sheet_id
NEXT_PUBLIC_COMPANY_PHONE=0847755599
NEXT_PUBLIC_COMPANY_EMAIL=info@2dd.asia
NEXT_PUBLIC_COMPANY_ADDRESS=431 Tô Hiến Thành, P. Diên Hồng, Q.10, TP.HCM
NEXT_PUBLIC_COMPANY_WEBSITE=https://2dd.asia
NEXT_PUBLIC_SITE_URL=https://nawasoft.vn
NEXT_PUBLIC_SITE_NAME=NawaSoft
```

**`.env.example`** (committed to git) — same keys, empty values.

---

## 13. SEO & Metadata

Each page exports `metadata`:
- Home: "NawaSoft – Hệ Sinh Thái AI Marketing Toàn Diện"
- Product pages: "{product.name} – {product.tagline} | NawaSoft"
- Contact: "Liên hệ | NawaSoft"
- `lang="vi"` on `<html>`
- Font subset `"vietnamese"` on Be Vietnam Pro

---

## 14. Not In Scope

- Authentication / user accounts
- Blog / CMS
- Analytics integration
- i18n (Vietnamese only)
- Google Apps Script setup (manual step, documented in plan)
