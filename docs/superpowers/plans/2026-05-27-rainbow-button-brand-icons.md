# RainbowButton + Brand Icons + FloatingContactButton Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add MagicUI RainbowButton to CtaSection and each ProductCard, replace product icons with real brand icons (WordPress, Facebook, Zalo), and add a floating contact button fixed to the bottom-right of every page.

**Architecture:** Install rainbow-button via shadcn CLI and react-icons via npm, then update affected components top-down: shared types in `lib/products.ts` first, then UI components. FloatingContactButton is a new `"use client"` component mounted once in `app/layout.tsx`.

**Tech Stack:** Next.js 16, React 19, MagicUI (`@magicui/rainbow-button`), react-icons (fa set), Tailwind CSS v4, lucide-react

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create (generated) | `client/components/ui/rainbow-button.tsx` | MagicUI RainbowButton component |
| Create | `client/lib/icons.tsx` | ZaloIcon custom SVG component |
| Modify | `client/lib/products.ts` | icon type + brand icon assignments |
| Modify | `client/app/_components/CtaSection.tsx` | primary CTA → RainbowButton |
| Modify | `client/components/shared/ProductCard.tsx` | add "Liên hệ" RainbowButton per card |
| Create | `client/components/shared/FloatingContactButton.tsx` | fixed bottom-right contact button |
| Modify | `client/app/layout.tsx` | mount FloatingContactButton |

---

## Task 1: Install Dependencies

**Files:**
- Modify: `client/package.json` (npm adds react-icons)
- Create: `client/components/ui/rainbow-button.tsx` (shadcn generates)

- [ ] **Step 1: Install react-icons**

```bash
cd client
npm install react-icons
```

Expected output: `added X packages` with no errors.

- [ ] **Step 2: Install MagicUI rainbow-button via shadcn**

```bash
cd client
npx shadcn@latest add @magicui/rainbow-button
```

When prompted, confirm overwrite if asked. Expected: `✔ Done. rainbow-button component added.`

- [ ] **Step 3: Verify rainbow-button.tsx was created**

```bash
ls client/components/ui/rainbow-button.tsx
```

Expected: file exists.

- [ ] **Step 4: Read the generated rainbow-button.tsx to confirm its API**

Open `client/components/ui/rainbow-button.tsx`. Note whether it accepts `size` prop. It likely only accepts `className` and standard `React.ButtonHTMLAttributes<HTMLButtonElement>`. The component is a plain `<button>` — it does **not** support `asChild`. We will use `useRouter` for navigation instead.

- [ ] **Step 5: Check if rainbow CSS variables are present in globals.css**

Open `client/app/globals.css`. Search for `--color-1`. If not found, the rainbow animation will be missing colors. Add these to the `:root` block:

```css
/* Rainbow button color tokens */
--color-1: 0 100% 63%;
--color-2: 270 100% 63%;
--color-3: 210 100% 63%;
--color-4: 195 100% 63%;
--color-5: 90 100% 63%;
```

- [ ] **Step 6: Commit**

```bash
cd ..
git add client/components/ui/rainbow-button.tsx client/package.json client/package-lock.json client/app/globals.css
git commit -m "feat: install react-icons and MagicUI rainbow-button"
```

---

## Task 2: Create ZaloIcon Component

**Files:**
- Create: `client/lib/icons.tsx`

- [ ] **Step 1: Create the file**

Create `client/lib/icons.tsx` with the following content:

```tsx
export function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Zalo"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.4 16.5H7.1a.6.6 0 0 1-.6-.6v-.35l7.65-8.05H7.4a.6.6 0 0 1-.6-.6V6.6c0-.33.27-.6.6-.6h9.9c.33 0 .6.27.6.6v.5l-7.55 7.9H17.4c.33 0 .6.27.6.6v.8c0 .33-.27.6-.6.6z" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify build compiles**

```bash
cd client
npx tsc --noEmit
```

Expected: no errors related to `lib/icons.tsx`.

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/lib/icons.tsx
git commit -m "feat: add ZaloIcon SVG component"
```

---

## Task 3: Update Product Icon Types and Assignments

**Files:**
- Modify: `client/lib/products.ts`

