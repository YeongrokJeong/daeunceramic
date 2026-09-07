import Link from "next/link";
import WorkImage from "@/components/WorkImage";
import { formatPrice, type Work } from "@/lib/works";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group block rounded-2xl overflow-hidden bg-[var(--color-card)] border border-[var(--color-line)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] cursor-pointer"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <WorkImage
          paletteIndex={work.paletteIndex}
          title={work.title}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        {work.soldOut && (
          <span className="absolute top-3 left-3 rounded-full bg-[var(--color-ink)] text-[var(--color-bg)] text-xs px-3 py-1 tracking-wide">
            예약 마감
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg leading-snug">{work.title}</h3>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)] line-clamp-2">
          {work.shortDescription}
        </p>
        <p className="mt-3 text-base font-medium">{formatPrice(work.price)}</p>
      </div>
    </Link>
  );
}
