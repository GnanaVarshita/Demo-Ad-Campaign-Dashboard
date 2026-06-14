import React from 'react';
import { Box, Container, Stack, Typography, Button } from '@mui/material';

export default function AppHeader() {
  return (
    <Box 
      component="header" 
      sx={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(7, 10, 19, 0.75)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        py: 2
      }}
    >
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          
          {/* Brand Logo */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                
              }}
            >
              Campaign Dashboard
            </Typography>
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              variant="outlined"
              size="small"
              component="a"
              href="https://gnanavarshita.github.io/Campaign-dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: '#f8fafc', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              Link
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
