import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { createPeer, handlePeerError } from '../utils/webrtc';
import { useMediaStreams } from './useMediaStreams';
import type { Stream } from '../types/media';

export const useWebRTC = (roomId: string) => {
  const {
    streams,
    mediaState,
    controls,
    addRemoteStream,
    removeStream
  } = useMediaStreams('local');
  
  const [error, setError] = useState<string | null>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Connect to signaling server
        ws.current = new WebSocket('wss://your-signaling-server.com');

        ws.current.onmessage = async (event) => {
          const data = JSON.parse(event.data);

          if (data.type === 'user-joined') {
            // Create peer as initiator
            const localStream = streams.find(s => s.userId === 'local')?.stream;
            if (localStream) {
              peerRef.current = createPeer(localStream, true);
              setupPeerEvents(data.userId);
            }
          } else if (data.type === 'signal') {
            if (!peerRef.current) {
              // Create peer as receiver
              const localStream = streams.find(s => s.userId === 'local')?.stream;
              if (localStream) {
                peerRef.current = createPeer(localStream, false);
                setupPeerEvents(data.userId);
              }
            }
            peerRef.current?.signal(data.signal);
          }
        };

        // Join room
        ws.current.onopen = () => {
          ws.current?.send(JSON.stringify({ type: 'join-room', roomId }));
        };
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize call');
      }
    };

    const setupPeerEvents = (remoteUserId: string) => {
      if (!peerRef.current || !ws.current) return;

      peerRef.current.on('signal', (signal) => {
        ws.current?.send(JSON.stringify({ 
          type: 'signal', 
          signal, 
          roomId,
          userId: remoteUserId 
        }));
      });

      peerRef.current.on('stream', (stream) => {
        addRemoteStream(stream, remoteUserId);
      });

      peerRef.current.on('error', handlePeerError);
    };

    init();

    return () => {
      streams.forEach(stream => {
        stream.stream.getTracks().forEach(track => track.stop());
      });
      peerRef.current?.destroy();
      ws.current?.close();
    };
  }, [roomId, streams, addRemoteStream]);

  return {
    streams,
    mediaState,
    controls,
    error
  };
};