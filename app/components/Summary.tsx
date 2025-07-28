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
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(300%) skewX(-12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
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

        <div className="grid gap-6">
          {categories.map((category, index) => (
            <div
              key={category.key}
              className="group relative overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div
                className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${getScoreColor(category.score)}22, ${getScoreColor(category.score)}11)`,
                }}
              />

              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-3 h-3 rounded-full shadow-lg"
                        style={{
                          backgroundColor: getScoreColor(category.score),
                        }}
                      />
                      <h5 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                        {category.name}
                      </h5>
                    </div>
                    <p className="text-sm text-gray-500 ml-6">
                      Performance: {getScoreLabel(category.score)}
                    </p>
                  </div>

                  <div className="text-right">
                    <div
                      className="text-3xl font-bold mb-1 transition-all duration-300"
                      style={{ color: getScoreColor(category.score) }}
                    >
                      {category.score}
                    </div>
                    <div className="text-xs text-gray-400 font-medium">
                      / 100
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                      style={{
                        width: `${category.score}%`,
                        background: `linear-gradient(90deg, ${getScoreColor(category.score)}, ${getScoreColor(category.score)}aa, ${getScoreColor(category.score)}dd)`,
                        boxShadow: `0 0 10px ${getScoreColor(category.score)}40`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/40 to-transparent rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-3">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 group-hover:scale-105"
                    style={{
                      backgroundColor: `${getScoreColor(category.score)}15`,
                      borderColor: `${getScoreColor(category.score)}30`,
                      color: getScoreColor(category.score),
                    }}
                  >
                    {category.score >= 90
                      ? "🚀 Outstanding"
                      : category.score >= 80
                        ? "⭐ Excellent"
                        : category.score >= 70
                          ? "👍 Good"
                          : category.score >= 60
                            ? "⚠️ Fair"
                            : "❌ Needs Work"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Summary;
