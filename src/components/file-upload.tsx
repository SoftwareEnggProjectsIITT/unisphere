"use client";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("File uploaded:", res);
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log("Upload failed:", error.message);
      }}
    />
  );
};
