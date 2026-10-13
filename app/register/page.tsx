import Image from "next/image";

export const metadata = {
  title: "Free Trial Week Registration | We Really Do Maths",
  description: "Register your interest in our free GCSE and IGCSE maths trial week.",
};

const FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSe5rZYmA0RoxtyCp3eCZHrrQcv0udhS-MVfyAozyDhWDtEITA/viewform?hl=en";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF9] text-[#172338] [color-scheme:light]">
      <header className="border-b border-[#927020]/20 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="/" className="flex items-center gap-3 font-semibold text-[#927020]" aria-label="We Really Do Maths home">
            <Image src="/wrdm-logo.png" alt="" width={837} height={817} className="h-auto w-12 rounded-full" sizes="48px" />
            <span>#WRDM</span>
          </a>
          <a href="/" className="rounded-lg border border-[#DED6C2] px-4 py-2 text-sm font-medium hover:bg-[#EEE4CB] focus-visible:outline-2 focus-visible:outline-[#927020]">Back to home</a>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-3 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-3xl px-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#927020]">Free Trial Week</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">Register Your Interest</h1>
          <p className="mt-5 text-base leading-relaxed text-slate-600">Join our free introduction week from 1 November 2026 and explore our GCSE and IGCSE maths courses. Register below to receive joining details and information about your chosen course.</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">The free sessions are on 1 November (3:00–4:15 pm UAE / 11:00 am–12:15 pm UK), 5 November (6:00–7:15 pm UAE / 2:00–3:15 pm UK), and 7 November for parents (2:00–3:00 pm UAE / 10:00–11:00 am UK). UK times are GMT. There is no obligation to join a paid course. Paid-course dates and fees will be shared before enrolment.</p>
        </div>
        <div className="mt-8 overflow-hidden rounded-xl border border-[#DED6C2] bg-white">
          <iframe src={`${FORM_LINK}&embedded=true`} title="We Really Do Maths free trial week registration form" className="block h-[2200px] w-full border-0 sm:h-[1850px]" />
        </div>
        <p className="mt-5 px-2 text-center text-sm leading-relaxed text-slate-600">If the form does not load, <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="text-[#927020] underline underline-offset-4">open it in a new tab</a>.</p>
      </main>
      <footer className="border-t border-[#DED6C2] px-5 py-6 text-center text-sm text-slate-600">
        <a href="/" className="font-medium text-[#927020]">We Really Do Maths</a>
        <span className="mx-3">·</span>
        <a href="/privacy-policy" className="underline underline-offset-4">Privacy Policy</a>
      </footer>
    </div>
  );
}

