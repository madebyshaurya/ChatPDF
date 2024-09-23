"use client";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { CircleArrowDown, RocketIcon, CheckCircleIcon, HammerIcon, SaveIcon } from "lucide-react";
import useUpload, { StatusText } from "@/hooks/useUpload";
import { useRouter } from "next/navigation";

const FileUploader = () => {
  const { progress, status, fileId, handleUpload } = useUpload();
  const router = useRouter();

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        await handleUpload(file);
      } else {
        // do nothing
        // toast...
      }
    },
    [handleUpload]
  );
  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
      },
      maxFiles: 1,
    });

  const uploadInProgress = progress != null && progress >= 0 && progress <= 100;

  const statusIcons: {
    [key in StatusText]: JSX.Element;
  } = {
    [StatusText.UPLOADING]: <RocketIcon className="w-20 h-20 text-indigo-600 dark:text-indigo-400" />,
    [StatusText.UPLOADED]: <CheckCircleIcon className="w-20 h-20 text-indigo-600 dark:text-indigo-400" />,
    [StatusText.SAVING]: <SaveIcon className="w-20 h-20 text-indigo-600 dark:text-indigo-400" />,
    [StatusText.GENERATING]: <HammerIcon className="w-20 h-20 text-indigo-600 dark:text-indigo-400 animate-bounce" />,
  }

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto cursor-pointer">
      {uploadInProgress && status && (
        <div className="mt-32 flex flex-col justify-center items-center gap-5">
          <div
            className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${
              progress === 100 && "hidden"
            }`}
            role="progressbar"
            style={{
              // @ts-expect-error tailwind css
              "--value": progress,
              "--size": "12rem",
              "--thickness": "1.3rem",
            }}
          >
            {progress}%
          </div>

          {
            // @ts-expect-error statusIcons
            statusIcons[status]
          }

          <p>{String(status)}</p>
        </div>
      )}
      {!uploadInProgress && <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg h-96 flex items-center text-center justify-center ${
          isFocused || isDragAccept
            ? "bg-indigo-100 dark:bg-indigo-900"
            : "bg-white dark:bg-black"
        } ${isDragActive ? "bg-indigo-200 dark:bg-indigo-800" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col justify-center items-center text-center">
          {isDragActive ? (
            <>
              <RocketIcon className="w-20 h-20 animate-ping text-indigo-600 dark:text-indigo-400" />
              <p className="text-indigo-600 dark:text-indigo-400">
                Drop the PDF here ...
              </p>
            </>
          ) : (
            <>
              <CircleArrowDown className="w-20 h-20 animate-bounce" />
              <p>
                Drag &apos;n&apos; drop a PDF here, or click to select a PDF
              </p>
            </>
          )}
        </div>
      </div>}
    </div>
  );
};

export default FileUploader;