- [ ] **Step 1: Update lib/products.ts**

Replace the entire file content with the following (all other product data stays the same — only the import block, the `icon` field type, and three icon values change):

```ts
import React from "react";
import { Rocket } from "lucide-react";
import { FaWordpress, FaFacebook } from "react-icons/fa";
import { ZaloIcon } from "@/lib/icons";

export interface ProductFeatureGroup {
  groupTitle: string;
  features: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "violet" | "cyan" | "blue" | "indigo";
  link?: string;
  badge?: string;
  problems: string[];
  featureGroups: ProductFeatureGroup[];
}

export const products: Product[] = [
  {
    id: "nawa-deploy",
    slug: "nawa-deploy",
    name: "Nawa Deploy",
    tagline: "Đưa website lên internet trong vài phút",
    description:
      "Rút ngắn thời gian đưa website lên internet. Giúp chỉnh sửa và vận hành website đơn giản hơn. Hỗ trợ website sẵn sàng thu khách hàng và thanh toán nhanh hơn.",
    icon: Rocket,
    color: "violet",
    link: "https://websiteviet.site/admin/",
    badge: "New",
    problems: [
      "Rút ngắn thời gian đưa website lên internet",
      "Giúp chỉnh sửa và vận hành website đơn giản hơn",
      "Hỗ trợ website sẵn sàng thu khách hàng và thanh toán nhanh hơn",
    ],
    featureGroups: [
      {
        groupTitle: "Đưa Website Lên Internet Nhanh Chóng",
        features: [
          "Đăng tải website lên internet chỉ với file có sẵn",
          "Không cần thao tác phức tạp hay quy trình nhiều bước",
          "Phù hợp cho landing page, website AI, sales page",
        ],
      },
      {
        groupTitle: "Chỉnh Sửa Thông Tin Hiển Thị & SEO",
        features: [
          "Dễ dàng chỉnh sửa các thông tin cơ bản giúp website hiển thị tốt hơn trên Google",
          "Cập nhật nội dung cần thiết ngay sau khi website hoạt động",
        ],
      },
      {
        groupTitle: "Quản Lý Nội Dung Linh Hoạt",
        features: [
          "Chỉnh sửa trực tiếp — thay đổi từng phần nội dung theo nhu cầu",
          "Chỉnh sửa theo dữ liệu liên kết — cập nhật nhiều nội dung cùng lúc",
        ],
      },
      {
        groupTitle: "Hỗ Trợ Thu Dữ Liệu & Thanh Toán",
        features: [
          "Kết nối form với Google Sheet để nhận thông tin khách hàng tự động",
          "Tích hợp thanh toán SePay để xây dựng quy trình thanh toán nhanh",
        ],
      },
    ],
  },
  {
    id: "nawa-seo",
    slug: "nawa-seo",
    name: "Nawa SEO",
    tagline: "Sản xuất SEO Content với AI cực nhanh",
    description:
      "Giảm thời gian sản xuất content SEO. Hỗ trợ từ outline, viết bài, tạo hình đến xuất bản. Linh hoạt theo chiến lược nội dung và thương hiệu.",
    icon: FaWordpress,
    color: "cyan",
    link: "https://seo.nawasoft.vn/",
    badge: "AI",
    problems: [
      "Giảm thời gian sản xuất content SEO",
      "Hỗ trợ từ outline, viết bài, tạo hình đến xuất bản",
      "Linh hoạt theo chiến lược nội dung và thương hiệu",
    ],
    featureGroups: [
      {
        groupTitle: "Tạo & Xây dựng SEO Content",
        features: [
          "Tạo content chuẩn SEO với thông tin đầu vào đơn giản từ keyword",
          "AI hỗ trợ xây dựng outline tự động",
          "Cho phép tự nhập outline riêng theo chiến lược nội dung",
        ],
      },
      {
        groupTitle: "Sản xuất Hình ảnh cho Bài viết",
        features: [
          "AI Generate — AI tự tạo hình ảnh phù hợp với nội dung bài viết",
          "Search Web — tìm kiếm và sử dụng hình ảnh từ web",
        ],
      },
      {
        groupTitle: "Kết nối & Xuất bản Nội dung",
        features: [
          "Kết nối trực tiếp với WordPress",
          "Publish bài viết lên website trong cùng một quy trình",
          "Giảm thao tác copy-paste và quản lý nội dung thủ công",
        ],
      },
    ],
  },
  {
    id: "nawa-facebook",
    slug: "nawa-facebook",
    name: "Nawa Facebook",
    tagline: "Tự động hóa Facebook Marketing với AI",
    description:
      "Tự động hóa hoạt động đăng bài và tương tác. Hỗ trợ tìm đúng cộng đồng hoặc nhóm mục tiêu. Giúp mở rộng độ phủ nội dung và tiết kiệm thời gian vận hành.",
    icon: FaFacebook,
    color: "blue",
    badge: "Hot",
    problems: [
      "Tự động hóa hoạt động đăng bài và tương tác",
      "Hỗ trợ tìm đúng cộng đồng hoặc nhóm mục tiêu",
      "Giúp mở rộng độ phủ nội dung và tiết kiệm thời gian vận hành",
    ],
    featureGroups: [
      {
        groupTitle: "Auto Gửi Tin Nhắn & Kết Bạn",
        features: [
          "Gửi tin nhắn hàng loạt kèm hình ảnh hoặc video theo danh sách số điện thoại",
          "Tự động gửi lời mời kết bạn với tỷ lệ duyệt cao",
        ],
      },
      {
        groupTitle: "Công Nghệ Groq AI Chống Spam",
        features: [
          "AI tự động viết lại (Spin) nội dung tin nhắn cho từng người nhận",
          "Giúp đa dạng hóa nội dung và hạn chế bị bộ lọc spam nhận diện",
        ],
      },
      {
        groupTitle: "Quản Lý Nhóm & Thành Viên",
        features: [
          "Quét toàn bộ thành viên trong nhóm",
          "Tự động tạo nhóm mới và kéo thành viên",
          "Gửi tin nhắn hàng loạt tới các nhóm đã tham gia",
        ],
      },
    ],
  },
  {
    id: "nawa-zalo",
    slug: "nawa-zalo",
    name: "Nawa Zalo",
    tagline: "Tự động hóa Zalo Marketing toàn diện",
    description:
      "Tự động hóa quy trình tiếp cận và chăm sóc khách hàng. Giảm thao tác lặp lại trong nhắn tin, kết bạn và quản lý nhóm.",
    icon: ZaloIcon,
    color: "indigo",
    badge: "Hot",
    problems: [
      "Tự động hóa quy trình tiếp cận và chăm sóc khách hàng",
      "Giảm thao tác lặp lại trong nhắn tin, kết bạn và quản lý nhóm",
      "Hỗ trợ xử lý lượng khách lớn hơn trong cùng khoảng thời gian",
    ],
    featureGroups: [
      {
        groupTitle: "Auto Post Hàng Loạt",
        features: [
          "Tự động đăng bài lên nhiều group và tường cá nhân với tốc độ cao",
          "Hỗ trợ đăng kèm nhiều hình ảnh và video",
        ],
      },
      {
        groupTitle: "Công Nghệ Groq AI Chống Spam",
        features: [
          "Tích hợp AI hỗ trợ viết lại (Spin Content) nội dung bài viết",
          "Giúp nội dung đa dạng và hạn chế trùng lặp khi triển khai số lượng lớn",
        ],
      },
      {
        groupTitle: "Auto Join / Leave Group & Quét Khách Hàng",
        features: [
          "Tìm kiếm nhóm theo từ khóa và số lượng thành viên",
          "Tự động tham gia các nhóm mục tiêu",
          "Hỗ trợ rời khỏi các nhóm chờ duyệt quá lâu",
        ],
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const productColorMap: Record<
  Product["color"],
  {
    text: string;
    bg: string;
    border: string;
    glow: string;
    hoverText: string;
    hoverBg: string;
    topBar: string;
    glowColor: string;
  }
> = {
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    glow: "shadow-violet-500/20",
    hoverText: "group-hover:text-violet-400",
    hoverBg: "group-hover:bg-violet-500/15",
    topBar: "from-violet-500 to-purple-500",
    glowColor: "oklch(0.49 0.27 293 / 0.12)",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/20",
    hoverText: "group-hover:text-cyan-400",
    hoverBg: "group-hover:bg-cyan-500/15",
    topBar: "from-cyan-400 to-teal-500",
    glowColor: "oklch(0.85 0.18 195 / 0.12)",
  },
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/20",
    hoverText: "group-hover:text-blue-400",
    hoverBg: "group-hover:bg-blue-500/15",
    topBar: "from-blue-400 to-blue-600",
    glowColor: "oklch(0.55 0.22 220 / 0.12)",
  },
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    glow: "shadow-indigo-500/20",
    hoverText: "group-hover:text-indigo-400",
    hoverBg: "group-hover:bg-indigo-500/15",
    topBar: "from-indigo-400 to-indigo-600",
    glowColor: "oklch(0.52 0.24 264 / 0.12)",
  },
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd client
npx tsc --noEmit
```

