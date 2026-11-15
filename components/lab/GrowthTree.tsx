"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Growth illustrations for the "Grow together" staircase, in a storybook flat style:
 * layered cloud-shaped foliage clumps (shade → base → light → highlight greens), a twisting shaded trunk,
 * and a grassy ground with yellow blades and a few grey rocks under every stage.
 *   kind 0 = an acorn (the seed)
 *   kind 1 = a sapling: a thin stem with alternating leaf pairs
 *   kind 2 = a small tree
 *   kind 3 = a big tree, bearing Hey Coco! badges as fruit
 * All share one viewBox (0 0 160 180, ground centred at y=170), so at the same height they keep relative sizes.
 * Every coordinate is computed deterministically (and rounded), so server and browser render identical SVG.
 *
 * Motion
 *  - `shown` on: parts grow in one after another (ground → trunk → canopy clumps bottom-up → fruit); off: they shrink away.
 *  - `active` (the selected stage): a springy squash-and-stretch, then a gentle sway; sapling leaves flutter and a
 *    tree's whole canopy rustles as one piece. Non-selected plants stay still. Reduced motion: no transitions, no idle motion.
 */
const LABELS = ["An acorn: the seed", "A sapling", "A small tree", "A big tree bearing Hey Coco! fruit"];

const C = {
  // foliage, darkest → brightest
  shade: "#1d4d2b",
  deep: "#2a6530",
  mid: "#4a8f2d",
  light: "#86b53a",
  hi: "#bccf3c",
  // trunk
  trunk: "#6e4b33",
  trunkDark: "#4a3222",
  trunkLight: "#8d6748",
  // ground
  grass: "#86b53a",
  grassDark: "#5b8f2c",
  blade: "#d8b52c",
  rock: "#a59e95",
  rockLight: "#c9c3ba",
  rockDark: "#837c73",
};

const r2 = (n: number) => Math.round(n * 100) / 100;

const SPRING = "transition-[transform,opacity] duration-[750ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] motion-reduce:transition-none";

/** Grows in from its base (or centre) with a delay when `on`; shrinks away when off. */
function P({ on, delay = 0, origin = "base", children }: { on: boolean; delay?: number; origin?: "base" | "center"; children: ReactNode }) {
  const style: CSSProperties = {
    transformBox: "fill-box",
    transformOrigin: origin === "base" ? "50% 100%" : "50% 50%",
    transform: `scale(${on ? 1 : 0})`,
    opacity: on ? 1 : 0,
    transitionDelay: on ? `${delay}ms` : "0ms",
  };
  return (
    <g className={SPRING} style={style}>
      {children}
    </g>
  );
}

/** Two-tone sapling leaf: base at (x,y), pointing along `angle` degrees. Flutters while the plant is active. */
function Leaf({ x, y, angle, l, w, active, delay = 0 }: { x: number; y: number; angle: number; l: number; w: number; active: boolean; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <g className={active ? "lab-flutter" : undefined} style={{ transformBox: "fill-box", transformOrigin: "0% 50%", animationDelay: `${delay}ms` }}>
        <path d={`M0 0 C${l * 0.28} ${-w} ${l * 0.72} ${-w * 0.95} ${l} 0 Z`} fill={C.light} />
        <path d={`M0 0 C${l * 0.28} ${w * 0.85} ${l * 0.72} ${w * 0.8} ${l} 0 Z`} fill={C.mid} />
      </g>
    </g>
  );
}

