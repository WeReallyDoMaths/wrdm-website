"use client";

import { InlineMath } from "react-katex";

const FORM_LINK = "https://forms.gle/fWmZt22ekpWzBmrn7";

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
      <div className="absolute inset-0 bg-black" />
      <div className="absolute left-1/2 top-1/2 h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_84%)]" />

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

      <div className="absolute inset-0 z-20 bg-black/35" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <MathWatermark />

      <header className="fixed top-0 z-50 w-full border-b border-yellow-400/20 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <p className="text-lg font-bold tracking-wide text-yellow-400">
            #WRDM
          </p>

          <nav className="hidden items-center gap-8 md:flex">
  <a href="#how" className="text-sm text-slate-300 hover:text-yellow-400">
    How It Works
  </a>

  <a href="#about" className="text-sm text-slate-300 hover:text-yellow-400">
    About
  </a>

  <a href="#faq" className="text-sm text-slate-300 hover:text-yellow-400">
    FAQ
  </a>

  <a href="#parents" className="text-sm text-slate-300 hover:text-yellow-400">
    Parents
  </a>

  <a href="#programmes" className="text-sm text-slate-300 hover:text-yellow-400">
    Programmes
  </a>

  <a
    href={FORM_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-slate-300 hover:text-yellow-400"
  >
    Enrolment
  </a>

  <a
    href="mailto:admin@wereallydomaths.info"
    className="text-sm text-slate-300 hover:text-yellow-400"
  >
    Contact
  </a>
</nav>

          <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black hover:bg-yellow-300 md:block">
            Apply Now
          </a>
        </div>
      </header>

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
          2026–2027 Cohort Begins Monday, 3 August 2026
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
          <a href="#programmes" className="rounded-full bg-yellow-400 px-8 py-4 text-center text-lg font-semibold text-black hover:bg-yellow-300">
            Explore The Programmes
          </a>

          <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="rounded-full border border-yellow-400/30 bg-black/50 px-8 py-4 text-center text-lg font-semibold text-white backdrop-blur-sm hover:text-yellow-400">
            Join The 2026–2027 Cohort
          </a>
        </div>
      </section>

      <section id="how" className="relative z-10 mx-auto max-w-7xl px-6 pb-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            HOW THE ACADEMY WORKS
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            A Structured System For Long-Term Mathematical Mastery
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-300 md:text-xl">
            Mathematical success is developed through preparation, guided
            instruction, deliberate practice, meaningful feedback, and
            consistent reflection over time.
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
            <div key={card.number} className="rounded-[2rem] border border-yellow-400/15 bg-black/70 p-8 backdrop-blur-md transition duration-300 hover:border-yellow-400/40 hover:bg-black/80">
              <p className="text-5xl font-bold text-yellow-400/80">{card.number}</p>
              <h3 className="mt-6 text-2xl font-bold">{card.title}</h3>
              <p className="mt-5 leading-8 text-slate-300">{card.text}</p>
            </div>
          ))}

          <div className="rounded-[2rem] border border-yellow-400/20 bg-black/75 p-10 backdrop-blur-md md:col-span-2 xl:col-span-3">
            <p className="text-5xl font-bold text-yellow-400/80">07</p>

            <h3 className="mt-6 text-3xl font-bold">
              Build Long-Term Mathematical Mastery
            </h3>

            <p className="mt-5 max-w-5xl text-lg leading-9 text-slate-300">
              Through consistent preparation, deliberate practice, meaningful
              feedback, and structured reflection, students steadily improve
              confidence, independence, mathematical communication, and Higher
              Tier exam performance over time.
            </p>
          </div>
        </div>
      </section>
      <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 pb-32">
  <div className="mx-auto max-w-4xl text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
      ABOUT #WEREALLYDOMATHS
    </p>

    <h2 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
      Mathematical Progress Is Built Through Consistent Deliberate Practice
    </h2>

    <p className="mt-8 text-lg leading-8 text-slate-300 md:text-xl">
      At #WeReallyDoMaths, we believe mathematical ability is not fixed.
      Strong outcomes are developed through structured routines, deliberate
      practice, meaningful feedback, and consistent effort over time.
    </p>

    <p className="mt-6 text-lg leading-8 text-slate-400 md:text-xl">
      Trajectory matters more than starting position. Students who engage in
      regular mathematical practice, revisit concepts consistently, and learn
      from feedback steadily improve confidence, fluency, reasoning, and exam
      performance over time.
    </p>
  </div>

  <div className="mt-20 grid gap-6 md:grid-cols-2">
    {[
      {
        number: "01",
        title: "Consistency Shapes Mathematical Progress",
        text: "Long-term mathematical improvement is rarely the result of occasional bursts of revision. Consistent weekly routines, deliberate practice, and sustained engagement have a far greater impact on long-term progress and Higher Tier performance.",
      },
      {
        number: "02",
        title: "Students Forget What They Do Not Revisit",
        text: "Mathematical knowledge strengthens when concepts are revisited regularly over time. Structured retrieval, repeated exposure, and carefully sequenced practice help move knowledge into long-term memory and improve recall under exam conditions.",
      },
      {
        number: "03",
        title: "Feedback Drives Improvement",
        text: "Students improve more effectively when misconceptions are identified early and addressed consistently. Immediate practice feedback, written solution analysis, and targeted guidance help students refine methods, mathematical communication, and exam technique.",
      },
      {
        number: "04",
        title: "Confidence Comes Through Competence",
        text: "Lasting mathematical confidence is built through preparation, practice, reflection, and repeated success over time. Students become more confident when they genuinely understand methods, communicate reasoning clearly, and experience measurable progress.",
      },
    ].map((card) => (
      <div
        key={card.number}
        className="rounded-[2rem] border border-yellow-400/15 bg-black/70 p-8 backdrop-blur-md transition duration-300 hover:border-yellow-400/40 hover:bg-black/80"
      >
        <p className="text-5xl font-bold text-yellow-400/80">
          {card.number}
        </p>

        <h3 className="mt-6 text-2xl font-bold">
          {card.title}
        </h3>

        <p className="mt-5 leading-8 text-slate-300">
          {card.text}
        </p>
      </div>
    ))}
  </div>

  <div className="mt-14 rounded-[2rem] border border-yellow-400/20 bg-black/75 p-10 text-center backdrop-blur-md">
    <p className="mx-auto max-w-5xl text-xl leading-9 text-slate-300 md:text-2xl">
      Strong mathematical outcomes are rarely accidental. They are usually
      the result of consistent routines, thoughtful teaching, deliberate
      practice, and sustained effort over time.
    </p>
  </div>
