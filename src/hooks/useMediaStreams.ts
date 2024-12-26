import { useState, useCallback } from 'react';
import { Stream, MediaState, MediaControls } from '../types/media';
import { getMediaStream, getScreenShare } from '../utils/media';

export const useMediaStreams = (localUserId: string): {
  streams: Stream[];
  mediaState: MediaState;
  controls: MediaControls;
  addRemoteStream: (stream: MediaStream, userId: string) => void;
  removeStream: (streamId: string) => void;
} => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [mediaState, setMediaState] = useState<MediaState>({
    isAudioEnabled: true,
    isVideoEnabled: true,
    isScreenSharing: false,
  });

  const initializeLocalStream = useCallback(async () => {
    const stream = await getMediaStream();
    setStreams(prev => [...prev, {
      id: 'local-camera',
      stream,
      type: 'camera',
      userId: localUserId
    }]);
    return stream;
  }, [localUserId]);

  const toggleAudio = useCallback(() => {
    const audioTrack = streams[0]?.stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMediaState(prev => ({ ...prev, isAudioEnabled: audioTrack.enabled }));
      return audioTrack.enabled;
    }
    return false;
  }, [streams]);

  const toggleVideo = useCallback(() => {
    const videoTrack = streams[0]?.stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setMediaState(prev => ({ ...prev, isVideoEnabled: videoTrack.enabled }));
      return videoTrack.enabled;
    }
    return false;
  }, [streams]);

  const toggleScreenShare = useCallback(async () => {
    try {
      if (!mediaState.isScreenSharing) {
        const screenStream = await getScreenShare();
        setStreams(prev => [...prev, {
          id: 'local-screen',
          stream: screenStream,
          type: 'screen',
          userId: localUserId
        }]);
        setMediaState(prev => ({ ...prev, isScreenSharing: true }));
        return true;
      } else {
        setStreams(prev => prev.filter(s => s.id !== 'local-screen'));
        setMediaState(prev => ({ ...prev, isScreenSharing: false }));
        return false;
      }
    } catch (error) {
      console.error('Error toggling screen share:', error);
      return false;
    }
  }, [mediaState.isScreenSharing, localUserId]);

  const addRemoteStream = useCallback((stream: MediaStream, userId: string) => {
    const streamType = stream.getVideoTracks()[0]?.label.toLowerCase().includes('screen') 
      ? 'screen' 
      : 'camera';
    
    setStreams(prev => [...prev, {
      id: `remote-${userId}-${streamType}`,
      stream,
      type: streamType,
      userId
    }]);
  }, []);

  const removeStream = useCallback((streamId: string) => {
    setStreams(prev => prev.filter(s => s.id !== streamId));
  }, []);

  // Initialize local stream if not exists
  if (streams.length === 0) {
    initializeLocalStream();
  }

  return {
    streams,
    mediaState,
    controls: {
      toggleAudio,
      toggleVideo,
      toggleScreenShare,
    },
    addRemoteStream,
    removeStream,
  };
};