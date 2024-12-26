export interface MediaState {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
}

export interface Stream {
  id: string;
  stream: MediaStream;
  type: 'camera' | 'screen';
  userId?: string;
}

export interface MediaControls {
  toggleAudio: () => boolean;
  toggleVideo: () => boolean;
  toggleScreenShare: () => Promise<boolean>;
}