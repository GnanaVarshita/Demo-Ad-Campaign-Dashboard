import React, { useEffect, useRef } from 'react';
import { Box, Stack } from '@mui/material';

export default function VideoPlayer({ activeSession }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  // Extract video ID from embed URL
  const videoId = activeSession.videoSrc.split('/').pop().split('?')[0];

  useEffect(() => {
    let player;
    
    // Function to initialize YT Player
    const initPlayer = () => {
      if (!containerRef.current) return;
      
      // Create a target div inside the container
      const targetDiv = document.createElement('div');
      targetDiv.style.width = '100%';
      targetDiv.style.height = '100%';
      targetDiv.style.position = 'absolute';
      targetDiv.style.top = '0';
      targetDiv.style.left = '0';
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(targetDiv);

      player = new window.YT.Player(targetDiv, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          rel: 0,
          controls: 1,
          showinfo: 0,
          ecver: 2
        },
        events: {
          onReady: (event) => {
            event.target.setPlaybackRate(1.25);
            event.target.playVideo();
          },
          onStateChange: (event) => {
            // Re-apply 1.25 playback speed whenever the player state updates/plays
            if (event.data === window.YT.PlayerState.PLAYING) {
              event.target.setPlaybackRate(1.25);
            }
          }
        }
      });
      playerRef.current = player;
    };

    // Load YouTube API script if not loaded
    if (!window.YT) {
      // Check if tag is already in the document
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      
      // YT API triggers this callback when loaded
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    // Cleanup on unmount or video change
    return () => {
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
    };
  }, [videoId]);

  return (
    <Box 
      className="video-glow"
      sx={{ 
        borderRadius: 3, 
        overflow: 'hidden', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#0a0d16',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      
      {/* Mock Browser Header Bar */}
      <Box 
        sx={{ 
          height: '42px', 
          backgroundColor: '#111522', 
          display: 'flex', 
          alignItems: 'center', 
          px: 2, 
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)' 
        }}
      >
        {/* Left dots */}
        <Stack direction="row" spacing={1} sx={{ mr: 2.5 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#eab308' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e' }} />
        </Stack>
        
        {/* Address bar */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            height: '24px', 
            borderRadius: 1.5, 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            px: 2,
            color: 'text.secondary',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            letterSpacing: '0.2px'
          }}
        >
          {activeSession.url}
        </Box>
      </Box>

      {/* YouTube API Embed Player with 16:9 aspect ratio */}
      <Box 
        ref={containerRef}
        sx={{ 
          position: 'relative', 
          width: '100%', 
          paddingTop: '56.25%', 
          backgroundColor: '#000' 
        }}
      />
    </Box>
  );
}