</section>   
<section id="faq" className="relative z-10 mx-auto max-w-7xl px-6 pb-32">
  <div className="mx-auto max-w-4xl text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
      FREQUENTLY ASKED QUESTIONS
    </p>

    <h2 className="mt-4 text-4xl font-bold md:text-6xl">
      Programme Information
    </h2>

    <p className="mt-8 text-lg leading-8 text-slate-300 md:text-xl">
      Important information about programme structure, expectations,
      preparation, independent practice, and student support.
    </p>
  </div>

  <div className="mt-20 space-y-6">
    {[
      {
        question: "Who is the programme designed for?",
        answer:
          "The programme is designed for students in Years 8 to 11 studying or preparing to study Higher Tier Edexcel IGCSE Mathematics. The programmes support students currently preparing for IGCSE examinations, students seeking stronger mathematical foundations before entering examination years, and students pursuing accelerated pathways or early entry examination routes offered by some schools. #WeReallyDoMaths is designed to support long-term mathematical development through structured routines, deliberate practice, guided feedback, and consistent preparation over time.",
      },
      {
        question: "Which examination board is covered?",
        answer:
          "#WeReallyDoMaths currently focuses on students preparing for Pearson Edexcel International GCSE Mathematics A (4MA1) Higher Tier on the linear pathway for grades 9–1. Teaching, practice materials, retrieval activities, and exam preparation are structured around the expectations, style, sequencing, and demands of the Edexcel 4MA1 specification and examination papers. The programmes are designed to support long-term preparation for final linear examinations through consistent deliberate practice, structured revision, and progressive mathematical development over time.",
      },
      {
        question: "How are lessons delivered?",
        answer:
          "Lessons are delivered fully online through structured live teaching sessions combined with guided independent practice, Google Classroom resources, written mathematical working, and ongoing feedback cycles. Students participate in weekly live sessions designed around explanation, modelling, deliberate practice, exam technique, and mathematical reasoning.",
      },
      {
        question: "Are lessons live or pre-recorded?",
        answer:
          "Students receive short pre-teaching videos before live lessons to introduce key concepts, methods, and vocabulary in advance. These structured preparation materials help students arrive better prepared for deeper mathematical discussion and problem-solving during live sessions. Live lessons themselves are delivered online by an experienced qualified Mathematics teacher and focus on guided instruction, exam technique, reasoning, deliberate practice, and interactive worked examples.",
      },
      {
        question: "What happens if a student misses a lesson?",
        answer:
          "Students remain responsible for engaging with lesson materials, practice tasks, and preparation resources provided through Google Classroom. Where appropriate, students may review shared resources, complete independent practice, and use office hour support to address gaps in understanding and maintain progress within the programme sequence.",
      },
      {
        question: "How much independent study is expected?",
        answer:
          "Consistent independent practice is an important part of long-term mathematical improvement. Students are expected to complete structured exam-style practice, revisit prior learning regularly, review feedback carefully, and engage with preparation materials between live sessions. Weekly routines and deliberate practice play a significant role in long-term progress and confidence development.",
      },
      {
        question: "How does AI-assisted feedback work?",
        answer:
          "AI-assisted feedback systems are used to support analysis of mathematical working, identify misconceptions, highlight inefficient methods, and improve written mathematical communication. AI tools are used to support, not replace, teacher guidance and structured feedback processes.",
      },
      {
        question: "Are students expected to submit written mathematical working?",
        answer:
          "Yes. Students are expected to upload written mathematical working regularly through Google Classroom. Reviewing written solutions allows deeper analysis of reasoning, working structure, notation, communication, and exam-method accuracy beyond final answers alone.",
      },
      {
        question: "How are weaker topic areas identified?",
        answer:
          "Weaker areas are identified through structured exam practice, retrieval activities, lesson participation, written mathematical working, and ongoing feedback analysis. Weekly independent practice is completed through Dr Frost Maths, which provides students with immediate automated feedback while also generating Question Level Analysis (QLA) data to help #WeReallyDoMaths identify weaker topic areas, misconceptions, and patterns in student performance over time. Written mathematical working submitted through Google Classroom also helps identify more nuanced weaknesses beyond topic-specific performance alone, including gaps in reasoning, mathematical communication, working structure, notation accuracy, method selection, and exam technique. This allows students to focus deliberate practice more effectively and revisit topics requiring further reinforcement over time.",
      },
      {
        question: "What technology is required?",
        answer:
          "Students require a stable internet connection, a device suitable for live online lessons, access to Google Classroom, a dedicated mathematics notebook or organised folder for storing lesson notes, worked examples, retrieval practice, feedback, and programme resources, writing materials for regular mathematical working, and the ability to upload scanned or photographed written mathematical working. A scientific calculator appropriate for Higher Tier Edexcel IGCSE Mathematics is also recommended.",
      },
    ].map((faq, index) => (
      <div
        key={index}
        className="rounded-[2rem] border border-yellow-400/15 bg-black/70 p-8 backdrop-blur-md"
      >
        <h3 className="text-2xl font-bold text-white">
          {faq.question}
        </h3>

        <p className="mt-5 leading-8 text-slate-300">
          {faq.answer}
        </p>
      </div>
    ))}
  </div>
