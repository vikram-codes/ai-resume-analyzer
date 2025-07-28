import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-700 border-green-300";
    if (score >= 60) return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-red-100 text-red-700 border-red-300";
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getScoreColor(score)}`}
    >
      <div
        className={`w-2 h-2 rounded-full ${score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
      ></div>
      {score}/100
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex items-center justify-between w-full py-4">
      <h4 className="text-xl font-semibold text-gray-900">{title}</h4>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  const goodTips = tips.filter((tip) => tip.type === "good");
  const improveTips = tips.filter((tip) => tip.type === "improve");

  return (
    <div className="space-y-6 pb-4">
      {goodTips.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h5 className="text-lg font-semibold text-green-800">Strengths</h5>
          </div>
          <div className="space-y-4">
            {goodTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-green-100"
              >
                <h6 className="font-medium text-green-800 mb-2">{tip.tip}</h6>
                <p className="text-green-700 text-sm leading-relaxed">
                  {tip.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {improveTips.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L12.732 4.5c-.77-.833-2.694-.833-3.464 0L1.349 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h5 className="text-lg font-semibold text-amber-800">
              Areas for Improvement
            </h5>
          </div>
          <div className="space-y-4">
            {improveTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-amber-100"
              >
                <h6 className="font-medium text-amber-800 mb-2">{tip.tip}</h6>
                <p className="text-amber-700 text-sm leading-relaxed">
                  {tip.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="space-y-2">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Detailed Feedback
        </h3>
        <p className="text-gray-600">
          In-depth analysis and recommendations for each category of your resume
        </p>
      </div>

      <Accordion>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="📝 Content Quality"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="🏗️ Structure & Format"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="✨ Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="🎯 Skills Presentation"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
