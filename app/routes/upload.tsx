import { prepareInstructions } from "../../constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Upload Resume - ResuMind AI Analysis Tool" },
  { name: "description", content: "Upload your resume for comprehensive AI-powered analysis including ATS scoring, expert feedback, and optimization recommendations." },
  { name: "robots", content: "noindex, nofollow" },
];

const generateSampleFeedback = (jobTitle?: string, jobDescription?: string) => {
  return {
    overallScore: Math.floor(Math.random() * 25) + 70,
    ATS: {
      score: Math.floor(Math.random() * 20) + 75,
      tips: [
        {
          type: "good" as const,
          tip: "Your resume includes relevant keywords that align well with common ATS systems.",
        },
        {
          type: "improve" as const,
          tip: "Consider adding more industry-specific keywords from the job description to improve ATS compatibility.",
        },
      ],
    },
    toneAndStyle: {
      score: Math.floor(Math.random() * 20) + 75,
      tips: [
        {
          type: "good" as const,
          tip: "Professional tone maintained throughout the document.",
          explanation: "Your resume maintains a consistent professional voice.",
        },
        {
          type: "improve" as const,
          tip: "Consider using more action-oriented language to describe achievements.",
          explanation:
            "Strong action verbs can make your accomplishments more impactful.",
        },
      ],
    },
    content: {
      score: Math.floor(Math.random() * 20) + 75,
      tips: [
        {
          type: "good" as const,
          tip: "Clear structure with well-organized sections.",
          explanation:
            "Your resume follows a logical flow that's easy for recruiters to follow.",
        },
        {
          type: "improve" as const,
          tip: jobTitle
            ? `Add more specific achievements related to ${jobTitle} role.`
            : "Include more quantified achievements with specific metrics.",
          explanation:
            "Specific, measurable accomplishments demonstrate your impact more effectively.",
        },
      ],
    },
    structure: {
      score: Math.floor(Math.random() * 20) + 75,
      tips: [
        {
          type: "good" as const,
          tip: "Consistent formatting and clear section headers.",
          explanation: "Good use of formatting makes your resume easy to scan.",
        },
        {
          type: "improve" as const,
          tip: "Consider optimizing white space for better readability.",
          explanation:
            "Proper spacing can improve the visual appeal of your resume.",
        },
      ],
    },
    skills: {
      score: Math.floor(Math.random() * 20) + 75,
      tips: [
        {
          type: "good" as const,
          tip: "Relevant technical skills are clearly listed.",
          explanation:
            "Your skills section showcases key competencies for your field.",
        },
        {
          type: "improve" as const,
          tip: jobDescription
            ? "Consider adding skills mentioned in the job description."
            : "Add more specific technical competencies relevant to your target role.",
          explanation:
            "Aligning your skills with job requirements can improve your match rate.",
        },
      ],
    },
  };
};