</section> 
<section id="parents" className="relative z-10 mx-auto max-w-7xl px-6 pb-32">
  <div className="mx-auto max-w-4xl text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
      FOR PARENTS
    </p>

    <h2 className="mt-4 text-4xl font-bold md:text-6xl">
      Structured Support For Long-Term Mathematical Development
    </h2>

    <p className="mt-8 text-lg leading-8 text-slate-300 md:text-xl">
      #WeReallyDoMaths is designed around the belief that long-term
      mathematical progress is built through consistency, deliberate
      practice, structured feedback, and sustained routines over time.
    </p>
  </div>

  <div className="mt-20 grid gap-6 md:grid-cols-2">
    {[
      {
        title: "Consistent Weekly Structure",
        text: "Students engage with a structured weekly cycle of preparation, live instruction, independent practice, feedback, and reflection designed to support long-term mathematical progress and stronger examination performance over time.",
      },
      {
        title: "Deliberate Practice And Accountability",
        text: "Students are expected to complete regular independent mathematical practice between sessions. Weekly routines and consistent engagement play an important role in developing fluency, confidence, reasoning, and long-term retention.",
      },
      {
        title: "Progress Monitoring",
        text: "Student performance is monitored through structured exam practice, retrieval activities, Question Level Analysis (QLA), written mathematical working, and ongoing feedback processes to help identify strengths, misconceptions, and areas requiring further reinforcement.",
      },
      {
        title: "Mathematical Communication And Reasoning",
        text: "The programme focuses not only on final answers, but also on mathematical reasoning, written communication, method selection, notation accuracy, and the ability to explain mathematical thinking clearly under exam conditions.",
      },
      {
        title: "Preparation Before Live Lessons",
        text: "Students receive short pre-teaching videos before live sessions to introduce key concepts and methods in advance. This allows live lesson time to focus more deeply on reasoning, guided practice, discussion, and exam-style application.",
      },
      {
        title: "A Calm And Academically Serious Environment",
        text: "The programmes are designed to create a focused, structured, and academically serious learning environment where students are encouraged to develop independence, resilience, consistency, and confidence through sustained mathematical effort over time.",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="rounded-[2rem] border border-yellow-400/15 bg-black/70 p-8 backdrop-blur-md"
      >
        <h3 className="text-2xl font-bold text-white">
          {item.title}
        </h3>

        <p className="mt-5 leading-8 text-slate-300">
          {item.text}
        </p>
      </div>
    ))}
  </div>

  <div className="mt-14 rounded-[2rem] border border-yellow-400/20 bg-black/75 p-10 text-center backdrop-blur-md">
    <p className="mx-auto max-w-5xl text-xl leading-9 text-slate-300 md:text-2xl">
      Strong mathematical confidence is usually developed through preparation,
      deliberate practice, meaningful feedback, and consistent routines over
      time.
    </p>
  </div>
