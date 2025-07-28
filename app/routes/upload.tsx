import { useState } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";

function upload() {
  const upload = false;
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    if (selectedFile) {
      setStatusText(`Selected file: ${selectedFile.name}`);
    } else {
      setStatusText("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all required fields are filled
    if (!formData.companyName.trim()) {
      alert("Please enter a company name");
      return;
    }

    if (!formData.jobTitle.trim()) {
      alert("Please enter a job title");
      return;
    }

    if (!formData.jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }

    if (!file) {
      alert("Please select a resume file");
      return;
    }

    // Create FormData for file upload
    const submitFormData = new FormData();
    submitFormData.append("companyName", formData.companyName);
    submitFormData.append("jobTitle", formData.jobTitle);
    submitFormData.append("jobDescription", formData.jobDescription);
    submitFormData.append("resume", file);

    console.log("Form submitted successfully:", {
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      file: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    // Set processing state
    setIsProcessing(true);
    setStatusText("Processing resume...");

    // Simulate processing (remove this when you add real backend)
    setTimeout(() => {
      setIsProcessing(false);
      setStatusText("Resume analysis complete!");
    }, 2000);
  };

  return (
    <main>
      <Navbar upload={upload} />
      <section className="main-section">
        <div className="page-heading">
          <h1>Smart Feedback for your Dream Job</h1>
          <h2>Get AI-powered feedback on your resume</h2>
        </div>

        <div className="w-full max-w-2xl mt-12">
          <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-div">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Google, Meta, Apple"
                    className="w-full p-4 bg-gray-900 text-slate-100 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="form-div">
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium mb-2"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Software Engineer"
                    className="w-full p-4 bg-gray-900 text-slate-100 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="form-div">
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium mb-2"
                >
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Paste the full job description here..."
                  rows={8}
                  className="w-full p-4 bg-gray-900 text-slate-100 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                  required
                />
              </div>

              <div className="form-div">
                <label className="block text-sm font-medium mb-2">
                  Upload Resume
                </label>
                <FileUploader
                  onFileSelect={handleFileSelect}
                  selectedFile={file}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full cursor-pointer font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform shadow-lg ${
                    isProcessing
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-[1.02] hover:shadow-blue-500/25"
                  }`}
                >
                  {isProcessing ? "Analyzing..." : "Analyze Resume"}
                </button>
                {statusText && (
                  <p className="text-center text-sm text-slate-400 mt-3">
                    {statusText}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default upload;
