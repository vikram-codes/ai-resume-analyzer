import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  selectedFile?: File | null;
}

function FileUploader({
  onFileSelect,
  selectedFile = null,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 20 * 1024 * 1024,
  });

  const file = selectedFile;

  return (
    <div className="uploader-drag-area">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {file ? (
          <div
            className="flex flex-col items-center justify-center"
            style={{ gap: "1rem" }}
          >
            <svg
              width="48"
              height="48"
              fill="var(--color-success)"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-center">
              <p
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "var(--color-success)",
                  marginBottom: "0.5rem",
                }}
              >
                File uploaded successfully
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-primary)",
                  fontWeight: "500",
                  marginBottom: "0.25rem",
                }}
              >
                {file.name}
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-tertiary)",
                }}
              >
                {formatSize(file.size)} • Click to change
              </p>
            </div>
          </div>
        ) : isDragActive ? (
          <div
            className="flex flex-col items-center justify-center"
            style={{ gap: "1rem" }}
          >
            <svg
              width="48"
              height="48"
              fill="var(--color-primary)"
              viewBox="0 0 24 24"
              style={{ animation: "bounce 1s infinite" }}
            >
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <div className="text-center">
              <p
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "var(--color-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                Drop your resume here
              </p>
              <p
                style={{ fontSize: "0.875rem", color: "var(--color-primary)" }}
              >
                Release to upload
              </p>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center"
            style={{ gap: "1rem" }}
          >
            <svg
              width="48"
              height="48"
              fill="var(--color-text-tertiary)"
              viewBox="0 0 24 24"
            >
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="text-center">
              <p
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "var(--color-text-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                Upload your resume
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  marginBottom: "0.5rem",
                }}
              >
                Drag and drop or click to browse
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-tertiary)",
                }}
              >
                PDF, DOC, DOCX up to 20MB
              </p>
            </div>
          </div>
        )}
      </div>
      {file && (
        <button
          type="button"
          onClick={() => onFileSelect?.(null)}
          className="btn-secondary"
          style={{
            marginTop: "1rem",
            width: "100%",
            color: "var(--color-error)",
            borderColor: "var(--color-error)",
            background: "var(--color-surface)",
          }}
        >
          Remove file
        </button>
      )}
    </div>
  );
}

export default FileUploader;
