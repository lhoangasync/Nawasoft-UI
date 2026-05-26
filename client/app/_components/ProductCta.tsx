"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { type Product } from "@/lib/products";

export function ProductCta({ product }: { product: Product }) {
  return (
    <section className="border-t border-border/30 bg-muted/20 py-20">
      <div className="container mx-auto px-4 text-center">
        <BlurFade delay={0} inView>
          <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">
            Bắt đầu với{" "}
            <span className="gradient-text">{product.name}</span> ngay hôm nay
          </h2>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-linear-to-r from-violet-600 to-cyan-500 px-8 text-white hover:opacity-90"
          >
            <Link href={`/contact?product=${product.slug}`}>
              Liên hệ tư vấn →
            </Link>
          </Button>
        </BlurFade>
      </div>
    </section>
  );
}
