"use client";

import { useEffect, useState, useRef } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button"
import { HiOutlineStatusOffline, HiOutlineStatusOnline } from "react-icons/hi";

interface PingComponentProps {
    backendUrl: string;
    setIsOnline: React.Dispatch<React.SetStateAction<boolean>>;
}

function PingComponent({ backendUrl, setIsOnline }: PingComponentProps) {
    // State for storing latency and jitter values
    const [latency, setLatency] = useState(0);
    const [jitter, setJitter] = useState(0);
    const [isOnline, setIsOnlineLocal] = useState(false); // Add this line

    // Refs for holding previous latency and interval ID to prevent stale closure issues
    const prevLatencyRef = useRef(0);
    const intervalIdRef = useRef<number | null>(null);

    // Ref for the WebSocket to maintain the same socket connection
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Extract the host from the backendUrl.
        // Then append '/ping' to the host to get the URL for the ping endpoint.
        // This is done to ensure that the WebSocket connection for the ping component is made to the correct endpoint.
        const url = new URL(backendUrl);
        const host = url.host;
        const pingUrl = url.protocol + host + '/api/ping';

        wsRef.current = new WebSocket(pingUrl);

        wsRef.current.onopen = () => {
            setIsOnline(true);
            setIsOnlineLocal(true); // Add this line

            intervalIdRef.current = window.setInterval(() => {
                if (wsRef.current?.readyState === WebSocket.OPEN) {
                    wsRef.current.send(JSON.stringify({
                        ping: 'ping',
                        clientSendTime: performance.now()
                    }));
                }
            }, 5000);
        };
            
        wsRef.current.onmessage = (event) => {
            const currentTime = performance.now();
            const data = JSON.parse(event.data);
            if (data && typeof data.serverReceiveTime === 'number' && typeof data.clientSendTime === 'number') {
                const roundTripTime = currentTime - data.clientSendTime;
                const oneWayLatency = roundTripTime / 2;
                setLatency(oneWayLatency);
                setJitter(Math.abs(oneWayLatency - prevLatencyRef.current));
                prevLatencyRef.current = oneWayLatency;
            }
        };

        wsRef.current.onerror = (error) => {
            setIsOnline(false);
            setIsOnlineLocal(false); // Add this line
            console.error('WebSocket Error:', error);
        };

        wsRef.current.onclose = () => {
            setIsOnline(false);
            setIsOnlineLocal(false); // Add this line
            console.error('WebSocket Closed');
        };

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [backendUrl, setIsOnline]);

    return (
        <HoverCard>
            <HoverCardTrigger>
                <Button variant="link">
                    {isOnline ? (
                        <HiOutlineStatusOnline />
                    ) : (
                        <HiOutlineStatusOffline />
                    )}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-200">
                {isOnline ? (
                    <>
                        <HiOutlineStatusOnline />
                        <p>Backend is online</p>
                        <p>Backend URL: {backendUrl}</p>
                        <p>Latency: {latency}ms</p>
                        <p>Jitter: {jitter}ms</p>
                    </>
                ) : (
                    <>
                        <HiOutlineStatusOffline />
                        <p>Backend is offline</p>
                        <p>Backend URL: {backendUrl}</p>
                    </>
                )}
            </HoverCardContent>
        </HoverCard>
    );
}

export default PingComponent;