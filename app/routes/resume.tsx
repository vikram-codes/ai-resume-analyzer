import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
  { title: "Resume Analysis - ResuMind" },
  { name: "description", content: "Detailed AI analysis of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
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
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };

    loadResume();
  }, [id]);

  return (
    <main>
      <nav className="navbar">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1rem",
          }}
        >
          <Link
            to="/"
            className="flex items-center"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              color: "var(--color-text-secondary)",
              transition: "color 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.color = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-secondary)")
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                background: "var(--color-surface-secondary)",
                border: "1px solid var(--color-border)",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "var(--color-primary)";
                e.currentTarget.style.borderColor = "var(--color-primary)";
                const svg = e.currentTarget.querySelector("svg");
                if (svg) svg.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "var(--color-surface-secondary)";
                e.currentTarget.style.borderColor = "var(--color-border)";
                const svg = e.currentTarget.querySelector("svg");
                if (svg) svg.style.color = "var(--color-text-secondary)";
              }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  color: "var(--color-text-secondary)",
                  transition: "color 0.2s ease",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            <span style={{ fontWeight: "500" }}>Back to Home</span>
          </Link>
          <div className="text-center">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "0.25rem",
              }}
            >
              Resume Analysis
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-tertiary)",
                margin: 0,
              }}
            >
              AI-powered insights and recommendations
            </p>
          </div>
          <div style={{ width: "140px" }}></div>
        </div>
      </nav>

      <div
        className="container"
        style={{
          display: "flex",
          gap: "2rem",
          padding: "2rem 1rem",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <aside style={{ width: "350px", flexShrink: 0 }}>
          <div
            className="card-elevated"
            style={{
              position: "sticky",
              top: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2rem",
            }}
          >
            {imageUrl && resumeUrl ? (
              <div style={{ width: "100%", maxWidth: "280px" }}>
                <div
                  style={{
                    background: "white",
                    borderRadius: "1rem",
                    padding: "1rem",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                    border: "1px solid var(--color-border-light)",
                  }}
                >
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      cursor: "pointer",
                      borderRadius: "0.75rem",
                      overflow: "hidden",
                      transition: "transform 0.2s ease",
                    }}
                    title="Click to view original PDF"
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.02)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <img
                      src={imageUrl}
                      alt="Resume preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </a>
                </div>
                <div className="text-center mt-4">
                  <p
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
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
                    Click to view full PDF
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    margin: "0 auto 1.5rem",
                    border: "2px solid var(--color-primary)",
                    background: "var(--color-surface-secondary)",
                  }}
                >
                  <img
                    src="/images/resume-scan-2.gif"
                    alt="Loading resume"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      color: "var(--color-text-primary)",
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Loading resume...
                  </p>
                  <p
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontSize: "0.875rem",
                    }}
                  >
                    Preparing your document
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>

        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                marginBottom: "0.75rem",
              }}
            >
              Analysis Results
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--color-text-secondary)",
              }}
            >
              Comprehensive AI feedback to optimize your resume performance
            </p>
          </div>

          {feedback ? (
            <div
              className="fade-in"
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <div className="card-elevated">
                <Summary feedback={feedback} />
              </div>

              <div className="card-elevated">
                <ATS
                  score={feedback.ATS?.score || 0}
                  suggestions={feedback.ATS?.tips || []}
                />
              </div>

              <div className="card-elevated">
                <Details feedback={feedback} />
              </div>
            </div>
          ) : (
            <div
              className="card-elevated text-center"
              style={{ padding: "4rem 2rem" }}
            >
              <div
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  margin: "0 auto 2rem",
                  border: "2px solid var(--color-primary)",
                  background: "var(--color-surface-secondary)",
                }}
              >
                <img
                  src="/images/resume-scan-2.gif"
                  alt="Analyzing resume"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    color: "var(--color-primary)",
                  }}
                >
                  Analyzing your resume...
                </h3>
                <p
                  style={{
                    fontSize: "1.125rem",
                    color: "var(--color-text-secondary)",
                    maxWidth: "500px",
                    margin: "0 auto 2rem",
                  }}
                >
                  Our AI is carefully reviewing your resume and generating
                  detailed feedback
                </p>
                <div className="flex justify-center items-center gap-2">
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "var(--color-primary)",
                      borderRadius: "50%",
                      animation: "bounce 1.5s infinite",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "var(--color-primary)",
                      borderRadius: "50%",
                      animation: "bounce 1.5s infinite 0.1s",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "var(--color-primary)",
                      borderRadius: "50%",
                      animation: "bounce 1.5s infinite 0.2s",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }
        @media (max-width: 768px) {
          .container > div {
            flex-direction: column;
          }
          aside {
            width: 100% !important;
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>
    </main>
  );
};

export default Resume;