Expected: no errors. If you see `Type 'typeof FaWordpress' is not assignable to type 'ComponentType<{className?: string}>'` — this means react-icons uses a slightly different prop shape. Fix by widening the type:

```ts
icon: React.ComponentType<{ className?: string; size?: number | string }>;
```

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/lib/products.ts
git commit -m "feat: update product icons — WordPress, Facebook, Zalo brand icons"
```

---

## Task 4: RainbowButton in CtaSection

**Files:**
- Modify: `client/app/_components/CtaSection.tsx`

- [ ] **Step 1: Update CtaSection.tsx**

Replace the file with:

```tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function CtaSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden py-24">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-violet-600/10 via-transparent to-cyan-500/10" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.49 0.27 293 / 0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-4 text-center">
        <BlurFade delay={0} inView>
          <h2 className="mb-4 text-3xl font-extrabold md:text-5xl">
            Sẵn sàng tăng trưởng với{" "}
            <span className="gradient-text">AI Marketing?</span>
          </h2>
        </BlurFade>

        <BlurFade delay={0.1} inView>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Hơn 500 doanh nghiệp Việt Nam đang dùng NawaSoft để tự động hóa
            marketing và tiết kiệm 80% thời gian.
          </p>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <RainbowButton onClick={() => router.push("/contact")}>
              Dùng thử miễn phí
            </RainbowButton>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-violet-500/40 px-8"
              onClick={() => router.push("/#products")}
            >
              Xem sản phẩm
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd client
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/app/_components/CtaSection.tsx
git commit -m "feat: replace CtaSection primary CTA with RainbowButton"
```

---

## Task 5: "Liên hệ" Button in ProductCard

**Files:**
- Modify: `client/components/shared/ProductCard.tsx`

- [ ] **Step 1: Update ProductCard.tsx**

Replace the file with:

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { type Product, productColorMap } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const Icon = product.icon;
  const colors = productColorMap[product.color];
  const router = useRouter();

  return (
    <Link
      href={`/${product.slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border/50 bg-card",
        "overflow-hidden transition-all duration-300",
        "hover:-translate-y-2 hover:shadow-2xl hover:border-border"
      )}
    >
      {/* Colored top accent strip */}
      <div className={cn("h-0.5 w-full bg-linear-to-r", colors.topBar)} />

      {/* Radial glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 0% 0%, ${colors.glowColor} 0%, transparent 100%)`,
        }}
      />

      {/* BorderBeam */}
      <BorderBeam
        size={220}
        duration={10}
        className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-col flex-1 p-6">
        {/* Icon + Badge */}
        <div className="mb-5 flex items-start justify-between">
          <div
            className={cn(
              "rounded-2xl p-3 transition-all duration-300",
              colors.bg,
              colors.hoverBg,
              "group-hover:scale-110 group-hover:shadow-lg"
            )}
          >
            <Icon className={cn("h-6 w-6", colors.text)} />
          </div>
          {product.badge && (
            <Badge
              variant="secondary"
              className="text-xs font-semibold tracking-wide"
            >
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Name */}
        <h3
          className={cn(
            "mb-1.5 text-lg font-bold transition-colors duration-300",
            colors.hoverText
          )}
        >
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
          {product.tagline}
        </p>

        {/* Problems list */}
        <ul className="mb-6 flex-1 space-y-2.5">
          {product.problems.map((problem) => (
            <li key={problem} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2
                className={cn("mt-0.5 h-4 w-4 shrink-0", colors.text)}
              />
              <span className="text-muted-foreground leading-relaxed">
                {problem}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA row */}
        <div className="flex items-center justify-between gap-2">
          <div
            className={cn(
              "flex items-center gap-1.5 text-sm font-semibold",
              "text-muted-foreground transition-colors duration-300",
              colors.hoverText
            )}
          >
            Khám phá {product.name}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>

          <RainbowButton
            className="h-8 rounded-full px-3 text-xs"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/contact?product=${product.slug}`);
            }}
          >
            Liên hệ
          </RainbowButton>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd client
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/components/shared/ProductCard.tsx
git commit -m "feat: add Liên hệ RainbowButton to each ProductCard"
```

---

## Task 6: FloatingContactButton Component

**Files:**
- Create: `client/components/shared/FloatingContactButton.tsx`

- [ ] **Step 1: Create FloatingContactButton.tsx**

```tsx
"use client";

import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function FloatingContactButton() {
  const router = useRouter();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <RainbowButton
        className="rounded-full shadow-2xl gap-2"
        onClick={() => router.push("/contact")}
      >
        <MessageCircle className="h-4 w-4" />
        Liên hệ
      </RainbowButton>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd client
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/components/shared/FloatingContactButton.tsx
git commit -m "feat: create FloatingContactButton component"
```

---

## Task 7: Mount FloatingContactButton in Layout

**Files:**
- Modify: `client/app/layout.tsx`

- [ ] **Step 1: Update layout.tsx**

Add the import and mount the component after `<Footer />`:

```tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { FloatingContactButton } from "@/components/shared/FloatingContactButton";

const font = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NawaSoft – Hệ Sinh Thái AI Marketing Toàn Diện",
  description:
    "Nawa Deploy, Nawa SEO, Nawa Facebook, Nawa Zalo — bộ 4 công cụ AI chuyên biệt giúp doanh nghiệp Việt tự động hóa marketing.",
  keywords: "AI Marketing, Nawa SEO, Nawa Deploy, Nawa Facebook, Nawa Zalo, NawaSoft",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning className={font.variable}>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContactButton />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd client
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd ..
git add client/app/layout.tsx
git commit -m "feat: mount FloatingContactButton in root layout"
```

---

## Task 8: Build Verification

- [ ] **Step 1: Run full Next.js build**

```bash
cd client
npm run build
```

Expected: `✓ Compiled successfully` with no errors. If there are errors:
- Missing CSS variables for rainbow animation → add to `:root` in `globals.css` (see Task 1 Step 5)
- `RainbowButton` type errors → check the generated API in `components/ui/rainbow-button.tsx` and adjust `className` overrides accordingly
- react-icons type error on `icon` field → widen type to `React.ComponentType<{ className?: string; size?: number | string }>`

- [ ] **Step 2: Start dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- [ ] Product cards show WordPress / Facebook / Zalo icons (Nawa Deploy keeps Rocket)
- [ ] Each card has a "Liên hệ" RainbowButton in the bottom-right of the CTA row
- [ ] Clicking "Liên hệ" on a card navigates to `/contact?product=<slug>` without triggering the card link
- [ ] CtaSection "Dùng thử miễn phí" is now a RainbowButton with rainbow animation
- [ ] Floating "Liên hệ" button is visible bottom-right on all pages
- [ ] Floating button does not overlap Toaster (both are bottom-right — if they collide, adjust Toaster to `position="bottom-left"` in layout.tsx)

- [ ] **Step 3: Fix Toaster collision if needed**

If the FloatingContactButton overlaps the Toaster toast notifications, update `layout.tsx`:

```tsx
<Toaster richColors position="bottom-left" />
```

- [ ] **Step 4: Final commit**

```bash
cd ..
git add -A
git commit -m "feat: complete RainbowButton, brand icons, and FloatingContactButton integration"
```
