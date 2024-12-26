import React from 'react';
import VideoPlayer from './VideoPlayer';
import { Stream } from '../types/media';

interface VideoGridProps {
  streams: Stream[];
  localUserId: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ streams, localUserId }) => {
  const gridClassName = streams.length <= 2 
    ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-2 md:grid-cols-3';

  return (
    <div className={`grid gap-4 ${gridClassName}`}>
      {streams.map((stream) => (
        <VideoPlayer
          key={stream.id}
          stream={stream.stream}
          muted={stream.userId === localUserId}
          label={stream.userId === localUserId ? 
            `You ${stream.type === 'screen' ? '(Screen)' : ''}` : 
            `Peer ${stream.type === 'screen' ? '(Screen)' : ''}`}
        />
      ))}
    </div>
  );
};

export default VideoGrid;