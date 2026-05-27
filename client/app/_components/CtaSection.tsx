"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function CtaSection() {
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
            <RainbowButton asChild size="lg">
              <Link href="/contact">Dùng thử miễn phí</Link>
            </RainbowButton>
            <RainbowButton asChild size="lg">
              <Link href="#products">Xem sản phẩm</Link>
            </RainbowButton>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
