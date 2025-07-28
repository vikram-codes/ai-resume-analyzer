import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants/index";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMind - AI-Powered Resume Analysis & Optimization Tool" },
    {
      name: "description",
      content:
        "Get comprehensive AI-powered resume analysis with ATS scoring, expert feedback, and actionable insights to land your dream job. Free resume analyzer with instant results.",
    },
    {
      name: "keywords",
      content:
        "resume analysis, ATS checker, resume optimizer, job application, career tools, AI resume feedback, resume scanner, professional resume review",
    },
    {
      property: "og:title",
      content: "ResuMind - AI-Powered Resume Analysis Tool",
    },
    {
      property: "og:description",
      content:
        "Transform your resume with AI-powered insights, ATS scoring, and expert feedback to increase your job success rate.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "ResuMind - AI Resume Analysis Tool",
    },
    {
      name: "twitter:description",
      content:
        "Get instant AI-powered resume feedback and ATS scoring to optimize your job applications.",
    },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  return (
    <main>
      <Navbar />

      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Transform Your Resume with AI Intelligence
          </h1>
          <p className="hero-subtitle">
            Get comprehensive AI-powered feedback to optimize your resume for
            any job application. Stand out from the competition with actionable
            insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/upload" className="btn-primary">
              Analyze Resume
            </Link>
            <a href="#features" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose ResuMind?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI analysis that gives you the competitive edge in
              today's job market
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                ATS Optimization
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Ensure your resume passes through Applicant Tracking Systems
                with our specialized analysis and keyword optimization.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Instant Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Get detailed, comprehensive feedback in seconds, not days. Our
                AI processes your resume immediately with precision.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Smart Suggestions
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Get actionable recommendations tailored to your specific
                industry and target role for maximum impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {resumes && resumes.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Recent Analyses
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Review your previous resume submissions and track your
                improvements over time
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {resumes.slice(0, 3).map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>

            {resumes.length > 3 && (
              <div className="text-center mt-8">
                <Link
                  to="/dashboard"
                  className="inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View All Analyses ({resumes.length})
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  Ready to Boost Your Career?
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
                  Join thousands of professionals who have improved their
                  resumes and landed their dream jobs with ResuMind's AI-powered
                  insights.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/upload"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-12 py-4 rounded-full text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Start Your Analysis
                </Link>
                <p className="text-sm text-gray-500 sm:ml-4">
                  Free • No credit card required • Results in seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
