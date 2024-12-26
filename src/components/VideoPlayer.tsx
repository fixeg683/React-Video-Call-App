import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  stream: MediaStream | null;
  muted?: boolean;
  label: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ stream, muted = false, label }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className="w-full rounded-lg bg-gray-800 shadow-lg"
      />
      <div className="absolute bottom-4 left-4 text-white font-semibold">
        {label}
      </div>
    </div>
  );
}

export default VideoPlayer;