/** Grassy ground: a two-tone mound, yellow and green grass blades, and a few grey rocks. */
function Ground({ on, rx }: { on: boolean; rx: number }) {
  const ry = 4 + rx * 0.07;
  const count = Math.round(rx / 3.2);
  const blades = Array.from({ length: count }, (_, k) => {
    const t = count === 1 ? 0.5 : k / (count - 1);
    const x = 80 - rx * 0.86 + t * rx * 1.72;
    const h = 3 + ((k * 37) % 7) * 0.75;
    const lean = ((k * 53) % 5) - 2;
    return { x: r2(x), h: r2(h), lean, yellow: k % 3 === 1 };
  });
  const rocks: [number, number, number][] = [
    [80 - rx * 0.42, 170.6, Math.max(2.6, rx * 0.08)],
    [80 + rx * 0.5, 170.2, Math.max(2.2, rx * 0.07)],
    [80 + rx * 0.22, 171.6, Math.max(1.6, rx * 0.05)],
  ];
  return (
    <P on={on} origin="center">
      <ellipse cx="80" cy="171" rx={rx} ry={ry} fill={C.grassDark} />
      <ellipse cx="80" cy="169.8" rx={r2(rx * 0.95)} ry={r2(ry * 0.75)} fill={C.grass} />
      {blades.map((b) => (
        <path
          key={b.x}
          d={`M${b.x} 169.6 q${r2(b.lean * 0.3)} ${r2(-b.h * 0.55)} ${b.lean} ${-b.h}`}
          stroke={b.yellow ? C.blade : C.grassDark}
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {rocks.map(([x, y, r]) => (
        <g key={x}>
          <ellipse cx={r2(x)} cy={y} rx={r2(r * 1.35)} ry={r2(r * 0.85)} fill={C.rockDark} />
          <ellipse cx={r2(x - r * 0.15)} cy={r2(y - r * 0.15)} rx={r2(r * 1.15)} ry={r2(r * 0.65)} fill={C.rock} />
          <ellipse cx={r2(x - r * 0.45)} cy={r2(y - r * 0.38)} rx={r2(r * 0.45)} ry={r2(r * 0.22)} fill={C.rockLight} />
        </g>
      ))}
    </P>
  );
}

/** Wraps everything above the ground: springy pop + continuous sway while active. */
function Plant({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <g className={active ? "lab-plant-on" : undefined} style={{ transformOrigin: "80px 170px" }}>
      {children}
    </g>
  );
}

/* ───────── kind 0: acorn ───────── */
function Acorn({ on, active }: { on: boolean; active: boolean }) {
  const dots: [number, number][] = [
    [68, 136], [74, 133], [80, 132], [86, 133], [92, 136], [71, 140], [77, 138], [83, 138], [89, 140], [80, 141],
  ];
  return (
    <>
      <Ground on={on} rx={30} />
      <Plant active={active}>
        <P on={on} delay={200}>
          <path d="M67 141 C67 155 74 164 80 169 C86 164 93 155 93 141 Z" fill="#b67c45" />
          <path d="M67 141 C67 155 74 164 80 169 C76.5 161 73 152 73 141 Z" fill="#94612f" />
          <path d="M85.5 145 C87 151 86 157 82.5 162" stroke="#d9a066" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M63 142 C62 127 98 127 97 142 C91 145.5 69 145.5 63 142 Z" fill="#6b4a2e" />
          <path d="M63 142 C62.6 135 70 130 76 129 C70 133 67 137 67 143.6 C65.4 143.2 64.2 142.7 63 142Z" fill="#584027" />
          {dots.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.05" fill="#8a6542" />
          ))}
          <path d="M80 129 C80 124 81.5 121 85 119.5" stroke="#6b4a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
        </P>
      </Plant>
    </>
  );
}

/* ───────── kind 1: sapling ───────── */
function Sapling({ on, active }: { on: boolean; active: boolean }) {
  const pairs = [
    { y: 152, l: 21, w: 8 },
    { y: 134, l: 19, w: 7.4 },
    { y: 117, l: 16, w: 6.4 },
    { y: 101, l: 13, w: 5.4 },
  ];
  return (
    <>
      <Ground on={on} rx={38} />
      <Plant active={active}>
        <P on={on} delay={180}>
          <path d="M80 170 C80.6 146 79.2 116 80 84" stroke={C.trunk} strokeWidth="3.2" fill="none" strokeLinecap="round" />
        </P>
        {pairs.map((p, k) => (
          <P key={p.y} on={on} delay={360 + k * 110} origin="center">
            <Leaf x={80} y={p.y} angle={-158 + k * 4} l={p.l} w={p.w} active={active} delay={k * 140} />
            <Leaf x={80} y={p.y - 6} angle={-22 - k * 4} l={p.l} w={p.w} active={active} delay={k * 140 + 70} />
          </P>
        ))}
        <P on={on} delay={820} origin="center">
          <Leaf x={80} y={86} angle={-118} l={11} w={4.4} active={active} delay={60} />
          <Leaf x={80.6} y={86} angle={-64} l={12} w={4.6} active={active} delay={120} />
        </P>
      </Plant>
    </>
  );
}

/* ───────── storybook foliage clumps ───────── */

type ClumpSpec = [cx: number, cy: number, rx: number, ry: number];
type Dot = [number, number, number];

/**
 * One cloud-shaped clump, built from circles: scalloped bumps along the top and sides, softer bumps underneath,
 * and an ellipse core. Drawn in four layers: a dark shadow offset down-right, the base green, a lighter cap
 * shifted up, and a few yellow-green highlights near the top-left.
 */
function clumpShapes([cx, cy, rx, ry]: ClumpSpec) {
  const n = Math.max(4, Math.round(rx / 4.6));
  const top: Dot[] = [];
  for (let i = 0; i <= n; i++) {
    const a = Math.PI + (i / n) * Math.PI;
    const wob = 0.86 + (((i * 37) % 10) / 10) * 0.3;
    top.push([r2(cx + Math.cos(a) * rx * 0.8), r2(cy + Math.sin(a) * ry * 0.72), r2(ry * 0.6 * wob)]);
  }
  const bottom: Dot[] = [];
  for (let i = 1; i < n; i++) {
    const a = (i / n) * Math.PI;
    bottom.push([r2(cx + Math.cos(a) * rx * 0.74), r2(cy + Math.sin(a) * ry * 0.5), r2(ry * 0.5)]);
  }
  const cap: Dot[] = top.slice(1, -1).map(([x, y, r]) => [r2(x - 0.8), r2(y - ry * 0.18), r2(r * 0.74)]);
  const hi: Dot[] = top.slice(1, Math.min(4, top.length - 1)).map(([x, y, r]) => [r2(x - 1.2), r2(y - ry * 0.32), r2(r * 0.4)]);
  return { all: [...top, ...bottom], cap, hi, core: { cx, cy, rx: r2(rx * 0.86), ry: r2(ry * 0.72) } };
}

function Clump({ spec }: { spec: ClumpSpec }) {
  const s = clumpShapes(spec);
  const layer = (dots: Dot[], fill: string, dx = 0, dy = 0) =>
    dots.map(([x, y, r]) => <circle key={`${fill}-${x}-${y}`} cx={r2(x + dx)} cy={r2(y + dy)} r={r} fill={fill} />);
  return (
    <g>
      {/* shadow */}
      {layer(s.all, C.shade, 1.4, 2.6)}
      <ellipse cx={s.core.cx + 1.4} cy={s.core.cy + 2.6} rx={s.core.rx} ry={s.core.ry} fill={C.shade} />
      {/* base */}
      {layer(s.all, C.mid)}
      <ellipse cx={s.core.cx} cy={s.core.cy} rx={s.core.rx} ry={s.core.ry} fill={C.mid} />
      {/* light cap */}
      {layer(s.cap, C.light)}
      <ellipse cx={s.core.cx - 1} cy={r2(s.core.cy - spec[3] * 0.28)} rx={r2(s.core.rx * 0.78)} ry={r2(s.core.ry * 0.5)} fill={C.light} />
      {/* highlights */}
      {layer(s.hi, C.hi)}
    </g>
  );
}

/** A canopy: a dark mass behind for depth, then clumps (listed top → bottom) popping in bottom-up. */
function Canopy({ on, active, clumps, mass, baseDelay }: { on: boolean; active: boolean; clumps: ClumpSpec[]; mass: Dot[]; baseDelay: number }) {
  return (
    // The whole canopy rustles as one piece, so clumps never drift apart.
    <g className={active ? "lab-rustle" : undefined} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
      <P on={on} delay={baseDelay} origin="center">
        {mass.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={C.deep} />
        ))}
      </P>
      {clumps.map((c, k) => (
        <P key={`${c[0]}-${c[1]}`} on={on} delay={baseDelay + 80 + (clumps.length - 1 - k) * 60} origin="center">
          <Clump spec={c} />
        </P>
      ))}
    </g>
  );
}

