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
  const router = useRouter();
  const Icon = product.icon;
  const colors = productColorMap[product.color];

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

      {/* Radial glow overlay — pointer-events-none, z-0, fades in on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 0% 0%, ${colors.glowColor} 0%, transparent 100%)`,
        }}
      />

      {/* BorderBeam — z-0, hidden until hover. Content (z-10) always renders above */}
      <BorderBeam
        size={220}
        duration={10}
        className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* ── Card content — always above beam and glow ── */}
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
            className="h-8 rounded-full px-3 text-md "
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
