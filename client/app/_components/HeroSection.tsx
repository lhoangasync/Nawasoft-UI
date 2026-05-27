"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden grid-bg">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.49 0.27 293 / 0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <BlurFade delay={0} inView>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400">
            🚀 Hệ Sinh Thái AI Marketing #1 Việt Nam
          </div>
        </BlurFade>

        {/* Headline */}
        <BlurFade delay={0.1} inView>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Tăng Trưởng Vượt Bậc Với{" "}
            <AnimatedGradientText>AI Marketing</AnimatedGradientText>
          </h1>
        </BlurFade>

        {/* Subtext */}
        <BlurFade delay={0.2} inView>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Bộ 4 công cụ AI chuyên biệt giúp doanh nghiệp Việt tự động hóa
            marketing, tăng doanh thu và tiết kiệm thời gian.
          </p>
        </BlurFade>

        {/* CTAs */}
        <BlurFade delay={0.3} inView>
          <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
            <RainbowButton asChild size="lg">
              <Link href="#products">Xem sản phẩm</Link>
            </RainbowButton>
            <RainbowButton asChild size="lg">
              <Link href="/contact">Liên hệ tư vấn</Link>
            </RainbowButton>
          </div>
        </BlurFade>

        {/* App preview window */}
        <BlurFade delay={0.4} inView>
          <div className="glass-card mx-auto max-w-2xl rounded-2xl p-6">
            {/* Browser chrome */}
            <div className="mb-4 flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <div className="ml-3 h-5 flex-1 rounded-md bg-muted/50" />
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-violet-500/10 p-4 text-center">
                <div className="flex items-baseline justify-center gap-0.5">
                  <NumberTicker
                    value={500}
                    className="text-2xl font-extrabold text-violet-400"
                  />
                  <span className="text-2xl font-extrabold text-violet-400">
                    +
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Khách hàng</p>
              </div>
              <div className="rounded-xl bg-cyan-500/10 p-4 text-center">
                <NumberTicker
                  value={4}
                  className="text-2xl font-extrabold text-cyan-400"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Sản phẩm AI
                </p>
              </div>
              <div className="rounded-xl bg-green-500/10 p-4 text-center">
                <div className="flex items-baseline justify-center gap-0.5">
                  <NumberTicker
                    value={80}
                    className="text-2xl font-extrabold text-green-400"
                  />
                  <span className="text-2xl font-extrabold text-green-400">
                    %
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Tiết kiệm</p>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
