import { landingContent } from "@/lib/landing-content";
import { SectionShell } from "@/components/ui/section-shell";

export function Differentiator() {
  const { differentiator } = landingContent;
  const [stance, signal] = differentiator.body ?? [];

  const signals = [
    { label: "Scale", tone: "var(--color-success)" },
    { label: "Adapt", tone: "var(--color-data)" },
    { label: "Stop", tone: "var(--color-accent)" },
  ];

  return (
    <SectionShell
      id={differentiator.id}
      labelledBy={`${differentiator.id}-heading`}
      className="relative bg-[var(--color-bg)] text-[var(--color-text)]"
      innerClassName="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2"
    >
      <div className="flex flex-col">
        {differentiator.heading ? (
          <h2
            id={`${differentiator.id}-heading`}
            className="text-h2 text-[var(--color-text)]"
          >
            {differentiator.heading.en}
          </h2>
        ) : null}

        {stance ? (
          <p className="text-body mt-6 text-[var(--color-text-muted)]">
            {stance.en}
          </p>
        ) : null}

        {signal ? (
          <p className="text-body mt-4 text-[var(--color-text-muted)]">
            {signal.en}
          </p>
        ) : null}

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {signals.map(({ label, tone }) => (
            <li key={label} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: tone }}
              />
              <span className="text-mono text-[var(--color-text)]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <figure className="m-0">
        <svg
          role="img"
          aria-label="A data trend in teal that rises then dips below the Dawn Gold horizon line — the assumption baseline that triggers a scale, adapt, or stop signal."
          viewBox="0 0 320 180"
          className="h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M0 60 L53 50 L107 78 L160 44 L213 96 L267 120 L320 150 L320 180 L0 180 Z"
            fill="var(--color-data)"
            opacity="0.12"
          />
          <polyline
            points="0,60 53,50 107,78 160,44 213,96 267,120 320,150"
            fill="none"
            stroke="var(--color-data)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[
            [0, 60],
            [53, 50],
            [107, 78],
            [160, 44],
            [213, 96],
            [267, 120],
            [320, 150],
          ].map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="3"
              fill="var(--color-data)"
            />
          ))}
          <line
            x1="0"
            y1="120"
            x2="320"
            y2="120"
            stroke="var(--color-accent)"
            strokeWidth="2"
          />
        </svg>
        <figcaption className="text-small mt-4 text-[var(--color-text-muted)]">
          The horizon line is your assumption. When the live data crosses it,
          Ciel surfaces the signal — your data becomes the brand.
        </figcaption>
      </figure>
    </SectionShell>
  );
}

export default Differentiator;
