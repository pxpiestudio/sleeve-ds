import type { Metadata } from "next";

import { PageHeader, DocSection, Code, Prose } from "@/components/docs/doc-bits";
import { DoDont } from "@/components/docs/do-dont";
import { CodeBlock } from "@/components/docs/code-block";
import { MotionPlayground } from "@/components/docs/motion-demo";

export const metadata: Metadata = {
  title: "Motion",
  description:
    "One easing curve, four duration bands, and reduced-motion behavior in the Sleeve System.",
};

export default function MotionPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Foundations"
        title="Motion"
        lead={
          <>
            One easing curve — <Code>cubic-bezier(0.22, 1, 0.36, 1)</Code>,
            exposed as <Code>--ease</Code> — covers every UI transition. It
            starts fast and settles softly, which reads as responsiveness
            without bounce.
          </>
        }
      />

      <DocSection
        id="durations"
        title="Duration bands"
        lead="Choose duration by the size of the thing moving, not by taste. Small state changes are near-instant; the only half-second transitions are full-surface."
      >
        <MotionPlayground />
      </DocSection>

      <DocSection
        id="reduced-motion"
        title="Reduced motion"
        lead="The base layer collapses all animation and transition durations to 0.01ms under prefers-reduced-motion: reduce. Enter animations additionally gate on the no-preference query, so they never run for users who opted out."
      >
        <CodeBlock
          lang="css"
          code={`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}
        />
        <Prose>
          Because the kill-switch is global, components can declare motion
          freely — nothing extra to remember per component. Only gate on the{" "}
          <Code>no-preference</Code> query when an animation would still cause
          layout movement at 0.01ms (e.g. keyframed entrances).
        </Prose>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <DoDont
          dos={[
            <>Always ease with <Code>var(--ease)</Code> — a second curve makes the UI feel inconsistent in ways users can&apos;t name.</>,
            "Transition specific properties (transform, box-shadow, background-color) rather than all.",
            "Prefer transform-based movement (translate/scale) — it composites without layout work.",
          ]}
          donts={[
            "Don't exceed ~0.5s for anything; slower reads as lag, not polish.",
            "Don't animate width/height/top/left when a transform can express the same motion.",
            "Don't add springy or bouncy curves — settle-soft is the system's personality.",
          ]}
        />
      </DocSection>
    </div>
  );
}
