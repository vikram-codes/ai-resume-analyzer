import ScoreCircle from "./ScoreCircle";

function Summary({ feedback }) {
  const getScoreColor = (score) => {
    if (score >= 80) return "var(--color-success)";
    if (score >= 60) return "var(--color-warning)";
    return "var(--color-error)";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  const categories = [
    { name: "ATS Compatibility", score: feedback.ATS?.score || 0, key: "ATS" },
    {
      name: "Content Quality",
      score: feedback.content?.score || 0,
      key: "content",
    },
    {
      name: "Structure & Format",
      score: feedback.structure?.score || 0,
      key: "structure",
    },
    {
      name: "Tone & Style",
      score: feedback.toneAndStyle?.score || 0,
      key: "toneAndStyle",
    },
    {
      name: "Skills Presentation",
      score: feedback.skills?.score || 0,
      key: "skills",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">
          Resume Analysis Summary
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          Here's an overview of your resume's performance across key areas that
          matter to employers and ATS systems.
        </p>
      </div>

      <div className="flex items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl mb-8 border border-gray-200">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <ScoreCircle score={feedback.overallScore || 0} />
          </div>
          <h4 className="text-2xl font-semibold mb-2 text-gray-900">
            Overall Score
          </h4>
          <p
            className="text-lg font-medium mb-2"
            style={{ color: getScoreColor(feedback.overallScore || 0) }}
          >
            {getScoreLabel(feedback.overallScore || 0)}
          </p>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Based on analysis of content, structure, ATS compatibility, and
            industry standards
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-xl font-semibold mb-6 text-gray-900">
          Category Breakdown
        </h4>

        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <div
              key={category.key}
              className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex-1">
                <h5 className="text-base font-medium mb-1 text-gray-900">
                  {category.name}
                </h5>
                <p className="text-sm text-gray-500 m-0">
                  {category.score}/100 points
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-[100px] h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300 ease-out"
                    style={{
                      width: `${category.score}%`,
                      background: `linear-gradient(90deg, ${getScoreColor(category.score)}, ${getScoreColor(category.score)}dd)`,
                    }}
                  />
                </div>

                <span
                  className="text-base font-semibold min-w-[45px] text-right"
                  style={{ color: getScoreColor(category.score) }}
                >
                  {category.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Summary;
