# React Video Call App

A real-time peer-to-peer video calling application built with React, WebRTC, and TailwindCSS.

## Features

- 📹 Real-time video and audio calls
- 🖥️ Screen sharing capability
- 🔇 Mute/unmute audio
- 📵 Enable/disable video
- 🏠 Simple room-based calling system
- 💅 Clean and modern UI with TailwindCSS

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## How to Make a Call

1. Open the application in your browser
2. Enter a room ID (any string you choose)
3. Share this room ID with the person you want to call
4. Both users need to enter the same room ID to connect

## Controls

During a call, you have access to the following controls:

- 🎤 Toggle Microphone: Turn your audio on/off
- 📹 Toggle Camera: Turn your video on/off
- 🖥️ Share Screen: Share your screen with the other participant
- 📞 End Call: Disconnect from the current call

## Technical Requirements

- Modern web browser with WebRTC support
- Camera and microphone permissions
- Internet connection for peer-to-peer communication

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Note

This is a peer-to-peer application. All video/audio streams are encrypted and sent directly between participants without going through a server.

## Known Limitations

- Currently supports one-to-one calls only
- Requires manual room ID sharing between participants
- No persistent room history