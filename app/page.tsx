"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { InlineMath } from "react-katex";

const FORM_LINK = "https://forms.gle/fWmZt22ekpWzBmrn7";

const mathItems = [
  // IGCSE algebra, geometry, trigonometry and probability.
  "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
  "a^2+b^2=c^2",
  "y=mx+c",
  "(a+b)^2=a^2+2ab+b^2",
  "a^m a^n=a^{m+n}",
  "u_n=a+(n-1)d",
  "S_n=\\frac{n}{2}[2a+(n-1)d]",
  "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}",
  "a^2=b^2+c^2-2bc\\cos A",
  "A=\\frac12 ab\\sin C",
  "C=2\\pi r",
  "A=\\pi r^2",
  "V=\\frac43\\pi r^3",
  "P(A')=1-P(A)",
  "f^{-1}(f(x))=x",
  // International A Level pure mathematics, statistics and mechanics.
  "\\sin^2\\theta+\\cos^2\\theta=1",
  "\\sin 2\\theta=2\\sin\\theta\\cos\\theta",
  "\\cos 2\\theta=1-2\\sin^2\\theta",
  "\\frac{d}{dx}(x^n)=nx^{n-1}",
  "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C\\quad(n\\ne-1)",
  "\\frac{d}{dx}(e^x)=e^x",
  "\\frac{d}{dx}(\\ln x)=\\frac1x",
  "\\int\\cos x\\,dx=\\sin x+C",
  "\\log_a(xy)=\\log_a x+\\log_a y",
  "S_n=\\frac{a(1-r^n)}{1-r}\\quad(r\\ne1)",
  "\\mathbf r=\\mathbf a+t\\mathbf b",
  "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
  "X\\sim\\mathrm{B}(n,p)",
  "P(X=k)=\\binom nk p^k(1-p)^{n-k}",
  "X\\sim\\mathrm{N}(\\mu,\\sigma^2)",
  "Z=\\frac{X-\\mu}{\\sigma}",
  "v=u+at",
  "s=ut+\\frac12at^2",
  "v^2=u^2+2as",
  "F=ma",
  "E_k=\\frac12mv^2",
];
type MathParticle = {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
};

function containMathParticle(p: MathParticle, width: number, height: number) {
  const maxX = Math.max(0, width - p.width);
  const maxY = Math.max(0, height - p.height);
  if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
  if (p.x > maxX) { p.x = maxX; p.vx = -Math.abs(p.vx); }
  if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
  if (p.y > maxY) { p.y = maxY; p.vy = -Math.abs(p.vy); }
}

function advanceMathParticles(particles: MathParticle[], width: number, height: number, dt: number) {
  for (const p of particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    containMathParticle(p, width, height);
  }
  // Resolve the padded rectangles, including tall fractions and wide formulae.
  for (let pass = 0; pass < 4; pass++) {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = b.x + b.width / 2 - a.x - a.width / 2;
        const dy = b.y + b.height / 2 - a.y - a.height / 2;
        const overlapX = (a.width + b.width) / 2 - Math.abs(dx);
        const overlapY = (a.height + b.height) / 2 - Math.abs(dy);
        if (overlapX <= 0 || overlapY <= 0) continue;
        if (overlapX < overlapY) {
          const direction = dx >= 0 ? 1 : -1;
          a.x -= direction * (overlapX + 0.1) / 2;
          b.x += direction * (overlapX + 0.1) / 2;
          if ((a.vx - b.vx) * direction > 0) {
            [a.vx, b.vx] = [b.vx, a.vx];
          }
        } else {
          const direction = dy >= 0 ? 1 : -1;
          a.y -= direction * (overlapY + 0.1) / 2;
          b.y += direction * (overlapY + 0.1) / 2;
          if ((a.vy - b.vy) * direction > 0) {
            [a.vy, b.vy] = [b.vy, a.vy];
          }
        }
        containMathParticle(a, width, height);
        containMathParticle(b, width, height);
      }
    }
  }
}

function MathWatermark() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;
    const elements = Array.from(background.querySelectorAll<HTMLElement>(".wrdm-floating-symbol"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let particles: MathParticle[] = [];
    let frame = 0;
    let lastTime = 0;
    let disposed = false;
    let viewportWidth = 0;
    let viewportHeight = 0;

    function paint() {
      for (const p of particles) {
        elements[p.index].style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        elements[p.index].style.visibility = "visible";
      }
    }

    function tick(time: number) {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.032) : 0;
      lastTime = time;
      advanceMathParticles(particles, viewportWidth, viewportHeight, dt);
      paint();
      frame = requestAnimationFrame(tick);
    }

    function initialise() {
      if (disposed || !background) return;
      cancelAnimationFrame(frame);
      lastTime = 0;
      viewportWidth = background.clientWidth;
      viewportHeight = background.clientHeight;
      particles = [];
      for (const element of elements) element.style.visibility = "hidden";
      // Use fewer formulae on smaller screens and never start them overlapping.
      const count = viewportWidth < 600 ? 6 : viewportWidth < 900 ? 10 : 18;
      let seed = 12345;
      function random() {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
      }
      for (let i = 0; i < count; i++) {
        const index = (i * 7) % elements.length;
        const box = elements[index].getBoundingClientRect();
        if (box.width >= viewportWidth || box.height >= viewportHeight) continue;
        for (let attempt = 0; attempt < 200; attempt++) {
          const x = random() * (viewportWidth - box.width);
          const y = random() * (viewportHeight - box.height);
          const intersects = particles.some(p =>
            x < p.x + p.width + 8 && x + box.width + 8 > p.x &&
            y < p.y + p.height + 8 && y + box.height + 8 > p.y
          );
          if (intersects) continue;
          const angle = random() * Math.PI * 2;
          const speed = 16 + random() * 14;
          particles.push({ index, x, y, width: box.width, height: box.height,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed });
          break;
        }
      }
      paint();
      if (!motion.matches) frame = requestAnimationFrame(tick);
    }

    const observer = new ResizeObserver(initialise);
    observer.observe(background);
    motion.addEventListener("change", initialise);
    initialise();
    // Measure again once the mathematical fonts have loaded.
    void document.fonts.ready.then(initialise);
    document.fonts.addEventListener("loadingdone", initialise);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", initialise);
      document.fonts.removeEventListener("loadingdone", initialise);
    };
  }, []);

  return (
    <div ref={backgroundRef} aria-hidden="true" className="wrdm-math-background">
      {mathItems.map((math, index) => (
        <div key={index} className="wrdm-floating-symbol">
          <InlineMath math={math} />
        </div>
      ))}
      <style jsx global>{`
        .wrdm-math-background {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          background: #fdfcf9;
        }
        .wrdm-floating-symbol {
          position: absolute;
          top: 0;
          left: 0;
          width: max-content;
          padding: 10px;
          color: #b5a47a;
          opacity: .24;
          visibility: hidden;
          white-space: nowrap;
          font-size: clamp(.65rem, 1vw, .95rem);
        }
      `}</style>
    </div>
  );
}
const navigation = [
  ["Courses", "#courses"],
  ["Free Introduction", "#free-week"],
  ["How It Works", "#how"],
  ["Meet Your Teacher", "#teacher"],
  ["Frequently Asked Questions", "#faq"],
];

