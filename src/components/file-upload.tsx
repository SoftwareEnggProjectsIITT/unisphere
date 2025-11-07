"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";

interface FileUploadProps {
  onChange: (url: string, type?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const [mimeType, setMimeType] = useState<string | undefined>(undefined);

  console.log("value :", value);
  console.log("type :", mimeType);

  if (value && mimeType !== "application/pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const file = res?.[0];
        if (!file) {
          return;
        }

        console.log("File uploaded:", res);
        setMimeType(file.type);
        onChange(file.ufsUrl, file.type);
      }}
      onUploadError={(error: Error) => {
        console.log("Upload failed:", error.message);
      }}
    />
  );
};
