"use client";
import { InlineMath } from "react-katex";

const mathItems = [
  "\\sum",
  "\\pi",
  "\\infty",
  "\\int",
  "\\lambda",
  "\\sqrt{x+1}",
  "\\theta",
  "f(x)",
  "x^{2}",
  "\\sin\\theta",
  "\\cos\\theta",
  "\\tan\\theta",
  "\\Delta",
  "a_{11}",
  "a_{22}",
  "A^{-1}",
  "\\frac{dy}{dx}",
  "\\lim_{x\\to\\infty}",
  "e^{i\\pi}",
  "\\pi r^{2}",
  "\\int_a^b f(x)\\,dx",
  "\\sqrt{x^{2}+1}",
  "\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}",
  "\\sum_{n=1}^{\\infty}",
];
function MathWatermark() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      {/* BACKGROUND DEPTH FIRST */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute left-1/2 top-1/2 h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_84%)]" />

      {/* MATH WATERMARK ABOVE THE DARK LAYERS */}
      <div className="absolute inset-0 z-10 opacity-[0.32]">
        {Array.from({ length: 24 }).map((_, col) => (
          <div
            key={col}
            className="absolute top-[-10%] flex flex-col gap-12 text-yellow-400/55"
            style={{
              left: `${col * 4.5}%`,
              transform: `translateY(${col % 2 === 0 ? "0px" : "50px"})`,
              fontSize: "0.78rem",
            }}
          >
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="whitespace-nowrap">
                <InlineMath math={mathItems[(i + col) % mathItems.length]} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* FINAL SOFT DARK VEIL */}
      <div className="absolute inset-0 z-20 bg-black/35" />
    </div>
  );
}
export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <MathWatermark />

      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full border-b border-yellow-400/20 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <p className="text-lg font-bold tracking-wide text-yellow-400">
            #WRDM
          </p>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#how"
              className="text-sm text-slate-300 hover:text-yellow-400"
            >
              How It Works
            </a>

            <a
              href="#programs"
              className="text-sm text-slate-300 hover:text-yellow-400"
            >
              Programs
            </a>

            <a
              href="https://forms.gle/fWmZt22ekpWzBmrn7"
              target="_blank"
              className="text-sm text-slate-300 hover:text-yellow-400"
            >
              Enrollment
            </a>

            <a
              href="mailto:admin@wereallydomaths.info"
              className="text-sm text-slate-300 hover:text-yellow-400"
            >
              Contact
            </a>
          </nav>

          <a
            href="https://forms.gle/fWmZt22ekpWzBmrn7"
            target="_blank"
            className="hidden rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black hover:bg-yellow-300 md:block"
          >
            Apply Now
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-24 pt-40">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
          #WEREALLYDOMATHS.COM
        </p>

        <h1 className="max-w-7xl text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl">
          Master Higher Tier Edexcel
          <br />
          IGCSE Mathematics
        </h1>

        <div className="mt-8 inline-flex w-fit rounded-full border border-yellow-400/30 bg-black/60 px-5 py-3 text-sm font-semibold text-yellow-300 backdrop-blur-sm">
          2026–2027 Cohort Begins Monday, August 3rd 2026
        </div>

        <div className="mt-10 flex max-w-6xl flex-wrap gap-4 text-lg text-slate-300 md:text-xl">
          <span>Structured Weekly Live Lessons</span>
          <span className="text-yellow-400">∞</span>
          <span>Guided Exam Practice</span>
          <span className="text-yellow-400">∞</span>
          <span>Mastery Cycles</span>
          <span className="text-yellow-400">∞</span>
          <span>Google Classroom Resources</span>
          <span className="text-yellow-400">∞</span>
          <span>AI-Assisted Feedback</span>
        </div>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row">
          <a
            href="#programs"
            className="rounded-full bg-yellow-400 px-8 py-4 text-center text-lg font-semibold text-black hover:bg-yellow-300"
          >
            Explore The Programs
          </a>

          <a
            href="https://forms.gle/fWmZt22ekpWzBmrn7"
            target="_blank"
            className="rounded-full border border-yellow-400/30 bg-black/50 px-8 py-4 text-center text-lg font-semibold text-white backdrop-blur-sm hover:text-yellow-400"
          >
            Join The 2026–2027 Cohort
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-32"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            HOW THE ACADEMY WORKS
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            A Structured System For Long-Term Mathematical Mastery
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-300 md:text-xl">
            Mathematical success is developed through preparation,
            guided instruction, deliberate practice, meaningful feedback,
            and consistent reflection over time.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              number: "01",
              title: "Prepare Before The Lesson",
              text: "Students engage with guided preparation material before each Mastery Cycle to build familiarity with key methods, vocabulary, and concepts.",
            },
            {
              number: "02",
              title: "Attend Live Online Lessons",
              text: "Interactive Higher Tier lessons focus on mathematical reasoning, exam technique, problem-solving strategies, and clear worked modelling.",
            },
            {
              number: "03",
              title: "Complete Deliberate Exam Practice",
              text: "After each session, students complete carefully selected exam-style tasks through Dr Frost Maths, where immediate automated feedback supports independent practice and helps identify weaker topic areas.",
            },
            {
              number: "04",
              title: "Upload Written Mathematical Working",
              text: "Students upload scanned written solutions through Google Classroom to support deeper analysis of mathematical reasoning, method accuracy, working structure, and exam-style communication.",
            },
            {
              number: "05",
              title: "Receive AI-Assisted Feedback",
              text: "AI-assisted analysis helps identify gaps in reasoning, inefficient methods, notation errors, and missed mark-scheme opportunities to support stronger exam performance beyond final answers alone.",
            },
            {
              number: "06",
              title: "Access Optional Office Hours",
              text: "Students may attend bookable office hour sessions for additional guidance, question review, targeted clarification, and deeper mathematical discussion when needed.",
            },
          ].map((card) => (
            <div
              key={card.number}
              className="rounded-[2rem] border border-yellow-400/15 bg-black/70 p-8 backdrop-blur-md transition duration-300 hover:border-yellow-400/40 hover:bg-black/80"
            >
              <p className="text-5xl font-bold text-yellow-400/80">
                {card.number}
              </p>

              <h3 className="mt-6 text-2xl font-bold">{card.title}</h3>

              <p className="mt-5 leading-8 text-slate-300">
                {card.text}
              </p>
            </div>
          ))}

          <div className="rounded-[2rem] border border-yellow-400/20 bg-black/75 p-10 backdrop-blur-md md:col-span-2 xl:col-span-3">
            <p className="text-5xl font-bold text-yellow-400/80">07</p>

            <h3 className="mt-6 text-3xl font-bold">
              Build Long-Term Mathematical Mastery
            </h3>

            <p className="mt-5 max-w-5xl text-lg leading-9 text-slate-300">
              Through consistent preparation, deliberate practice,
              meaningful feedback, and structured reflection,
              students steadily improve confidence, independence,
              mathematical communication, and Higher Tier exam performance
              over time.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section
        id="programs"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-32"
      >
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            PROGRAM PATHWAYS
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            Choose Your Higher Tier Pathway
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] border border-yellow-400/20 bg-black/80 p-10 backdrop-blur-md">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Accelerated Pathway
            </p>

            <h3 className="mt-4 text-3xl font-bold">
              1-Year Higher Tier Mastery Program
            </h3>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Designed for advanced Year 10 students and Year 11 students
              preparing for Edexcel IGCSE Mathematics through structured online
              live lessons, guided exam practice, and accelerated Higher Tier
              mastery.
            </p>

            <div className="mt-10 space-y-4">
              <div className="rounded-2xl border border-yellow-400/20 bg-black/50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">
                  Live Online Lessons
                </p>

                <div className="mt-4 space-y-2 text-slate-300">
                  <p>Saturday — 10:00 AM to 11:30 AM</p>
                  <p>Sunday — 10:00 AM to 11:30 AM</p>
                </div>
              </div>

              <div className="rounded-2xl border border-yellow-400/20 bg-black/50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">
                  Online Office Hours
                </p>

                <p className="mt-4 text-slate-300">
                  Wednesday — 6:00 PM to 7:30 PM
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-yellow-400/30 bg-black/80 p-10 backdrop-blur-md">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Structured Pathway
            </p>

            <h3 className="mt-4 text-3xl font-bold">
              2-Year Higher Tier Mastery Program
            </h3>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Designed for Year 10 students who benefit from slower pacing,
              deeper reinforcement, and long-term Higher Tier mastery through
              structured online live lessons and guided mathematical development.
            </p>

            <div className="mt-10 space-y-4">
              <div className="rounded-2xl border border-yellow-400/20 bg-black/50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">
                  Live Online Lessons
                </p>

                <div className="mt-4 space-y-2 text-slate-300">
                  <p>Saturday — 12:30 PM to 2:00 PM</p>
                  <p>Sunday — 12:30 PM to 2:00 PM</p>
                </div>
              </div>

              <div className="rounded-2xl border border-yellow-400/20 bg-black/50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-yellow-400">
                  Online Office Hours
                </p>

                <p className="mt-4 text-slate-300">
                  Thursday — 6:00 PM to 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENROLLMENT */}
      <section
        id="apply"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-32"
      >
        <div className="rounded-[2.5rem] border border-yellow-400/20 bg-black/80 p-12 text-center backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            ENROLLMENT
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            Join The 2026–2027 Cohort
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-slate-300 md:text-xl">
            Structured online coaching for Higher Tier Edexcel IGCSE Mathematics
            built around preparation, deliberate practice, meaningful feedback,
            and long-term mathematical mastery.
          </p>

          <div className="mt-12">
           <a
  href="https://forms.gle/fWmZt22ekpWzBmrn7"
  target="_blank"
  className="inline-flex max-w-full items-center justify-center rounded-full bg-yellow-400 px-8 py-5 text-center text-base font-semibold leading-tight text-black transition hover:bg-yellow-300 sm:text-lg"