/* ───────── kind 2: small tree ───────── */
const SMALL_CLUMPS: ClumpSpec[] = [
  [80, 64, 22, 11],
  [60, 80, 17, 9],
  [100, 80, 17, 9],
  [80, 90, 16, 8],
];
const SMALL_MASS: Dot[] = [
  [80, 76, 22],
  [62, 86, 15],
  [98, 86, 15],
];

function SmallTree({ on, active }: { on: boolean; active: boolean }) {
  return (
    <>
      <Ground on={on} rx={44} />
      <Plant active={active}>
        <P on={on} delay={160}>
          <path d="M73.5 170 C76 158 77 142 77.2 118 L82.8 118 C83 142 84 158 86.5 170 Z" fill={C.trunk} />
          <path d="M80.8 170 C81.4 158 82 142 82.2 118 L82.8 118 C83 142 84 158 86.5 170 Z" fill={C.trunkDark} />
          <path d="M77.6 150 C77.9 142 78 134 78.2 126" stroke={C.trunkLight} strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M73.5 170 C70 170.4 67 171 64 171.6 M86.5 170 C90 170.4 93 171 96 171.6" stroke={C.trunk} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M78.5 128 C72 119 66 111 61 102" stroke={C.trunk} strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M81.5 124 C88 115 94 108 99 100" stroke={C.trunk} strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M80 120 C80 108 80 98 80 88" stroke={C.trunk} strokeWidth="3" fill="none" strokeLinecap="round" />
        </P>
        <Canopy on={on} active={active} clumps={SMALL_CLUMPS} mass={SMALL_MASS} baseDelay={300} />
      </Plant>
    </>
  );
}

