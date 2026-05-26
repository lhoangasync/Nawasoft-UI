"use client";

import { CheckCircle2 } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { type Product, productColorMap } from "@/lib/products";

export function ProductFeatures({ product }: { product: Product }) {
  const colors = productColorMap[product.color];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-16">
          {product.featureGroups.map((group, i) => (
            <BlurFade key={group.groupTitle} delay={0.1 + i * 0.1} inView>
              <div>
                <h2 className="mb-6 text-2xl font-bold">{group.groupTitle}</h2>
                <ul className="space-y-3">
                  {group.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/50 p-4"
                    >
                      <CheckCircle2
                        className={`mt-0.5 h-5 w-5 shrink-0 ${colors.text}`}
                      />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