>
  Complete Enrollment Interest Form
</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-yellow-400/20 bg-black/85">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold tracking-wide text-yellow-400">
              #WeReallyDoMaths
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Structured online coaching for Higher Tier Edexcel IGCSE
              Mathematics designed around Mastery Cycles, guided exam
              practice, live online lessons, and long-term mathematical
              confidence.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Navigation
            </p>

            <div className="mt-6 flex flex-col gap-4 text-sm text-slate-300">
              <a href="#how" className="transition hover:text-yellow-400">
                How It Works
              </a>

              <a
                href="#programs"
                className="transition hover:text-yellow-400"
              >
                Programs
              </a>

              <a
                href="https://forms.gle/fWmZt22ekpWzBmrn7"
                target="_blank"
                className="transition hover:text-yellow-400"
              >
                Enrollment
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Contact
            </p>

            <div className="mt-6 flex flex-col gap-4 text-sm text-slate-300">
              <a
                href="mailto:admin@wereallydomaths.info"
                className="transition hover:text-yellow-400"
              >
                admin@wereallydomaths.info
              </a>

              <p>Dubai-Based Online Mathematics Academy</p>
              <p>Edexcel IGCSE Mathematics (Higher Tier)</p>
              <p>@wereallydomaths.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-400/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row">
            <p>© 2026 #WeReallyDoMaths. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/wereallydomaths.com"
                target="_blank"
                className="transition hover:text-yellow-400"
              >
                Instagram
              </a>

              <a
                href="https://www.tiktok.com/@wereallydomaths.com"
                target="_blank"
                className="transition hover:text-yellow-400"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}