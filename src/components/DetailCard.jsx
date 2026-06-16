import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Check } from 'lucide-react';

export default function DetailCard({ activeSession }) {
  const CurrentIcon = activeSession.icon;

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        py: 1,
        px: { xs: 0,  },
        gap: 3.5
      }}
    >
      
      {/* Header Details (IBM Bob Side-by-Side Layout) */}
      <Stack direction="row" spacing={3} alignItems="flex-start">
        {/* Glowing Icon Wrapper */}
        {/* <Box 
          sx={{ 
            p: 1.75, 
            borderRadius: 2, 
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: activeSession.roleColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 4px 20px ${activeSession.roleColor}22`,
            mt: 0.5
          }}
        >
          <CurrentIcon size={24} />
        </Box> */}
        
        {/* Title and Description */}
        <Stack spacing={2.5}>
          <Typography 
            variant="h4" 
            component="h2"
            sx={{ 
              fontWeight: 800, 
              lineHeight: 1.2,
              fontFamily: '"Outfit", sans-serif',
              letterSpacing: '-0.5px',
              color: '#ffffff'
            }}
          >
            {activeSession.title}
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              lineHeight: 1.7, 
              fontSize: '1.05rem',
              fontWeight: 400
            }}
          >
            {activeSession.description}
          </Typography>
        </Stack>
      </Stack>
      
      {/* Functional Scope Checklist */}
      <Box sx={{ pl: { xs: 0 } }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontWeight: 700, 
            mb: 2, 
            color: '#f8fafc',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.75rem'
          }}
        >
          Functional Scope
        </Typography>
        
        <Stack spacing={2}>
          {activeSession.features.map((feat, idx) => (
            <Stack key={idx} direction="row" spacing={2} alignItems="flex-start">
              <Box 
                sx={{ 
                  mt: '3px', 
                  flexShrink: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: `${activeSession.roleColor}15`,
                  color: activeSession.roleColor
                }}
              >
                <Check size={12} strokeWidth={3} />
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  fontSize: '0.9rem', 
                  lineHeight: 1.5 
                }}
              >
                {feat}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Workflow Status Pipeline Tracker */}
      <Box sx={{ pl: { xs: 0 } }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontWeight: 700, 
            mb: 2.5, 
            color: '#f8fafc',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.75rem'
          }}
        >
          Approval Pipeline
        </Typography>
        
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ position: 'relative', px: 1 }}>
          {/* Connecting Line */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '12px', 
              left: '20px', 
              right: '20px', 
              height: '2px', 
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              zIndex: 1
            }} 
          />
          
          {['AIM', 'AM', 'ZM', 'RM'].map((step, idx) => {
            const state = activeSession.status[idx];
            const isCurrent = state === 'Active';
            const isDone = state === 'Complete';
            
            return (
              <Stack key={step} alignItems="center" spacing={1} sx={{ zIndex: 2 }}>
                <Box 
                  sx={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: isDone ? '#10b981' : isCurrent ? activeSession.roleColor : '#181f30',
                    border: isCurrent ? `4px solid ${activeSession.roleColor}33` : 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrent ? `0 0 10px ${activeSession.roleColor}33` : 'none'
                  }}
                >
                  {isDone ? (
                    <Check size={12} strokeWidth={3} style={{ color: '#fff' }} />
                  ) : (
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: isCurrent ? '#fff' : 'rgba(255,255,255,0.15)' }} />
                  )}
                </Box>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontWeight: isCurrent || isDone ? 700 : 500, 
                    color: isDone ? '#10b981' : isCurrent ? activeSession.roleColor : 'text.secondary',
                    fontSize: '0.7rem'
                  }}
                >
                  {step}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>

    </Box>
  );
}
