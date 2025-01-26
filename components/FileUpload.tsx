"use client";

import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, IKVideo, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const authenticator = async () => {
  try {
    const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Request failed with status: ${errText}`);
    }

    const data = await res.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (err: any) {
    throw new Error("Authentication request failed: " + err.message);
  }
};

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState<number>(0);
  const styles = {
    button: variant === "dark" ? "bg-dark-300" : "bg-light-600",
    placeholder: variant === "dark" ? "text-slate-100" : "text-dark-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (err: any) => {
    console.log(err);
    toast({
      title: type + " upload failed!",
      description: `Your Image could not be uploaded. Please try again.`,
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: type + " uploaded successfully",
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 20MB in size",
          variant: "destructive",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 50MB in size",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />
      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file?.filePath && type === "image" ? (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      ) : file?.filePath && type === "video" ? (
        <IKVideo
          path={file.filePath}
          controls={true}
          className="h-96 w-full rounded-xl"
        />
      ) : null}
    </ImageKitProvider>
  );
};

export default FileUpload;
