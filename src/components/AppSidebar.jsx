import React from 'react';
import { Paper, Box, Typography, Divider, List, ListItem, ListItemButton, Stack, Chip } from '@mui/material';
import { CheckCircle2 } from 'lucide-react';

export default function AppSidebar({ sessions, activeSession, onSelectSession }) {
  return (
    <Paper 
      elevation={0}
      className="hover-gradient-border"
      sx={{ 
        p: 3, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
          DEMO WORKFLOW
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Track budget requests through core roles
        </Typography>
      </Box>
      
      <Divider sx={{ opacity: 0.5 }} />
      
      <List 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1.5, 
          p: 0,
          maxHeight: '400px',
          overflowY: 'auto',
          
        }}
      >
        {sessions.map((session) => {
          const isActive = activeSession.id === session.id;
          return (
            <ListItem key={session.id} disablePadding>
              <ListItemButton
                onClick={() => onSelectSession(session)}
                className={isActive ? 'sidebar-item-active' : ''}
                sx={{
                  borderRadius: '8px',
                  p: 2,
                  transition: 'all 0.3s ease',
                  border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                  backgroundColor: isActive ? 'transparent' : 'rgba(255,255,255,0.01)',
                  '&:hover': {
                    backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <Stack direction="row" spacing={2.5} alignItems="center" width="100%">
                  {/* Step number */}
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 800, 
                      color: isActive ? '#818cf8' : 'text.secondary',
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: '1.05rem',
                      width: '22px'
                    }}
                  >
                    {session.step}
                  </Typography>
                  
                  {/* Title & Role */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 700, 
                        color: isActive ? '#f8fafc' : 'text.secondary',
                        fontSize: '0.95rem'
                      }}
                    >
                      {session.title}
                    </Typography>
                  </Box>
                  
                  {/* Role Tag Badge */}
                  <Chip 
                    label={session.role} 
                    size="small"
                    sx={{ 
                      backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.04)', 
                      color: isActive ? '#fff' : session.roleColor,
                      border: `1px solid ${isActive ? 'rgba(255,255,255,0.2)' : session.roleColor + '33'}`,
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      height: '20px'
                    }}
                  />
                </Stack>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Additional contextual notes */}
      <Box 
        sx={{ 
          mt: 'auto', 
          p: 2, 
          borderRadius: 2, 
          backgroundColor: 'rgba(99, 102, 241, 0.04)', 
          border: '1px dashed rgba(99, 102, 241, 0.15)',
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', gap: 1, lineHeight: 1.4 }}>
          <CheckCircle2 size={16} style={{ color: '#818cf8', flexShrink: 0 }} />
          Verify details, request edits, and approve sessions directly using the simulated workflow dashboard.
        </Typography>
      </Box>
    </Paper>
  );
}
