import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

function ResumeCard({
  resume: { id, jobTitle, companyName, feedback, imagePath },
}: {
  resume: Resume;
}) {
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000 mt-8"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2>{jobTitle}</h2>
          <h3 className="text-gray-400 text-lg break-words">{companyName}</h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      <div className="gradient-border animate-in fade-in duration-3000">
        <div className="w-full h-full">
          <img
            src={imagePath}
            alt="resume"
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
}

export default ResumeCard;
