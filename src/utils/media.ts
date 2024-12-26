export const getMediaStream = async (): Promise<MediaStream> => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
  } catch (error) {
    console.error('Error accessing media devices:', error);
    throw new Error('Failed to access camera and microphone');
  }
};

export const getScreenShare = async (): Promise<MediaStream> => {
  try {
    return await navigator.mediaDevices.getDisplayMedia({
      video: true
    });
  } catch (error) {
    console.error('Error accessing screen share:', error);
    throw new Error('Failed to start screen sharing');
  }
};