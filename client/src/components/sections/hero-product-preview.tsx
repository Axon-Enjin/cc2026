import Image from "next/image";

import uiApplication from "@/assets/brand/ciel-ui-application.svg";

/**
 * Hero product preview — canonical brand board asset (server component).
 *
 * Uses brand/ciel-ui-application.svg (copied to client assets for bundling).
 */
export function HeroProductPreview() {
  return (
    <figure className="m-0 flex w-full max-h-[min(420px,48dvh)] items-center justify-center overflow-hidden rounded-surface shadow-lg md:max-h-[min(560px,calc(100dvh-var(--nav-height)-10rem))]">
      <Image
        src={uiApplication}
        alt="Ciel product application board: ToC Studio for Cebu Youth Jobs with grounded provenance chips, an Adapt signal when attendance drops below assumption, and a Dawn Gold horizon on the attendance chart."
        className="h-auto max-h-full w-full object-contain"
        priority
      />
    </figure>
  );
}

export default HeroProductPreview;
