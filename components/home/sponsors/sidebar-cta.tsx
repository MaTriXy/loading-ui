"use client";

import { ThemedImage } from "@/components/common/themed-image";
import { TIER_TITLES } from "@/components/home/sponsors/sponsors";
import { SPONSORS, SponsorTier } from "@/lib/sponsors";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const SponsorsSidebarCta = () => {
  return (
    <div className="group bg-surface text-surface-foreground relative flex flex-col gap-4 border-y px-6 py-5 text-sm">
      <div className="flex items-baseline justify-between">
        <span className="font-medium leading-tight tracking-tight">
          Sponsors
        </span>

        <Link
          href="/sponsors"
          className="inline-flex items-center gap-1 opacity-80 hover:opacity-100 text-primary text-xs font-medium"
        >
          Become a sponsor
          <ExternalLink className="size-3 shrink-0 opacity-80" aria-hidden />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {Object.entries(TIER_TITLES).map(([tier, title]) => {
          const sponsors = SPONSORS[tier as SponsorTier];

          return (
            sponsors.length > 0 && (
              <div key={tier} className="flex flex-col gap-1.5">
                <span className="text-xs uppercase text-muted-foreground/50 font-medium tracking-wide">
                  {title}
                </span>

                <ul
                  className={cn("grid gap-1", {
                    "grid-cols-1": tier === "diamond",
                    "grid-cols-2": tier === "gold",
                    "grid-cols-3": tier === "silver",
                  })}
                >
                  {sponsors.map(sponsor => (
                    <li key={sponsor.id}>
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group/sponsor bg-background/25 h-12 flex items-center justify-center hover:bg-accent border rounded-md transition-colors"
                        onClick={() =>
                          track("sponsor_clicked", {
                            sponsor: sponsor.name,
                            source: "sidebar",
                          })
                        }
                      >
                        {"sm" in sponsor.image ? (
                          <sponsor.image.sm className="h-full py-2 px-3" />
                        ) : (
                          <div className="w-full h-full px-4 flex items-center justify-center">
                            <ThemedImage
                              light={sponsor.image.light}
                              dark={sponsor.image.dark}
                              alt={sponsor.name}
                              width={332}
                              height={122}
                              className="w-full object-contain"
                            />
                          </div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          );
        })}
      </div>

      <p className="text-[11px] text-center text-muted-foreground">
        45k+ users monthly · Limited spots
      </p>
    </div>
  );
};
