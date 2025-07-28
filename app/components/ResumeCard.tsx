import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

function ResumeCard({
  resume: { id, jobTitle, companyName, feedback, imagePath },
}: {
  resume: Resume;
}) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  return (
    <Link
      to={`/resume/${id}`}
      className="card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "var(--color-text-primary)",
            }}
          >
            {jobTitle}
          </h3>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "0.875rem",
            }}
          >
            {companyName}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <ScoreCircle score={feedback.overallScore} />
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "500",
              marginTop: "0.5rem",
              color: getScoreColor(feedback.overallScore),
            }}
          >
            {getScoreLabel(feedback.overallScore)}
          </span>
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: "1px solid var(--color-border)",
          background: "var(--color-surface-secondary)",
          padding: "1rem",
        }}
      >
        <img
          src={imagePath}
          alt="Resume preview"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: "0.5rem",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      <div
        className="mt-4 flex justify-between items-center"
        style={{
          paddingTop: "1rem",
          borderTop: "1px solid var(--color-border-light)",
        }}
      >
        <div className="flex gap-4 text-sm">
          <div>
            <span
              style={{
                color: "var(--color-text-tertiary)",
                fontSize: "0.75rem",
              }}
            >
              ATS Score
            </span>
            <div
              style={{ fontWeight: "600", color: "var(--color-text-primary)" }}
            >
              {feedback.ATS.score}/100
            </div>
          </div>
          <div>
            <span
              style={{
                color: "var(--color-text-tertiary)",
                fontSize: "0.75rem",
              }}
            >
              Content
            </span>
            <div
              style={{ fontWeight: "600", color: "var(--color-text-primary)" }}
            >
              {feedback.content.score}/100
            </div>
          </div>
        </div>

        <svg
          width="20"
          height="20"
          fill="none"
          stroke="var(--color-primary)"
          viewBox="0 0 24 24"
          style={{ transition: "transform 0.2s ease" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "translateX(2px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateX(0)")
          }
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}

export default ResumeCard;