/* ───────── kind 3: big tree with Hey Coco! fruit ───────── */
const BIG_CLUMPS: ClumpSpec[] = [
  [80, 32, 24, 12],
  [55, 44, 20, 10],
  [106, 42, 22, 11],
  [33, 66, 19, 10],
  [78, 58, 22, 11],
  [125, 62, 19, 10],
  [55, 79, 19, 10],
  [103, 77, 20, 10],
  [26, 93, 15, 8],
  [134, 90, 15, 8],
  [79, 93, 16, 8],
];
const BIG_MASS: Dot[] = [
  [80, 52, 32],
  [50, 68, 24],
  [110, 66, 24],
  [36, 86, 15],
  [124, 84, 15],
  [80, 82, 20],
];
const FRUIT: [number, number][] = [
  [56, 46],
  [106, 44],
  [78, 60],
  [124, 64],
  [55, 81],
  [103, 79],
];

function BigTree({ on, active }: { on: boolean; active: boolean }) {
  return (
    <>
      <Ground on={on} rx={60} />
      <Plant active={active}>
        <P on={on} delay={160}>
          {/* trunk with flared roots, splitting into left / centre / right limbs */}
          <path
            d="M60 170 C69 162 72 148 73 130 C70 121 63 113 53 107 L56 103 C65 107 71 112 75 118 C76 107 76.5 97 77 87 L83 87 C83.5 97 84 107 85 117 C89 110 96 105 106 101 L108 105 C99 110 92 117 87.5 128 C88 147 91 162 100 170 Z"
            fill={C.trunk}
          />
          <path d="M83 87 C83.5 97 84 107 85 117 C85.6 116 86.4 114 87.5 113 C86 104 85.4 96 85 87 Z" fill={C.trunkDark} />
          <path d="M87.5 128 C88 147 91 162 100 170 L92 170 C87 162 85 147 84.6 128 Z" fill={C.trunkDark} />
          <path d="M75.5 160 C76.5 150 77 140 77 130 M79 152 C79.6 144 79.8 138 79.6 132" stroke={C.trunkLight} strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <path d="M60 170 C54 170.4 49 171 43 172 M100 170 C106 170.4 111 171 117 172" stroke={C.trunk} strokeWidth="3" strokeLinecap="round" />
          {/* limbs reaching into the clumps */}
          <path d="M54 105 C46 100 39 93 33 86" stroke={C.trunk} strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M107 103 C115 98 122 92 127 85" stroke={C.trunk} strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M80 88 C80 76 79 66 78 56" stroke={C.trunk} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M75 114 C67 104 61 94 57 80" stroke={C.trunk} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M86 112 C94 102 100 92 104 76" stroke={C.trunk} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M79 70 C72 62 64 54 57 46 M80 66 C88 58 97 51 106 44 M36 89 C31 92 28 94 26 95 M124 88 C129 90 132 91 134 92" stroke={C.trunk} strokeWidth="2" fill="none" strokeLinecap="round" />
        </P>
        <Canopy on={on} active={active} clumps={BIG_CLUMPS} mass={BIG_MASS} baseDelay={300} />
        {FRUIT.map(([x, y], k) => (
          <P key={`${x}-${y}`} on={on} delay={980 + k * 90} origin="center">
            <path d={`M${x} ${y - 7.4} l0 -3`} stroke={C.trunkDark} strokeWidth="1.1" strokeLinecap="round" />
            <circle cx={x + 0.7} cy={y + 1.1} r="7.6" fill="#000" opacity="0.18" />
            <image href="/brand/logo-96.webp" x={x - 7.5} y={y - 7.5} width="15" height="15" />
          </P>
        ))}
      </Plant>
    </>
  );
}

export default function GrowthTree({ kind, shown, active = false, className }: { kind: 0 | 1 | 2 | 3; shown: boolean; active?: boolean; className?: string }) {
  const Art = [Acorn, Sapling, SmallTree, BigTree][kind];
  const moving = shown && active;
  return (
    <svg
      viewBox="0 0 160 180"
      role={shown ? "img" : undefined}
      aria-label={shown ? LABELS[kind] : undefined}
      aria-hidden={shown ? undefined : true}
      className={cn("overflow-visible", className)}
    >
      <Art on={shown} active={moving} />
    </svg>
  );
}
