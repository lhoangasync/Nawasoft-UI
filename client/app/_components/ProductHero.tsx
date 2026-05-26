"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { type Product, productColorMap } from "@/lib/products";

export function ProductHero({ product }: { product: Product }) {
  const Icon = product.icon;
  const colors = productColorMap[product.color];

  return (
    <section className="relative overflow-hidden py-28 grid-bg">
      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, oklch(0.49 0.27 293 / 0.2) 0%, transparent 70%)`,
        }}
      />

      <div className="relative container mx-auto px-4 text-center">
        {/* Icon */}
        <BlurFade delay={0} inView>
          <div className="mb-6 inline-flex flex-col items-center gap-3">
            <div className={`rounded-2xl p-4 ${colors.bg}`}>
              <Icon className={`h-10 w-10 ${colors.text}`} />
            </div>
            {product.badge && (
              <Badge variant="secondary">{product.badge}</Badge>
            )}
          </div>
        </BlurFade>

        {/* Name */}
        <BlurFade delay={0.1} inView>
          <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">
            <AnimatedGradientText>{product.name}</AnimatedGradientText>
          </h1>
        </BlurFade>

        {/* Description */}
        <BlurFade delay={0.2} inView>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
            {product.description}
          </p>
        </BlurFade>

        {/* Problems */}
        <BlurFade delay={0.3} inView>
          <ul className="mx-auto mb-10 max-w-lg space-y-2 text-left">
            {product.problems.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <CheckCircle2
                  className={`mt-0.5 h-4 w-4 shrink-0 ${colors.text}`}
                />
                <span className="text-muted-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </BlurFade>

        {/* CTAs */}
        <BlurFade delay={0.4} inView>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {product.link && (
              <Button
                asChild
                size="lg"
                className="rounded-full bg-linear-to-r from-violet-600 to-cyan-500 px-8 text-white hover:opacity-90"
              >
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  Dùng thử ngay →
                </a>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-violet-500/40 px-8"
            >
              <Link href={`/contact?product=${product.slug}`}>
                Liên hệ tư vấn
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
