import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants/index";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeTrack" },
    { name: "description", content: "Welcome to ResumeTrack!" },
  ];
}

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track your Applications & Resume ratings</h1>
          <h2>Review your submission and get AI-powered feedback</h2>
        </div>

        <div className="resumes-section">
          {resumes?.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      </section>
    </main>
  );
}
