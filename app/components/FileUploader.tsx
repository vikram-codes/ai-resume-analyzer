import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

function FileUploader({ onFileSelect, selectedFile = null }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
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
    maxSize: 20 * 1024 * 1024, // 20MB
  });

  const file = selectedFile;

  return (
    <div className="uploader-drag-area">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {file ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <svg
              className="w-12 h-12 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-center">
              <p className="text-lg font-medium text-green-400">
                File selected successfully
              </p>
              <p className="text-sm text-slate-300 mt-1 font-medium">
                {file.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatSize(file.size)} • Click to change
              </p>
            </div>
          </div>
        ) : isDragActive ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <svg
              className="w-12 h-12 text-blue-400 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
            <div className="text-center">
              <p className="text-lg font-medium text-blue-400">
                Drop your resume here
              </p>
              <p className="text-sm text-blue-300 mt-1">Release to upload</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="text-center">
              <p className="text-lg font-medium text-slate-300">
                Upload your resume
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-gray-500 mt-2">
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
          className="mt-3 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors duration-200 border border-red-400/20 hover:border-red-400/40"
        >
          Remove file
        </button>
      )}
    </div>
  );
}

export default FileUploader;
