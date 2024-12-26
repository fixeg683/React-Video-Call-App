import React, { useState } from 'react';
import VideoCall from './components/VideoCall';
import { Video } from 'lucide-react';

function App() {
  const [roomId, setRoomId] = useState('');
  const [isInCall, setIsInCall] = useState(false);

  const handleJoinCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      setIsInCall(true);
    }
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setRoomId('');
  };

  if (isInCall) {
    return <VideoCall roomId={roomId} onEndCall={handleEndCall} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-500 p-3 rounded-full">
            <Video className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Join Video Call
        </h1>

        <form onSubmit={handleJoinCall}>
          <div className="mb-6">
            <label
              htmlFor="roomId"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Room ID
            </label>
            <input
              type="text"
              id="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room ID"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Join Call
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;