function upload() {
  const upload = false;
  const { auth, fs, isLoading, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
  });

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/upload");
    }
  }, [auth.isAuthenticated]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (selectedFile: any) => {
    setFile(selectedFile);
    if (selectedFile) {
      setStatusText(`Selected file: ${selectedFile.name}`);
    } else {
      setStatusText("");
    }
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusText("Error: Failed to convert PDF to image");

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image");

    setStatusText("Preparing data...");
    const uuid = crypto.randomUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...");

    let feedback;
    try {
      feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
      );
    } catch (aiError: any) {
      if (
        aiError?.code === "error_400_from_delegate" &&
        aiError?.message?.includes("Permission denied")
      ) {
        setStatusText(
          "AI service usage limit reached. Generating sample analysis for demonstration..."
        );

        const sampleFeedback = generateSampleFeedback(jobTitle, jobDescription);

        try {
          const parsedFeedback =
            typeof sampleFeedback === "string"
              ? JSON.parse(sampleFeedback)
              : sampleFeedback;

          if (
            !parsedFeedback.overallScore ||
            !parsedFeedback.ATS ||
            !parsedFeedback.content
          ) {
            throw new Error("Invalid feedback structure");
          }

          const updatedData = {
            ...data,
            feedback: parsedFeedback,
          };

          await kv.set(`resume:${uuid}`, JSON.stringify(updatedData));
          setStatusText("Sample analysis complete, redirecting...");
          navigate(`/resume/${uuid}`);
          return;
        } catch (parseError) {
          setStatusText(
            "Error: Failed to generate sample analysis. Please try again later."
          );
          return;
        }
      }

      setStatusText(
        "Error: AI service temporarily unavailable. Please try again in a few minutes."
      );
      return;
    }

    if (!feedback) return setStatusText("Error: Failed to analyze resume");

    try {
      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      let cleanedText = feedbackText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .replace(/^\s*[\r\n]/gm, "")
        .replace(/[\r\n]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const jsonStart = cleanedText.indexOf("{");
      const jsonEnd = cleanedText.lastIndexOf("}");

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
      }

      // Additional cleaning for common AI response issues
      cleanedText = cleanedText
        .replace(
          /\\"([^"]*)\\"([^"]*)\\"([^"]*)\\"([^"]*)\\"([^"]*)\\"([^"]*)\\"([^"]*)\\"([^"]*)\\"([^"]*)\\"([^"]*)\\"([^"]*)\\"/g,
          '\\"$1$2$3$4$5$6$7$8$9$10$11\\"'
        )
        .replace(/\\n/g, " ")
        .replace(/\\r/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      let parsedFeedback;
      try {
        parsedFeedback = JSON.parse(cleanedText);

        if (!parsedFeedback.overallScore || !parsedFeedback.ATS) {
          throw new Error("Missing required fields in response");
        }
      } catch (parseError) {

        try {
          let fixedText = cleanedText;

          // Fix common JSON issues
          fixedText = fixedText
            // Fix unquoted keys
            .replace(/([{,]\s*)(\w+):/g, '$1"$2":')
            // Fix unescaped quotes within strings
            .replace(
              /:\s*"([^"]*)"([^"]*)"([^"]*)"([^"]*)\"/g,
              (
                _match: string,
                g1: string,
                g2: string,
                g3: string,
                g4: string
              ) => {
                return `:"${g1}\\"${g2}\\"${g3}\\"${g4}"`;
              }
            )
            // Fix incomplete strings by finding unclosed quotes
            .replace(/"([^"]*)\n/g, '"$1"')
            // Fix trailing commas before closing brackets
            .replace(/,(\s*[}\]])/g, "$1")
            // Remove any incomplete JSON at the end
            .replace(/,\s*$/, "")
            // Ensure proper closure of objects/arrays
            .trim();

          // If the JSON appears to be cut off, try to close it properly
          const openBraces = (fixedText.match(/{/g) || []).length;
          const closeBraces = (fixedText.match(/}/g) || []).length;
          const openBrackets = (fixedText.match(/\[/g) || []).length;
          const closeBrackets = (fixedText.match(/\]/g) || []).length;

          // Add missing closing braces/brackets
          if (openBraces > closeBraces) {
            fixedText += "}}".repeat(openBraces - closeBraces);
          }
          if (openBrackets > closeBrackets) {
            fixedText += "]".repeat(openBrackets - closeBrackets);
          }

          // Remove any trailing incomplete properties
          fixedText = fixedText.replace(/,\s*"[^"]*"?\s*:\s*"[^"]*"?\s*$/, "");

          // Ensure it ends with closing brace
          if (!fixedText.endsWith("}")) {
            fixedText += "}";
          }

          parsedFeedback = JSON.parse(fixedText);
        } catch (fixError) {
          parsedFeedback = {
            overallScore: 50,
            ATS: {
              score: 45,
              tips: [
                {
                  type: "improve",
                  tip: "Resume analysis failed",
                  explanation:
                    "The AI analysis encountered an error. Please try uploading your resume again.",
                },
              ],
            },
            toneAndStyle: {
              score: 50,
              tips: [
                {
                  type: "improve",
                  tip: "Analysis incomplete",
                  explanation:
                    "Unable to complete tone and style analysis. Please retry.",
                },
              ],
            },
            content: {
              score: 50,
              tips: [
                {
                  type: "improve",
                  tip: "Content analysis failed",
                  explanation:
                    "Could not analyze resume content. Please try again.",
                },
              ],
            },
            structure: {
              score: 50,
              tips: [
                {
                  type: "improve",
                  tip: "Structure analysis incomplete",
                  explanation:
                    "Resume structure could not be fully analyzed. Please retry.",
                },
              ],
            },
            skills: {
              score: 50,
              tips: [
                {
                  type: "improve",
                  tip: "Skills analysis failed",
                  explanation:
                    "Unable to analyze skills section. Please try uploading again.",
                },
              ],
            },
          };
        }
      }

      const updatedData = { ...data, feedback: parsedFeedback };
      await kv.set(`resume:${uuid}`, JSON.stringify(updatedData));
      setStatusText("Analysis complete, redirecting...");
      navigate(`/resume/${uuid}`);
    } catch (error) {
      setStatusText(
        "Error: Failed to process analysis results. Please try again."
      );
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);

    const companyName = formData.get("companyName") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file) return;

    handleAnalyze({
      companyName,
      jobTitle,
      jobDescription,
      file,
    });
  };

  return (
    <main>
      <Navbar upload={upload} />

      <section className="section">
        <div className="container">
          <div className="text-center mb-8">
            <h1 style={{ marginBottom: "1.5rem" }}>Analyze Your Resume</h1>
            <p className="hero-subtitle">
              {statusText ||
                "Upload your resume and get comprehensive AI-powered feedback to improve your job application success rate."}
            </p>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="card-elevated">
              {isProcessing ? (
                <div className="text-center" style={{ padding: "3rem 1rem" }}>
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "1rem",
                      overflow: "hidden",
                      border: "2px solid var(--color-primary)",
                      margin: "0 auto 2rem",
                    }}
                  >
                    <img
                      src="/images/resume-scan.gif"
                      alt="Analyzing resume"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div className="flex justify-center items-center gap-2 mb-4">
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
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                        color: "var(--color-primary)",
                      }}
                    >
                      {statusText}
                    </h3>
                    <p style={{ color: "var(--color-text-secondary)" }}>
                      Please wait while our AI analyzes your resume...
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div className="grid grid-cols-2">
                    <div>
                      <label htmlFor="companyName">Company Name</label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Google, Meta, Apple"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="jobTitle">Job Title</label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="e.g. Software Engineer"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="jobDescription">Job Description</label>
                    <textarea
                      id="jobDescription"
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      placeholder="Paste the complete job description here for more accurate analysis..."
                      rows={6}
                      required
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <div>
                    <label>Upload Resume</label>
                    <FileUploader
                      onFileSelect={handleFileSelect}
                      selectedFile={file}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full"
                    style={{
                      padding: "1rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                    disabled={!file}
                  >
                    {!file ? "Please Upload Resume" : "Analyze Resume"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }
      `}</style>
    </main>
  );
}

export default upload;
