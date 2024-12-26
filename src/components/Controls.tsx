import React from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, Phone } from 'lucide-react';

interface ControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onEndCall: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isAudioEnabled,
  isVideoEnabled,
  isScreenSharing,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onEndCall
}) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
      <div className="bg-gray-800 rounded-full px-8 py-4 flex items-center space-x-6">
        <button
          onClick={onToggleAudio}
          className={`p-4 rounded-full ${
            isAudioEnabled ? 'bg-gray-700' : 'bg-red-500'
          } hover:opacity-80 transition-opacity`}
        >
          {isAudioEnabled ? (
            <Mic className="w-6 h-6 text-white" />
          ) : (
            <MicOff className="w-6 h-6 text-white" />
          )}
        </button>

        <button
          onClick={onToggleVideo}
          className={`p-4 rounded-full ${
            isVideoEnabled ? 'bg-gray-700' : 'bg-red-500'
          } hover:opacity-80 transition-opacity`}
        >
          {isVideoEnabled ? (
            <Video className="w-6 h-6 text-white" />
          ) : (
            <VideoOff className="w-6 h-6 text-white" />
          )}
        </button>

        <button
          onClick={onToggleScreenShare}
          className={`p-4 rounded-full ${
            isScreenSharing ? 'bg-blue-500' : 'bg-gray-700'
          } hover:opacity-80 transition-opacity`}
        >
          <Monitor className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={onEndCall}
          className="p-4 rounded-full bg-red-500 hover:opacity-80 transition-opacity"
        >
          <Phone className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Controls;