</section>
      <section id="programmes" className="relative z-10 mx-auto max-w-7xl px-6 pb-32">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            PROGRAMME PATHWAYS
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
              1-Year Higher Tier Mastery Programme
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
              2-Year Higher Tier Mastery Programme
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

      <section id="apply" className="relative z-10 mx-auto max-w-7xl px-6 pb-32">
        <div className="rounded-[2.5rem] border border-yellow-400/20 bg-black/80 p-12 text-center backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            ENROLMENT
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            Join The 2026–2027 Cohort
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-slate-300 md:text-xl">
            Structured online coaching for Higher Tier Edexcel IGCSE
            Mathematics built around preparation, deliberate practice,
            meaningful feedback, and long-term mathematical mastery.
          </p>

          <div className="mt-12">
            <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center justify-center rounded-full bg-yellow-400 px-8 py-5 text-center text-base font-semibold leading-tight text-black transition hover:bg-yellow-300 sm:text-lg">
              Complete Enrolment Interest Form
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-yellow-400/20 bg-black/85">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold tracking-wide text-yellow-400">
              #WeReallyDoMaths
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              Structured online coaching for Higher Tier Edexcel IGCSE
              Mathematics designed around Mastery Cycles, guided exam practice,
              live online lessons, and long-term mathematical confidence.
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

              <a href="#programmes" className="transition hover:text-yellow-400">
                Programmes
              </a>
              <a href="/privacy-policy" className="transition hover:text-yellow-400">
  Privacy Policy
</a>
              <a href="/terms-and-conditions" className="transition hover:text-yellow-400">
  Terms & Conditions
</a>
              <a href="/refund-policy" className="transition hover:text-yellow-400">
  Refund Policy
</a>
              <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="transition hover:text-yellow-400">
                Enrolment
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Contact
            </p>

            <div className="mt-6 flex flex-col gap-4 text-sm text-slate-300">
              <a href="mailto:admin@wereallydomaths.info" className="transition hover:text-yellow-400">
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
              <a href="https://www.instagram.com/wereallydomaths.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-yellow-400">
                Instagram
              </a>

              <a href="https://www.tiktok.com/@wereallydomaths.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-yellow-400">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}