const courses = [
  {
    "id": "grade-8",
    "label": "IGCSE · GRADE 8",
    "title": "Grade 8 Accelerated",
    "subtitle": "Algebra and Problem Solving",
    "board": "Pearson Edexcel IGCSE · 4MA1 Higher",
    "audience": "For students aiming for Grade 8 who are confident with basic algebra and ready for a faster pace.",
    "description": "Strengthen demanding algebraic methods and learn to connect them in unfamiliar exam problems.",
    "focus": [
      "Algebraic fractions and rearranging formulae.",
      "Quadratics, simultaneous equations and inequalities.",
      "Clear reasoning and connected exam problems."
    ],
    "saturday": "11:30 am–12:45 pm",
    "office": "Wednesday, 5:30–6:30 pm",
    "outline": [
      [
        "Expanding and factorising quadratics",
        "Take out the highest common factor, then expand and factorise quadratic expressions."
      ],
      [
        "Algebraic fractions",
        "Simplify and calculate with algebraic fractions, using factorisation and common denominators."
      ],
      [
        "Rearranging formulae",
        "Change the subject, including cases where it appears twice."
      ],
      [
        "Quadratic equations",
        "Form equations from contexts and choose suitable methods to solve them."
      ],
      [
        "Completing the square",
        "Complete the square and interpret quadratic graphs."
      ],
      [
        "Simultaneous equations",
        "Solve problems involving one linear and one quadratic equation."
      ],
      [
        "Inequalities",
        "Solve linear and quadratic inequalities and interpret solution sets."
      ],
      [
        "Connected algebra problems",
        "Choose and justify methods, revisit misconceptions and complete mixed exam-style practice."
      ]
    ]
  },
  {
    "id": "grade-9",
    "label": "IGCSE · GRADE 9",
    "title": "Grade 9 Targeted Support",
    "subtitle": "Indices, Sequences, Functions & Probability",
    "board": "Pearson Edexcel IGCSE · 4MA1 Higher",
    "audience": "For students aiming for Grade 9 who want guided support with demanding Higher Tier questions.",
    "description": "Develop precise solutions through challenging practice, connected problems and feedback on your reasoning.",
    "focus": [
      "Index equations and arithmetic sequences and series.",
      "Composite and inverse functions.",
      "Conditional probability and sampling without replacement."
    ],
    "saturday": "1:00–2:15 pm",
    "office": "Wednesday, 5:30–6:30 pm",
    "outline": [
      [
        "Negative and fractional indices",
        "Interpret powers and simplify expressions accurately using index laws."
      ],
      [
        "Index equations",
        "Rewrite expressions using common bases and solve equations involving powers."
      ],
      [
        "Arithmetic sequences",
        "Find unknown terms, first terms and common differences from given conditions."
      ],
      [
        "Arithmetic series",
        "Use sum formulae and combine information to solve connected problems."
      ],
      [
        "Composite functions",
        "Form composite functions and solve equations involving them."
      ],
      [
        "Inverse functions",
        "Find inverse functions and tackle connected function problems."
      ],
      [
        "Dependent events",
        "Model sampling without replacement using suitable representations."
      ],
      [
        "Conditional probability",
        "Find conditional and unknown probabilities, with mixed review in the final Sunday lesson."
      ]
    ]
  },
  {
    "id": "year-10",
    "label": "IGCSE · YEAR 10",
    "title": "Year 10 IGCSE Head Start",
    "subtitle": "Algebra Essentials",
    "board": "Pearson Edexcel IGCSE · 4MA1 Higher",
    "audience": "For Year 10 students who want a stronger foundation in algebra.",
    "description": "Build secure methods and learn to apply them confidently to IGCSE questions.",
    "focus": [
      "Expressions, substitution and expanding brackets.",
      "Factorising using the highest common factor.",
      "Forming equations and rearranging formulae."
    ],
    "saturday": "10:00–11:15 am",
    "office": "Wednesday, 5:30–6:30 pm",
    "outline": [
      [
        "Expressions and notation",
        "Collect like terms and write algebraic expressions accurately."
      ],
      [
        "Substitution",
        "Evaluate expressions involving negative numbers, fractions and powers."
      ],
      [
        "Expanding brackets",
        "Expand single and double brackets, then simplify."
      ],
      [
        "Factorising using the highest common factor",
        "Take out numerical and algebraic common factors and check by expanding. Progress to simple quadratics when ready."
      ],
      [
        "Linear equations",
        "Solve equations with brackets, fractional coefficients and unknowns on both sides."
      ],
      [
        "Forming equations",
        "Translate words, diagrams and contexts into equations."
      ],
      [
        "Rearranging formulae",
        "Change the subject where it appears once, including powers and roots."
      ],
      [
        "Connected algebra problems",
        "Select methods, review your understanding and use feedback to correct misconceptions."
      ]
    ]
  },
  {
    "id": "gcse-number",
    "label": "GCSE HIGHER · GRADE 7+",
    "title": "GCSE Higher Number Essentials",
    "subtitle": "Exact Methods and Problem Solving",
    "board": "AQA · 8300 Higher / Edexcel · 1MA1 Higher",
    "audience": "For AQA or Edexcel GCSE Higher students aiming for Grade 7 or above.",
    "description": "Develop accurate number methods and tackle demanding problems through guided teaching and feedback.",
    "focus": [
      "Exact fractions, recurring decimals and indices.",
      "Standard form, surds and rationalising denominators.",
      "Bounds, accuracy and connected number problems."
    ],
    "saturday": "2:30–3:45 pm",
    "office": "Thursday, 6:30–7:30 pm",
    "outline": [
      [
        "Fractions",
        "Calculate exactly with fractions and mixed numbers in problems involving several steps."
      ],
      [
        "Recurring decimals",
        "Convert recurring decimals to fractions and explain the algebraic method."
      ],
      [
        "Indices",
        "Understand and apply negative and fractional powers."
      ],
      [
        "Standard form",
        "Calculate, compare quantities and solve problems in context."
      ],
      [
        "Surds",
        "Simplify, combine, multiply and expand expressions exactly."
      ],
      [
        "Rationalising denominators",
        "Work with single surds and two-term denominators."
      ],
      [
        "Bounds and accuracy",
        "Use error intervals and choose appropriate bounds for calculations."
      ],
      [
        "Connected number problems",
        "Select methods, review your understanding and use feedback to correct misconceptions."
      ]
    ]
  }
];

