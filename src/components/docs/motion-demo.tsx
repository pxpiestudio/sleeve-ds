"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

/**
 * Live tracers for the Motion foundations page — the same --ease curve and
 * duration bands as page.tsx's static numbers, but shown moving. Stateful
 * (remount-to-replay), so it lives here behind "use client" while the page
 * itself stays a Server Component.
 */

/** Logical plot area — the coordinate space the curve math is defined in. */
const CHART_W = 220;
const CHART_H = 120;
/** Padding around the plot area inside the SVG so control-point handles and
 *  the tracer dot's glow have room; without it, points that sit exactly on
 *  y=0 (both bezier control points do) get clipped by the SVG's own
 *  default overflow: hidden. */
const PAD = 14;
const SVG_W = CHART_W + PAD * 2;
const SVG_H = CHART_H + PAD * 2;
const DOT = 11;
const CURVE_MS = 900;

/** cubic-bezier(0.22, 1, 0.36, 1) control points, in padded chart pixel
 *  space (y flipped: PAD = top = progress 1, PAD+CHART_H = bottom = progress 0). */
const P1 = { x: PAD + 0.22 * CHART_W, y: PAD + (CHART_H - 1 * CHART_H) };
const P2 = { x: PAD + 0.36 * CHART_W, y: PAD + (CHART_H - 1 * CHART_H) };

const BANDS = [
  { label: "Micro (hover, focus)", spec: "0.12–0.2s var(--ease)", ms: 200 },
  { label: "Component (slide, expand)", spec: "0.25–0.35s var(--ease)", ms: 350 },
  { label: "Page transition (overlay)", spec: "0.45–0.52s var(--ease)", ms: 520 },
  { label: "Theme crossfade (bg/color)", spec: "0.5s var(--ease)", ms: 500 },
];

/** Rows play one at a time, in sequence, rather than all at once — each
 *  starts only after the previous one has finished (plus a short gap). */
const BAND_GAP_MS = 250;
const BAND_DELAYS = BANDS.reduce<number[]>((delays, band, i) => {
  delays.push(i === 0 ? 0 : delays[i - 1] + BANDS[i - 1].ms + BAND_GAP_MS);
  return delays;
}, []);

const BAND_TRACK_W = 140 - DOT;

type RowState = { runId: number; delay: number; status: "playing" | "done" };

const initialRows = (): RowState[] =>
  BANDS.map((_, i) => ({ runId: 0, delay: BAND_DELAYS[i], status: "playing" }));

export function MotionPlayground() {
  const [curveTick, setCurveTick] = React.useState(0);
  const [rows, setRows] = React.useState<RowState[]>(initialRows);

  function replayAll() {
    setCurveTick((t) => t + 1);
    setRows((rs) => rs.map((r, i) => ({ runId: r.runId + 1, delay: BAND_DELAYS[i], status: "playing" })));
  }

  function replayRow(i: number) {
    setRows((rs) =>
      rs.map((r, idx) => (idx === i ? { runId: r.runId + 1, delay: 0, status: "playing" } : r)),
    );
  }

  function markRowDone(i: number) {
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, status: "done" } : r)));
  }

  /** The fastest band (200ms, no delay) can finish before React hydrates and
   *  attaches its synthetic `onAnimationEnd` listener, so that event gets
   *  missed on first load. `Animation.finished` doesn't have that race — it
   *  resolves immediately if the animation already completed, or later if
   *  it's still running — so query it straight off the DOM node instead. */
  function watchRow(i: number) {
    return (el: HTMLSpanElement | null) => {
      if (!el) return;
      requestAnimationFrame(() => {
        el.getAnimations()[0]?.finished.then(() => markRowDone(i)).catch(() => {});
      });
    };
  }

  return (
    <div className="motion-demo">
      <div className="motion-demo-head">
        <span className="motion-demo-caption">
          The dot traces <code className="ds-code">var(--ease)</code> in real
          time — watch it start fast and settle soft.
        </span>
        <Button size="sm" variant="ghost" onClick={replayAll}>
          ↻ Replay
        </Button>
      </div>

      <div className="motion-curve" key={`curve-${curveTick}`}>
        <div
          className="motion-curve-chart"
          style={{ width: SVG_W, height: SVG_H }}
        >
          <svg
            width={SVG_W}
            height={SVG_H}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="motion-curve-svg"
            aria-hidden="true"
          >
            <line
              className="motion-axis"
              x1={PAD}
              y1={PAD + CHART_H}
              x2={PAD + CHART_W}
              y2={PAD + CHART_H}
            />
            <line className="motion-axis" x1={PAD} y1={PAD} x2={PAD} y2={PAD + CHART_H} />
            <line className="motion-handle" x1={PAD} y1={PAD + CHART_H} x2={P1.x} y2={P1.y} />
            <line
              className="motion-handle"
              x1={PAD + CHART_W}
              y1={PAD}
              x2={P2.x}
              y2={P2.y}
            />
            <circle className="motion-handle-dot" cx={P1.x} cy={P1.y} r={3} />
            <circle className="motion-handle-dot" cx={P2.x} cy={P2.y} r={3} />
            <path
              className="motion-curve-path"
              d={`M${PAD},${PAD + CHART_H} C${P1.x},${P1.y} ${P2.x},${P2.y} ${PAD + CHART_W},${PAD}`}
            />
          </svg>
          <div
            className="motion-curve-tracer-outer"
            style={
              {
                top: `${PAD + CHART_H}px`,
                left: `${PAD}px`,
                "--trace-w": `${CHART_W}px`,
                "--motion-dur": `${CURVE_MS}ms`,
              } as React.CSSProperties
            }
          >
            <div
              className="motion-curve-tracer-inner"
              style={
                {
                  "--trace-h": `${-CHART_H}px`,
                  "--motion-dur": `${CURVE_MS}ms`,
                } as React.CSSProperties
              }
            >
              <span
                className="motion-curve-dot"
                aria-hidden="true"
                style={{ width: DOT, height: DOT, transform: "translate(-50%, -50%)" }}
              />
            </div>
          </div>
        </div>

        <div className="motion-curve-legend">
          <span>
            time <strong>→</strong> progress, plotted against{" "}
            <strong>cubic-bezier(0.22, 1, 0.36, 1)</strong>
          </span>
          <span>
            Control points at <strong>(0.22, 1)</strong> and{" "}
            <strong>(0.36, 1)</strong> pull the curve to full progress early,
            then let it coast — no overshoot, no bounce.
          </span>
        </div>
      </div>

      <div className="motion-bands">
        {BANDS.map((b, i) => {
          const row = rows[i];
          return (
            <div className="motion-band-row" key={b.label}>
              <span className="motion-band-label">{b.label}</span>
              <div className="motion-band-track">
                <span
                  key={row.runId}
                  ref={watchRow(i)}
                  className="motion-band-dot"
                  style={
                    {
                      "--band-dur": `${b.ms}ms`,
                      "--band-delay": `${row.delay}ms`,
                      "--band-w": `${BAND_TRACK_W}px`,
                    } as React.CSSProperties
                  }
                />
              </div>
              <span className="motion-band-spec">{b.spec}</span>
              <Button
                size="icon"
                variant="quiet"
                className="motion-band-play"
                disabled={row.status === "playing"}
                onClick={() => replayRow(i)}
                aria-label={`${row.status === "done" ? "Replay" : "Play"} ${b.label} timing example`}
              >
                <span aria-hidden="true">{row.status === "done" ? "↻" : "▶"}</span>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
