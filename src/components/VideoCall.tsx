import React from 'react';
import { useWebRTC } from '../hooks/useWebRTC';
import VideoGrid from './VideoGrid';
import Controls from './Controls';

interface VideoCallProps {
  roomId: string;
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId, onEndCall }) => {
  const { 
    streams,
    mediaState,
    controls,
    error 
  } = useWebRTC(roomId);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-500 text-white p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <VideoGrid 
          streams={streams}
          localUserId="local"
        />

        <Controls
          isAudioEnabled={mediaState.isAudioEnabled}
          isVideoEnabled={mediaState.isVideoEnabled}
          isScreenSharing={mediaState.isScreenSharing}
          onToggleAudio={controls.toggleAudio}
          onToggleVideo={controls.toggleVideo}
          onToggleScreenShare={controls.toggleScreenShare}
          onEndCall={onEndCall}
        />
      </div>
    </div>
  );
};

export default VideoCall;