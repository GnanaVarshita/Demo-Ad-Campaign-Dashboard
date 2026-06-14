import React from 'react';
import { Card, Box, Stack, Typography, Divider } from '@mui/material';
import { Check } from 'lucide-react';

export default function DetailCard({ activeSession }) {
  const CurrentIcon = activeSession.icon;

  return (
    <Card 
      sx={{ 
        p: 3.5, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 3
      }}
    >
      
      {/* Header Details */}
      <Box>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              p: 1, 
              borderRadius: 2, 
              backgroundColor: `${activeSession.roleColor}1a`,
              color: activeSession.roleColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CurrentIcon size={20} />
          </Box>
          
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 800, 
              letterSpacing: '1px', 
              color: activeSession.roleColor,
              textTransform: 'uppercase'
            }}
          >
            {activeSession.role} ROLE
          </Typography>
        </Stack>
        
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
          {activeSession.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.925rem' }}>
          {activeSession.description}
        </Typography>
      </Box>
      
      <Divider />

      {/* Features checklist */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#f8fafc' }}>
          Functional Scope
        </Typography>
        
        <Stack spacing={1.5}>
          {activeSession.features.map((feat, idx) => (
            <Stack key={idx} direction="row" spacing={1.5} alignItems="flex-start">
              <Box sx={{ mt: '3px', flexShrink: 0 }}>
                <Check size={14} style={{ color: activeSession.roleColor }} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
                {feat}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Divider />

      {/* Workflow status pipeline tracker */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#f8fafc' }}>
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
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
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
                    backgroundColor: isDone ? '#10b981' : isCurrent ? activeSession.roleColor : '#1e293b',
                    border: isCurrent ? '4px solid rgba(99, 102, 241, 0.25)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isDone && <Check size={12} style={{ color: '#fff' }} />}
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

    </Card>
  );
}
