import type { Metadata } from "next";
import { ResumeDoc } from "@/components/sections/ResumeDoc";

// The résumé alone, at print size, for scripts/print-resume.sh to print to
// the PDF the Resume page offers. It sits outside /preview because headless
// Chrome cannot get past the password gate, and it gives nothing away: the
// PDF it produces is public at /ellie-thompson-resume.pdf anyway. Not linked
// from anywhere and not indexed.
export const metadata: Metadata = {
  title: "Resume (print)",
  robots: { index: false, follow: false },
};

export default function ResumePrintPage() {
  return (
    <>
      <style>{`
        @page { size: letter; margin: 0; }
        html, body { margin: 0; background: #fff; }
      `}</style>
      <ResumeDoc print />
    </>
  );
}