const steps = [
  {
    "title": "Learn on Saturday",
    "description": "Clear explanations, carefully modelled solutions and guided practice introduce the weekly focus."
  },
  {
    "title": "Apply on Sunday",
    "description": "Complete a short task between lessons, then tackle deeper problems, discuss methods and act on feedback."
  },
  {
    "title": "Practise during the week",
    "description": "Complete independent practice, submit written working and use optional drop-in support to address questions."
  }
];

const questions = [
  {
    "question": "Which course should I choose?",
    "answer": "Choose according to your examination board, current understanding and goals. Grade 8 Accelerated develops demanding IGCSE algebra; Grade 9 Targeted Support focuses on indices, sequences, functions and probability; Year 10 Head Start builds algebra foundations. GCSE Number Essentials supports AQA and Edexcel Higher students aiming for Grade 7 or above. A short diagnostic before the paid course helps check suitability and identify gaps."
  },
  {
    "question": "Which examination boards do the courses cover?",
    "answer": "The three IGCSE courses cover Pearson Edexcel International GCSE Mathematics A (4MA1), Higher Tier, on the linear pathway. GCSE Number Essentials covers AQA GCSE Mathematics (8300) and Pearson Edexcel GCSE Mathematics (1MA1), Higher Tier."
  },
  {
    "question": "Is the introduction week free?",
    "answer": "Yes. The two shared student lessons on 1 and 5 November 2026 and the parent question-and-answer session on 7 November are free. The student lessons cover mathematical skills that overlap across all four groups. They are followed by separate eight-week paid courses, with outlines shared here. Paid-course start dates, Sunday lesson times and fees will be confirmed before enrolment."
  },
  {
    "question": "How are lessons delivered?",
    "answer": "Lessons are taught live online, with two 75-minute lessons each week: Saturday for teaching and guided practice, and Sunday for deeper problems and feedback. Practice tasks and supporting resources are shared through Google Classroom. All advertised times are Dubai time."
  },
  {
    "question": "What work is expected between lessons?",
    "answer": "Students complete a short task between Saturday and Sunday, then independent practice during the week. They should submit written working when requested and act on feedback. Optional drop-in support is available on Wednesday for IGCSE students and Thursday for GCSE students."
  },
  {
    "question": "Is there an end-of-course test?",
    "answer": "Yes. After the final teaching session, students complete a test covering the eight-week course under agreed conditions. Feedback identifies strengths, areas for improvement and recommended next steps."
  },
  {
    "question": "What equipment will students need?",
    "answer": "A reliable internet connection, a computer or suitable tablet, access to Google Classroom, a mathematics notebook, writing materials and a scientific calculator suitable for their qualification."
  }
];

