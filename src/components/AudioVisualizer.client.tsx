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
            dataArray.forEach((value) => {
            const barHeight = (value / 255) * canvas.height;
            
            // this will give hues in the range [280, 360] which is the violet to pink range
            const hue = 280 + (value / 255) * 80; 
            
            canvasContext.fillStyle = `hsl(${hue}, 100%, 50%)`;
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