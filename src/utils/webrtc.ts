import Peer from 'simple-peer';

export const createPeer = (
  stream: MediaStream,
  initiator: boolean
): Peer.Instance => {
  return new Peer({
    initiator,
    stream,
    trickle: false,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' }
      ]
    }
  });
};

export const handlePeerError = (error: Error): void => {
  console.error('Peer connection error:', error);
  // Implement retry logic here if needed
};