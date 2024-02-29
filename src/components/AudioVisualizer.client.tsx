"use client";

import React, { useEffect, useRef } from 'react';

const AudioVisualizer = ({ analyserNode }: { analyserNode: AnalyserNode }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas?.getContext('2d');
  
        const drawVisualizer = () => {
          if (!canvas || !canvasContext) return;
      
          // Clear the canvas
          canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      
          // Get the frequency data from the analyserNode
          const bufferLength = analyserNode?.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyserNode?.getByteFrequencyData(dataArray);
      
          // Set up the visualization parameters
          const barWidth = (canvas.width / bufferLength) * 2;
          let x = 0;
      
          // Draw the bars
          dataArray.forEach((value, index) => {
              const barHeight = (value / 255) * canvas.height;
      
              // Keep the hue in the blue range
              const hue = 200 + (index / bufferLength) * 60; // Vary hue from 200 to 260 (blue range)
      
              // Adjust the lightness from 50% to near 100% to introduce white
              const lightness = 50 + (value / 255) * 50; // Vary lightness based on the value
      
              canvasContext.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
              canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
              x += barWidth + 1;
          });
      
          // Schedule the next frame
          requestAnimationFrame(drawVisualizer);
      };
  
      // Start drawing the visualizer
      drawVisualizer();
  
      // Clean up the visualization when the component unmounts
      return () => {
        if (canvas) {
          canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
        }
      };
    }, [analyserNode]);
  
    return <canvas ref={canvasRef} width={200} height={200} />;
  };

export default AudioVisualizer;