function FreeResourcesMenu({ mobile = false }: { mobile?: boolean }) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      const menu = menuRef.current;
      if (menu && event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false;
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <details ref={menuRef} className={`wrdm-resources-menu${mobile ? " wrdm-resources-mobile" : ""}`}
      onPointerEnter={(event) => {
        if (!mobile && event.pointerType === "mouse") event.currentTarget.open = true;
      }}
      onPointerLeave={(event) => {
        if (!mobile && event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) {
          event.currentTarget.open = false;
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          event.currentTarget.open = false;
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          event.currentTarget.open = false;
          event.currentTarget.querySelector<HTMLElement>("summary")?.focus();
        }
      }}>
      <summary className="wrdm-button wrdm-secondary">
        Free Resources
        <svg className="wrdm-resources-chevron" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="wrdm-resources-links">
        <a href="/resources/worksheets" onClick={() => { if (menuRef.current) menuRef.current.open = false; }}>
          <span>Worksheets</span><small>For teachers and students</small>
        </a>
        <a href="/resources/lesson-slides" onClick={() => { if (menuRef.current) menuRef.current.open = false; }}>
          <span>Lesson Slides</span><small>For teachers</small>
        </a>
      </div>
    </details>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="wrdm-site">
      <MathWatermark />
      <style jsx global>{`
        .wrdm-site {
          --navy: #172338;
          --gold: #927020;
          --muted: #475569;
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          background: #fdfcf9;
          color: var(--navy);
          color-scheme: light;
          font-family: var(--font-geist-sans, "Segoe UI"), Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .wrdm-site *, .wrdm-site *::before, .wrdm-site *::after { box-sizing: border-box; }
        .wrdm-site h1, .wrdm-site h2, .wrdm-site h3, .wrdm-site p { margin: 0; }
        .wrdm-site a { color: inherit; text-decoration: none; }
        .wrdm-site a, .wrdm-site button {
          transition: color 180ms ease, background-color 180ms ease,
            border-color 180ms ease, box-shadow 180ms ease;
        }
        .wrdm-site a:focus-visible, .wrdm-site button:focus-visible,
        .wrdm-site summary:focus-visible {
          outline: 3px solid var(--gold);
          outline-offset: 5px;
        }
        .wrdm-site ::selection { background: #eee4cb; color: var(--navy); }
        .wrdm-site .wrdm-container { width: min(100% - 4rem, 1280px); margin-inline: auto; }
        .wrdm-site .wrdm-content, .wrdm-site .wrdm-footer { position: relative; z-index: 10; }
        .wrdm-site section[id], .wrdm-site h3[id] { scroll-margin-top: 7rem; }
        .wrdm-site .wrdm-header {
          position: fixed;
          inset: 0 0 auto;
          z-index: 50;
          background: rgba(255,255,255,.94);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(146,112,32,.16);
          box-shadow: 0 3px 24px rgba(23,35,56,.025);
        }
        .wrdm-site .wrdm-header-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 1.5rem; min-height: 74px;
        }
        .wrdm-site .wrdm-brand { color: var(--gold); font-weight: 700; letter-spacing: .03em; font-size: 1.15rem; }
        .wrdm-site .wrdm-desktop-nav { display: flex; align-items: center; gap: 1rem; }
        .wrdm-site .wrdm-desktop-nav a { font-size: .85rem; color: var(--muted); font-weight: 500; }
        .wrdm-site .wrdm-desktop-nav a:hover, .wrdm-site .wrdm-footer a:hover { color: var(--gold); }
        .wrdm-site .wrdm-button {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 48px; padding: .9rem 1.5rem;
          border: 1px solid transparent; border-radius: .8rem;
          font-size: .9rem; font-weight: 600; text-align: center; line-height: 1.5;
        }
        .wrdm-site .wrdm-primary {
          color: #fff; background: linear-gradient(135deg, #172338, #263a53);
          box-shadow: 0 6px 16px rgba(23,35,56,.1);
        }
        .wrdm-site .wrdm-primary:hover { background: #263c59; box-shadow: 0 8px 24px rgba(23,35,56,.17); }
        .wrdm-site .wrdm-secondary { background: rgba(255,255,255,.94); border-color: #d8dce2; color: var(--navy); }
        .wrdm-site .wrdm-secondary:hover { border-color: var(--gold); background: #fff; }
        .wrdm-site .wrdm-header-actions { display: flex; align-items: center; gap: .65rem; }
        .wrdm-site .wrdm-brand-with-logo { display: inline-flex; align-items: center; gap: .65rem; flex-shrink: 0; }
        .wrdm-site .wrdm-brand-with-logo img { display: block; width: 56px; height: auto; border-radius: 50%; }
        @media (max-width: 1279px) {
          .wrdm-site .wrdm-brand-with-logo img { width: 48px; }
        }
        .wrdm-site .wrdm-header-actions .wrdm-button { padding-inline: 1rem; font-size: .82rem; }
        .wrdm-site .wrdm-resources-menu { position: relative; }
        .wrdm-site .wrdm-resources-menu summary { cursor: pointer; list-style: none; gap: .6rem; }
        .wrdm-site .wrdm-resources-menu summary::-webkit-details-marker { display: none; }
        .wrdm-site .wrdm-resources-chevron { flex-shrink: 0; color: var(--gold); transition: transform 180ms ease; }
        .wrdm-site .wrdm-resources-menu[open] .wrdm-resources-chevron { transform: rotate(180deg); }
        .wrdm-site .wrdm-resources-links { position: absolute; right: 0; top: calc(100% + .6rem); width: 260px; padding: .4rem; background: #fff; border: 1px solid #ded5bf; border-radius: .8rem; box-shadow: 0 10px 30px rgba(23,35,56,.12); }
        .wrdm-site .wrdm-resources-links::before { content: ""; position: absolute; left: 0; right: 0; top: -.7rem; height: .7rem; }
        .wrdm-site .wrdm-resources-links a { display: block; padding: .8rem; border-radius: .5rem; }
        .wrdm-site .wrdm-resources-links a:hover { background: #f5f2e9; }
        .wrdm-site .wrdm-resources-links span { display: block; font-size: .9rem; font-weight: 600; }
        .wrdm-site .wrdm-resources-links small { display: block; margin-top: .2rem; color: var(--muted); font-size: .77rem; }
        .wrdm-site .wrdm-resources-mobile { margin: .5rem 0; }
        .wrdm-site .wrdm-resources-mobile summary { width: 100%; justify-content: space-between; }
        .wrdm-site .wrdm-resources-mobile .wrdm-resources-links { position: static; width: 100%; margin-top: .5rem; box-shadow: none; }
        .wrdm-site .wrdm-menu-toggle { display: none; cursor: pointer; }
        .wrdm-site .wrdm-mobile-nav {
          padding: 1.2rem 0 1.5rem; border-top: 1px solid #e8e3d8;
          max-height: calc(100dvh - 82px); overflow-y: auto;
        }
        .wrdm-site .wrdm-mobile-links { display: flex; flex-direction: column; gap: .5rem; }
        .wrdm-site .wrdm-mobile-links > a:not(.wrdm-button) { padding: .75rem 0; color: var(--muted); }
        .wrdm-site .wrdm-eyebrow { color: var(--gold); font-size: .7rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; }
        .wrdm-site .wrdm-hero {
          display: block; padding: 8rem 0 3rem;
        }
        .wrdm-site .wrdm-hero-copy { min-width: 0; }
        .wrdm-site .wrdm-hero-copy > .wrdm-eyebrow { display: flex; align-items: center; gap: 1rem; }
        .wrdm-site .wrdm-hero-copy > .wrdm-eyebrow::before { content: ""; width: 2.5rem; height: 1px; background: var(--gold); }
        .wrdm-site h1 {
          margin-top: 1.1rem; max-width: none;
          font-size: clamp(2.6rem, 4.5vw, 4.2rem); font-weight: 600;
          line-height: 1.12; letter-spacing: -.045em; text-wrap: balance;
        }
        .wrdm-site .wrdm-hero-tagline { margin-top: 1.2rem; font-size: 1.05rem; font-weight: 500; }
        .wrdm-site .wrdm-hero-description { margin-top: .8rem; max-width: 980px; color: var(--muted); font-size: .97rem; line-height: 1.8; }
        .wrdm-site .wrdm-actions { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 1.4rem; }
        .wrdm-site .wrdm-launch-date {
          display: inline-flex; flex-wrap: wrap; align-items: center; gap: .35rem .65rem;
          margin-top: 1.25rem; padding: .6rem 1rem; border: 1px solid #ded5bf;
          border-radius: .6rem; background: rgba(255,255,255,.85);
          color: var(--navy); font-size: .85rem; line-height: 1.6;
        }
        .wrdm-site .wrdm-launch-date strong { color: var(--gold); font-weight: 600; }
        .wrdm-site .wrdm-section { padding: 0 0 4.5rem; }
        .wrdm-site .wrdm-section-heading { margin-bottom: 1.5rem; }
        .wrdm-site h2 { font-size: clamp(1.9rem, 3.4vw, 2.7rem); font-weight: 600; line-height: 1.2; letter-spacing: -.035em; text-wrap: balance; }
        .wrdm-site .wrdm-section-heading h2 { margin-top: .75rem; }
        .wrdm-site .wrdm-course-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1.25rem; align-items: start; }
        .wrdm-site .wrdm-course {
          display: flex; flex-direction: column; padding: 2rem;
          background: rgba(255,255,255,.97);
          border: 1px solid rgba(146,112,32,.19); border-top: 3px solid #b4975b;
          border-radius: 1.3rem; box-shadow: 0 8px 32px rgba(23,35,56,.035);
        }
        .wrdm-site .wrdm-course h3 { margin-top: 1rem; font-size: 1.55rem; line-height: 1.3; letter-spacing: -.025em; font-weight: 600; }
        .wrdm-site .wrdm-course-subtitle { margin-top: .4rem; color: var(--gold); font-weight: 600; font-size: .95rem; }
        .wrdm-site .wrdm-course-audience { margin-top: 1.2rem; font-size: .95rem; line-height: 1.75; font-weight: 500; }
        .wrdm-site .wrdm-course-description { margin-top: .85rem; color: var(--muted); font-size: .9rem; line-height: 1.8; }
        .wrdm-site .wrdm-course ul { list-style: none; margin: 1.5rem 0 1.8rem; padding: 1.3rem 0 0; border-top: 1px solid #ede9e0; }
        .wrdm-site .wrdm-course li { position: relative; padding-left: 1rem; font-size: .87rem; line-height: 1.8; color: var(--muted); }
        .wrdm-site .wrdm-course li + li { margin-top: .6rem; }
        .wrdm-site .wrdm-course li::before { content: ""; position: absolute; left: 0; top: .65rem; width: 4px; height: 4px; border-radius: 50%; background: var(--gold); }
        .wrdm-site .wrdm-course-bottom { margin-top: auto; }
        .wrdm-site .wrdm-course-duration { font-size: .77rem; color: var(--gold); margin-bottom: 1rem; }
        .wrdm-site .wrdm-course .wrdm-button { width: 100%; }
        .wrdm-site .wrdm-steps { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 2.3rem; padding-top: 1.8rem; border-top: 1px solid rgba(146,112,32,.23); }
        .wrdm-site .wrdm-step-number { font-family: Georgia, serif; color: var(--gold); font-size: 2.5rem; line-height: 1; }
        .wrdm-site .wrdm-step h3 { margin-top: 1rem; font-size: 1.35rem; font-weight: 600; letter-spacing: -.02em; }
        .wrdm-site .wrdm-step p { margin-top: .75rem; color: var(--muted); font-size: .95rem; line-height: 1.8; max-width: 340px; }
        .wrdm-site .wrdm-teacher-panel { display: grid; grid-template-columns: 300px 1fr; align-items: center; gap: 3.5rem; padding: 2.5rem; background: rgba(255,255,255,.97); border: 1px solid rgba(146,112,32,.18); border-radius: 1.5rem; box-shadow: 0 8px 32px rgba(23,35,56,.035); }
        .wrdm-site .wrdm-portrait { overflow: hidden; border-radius: 1rem; background: #f2efe7; border: 1px solid #e8e3d8; }
        .wrdm-site .wrdm-portrait img { display: block; width: 100%; height: auto; }
        .wrdm-site .wrdm-teacher-copy h2 { margin-top: .8rem; }
        .wrdm-site .wrdm-teacher-role { margin-top: .6rem; color: var(--gold); font-size: .9rem; }
        .wrdm-site .wrdm-teacher-bio { margin-top: 1.5rem; color: var(--muted); line-height: 1.9; font-size: 1rem; }
        .wrdm-site .wrdm-teacher-bio + .wrdm-teacher-bio { margin-top: 1rem; }
        .wrdm-site .wrdm-faq-layout { display: grid; grid-template-columns: 1fr 1.7fr; gap: 3rem; }
        .wrdm-site .wrdm-faq-list { border-top: 1px solid #dfd9cc; }
        .wrdm-site .wrdm-faq-list details { border-bottom: 1px solid #dfd9cc; background: rgba(253,252,249,.8); }
        .wrdm-site .wrdm-faq-list summary { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 1.4rem .25rem; list-style: none; cursor: pointer; font-size: .98rem; font-weight: 600; line-height: 1.6; }
        .wrdm-site .wrdm-faq-list summary::-webkit-details-marker { display: none; }
        .wrdm-site .wrdm-faq-list summary::after { content: "+"; color: var(--gold); font-size: 1.5rem; font-weight: 400; flex-shrink: 0; }
        .wrdm-site .wrdm-faq-list details[open] summary::after { content: "−"; }
        .wrdm-site .wrdm-faq-list details p { padding: 0 .25rem 1.5rem; font-size: .95rem; color: var(--muted); line-height: 1.9; }
        .wrdm-site .wrdm-register-panel { padding: 3.5rem 2rem; text-align: center; background: linear-gradient(135deg,#fff,#f5f2e9); border: 1px solid rgba(146,112,32,.24); border-radius: 1.5rem; }
        .wrdm-site .wrdm-register-panel h2 { margin-top: .9rem; }
        .wrdm-site .wrdm-register-panel > p:not(.wrdm-eyebrow) { max-width: 600px; margin: 1.3rem auto 1.7rem; color: var(--muted); line-height: 1.85; }
        .wrdm-site .wrdm-footer { background: rgba(255,255,255,.97); border-top: 1px solid rgba(146,112,32,.2); padding: 2.5rem 0 1.5rem; }
        .wrdm-site .wrdm-footer-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; }
        .wrdm-site .wrdm-footer-description { margin-top: .6rem; color: var(--muted); font-size: .85rem; line-height: 1.8; }
        .wrdm-site .wrdm-footer-links { display: flex; flex-wrap: wrap; gap: .7rem 1.3rem; font-size: .82rem; color: var(--muted); }
        .wrdm-site .wrdm-footer-contact { display: block; margin-bottom: .9rem; font-size: .85rem; color: var(--muted); overflow-wrap: anywhere; }
        .wrdm-site .wrdm-footer-bottom { display: flex; justify-content: space-between; gap: 1.5rem; margin-top: 2rem; padding-top: 1.3rem; border-top: 1px solid #ece8de; }
        .wrdm-site .wrdm-copyright { color: var(--muted); font-size: .75rem; line-height: 1.8; }
        @media (max-width: 1279px) {
          .wrdm-site .wrdm-desktop-nav, .wrdm-site .wrdm-header-actions { display: none; }
          .wrdm-site .wrdm-menu-toggle { display: inline-flex; }
          .wrdm-site .wrdm-course { padding: 1.5rem; }
        }
        @media (min-width: 1280px) { .wrdm-site .wrdm-mobile-nav { display: none; } }
        @media (max-width: 899px) {
          .wrdm-site .wrdm-hero { display: block; padding-top: 7.5rem; }
          .wrdm-site .wrdm-course-grid { grid-template-columns: 1fr; }
          .wrdm-site .wrdm-course { padding: 2rem; }
          .wrdm-site .wrdm-course ul { display: grid; grid-template-columns: 1fr; }
          .wrdm-site .wrdm-teacher-panel { grid-template-columns: 220px 1fr; gap: 2rem; padding: 2rem; }
          .wrdm-site .wrdm-faq-layout { grid-template-columns: 1fr; gap: 0; }
        }
        @media (max-width: 639px) {
          .wrdm-site .wrdm-container { width: calc(100% - 2.5rem); }
          .wrdm-site .wrdm-header-row { min-height: 74px; }
          .wrdm-site .wrdm-hero { padding: 6.7rem 0 2.5rem; }
          .wrdm-site h1 { font-size: clamp(2.3rem,9vw,3.4rem); }
          .wrdm-site .wrdm-hero-copy > .wrdm-eyebrow { font-size: .62rem; letter-spacing: .12em; gap: .6rem; }
          .wrdm-site .wrdm-hero-copy > .wrdm-eyebrow::before { width: 1.5rem; }
          .wrdm-site .wrdm-actions { flex-direction: column; align-items: stretch; }
          .wrdm-site .wrdm-section { padding-bottom: 4rem; }
          .wrdm-site .wrdm-course { padding: 1.5rem; }
          .wrdm-site .wrdm-steps { grid-template-columns: 1fr; gap: 1rem; }
          .wrdm-site .wrdm-step { display: grid; grid-template-columns: 3rem 1fr; column-gap: 1rem; }
          .wrdm-site .wrdm-step-number { grid-row: span 2; }
          .wrdm-site .wrdm-step h3 { margin-top: 0; }
          .wrdm-site .wrdm-step p { max-width: none; }
          .wrdm-site .wrdm-teacher-panel { grid-template-columns: 1fr; gap: 1.8rem; padding: 1.5rem; }
          .wrdm-site .wrdm-portrait { width: min(100%,280px); }
          .wrdm-site .wrdm-register-panel { padding: 2.5rem 1.5rem; }
          .wrdm-site .wrdm-footer-top, .wrdm-site .wrdm-footer-bottom { flex-direction: column; }
        }

        .wrdm-site .wrdm-course-board { margin-top: .8rem; font-size: .78rem; line-height: 1.6; color: var(--muted); }
        .wrdm-site .wrdm-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .wrdm-site .wrdm-outline, .wrdm-site .wrdm-timetable { border-top: 1px solid #e5dfd2; }
        .wrdm-site .wrdm-outline summary, .wrdm-site .wrdm-timetable summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 0; cursor: pointer; list-style: none; font-size: .88rem; font-weight: 600; line-height: 1.6; }
        .wrdm-site .wrdm-outline summary::-webkit-details-marker, .wrdm-site .wrdm-timetable summary::-webkit-details-marker { display: none; }
        .wrdm-site .wrdm-outline summary::after, .wrdm-site .wrdm-timetable summary::after { content: '+'; color: var(--gold); font-size: 1.3rem; flex-shrink: 0; }
        .wrdm-site details.wrdm-outline[open] summary::after, .wrdm-site details.wrdm-timetable[open] summary::after { content: '−'; }
        .wrdm-site .wrdm-outline ol { list-style: none; padding: 0; margin: 0; }
        .wrdm-site .wrdm-outline ol li { display: grid; grid-template-columns: 3.7rem 1fr; gap: .75rem; padding: .9rem 0; border-top: 1px solid #eeeae1; }
        .wrdm-site .wrdm-outline ol li + li { margin-top: 0; }
        .wrdm-site .wrdm-outline ol li::before { content: none; }
        .wrdm-site .wrdm-week-label { color: var(--gold); font-size: .77rem; font-weight: 600; }
        .wrdm-site .wrdm-outline h4 { margin: 0; font-size: .87rem; color: var(--navy); font-weight: 600; line-height: 1.6; }
        .wrdm-site .wrdm-outline li p { margin-top: .3rem; font-size: .83rem; line-height: 1.7; }
        .wrdm-site .wrdm-outline-test, .wrdm-site .wrdm-timetable > p { padding: .8rem 0 1rem; color: var(--muted); font-size: .8rem; line-height: 1.8; }
        .wrdm-site .wrdm-timetable dl { margin: 0; font-size: .83rem; line-height: 1.7; }
        .wrdm-site .wrdm-timetable dl > div { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .3rem 1rem; padding: .6rem 0; }
        .wrdm-site .wrdm-timetable dt { font-weight: 600; }
        .wrdm-site .wrdm-timetable dd { margin: 0; color: var(--muted); }
        .wrdm-site .wrdm-course-bottom { padding-top: 1.3rem; }
        .wrdm-site .wrdm-course-duration { line-height: 1.9; }
        .wrdm-site .wrdm-follow-on { margin-top: 1.5rem; padding: 1.5rem 1.75rem; border-left: 3px solid #b4975b; background: rgba(255,255,255,.88); border-radius: 0 .8rem .8rem 0; }
        .wrdm-site .wrdm-follow-on h3 { font-size: 1.15rem; font-weight: 600; }
        .wrdm-site .wrdm-follow-on p { margin-top: .6rem; color: var(--muted); font-size: .9rem; line-height: 1.85; max-width: 1050px; }
        .wrdm-site .wrdm-intro-panel { padding: 2rem; background: rgba(255,255,255,.94); border: 1px solid #ded5bf; border-radius: 1.3rem; }
        .wrdm-site .wrdm-intro-panel h2 { font-size: clamp(1.6rem,2.6vw,2.2rem); }
        .wrdm-site .wrdm-section-description { margin-top: .8rem; max-width: 980px; color: var(--muted); font-size: .93rem; line-height: 1.85; }
        .wrdm-site .wrdm-intro-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 1.5rem; }
        .wrdm-site .wrdm-intro-grid article { padding-top: 1.1rem; border-top: 1px solid #e6dfcf; }
        .wrdm-site .wrdm-intro-grid h3 { margin-top: .65rem; font-size: 1.05rem; font-weight: 600; line-height: 1.5; }
        .wrdm-site .wrdm-intro-grid article > p:last-child { margin-top: .75rem; font-size: .87rem; color: var(--muted); line-height: 1.9; }
        .wrdm-site .wrdm-intro-note { margin: 1.4rem 0 1rem; color: var(--muted); font-size: .82rem; line-height: 1.8; }
        .wrdm-site .wrdm-assessment-note { margin-top: 1.7rem; padding-top: 1.2rem; border-top: 1px solid #ded5bf; font-size: .9rem; color: var(--muted); line-height: 1.85; }
        .wrdm-site .wrdm-assessment-note strong { color: var(--navy); }
        @media (max-width: 639px) {
          .wrdm-site .wrdm-intro-panel { padding: 1.5rem; }
          .wrdm-site .wrdm-intro-grid { grid-template-columns: 1fr; gap: 1.1rem; }
          .wrdm-site .wrdm-intro-panel .wrdm-button { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wrdm-site *, .wrdm-site *::before, .wrdm-site *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      <header className="wrdm-header">
        <div className="wrdm-container wrdm-header-row">
          <a href="#top" className="wrdm-brand wrdm-brand-with-logo" aria-label="We Really Do Maths home" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/wrdm-logo.png" alt="" width={837} height={817} sizes="(max-width: 1279px) 48px, 56px" />
            <span>#WRDM</span>
          </a>
          <nav className="wrdm-desktop-nav" aria-label="Main navigation">
            {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="wrdm-header-actions">
            <FreeResourcesMenu />
            <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="wrdm-button wrdm-primary wrdm-header-apply">Register Your Interest</a>
          </div>
          <button type="button" className="wrdm-button wrdm-secondary wrdm-menu-toggle"
            aria-expanded={mobileMenuOpen} aria-controls="wrdm-mobile-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav id="wrdm-mobile-menu" className="wrdm-mobile-nav" aria-label="Mobile navigation"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setMobileMenuOpen(false);
                document.querySelector<HTMLButtonElement>(".wrdm-menu-toggle")?.focus();
              }
            }}>
            <div className="wrdm-container wrdm-mobile-links">
              {navigation.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}>{label}</a>
              ))}
              <FreeResourcesMenu mobile />
              <a href={FORM_LINK} target="_blank" rel="noopener noreferrer"
                className="wrdm-button wrdm-primary" onClick={() => setMobileMenuOpen(false)}>Register Your Interest</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top" className="wrdm-content">
        <section className="wrdm-hero wrdm-container" aria-labelledby="hero-title">
          <div className="wrdm-hero-copy">
          <p className="wrdm-eyebrow">Our First Course Launch</p>
          <h1 id="hero-title">Eight-Week GCSE &amp; IGCSE Maths Courses</h1>
          <p className="wrdm-launch-date"><strong>Free introduction week begins</strong><time dateTime="2026-11-01">1 November 2026</time></p>
          <p className="wrdm-hero-tagline">Focused teaching. Purposeful practice. Clear goals.</p>
          <p className="wrdm-hero-description">Our first four focused courses support Edexcel IGCSE and AQA or Edexcel GCSE Higher students. Build Year 10 algebra foundations or work towards Grades 7, 8 and 9, with one clear focus each week.</p>
          <div className="wrdm-actions">
            <a href="#courses" className="wrdm-button wrdm-primary">Explore the Courses</a>
            <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="wrdm-button wrdm-secondary">Register Your Interest</a>
          </div>
          </div>
        </section>

        <section id="free-week" className="wrdm-section wrdm-container" aria-labelledby="free-title">
          <div className="wrdm-intro-panel">
            <div className="wrdm-section-heading">
              <p className="wrdm-eyebrow">Free Introduction Week</p>
              <h2 id="free-title">One Shared Start. Four Course Pathways.</h2>
              <p className="wrdm-section-description">Two free live lessons explore repeated percentage change and reverse repeated percentage change: shared mathematical content relevant to all four groups. Learn to use multipliers, connect changes over several stages and work backwards to find an original value.</p>
            </div>
            <div className="wrdm-intro-grid">
              <article><p className="wrdm-eyebrow">Student Lesson 1</p><h3>Repeated percentage change</h3><p><time dateTime="2026-11-01">Sunday, 1 November 2026</time><br />3:00–4:15 pm</p></article>
              <article><p className="wrdm-eyebrow">Student Lesson 2</p><h3>Reverse repeated percentage change</h3><p><time dateTime="2026-11-05">Thursday, 5 November 2026</time><br />5:00–6:15 pm</p></article>
              <article><p className="wrdm-eyebrow">For Parents</p><h3>Course information and questions</h3><p><time dateTime="2026-11-07">Saturday, 7 November 2026</time><br />12:00–1:00 pm</p></article>
            </div>
            <p className="wrdm-intro-note">All times are Dubai time. After the free introduction week, students join separate eight-week paid courses tailored to their chosen pathway and target level.</p>
            <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="wrdm-button wrdm-primary">Register for the Free Introduction Week</a>
          </div>
        </section>

        <section id="courses" className="wrdm-section wrdm-container" aria-labelledby="courses-title">
          <div className="wrdm-section-heading">
            <p className="wrdm-eyebrow">Our First Four Courses</p>
            <h2 id="courses-title">Four Courses. A Clear Focus.</h2>
          </div>
          <div className="wrdm-course-grid">
            {courses.map((course) => (
              <article className="wrdm-course" key={course.id} aria-labelledby={course.id}>
                <p className="wrdm-eyebrow">{course.label}</p>
                <h3 id={course.id}>{course.title}</h3>
                {course.subtitle && <p className="wrdm-course-subtitle">{course.subtitle}</p>}
                <p className="wrdm-course-board">{course.board}</p>
                <p className="wrdm-course-audience">{course.audience}</p>
                <p className="wrdm-course-description">{course.description}</p>
                <ul>{course.focus.map((item) => <li key={item}>{item}</li>)}</ul>
                <details className="wrdm-outline">
                  <summary>View the eight-week course outline<span className="wrdm-sr-only"> for {course.title}</span></summary>
                  <ol>
                    {course.outline.map(([title, description], index) => (
                      <li key={title}>
                        <span className="wrdm-week-label">Week {index + 1}</span>
                        <div><h4>{title}</h4><p>{description}</p></div>
                      </li>
                    ))}
                  </ol>
                  <p className="wrdm-outline-test">After the final teaching session: an end-of-course test, feedback and recommended next steps.</p>
                </details>
                <details className="wrdm-timetable">
                  <summary>View lesson and drop-in times<span className="wrdm-sr-only"> for {course.title}</span></summary>
                  <dl>
                    <div><dt>Saturday lesson</dt><dd>{course.saturday}</dd></div>
                    <div><dt>Sunday lesson</dt><dd>Time to be confirmed</dd></div>
                    <div><dt>Optional drop-in</dt><dd>{course.office}</dd></div>
                  </dl>
                  <p>All times are Dubai time. Paid-course start date to be confirmed.</p>
                </details>
                <div className="wrdm-course-bottom">
                  <p className="wrdm-course-duration">Eight weeks · Two live lessons each week<br />End-of-course test and feedback</p>
                  <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="wrdm-button wrdm-primary"
                    aria-label={`Register your interest in ${course.title}`}>Register Your Interest</a>
                </div>
              </article>
            ))}
          </div>
          <aside className="wrdm-follow-on" aria-labelledby="follow-on-title">
            <h3 id="follow-on-title">What comes next?</h3>
            <p>Follow-on courses will be shaped by the needs of the students who join our first intake. We will use lesson observations, practice tasks, student feedback and end-of-course assessments to identify where further teaching would be most valuable.</p>
            <p>Each follow-on course will have a clear outline shared before enrolment, so families know what to expect.</p>
          </aside>
        </section>

        <section id="how" className="wrdm-section wrdm-container" aria-labelledby="how-title">
          <div className="wrdm-section-heading">
            <p className="wrdm-eyebrow">How It Works</p>
            <h2 id="how-title">A Clear Weekly Rhythm.</h2>
          </div>
          <div className="wrdm-steps">
            {steps.map((step, index) => (
              <div className="wrdm-step" key={step.title}>
                <span className="wrdm-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <p className="wrdm-assessment-note"><strong>Measure your progress.</strong> A short diagnostic helps identify your starting point. After the final teaching session, complete an end-of-course test and receive feedback on your strengths, areas for improvement and next steps.</p>
        </section>

        <section id="teacher" className="wrdm-section wrdm-container" aria-labelledby="teacher-title">
          <div className="wrdm-teacher-panel">
            <div className="wrdm-portrait">
              <Image src="/founder.png" alt="Seymour Williams, founder of We Really Do Maths"
                width={1200} height={1400} sizes="(max-width: 639px) 280px, (max-width: 899px) 220px, 300px" />
            </div>
            <div className="wrdm-teacher-copy">
              <p className="wrdm-eyebrow">Meet Your Teacher</p>
              <h2 id="teacher-title">Seymour Williams</h2>
              <p className="wrdm-teacher-role">Founder of #WeReallyDoMaths</p>
              <p className="wrdm-teacher-bio">An experienced mathematics teacher with over ten years of teaching experience across the United Kingdom and Dubai, and two master’s degrees in Mathematics.</p>
              <p className="wrdm-teacher-bio">My teaching combines clear modelling, purposeful practice and feedback that helps students understand where they went wrong and what to do next.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="wrdm-section wrdm-container" aria-labelledby="faq-title">
          <div className="wrdm-faq-layout">
            <div className="wrdm-section-heading">
              <h2 id="faq-title">Frequently Asked Questions</h2>
            </div>
            <div className="wrdm-faq-list">
              {questions.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="register" className="wrdm-section wrdm-container" aria-labelledby="register-title">
          <div className="wrdm-register-panel">
            <p className="wrdm-eyebrow">Register Your Interest</p>
            <h2 id="register-title">Choose Your Next Step in Maths.</h2>
            <p>Join our free introduction week from 1 November 2026. Tell us your year group, examination board, current attainment and preferred course. We will share paid-course dates, fees and next steps before enrolment.</p>
            <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="wrdm-button wrdm-primary">Register Your Interest</a>
          </div>
        </section>
      </main>

      <footer className="wrdm-footer">
        <div className="wrdm-container">
          <div className="wrdm-footer-top">
            <div>
              <a href="#top" className="wrdm-brand">#WeReallyDoMaths</a>
              <p className="wrdm-footer-description">Focused online courses for GCSE and IGCSE Mathematics.</p>
            </div>
            <div>
              <a href="mailto:admin@wereallydomaths.info" className="wrdm-footer-contact">Contact: admin@wereallydomaths.info</a>
              <div className="wrdm-footer-links">
                <a href="https://www.instagram.com/wereallydomaths.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.tiktok.com/@wereallydomaths.com" target="_blank" rel="noopener noreferrer">TikTok</a>
              </div>
            </div>
          </div>
          <div className="wrdm-footer-bottom">
            <p className="wrdm-copyright">© 2026 #WeReallyDoMaths. All rights reserved.</p>
            <nav className="wrdm-footer-links" aria-label="Policies">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-and-conditions">Terms and Conditions</a>
              <a href="/refund-policy">Refund Policy</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}









