import * as React from "react";

import { Surface } from "@/components/ui/surface";
import { SectionShell } from "@/components/ui/section-shell";
import { landingContent, type ModuleCard } from "@/lib/landing-content";

const spanClass: Record<ModuleCard["span"], string> = {
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  regular: "",
};

export function Modules() {
  const { id, heading, modules } = landingContent.modules;
  const cards = modules ?? [];

  return (
    <SectionShell
      id={id}
      labelledBy={`${id}-heading`}
      innerClassName="mx-auto max-w-6xl"
    >
      {heading ? (
        <h2 id={`${id}-heading`} className="text-h2 text-text">
          {heading.en}
        </h2>
      ) : null}

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:auto-rows-fr">
        {cards.map((card) => (
          <Surface
            as="article"
            key={card.name.en}
            elevation="md"
            className={`flex flex-col gap-3 p-6 ${spanClass[card.span]}`.trim()}
          >
            <h3 className="text-h3 text-text">{card.name.en}</h3>
            <p className="text-body text-text-muted">{card.blurb.en}</p>
          </Surface>
        ))}
      </div>
    </SectionShell>
  );
}

export default Modules;
