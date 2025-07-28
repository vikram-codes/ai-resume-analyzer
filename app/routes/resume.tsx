import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
  { title: "Resume Analysis Results - ResuMind AI Insights" },
  { name: "description", content: "View your comprehensive AI-powered resume analysis with detailed feedback, ATS scoring, and actionable recommendations for improvement." },
  { name: "robots", content: "noindex, nofollow" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [activeTab, setActiveTab] = useState("summary");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
    };

    loadResume();
  }, [id]);

  const tabs = [
    { id: "summary", label: "Summary", icon: "📊" },
    { id: "ats", label: "ATS Score", icon: "🎯" },
    { id: "details", label: "Detailed Feedback", icon: "📝" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-36">
            <Link
              to="/"
              className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition-colors group"
            >
              <div className="w-10 h-10 bg-gray-100 group-hover:bg-indigo-100 rounded-full flex items-center justify-center transition-colors">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="text-gray-600 group-hover:text-indigo-600 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">
                Resume Analysis
              </h1>
              <p className="text-sm text-gray-500">AI-powered insights</p>
            </div>

            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col-reverse lg:flex-row w-full">
        <section className="lg:w-2/5 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen lg:sticky lg:top-16 flex items-start justify-center p-6 pt-8">
          {imageUrl && resumeUrl ? (
            <div className="w-full max-w-md animate-fade-in sticky top-6">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-indigo-200">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Resume Preview
                  </h3>
                  <p className="text-sm text-gray-600">
                    Click to view full document
                  </p>
                </div>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={imageUrl}
                      alt="Resume preview"
                      className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          className="text-gray-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Click to open PDF
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center sticky top-6">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-indigo-200">
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-indigo-100 flex items-center justify-center">
                  <img
                    src="/images/resume-scan-2.gif"
                    alt="Loading resume"
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Loading Resume
                </h3>
                <p className="text-sm text-gray-600">
                  Preparing your document...
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="lg:w-3/5 bg-white p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Resume Analysis
              </h2>
              <p className="text-gray-600 text-lg">
                Comprehensive AI-powered feedback on your resume
              </p>
            </div>

            {feedback ? (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{tab.icon}</span>
                          {tab.label}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {activeTab === "summary" && (
                      <div className="animate-fade-in">
                        <Summary feedback={feedback} />
                      </div>
                    )}

                    {activeTab === "ats" && (
                      <div className="animate-fade-in">
                        <ATS
                          score={feedback.ATS?.score || 0}
                          suggestions={feedback.ATS?.tips || []}
                        />
                      </div>
                    )}

                    {activeTab === "details" && (
                      <div className="animate-fade-in">
                        <Details feedback={feedback} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <img
                    src="/images/resume-scan-2.gif"
                    alt="Analyzing resume"
                    className="w-24 h-24 object-cover rounded-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Analyzing Your Resume
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Our AI is carefully reviewing your resume and generating
                  detailed feedback
                </p>
                <div className="flex justify-center items-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
