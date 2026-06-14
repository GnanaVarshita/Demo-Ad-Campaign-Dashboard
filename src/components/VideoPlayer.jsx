import React from 'react';
import { Box, Stack } from '@mui/material';

export default function VideoPlayer({ activeSession }) {
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

      {/* YouTube Embed Player */}
      <Box sx={{ position: 'relative', flexGrow: 1, display: 'flex', alignItems: 'center', backgroundColor: '#000', minHeight: '400px' }}>
        <iframe
          src={`${activeSession.videoSrc}?autoplay=1&mute=1&rel=0`}
          title={activeSession.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            border: 0,
          }}
        />
      </Box>
    </Box>
  );
}
