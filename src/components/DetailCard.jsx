import React from 'react';
import { Box, Stack, Typography, Chip } from '@mui/material';
import { Check, ArrowRight } from 'lucide-react';

export default function DetailCard({ activeSession }) {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        py: 1,
        gap: 4
      }}
    >
      
      {/* Title & Overview */}
      <Stack spacing={2}>
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
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            lineHeight: 1.7, 
            fontSize: '0.95rem',
            fontWeight: 400
          }}
        >
          {activeSession.description}
        </Typography>
      </Stack>

      {/* Dynamic Workflow Timeline Stepper */}
      {activeSession.workflowSteps && (
        <Box>
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
            Workflow Timeline
          </Typography>
          
          <Stack spacing={2} sx={{ position: 'relative', pl: 1 }}>
            {/* Timeline Vertical Line */}
            <Box 
              sx={{ 
                position: 'absolute', 
                left: '12px', 
                top: '10px', 
                bottom: '10px', 
                width: '1px', 
                backgroundColor: 'rgba(255, 255, 255, 0.08)' 
              }} 
            />

            {activeSession.workflowSteps.map((step, idx) => (
              <Stack key={idx} direction="row" spacing={2.5} sx={{ position: 'relative' }}>
                {/* Bullet node */}
                <Box 
                  sx={{ 
                    width: 9, 
                    height: 9, 
                    borderRadius: '50%', 
                    backgroundColor: activeSession.roleColor, 
                    boxShadow: `0 0 8px ${activeSession.roleColor}`, 
                    mt: '6px',
                    ml: '8px',
                    flexShrink: 0,
                    zIndex: 2
                  }} 
                />
                
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                    <Chip 
                      label={step.role} 
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.04)', 
                        color: activeSession.roleColor,
                        border: `1px solid ${activeSession.roleColor}33`,
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        height: '18px'
                      }}
                    />
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {step.text}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}
      
      {/* Functional Scope Checklist */}
      <Box>
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
        
        <Stack spacing={1.5}>
          {activeSession.features.map((feat, idx) => (
            <Stack key={idx} direction="row" spacing={1.5} alignItems="flex-start">
              <Box 
                sx={{ 
                  mt: '3px', 
                  flexShrink: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: `${activeSession.roleColor}15`,
                  color: activeSession.roleColor
                }}
              >
                <Check size={10} strokeWidth={3} />
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  fontSize: '0.85rem', 
                  lineHeight: 1.4 
                }}
              >
                {feat}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Dynamic Workflow Status Pipeline Tracker */}
      <Box>
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
          Target Roles Flow
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            gap: 1.5,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            border: '1px solid rgba(255, 255, 255, 0.04)'
          }}
        >
          {activeSession.status.map((step, idx) => (
            <React.Fragment key={step}>
              {idx > 0 && <ArrowRight size={14} style={{ color: 'rgba(255, 255, 255, 0.2)' }} />}
              <Chip 
                label={step}
                size="small"
                sx={{
                  backgroundColor: idx === 0 ? `${activeSession.roleColor}22` : 'rgba(255, 255, 255, 0.03)',
                  color: idx === 0 ? activeSession.roleColor : 'text.secondary',
                  border: `1px solid ${idx === 0 ? activeSession.roleColor + '44' : 'rgba(255,255,255,0.06)'}`,
                  fontWeight: 600,
                  fontSize: '0.7rem'
                }}
              />
            </React.Fragment>
          ))}
        </Box>
      </Box>

    </Box>
  );
}
