"use client";

import React, { useCallback, useState } from "react";
import { z } from "zod";

interface FileWithPreview extends File {
  preview?: string;
}

interface ValidationError {
  path: (string | number)[];
  message: string;
}

const FileSchema = z.object({
  name: z.string(),
  size: z.number().max(25 * 1024 * 1024, "File size must be less than 25MB"),
  type: z.enum(["image/jpeg", "image/png", "image/gif"], {
    errorMap: () => ({ message: "File must be JPG, PNG or GIF" }),
  }),
});

const FilesArraySchema = z
  .array(FileSchema)
  .min(1, "At least one file is required")
  .max(3, "Maximum 3 files allowed")
  .refine(
    (files) => {
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      return totalSize <= 50 * 1024 * 1024;
    },
    {
      message: "Total size of all files must not exceed 50MB",
    }
  );

interface FileUploadProps {
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  allowedFileTypes?: string[];
  onFilesChange?: (files: File[]) => void;
  files: FileWithPreview[];
  onChange: (files: FileWithPreview[]) => void;
  onValidationError?: (errors: ValidationError[]) => void;
}

const DEFAULT_MAX_FILES = 3;
const DEFAULT_MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const DEFAULT_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

const CustomFileUpload: React.FC<FileUploadProps> = ({
  maxFiles = DEFAULT_MAX_FILES,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  allowedFileTypes = DEFAULT_ALLOWED_TYPES,
  onChange,
  onValidationError,
  files,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateFiles = (newFiles: File[]): ValidationError[] => {
    try {
      FilesArraySchema.parse(newFiles);
      return [];
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        }));
        return validationErrors;
      }
      return [{ path: [], message: "An unknown error occurred" }];
    }
  };

  const handleFiles = (newFiles: FileList | File[]): void => {
    const fileArray = Array.from(newFiles);
    const validationErrors = validateFiles([...files, ...fileArray]);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      onValidationError?.(validationErrors);
      return;
    }

    const filesWithPreviews = fileArray.map((file: File) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const updatedFiles = [...files, ...filesWithPreviews].slice(0, 3);
    onChange(updatedFiles);
    setErrors([]);
  };

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files) {
        handleFiles(e.target.files);
      }
    },
    []
  );

  const removeFile = useCallback(
    (index: number): void => {
      const updatedFiles = files.filter((_, i) => i !== index);

      // Revalidate remaining files
      const validationErrors = validateFiles(updatedFiles);
      setErrors(validationErrors);
      onValidationError?.(validationErrors);

      onChange(updatedFiles);
    },
    [files, onChange, onValidationError]
  );

  React.useEffect(() => {
    return () => {
      // Cleanup previews on unmount
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);
  return (
    <div className="w-full">
      {files && files.length < maxFiles && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 h-[228px] flex justify-center items-center ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileInput}
            multiple
            accept={allowedFileTypes.join(",")}
          />
          <div className="text-center w-full  flex justify-center flex-col items-center gap-[10px]">
            <span>
              <svg
                width="37"
                height="34"
                viewBox="0 0 37 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5065 32H18.5052C10.6463 32 6.71687 32 4.27543 29.5592C1.83398 27.1185 1.83398 23.19 1.83398 15.3333V10.2405C1.83398 7.213 1.83398 5.69927 2.46802 4.56343C2.91998 3.75378 3.58823 3.0857 4.39812 2.63387C5.53427 2 7.0484 2 10.0767 2C12.0168 2 12.9868 2 13.836 2.31835C15.7748 3.0452 16.5743 4.80597 17.4492 6.55522L18.5052 8.66667M11.8367 8.66667H26.424C29.9361 8.66667 31.6922 8.66667 32.9537 9.50932C33.4998 9.87412 33.9687 10.3429 34.3335 10.8888C34.9902 11.8714 35.1353 13.1541 35.1673 15.3333"
                  stroke="#848484"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
              </svg>
            </span>

            <div className="text-[14px] leading-[21px] font-medium text-[#848484]">
              Upload 3 Product Images:
              <br />
              <span>Click or drag and drop</span>
              <br />
              <span>your photos.</span>
            </div>
          </div>
        </div>
      )}

      {files && files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={file.preview}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                type="button"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between text-[#848484] text-[1rem] leading-[15px]">
        <p className="">Supported formats: JPG, PNG or GIF file format</p>
        <span>Maximum Size: 25MB</span>
      </div>
    </div>
  );
};

export default CustomFileUpload;

// import { Upload } from "lucide-react";
// import React, { useCallback, useState } from "react";

// interface FileWithPreview extends File {
//   preview?: string;
// }

// interface FileUploadProps {
//   maxFiles?: number;
//   maxFileSize?: number; // in bytes
//   allowedFileTypes?: string[];
//   onFilesChange?: (files: File[]) => void;
// }

// const DEFAULT_MAX_FILES = 3;
// const DEFAULT_MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
// const DEFAULT_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

// const CustomFileUpload: React.FC<FileUploadProps> = ({
//   maxFiles = DEFAULT_MAX_FILES,
//   maxFileSize = DEFAULT_MAX_FILE_SIZE,
//   allowedFileTypes = DEFAULT_ALLOWED_TYPES,
//   onFilesChange,
// }) => {
//   const [files, setFiles] = useState<FileWithPreview[]>([]);
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const validateFile = (file: File): boolean => {
//     if (!allowedFileTypes.includes(file.type)) {
//       setError("File type not supported");
//       return false;
//     }

//     if (file.size > maxFileSize) {
//       setError(`File size should not exceed ${maxFileSize / (1024 * 1024)}MB`);
//       return false;
//     }

//     return true;
//   };

//   const handleFiles = (newFiles: FileList | File[]): void => {
//     const validFiles = Array.from(newFiles)
//       .filter(validateFile)
//       .map((file: File) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       );

//     setFiles((prev) => {
//       const updatedFiles = [...prev, ...validFiles].slice(0, maxFiles);
//       onFilesChange?.(updatedFiles);
//       return updatedFiles;
//     });

//     setError(null);
//   };

//   const handleDragEnter = useCallback(
//     (e: React.DragEvent<HTMLDivElement>): void => {
//       e.preventDefault();
//       e.stopPropagation();
//       setIsDragging(true);
//     },
//     []
//   );

//   const handleDragLeave = useCallback(
//     (e: React.DragEvent<HTMLDivElement>): void => {
//       e.preventDefault();
//       e.stopPropagation();
//       setIsDragging(false);
//     },
//     []
//   );

//   const handleDragOver = useCallback(
//     (e: React.DragEvent<HTMLDivElement>): void => {
//       e.preventDefault();
//       e.stopPropagation();
//     },
//     []
//   );

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     handleFiles(e.dataTransfer.files);
//   }, []);

//   const handleFileInput = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>): void => {
//       if (e.target.files) {
//         handleFiles(e.target.files);
//       }
//     },
//     []
//   );

//   const removeFile = useCallback(
//     (index: number): void => {
//       setFiles((prev) => {
//         const updatedFiles = prev.filter((_, i) => i !== index);
//         onFilesChange?.(updatedFiles);
//         return updatedFiles;
//       });
//     },
//     [onFilesChange]
//   );

//   React.useEffect(() => {
//     return () => {
//       // Cleanup previews on unmount
//       files.forEach((file) => {
//         if (file.preview) {
//           URL.revokeObjectURL(file.preview);
//         }
//       });
//     };
//   }, []);

//   return (
//     <div className="w-full max-w-2xl">
//       {files.length < maxFiles && (
//         <div
//           className={`relative border-2 border-dashed rounded-lg p-8 ${
//             isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
//           }`}
//           onDragEnter={handleDragEnter}
//           onDragLeave={handleDragLeave}
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           <input
//             type="file"
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             onChange={handleFileInput}
//             multiple
//             accept={allowedFileTypes.join(",")}
//           />
//           <div className="text-center">
//             <Upload className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-2 text-sm font-medium text-gray-900">
//               Upload {maxFiles - files.length} Product Images
//             </h3>
//             <p className="mt-1 text-xs text-gray-500">
//               Click or drag and drop your photos
//             </p>
//           </div>
//         </div>
//       )}

//       {error && <div className="mt-2 text-sm text-red-600">{error}</div>}

//       {files.length > 0 && (
//         <div className="mt-4 grid grid-cols-3 gap-4">
//           {files.map((file, index) => (
//             <div
//               key={index}
//               className="relative aspect-square rounded-lg overflow-hidden"
//             >
//               <img
//                 src={file.preview}
//                 alt={`Upload ${index + 1}`}
//                 className="w-full h-full object-cover"
//               />
//               <button
//                 onClick={() => removeFile(index)}
//                 className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
//                 type="button"
//               >
//                 <svg
//                   className="w-4 h-4 text-gray-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-2 text-xs text-gray-500">
//         Supported formats: JPG, PNG or GIF file format
//         <span className="float-right">
//           Maximum Size: {maxFileSize / (1024 * 1024)}MB
//         </span>
//       </div>
//     </div>
//   );
// };

// export default CustomFileUpload;
