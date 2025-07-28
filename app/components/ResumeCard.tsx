import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

function ResumeCard({
  resume: { id, jobTitle, companyName, feedback, imagePath },
}: {
  resume: Resume;
}) {
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  return (
    <Link to={`/resume/${id}`} className="card no-underline text-inherit block">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            {jobTitle}
          </h3>
          <p className="text-gray-600 text-sm">{companyName}</p>
        </div>

        <div className="flex flex-col items-center">
          <ScoreCircle score={feedback.overallScore} />
          <span
            className={`text-xs font-medium mt-2 ${getScoreColorClass(feedback.overallScore)}`}
          >
            {getScoreLabel(feedback.overallScore)}
          </span>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 p-4">
        <img
          src={imagePath}
          alt="Resume preview"
          className="w-full h-48 object-cover object-top rounded-lg transition-transform duration-200 hover:scale-[1.02]"
        />
      </div>

      <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-gray-500 text-xs">ATS Score</span>
            <div className="font-semibold text-gray-900">
              {feedback.ATS.score}/100
            </div>
          </div>
          <div>
            <span className="text-gray-500 text-xs">Content</span>
            <div className="font-semibold text-gray-900">
              {feedback.content.score}/100
            </div>
          </div>
        </div>

        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className="text-indigo-600 transition-transform duration-200 hover:translate-x-0.5"
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
