"use client";

import config from "@/lib/config";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
import React from "react";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  if (!videoUrl) return;
  return (
    <ImageKitProvider
      publicKey={config.env.imageKit.publicKey}
      urlEndpoint={config.env.imageKit.urlEndpoint}
    >
      <IKVideo
        onError={() => console.log("error")}
        path={videoUrl}
        controls={true}
        className="w-full rounded-xl"
      />
    </ImageKitProvider>
  );
};

export default BookVideo;
