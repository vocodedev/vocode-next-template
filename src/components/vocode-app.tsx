'use client'

import React, { useState, useRef } from 'react';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import { useConversation, SelfHostedConversationConfig } from "vocode";
import AudioVisualizer from '@/components/audio-visualizer';
import PingComponent from '@/components/ping-component'; // Import PingComponent
import { isChrome } from 'react-device-detect';


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface VocodeAppProps {
    defaultBackendUrl: string;
    isInputEditable: boolean;
  }

const VocodeApp: React.FC<VocodeAppProps> = ({ defaultBackendUrl, isInputEditable }) => {
    const [backendUrl, setBackendUrl] = useState(defaultBackendUrl);
    const [isBackendOnline, setIsBackendOnline] = useState(false);

    // Append '/ping' to the host
    const backendPingUrl = defaultBackendUrl;

    const config: SelfHostedConversationConfig = {
        backendUrl,
        audioDeviceConfig: {},
    };

    // ## Conversation Hook
    // useConversation is a custom hook that handles the connection to the backend. using Workers from the library extendable-media-recorder
    // 
    // In our application, we use a custom React hook named `useConversation` to manage a conversation with a backend service over a WebSocket connection. This hook is defined in `vocode-react-sdk/src/hooks/conversation.ts`.
    // Here's a high-level overview of what it does:
    // 1. It sets up an audio context and an audio analyser node for processing audio data.
    // 2. It registers a WAV encoder to handle audio data.
    // 3. It sets up a WebSocket connection to the backend service. The URL of the backend service is either provided directly in the configuration or constructed from the Vocode API key.
    // 4. It starts a conversation by sending a `websocket_start` or `websocket_audio_config_start` message to the backend service. The message includes configuration for the transcriber, agent, and synthesizer, as well as the conversation ID.
    // 5. It listens for `dataavailable` events from the media recorder. When such an event occurs, it sends the audio data to the backend service in a `websocket_audio` message.
    // 6. It listens for messages from the backend service. If it receives a `websocket_audio` message, it queues the audio data for playback. If it receives a `websocket_ready` message, it changes the status to `connected`. If it receives a `websocket_transcript` message, it updates the transcripts.
    // 7. It provides a `start` function to start the conversation and a `stop` function to stop the conversation. The `start` function requests access to the user's microphone, starts the media recorder, and sends a `websocket_start` or `websocket_audio_config_start` message to the backend service. The `stop` function stops the media recorder and sends a `websocket_stop` message to the backend service.
    // 8. It returns an object with several properties that can be used to control the conversation and get information about its state. These properties include the status of the conversation, the error (if any), the active state, a function to set the active state, a function to toggle the active state, the analyser node, the transcripts, and the current speaker.
    // This hook is likely used in a component that provides a user interface for having a conversation with an AI agent. The component would use the properties and functions returned by the hook to control the conversation and update the user interface based on the state of the conversation.
    const { status, start, stop, error, analyserNode } = useConversation(config);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserNodeRef = useRef<AnalyserNode | null>(null);

    const startMicrophone = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        }

        if (!analyserNodeRef.current) {
            analyserNodeRef.current = audioContextRef.current.createAnalyser();
        }

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const source = audioContextRef.current!.createMediaStreamSource(stream);
                source.connect(analyserNodeRef.current!);
                start(); // Start the conversation after the microphone is set up
            })
            .catch(err => console.error(err));
    };

    const stopMicrophone = () => {
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
            analyserNodeRef.current = null;
        }
        stop(); // Stop the conversation when the microphone is stopped
    };

    return (
        <main>
            {!isChrome && (
                <div className="alert alert-warning">
                    This application is only supported on Chrome.
                </div>
            )}
            <div className="flex w-full max-w-sm items-center space-x-2">
                {isInputEditable && (
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        {/* Label for the backend URL input field */}
                        <Label htmlFor="backend-url" className="backendUrlLabel">Backend</Label>
                        {/* Input field for the backend URL. It is disabled when isInputEditable is false */}
                        <Input
                            disabled={!isInputEditable}
                            type="text"
                            value={backendUrl}
                            onChange={(e) => setBackendUrl(e.target.value)}
                            placeholder="wss://localhost:8000/conversation"
                            className="backendUrlInput"
                        />
                    </div>
                )}
            </div>
            <button
                id="new-microphone-button"
                className="w-full px-6 py-4 text-white font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#7dd3fc] hover:cursor-pointer"
                disabled={["connecting"].includes(status) || !isBackendOnline}
                onClick={status === "connected" ? stopMicrophone : startMicrophone}
            >
                {isBackendOnline 
                    ? (status === "connected" 
                        ? "Click me to stop the conversation" 
                        : "Click me to start the conversation") 
                    : "Backend offline"}
            </button>
            {isInputEditable && (
                <div className="statusBox">
                        {status === "idle" && <p className="idleMessage">Press the mic to talk!</p>}
                        {status === "error" && error && <p className="errorMessage">{error.message}</p>}
                </div>
            )}
            <div className="flex justify-center items-center">
                <PingComponent backendUrl={backendPingUrl} setIsOnline={setIsBackendOnline} />
            </div>
            <div className="flex" style={{width: '400px'}}>
                {analyserNodeRef.current && <div className="w-1/2"><AudioVisualizer analyserNode={analyserNodeRef.current} /></div>}
                {analyserNode && <div className="w-1/2"><AudioVisualizer analyserNode={analyserNode} /></div>}
            </div>
        </main>
    );
}

export default VocodeApp;