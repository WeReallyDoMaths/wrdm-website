export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] px-6 py-10 text-[#19253A] md:py-14">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#927020]/20 pb-6">
          <a
            href="/"
            className="text-lg font-semibold tracking-wide text-[#927020]"
          >
            #WRDM
          </a>

          <a
            href="/"
            className="text-sm font-medium text-[#4D5D73] transition hover:text-[#927020]"
          >
            ← Back to home
          </a>
        </header>

        <div className="pb-8 pt-10 md:pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#927020]">
            #WEREALLYDOMATHS
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Refund &amp; Cancellation Policy
          </h1>

          <p className="mt-4 text-sm text-[#4D5D73]">
            Last updated: August 2026
          </p>
        </div>

        <article className="space-y-8 rounded-2xl border border-[#927020]/20 bg-white px-6 py-8 shadow-[0_8px_32px_rgba(23,35,56,0.035)] md:px-10 md:py-10">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">
              1. Introduction
            </h2>

            <p className="mt-3 leading-8 text-[#4D5D73]">
              This Refund &amp; Cancellation Policy outlines the general approach
              to enrolment cancellations, programme withdrawals, and fee
              arrangements for educational services provided through
              #WeReallyDoMaths.
            </p>
          </section>

          <section className="border-t border-[#EAE6DC] pt-8">
            <h2 className="text-xl font-semibold tracking-tight">
              2. Enrolment And Programme Places
            </h2>

            <p className="mt-3 leading-8 text-[#4D5D73]">
              Student places within programmes are limited. Enrolment and fee
              arrangements help reserve and secure participation within a
              structured programme pathway.
            </p>
          </section>

          <section className="border-t border-[#EAE6DC] pt-8">
            <h2 className="text-xl font-semibold tracking-tight">
              3. Cancellation Requests
            </h2>

            <p className="mt-3 leading-8 text-[#4D5D73]">
              Requests to withdraw from a programme should be communicated in
              writing by a parent or guardian as early as reasonably possible.
            </p>

            <p className="mt-3 leading-8 text-[#4D5D73]">
              Where possible, reasonable notice is appreciated to support
              programme planning and organisation.
            </p>
          </section>

          <section className="border-t border-[#EAE6DC] pt-8">
            <h2 className="text-xl font-semibold tracking-tight">
              4. Refund Considerations
            </h2>

            <p className="mt-3 leading-8 text-[#4D5D73]">
              Refund decisions may depend on factors including programme start
              dates, timing of withdrawal, accessed learning resources,
              delivered lessons, and administrative commitments already made.
            </p>

            <p className="mt-3 leading-8 text-[#4D5D73]">
              Requests relating to exceptional circumstances may be considered
              on a case-by-case basis where appropriate.
            </p>
          </section>

          <section className="border-t border-[#EAE6DC] pt-8">
            <h2 className="text-xl font-semibold tracking-tight">
              5. Missed Lessons
            </h2>

            <p className="mt-3 leading-8 text-[#4D5D73]">
              Missed live lessons, office hours, or independent practice
              sessions resulting from student absence are generally not
              refundable.
            </p>

            <p className="mt-3 leading-8 text-[#4D5D73]">
              Students may continue accessing available programme materials,
              resources, and support systems where appropriate.
            </p>
          </section>

          <section className="border-t border-[#EAE6DC] pt-8">
            <h2 className="text-xl font-semibold tracking-tight">
              6. Programme Changes
            </h2>

            <p className="mt-3 leading-8 text-[#4D5D73]">
              #WeReallyDoMaths reserves the right to make reasonable changes to
              scheduling, programme structure, educational systems, resources,
              or delivery arrangements where necessary.
            </p>
          </section>

          <section className="border-t border-[#EAE6DC] pt-8">
            <h2 className="text-xl font-semibold tracking-tight">
              7. Contact
            </h2>

            <p className="mt-3 leading-8 text-[#4D5D73]">
              For questions regarding cancellations or refund-related matters,
              please contact:
            </p>

            <a
              href="mailto:admin@wereallydomaths.info"
              className="mt-4 inline-block break-all font-semibold text-[#927020] underline decoration-[#927020]/30 underline-offset-4 transition hover:decoration-[#927020]"
            >
              admin@wereallydomaths.info
            </a>
          </section>
        </article>

        <footer className="mt-8 flex flex-wrap gap-x-6 gap-y-3 pb-4 text-sm text-[#4D5D73]">
          <a
            href="/privacy-policy"
            className="transition hover:text-[#927020]"
          >
            Privacy Policy
          </a>

          <a
            href="/terms-and-conditions"
            className="transition hover:text-[#927020]"
          >
            Terms &amp; Conditions
          </a>
        </footer>
      </div>
    </main>
  );
}