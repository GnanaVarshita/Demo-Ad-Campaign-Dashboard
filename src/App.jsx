import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Grid, Container, Typography, Stack } from '@mui/material';
import { Landmark, User, Layers, ShieldCheck, Laptop } from 'lucide-react';
import theme from './theme';

// Import subcomponents
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
import VideoPlayer from './components/VideoPlayer';
import DetailCard from './components/DetailCard';

// Demo video sessions data (Streaming from YouTube)
const sessions = [
  {
    id: 1,
    step: '01',
    title: 'AIM Budget Session',
    role: 'AIM',
    roleColor: '#6366f1', // Indigo
    videoSrc: 'https://www.youtube.com/embed/duqRtA3TfwI',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: Landmark,
    description: 'Initiate and configure the baseline budget requests for the campaign, inputting region-specific cost estimates and setting up target criteria.',
    features: [
      'Enter detailed regional campaign parameters',
      'Input line-item cost projections for media and operations',
      'Automated initial budget ceiling checks',
      'Direct dispatch to Account Manager for validation'
    ],
    status: ['Active', 'Pending', 'Pending', 'Pending']
  },
  {
    id: 2,
    step: '02',
    title: 'AM Submitting Request',
    role: 'AM / MDO',
    roleColor: '#3b82f6', // Blue
    videoSrc: 'https://www.youtube.com/embed/0jaht5lnRyc',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: User,
    description: 'Verify, refine, and compile the MDOs baseline inputs. Align the regional campaign goals with standard corporate budget guidelines.',
    features: [
      'Aggregate multiple local campaigns into a single proposal',
      'Audit log and adjustments trace for each budget item',
      'Format and validate regional ROI expectations',
      'Forward submission to the Zonal Manager portal'
    ],
    status: ['Complete', 'Active', 'Pending', 'Pending']
  },
  {
    id: 3,
    step: '03',
    title: 'ZM Approves Request',
    role: 'ZM',
    roleColor: '#a855f7', // Purple
    videoSrc: 'https://www.youtube.com/embed/k0D54kPLI30',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: Layers,
    description: 'Perform zonal audit of the submitted budget proposal, applying adjustments, caps, or querying specific line-items as required.',
    features: [
      'Comparative dashboard viewing historical zonal spend',
      'Line-item capping and allocation adjustments',
      'Interactive query feedback to the initiating AM',
      'Provisional approval and promotion to RM review'
    ],
    status: ['Complete', 'Complete', 'Active', 'Pending']
  },
  {
    id: 4,
    step: '04',
    title: 'RM Final Approval',
    role: 'RM',
    roleColor: '#10b981', // Emerald
    videoSrc: 'https://www.youtube.com/embed/VUtzUrV2qNo',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: ShieldCheck,
    description: 'Provide final executive sanction. Complete authorization logs and disburse funds for active regional deployments.',
    features: [
      'Executive-level summary of capital and operational margins',
      'Regulatory compliance checks and certification logs',
      'Instant release of funds and campaign activation',
      'Notification triggers sent to all regional coordinators'
    ],
    status: ['Complete', 'Complete', 'Complete', 'Active']
  },
  {
    id: 5,
    step: '05',
    title: 'Complete Workflow',
    role: 'Flow',
    roleColor: '#f59e0b', // Amber
    videoSrc: 'https://www.youtube.com/embed/q_7uX8aaDCw',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: Laptop,
    description: 'Step-by-step walkthrough of the entire campaign budget lifecycle, following a request from Telangana state through all administrative roles.',
    features: [
      'End-to-end workflow tracing across 5 user interfaces',
      'Real-time status updates and action alerts',
      'Comprehensive system audit trail inspection',
      'State-level filtering and analytics demo'
    ],
    status: ['Complete', 'Complete', 'Complete', 'Complete']
  },
  {
    id: 6,
    step: '06',
    title: 'MDO Budget Draft',
    role: 'MDO',
    roleColor: '#ec4899', // Pink
    videoSrc: 'https://www.youtube.com/embed/6Gfrmj1Ykxc',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: User,
    description: 'Marketing Development Officers (MDO) create localized event configurations and initialize the budget request parameters.',
    features: [
      'Define localized operation channels',
      'Create draft cost estimates',
      'Attach local vendor documentation',
      'Route to AIM review'
    ],
    status: ['Active', 'Pending', 'Pending', 'Pending']
  },
  {
    id: 7,
    step: '07',
    title: 'Finance Audit Review',
    role: 'Finance',
    roleColor: '#14b8a6', // Teal
    videoSrc: 'https://www.youtube.com/embed/Oa-jEKbQhfM',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: Landmark,
    description: 'Internal auditing verification for tax compliance, budget allocation ledgers, and institutional compliance checks.',
    features: [
      'Cross-reference cost ledger codes',
      'Verify tax allocations',
      'Check zonal fund availability limits',
      'Approve ledger disbursement'
    ],
    status: ['Complete', 'Complete', 'Active', 'Pending']
  },
  {
    id: 8,
    step: '08',
    title: 'Admin Portal Settings',
    role: 'Admin',
    roleColor: '#6b7280', // Gray
    videoSrc: 'https://www.youtube.com/embed/U3ttfWpTusA',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: ShieldCheck,
    description: 'Administrative console for configuring user role mappings, setting approval caps, and managing workflow lifecycle parameters.',
    features: [
      'Manage user role permissions',
      'Set budget approval boundaries',
      'Track active system events',
      'Examine global audit log records'
    ],
    status: ['Complete', 'Complete', 'Complete', 'Active']
  },
  {
    id: 9,
    step: '09',
    title: 'Alternative Flow Demo',
    role: 'All Roles',
    roleColor: '#eab308', // Amber
    videoSrc: 'https://www.youtube.com/embed/zLgJIsp4Lfw',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: Laptop,
    description: 'Complete end-to-end budget approval flow illustrating regional query callbacks, corrections, and successful final status promotion.',
    features: [
      'Demonstrate query resolution handoffs',
      'Trigger workflow status notifications',
      'Trace budget revisions in audit trail',
      'Review finalized regional outputs'
    ],
    status: ['Complete', 'Complete', 'Complete', 'Complete']
  },
  {
    id: 10,
    step: '10',
    title: 'AIM Login & Features',
    role: 'AIM',
    roleColor: '#6366f1', // Indigo
    videoSrc: 'https://www.youtube.com/embed/xrBI9vE7XOE',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: Landmark,
    description: 'Detailed showcase of the AIM portal\'s authentication flow, secure credentials check, and dashboard features.',
    features: [
      'Secure portal login and authentication checks',
      'View regional dashboard action panels',
      'Verify active workflow logs and status flags',
      'Overview of pending budget requests and alerts'
    ],
    status: ['Active', 'Pending', 'Pending', 'Pending']
  }
];

function App() {
  const [activeSession, setActiveSession] = useState(sessions[0]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', pb: 10 }}>
        
        {/* HEADER SECTION */}
        <AppHeader />

        {/* HERO SECTION / INTRO */}
        <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
          <Stack spacing={2} sx={{ maxWidth: 800, mb: 6 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                lineHeight: 1.2,
                fontSize: { xs: '2rem', md: '2.85rem' },
                background: 'linear-gradient(135deg, #ffffff 30%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Interactive Campaign Dashboard Walkthroughs
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
              Select a stage from the dashboard workflow sidebar to see it in action. Watch our recorded sessions on the left and see detailed functional notes on the right.
            </Typography>
          </Stack>

          {/* MAIN LAYOUT */}
          <Grid container spacing={4} alignItems="stretch">
            
            {/* SIDEBAR: Workflow Session Titles */}
            <Grid item xs={12} md={3.5}>
              <AppSidebar 
                sessions={sessions} 
                activeSession={activeSession} 
                onSelectSession={setActiveSession} 
              />
            </Grid>

            {/* SHOWCASE WORKSPACE: Video and Description */}
            <Grid item xs={12} md={8.5}>
              <Grid container spacing={3.5} alignItems="stretch" sx={{ height: '100%' }}>
                
                {/* VIDEO PANEL */}
                <Grid item xs={12} lg={7.5}>
                  <VideoPlayer activeSession={activeSession} />
                </Grid>

                {/* DESCRIPTION PANEL */}
                <Grid item xs={12} lg={4.5}>
                  <DetailCard activeSession={activeSession} />
                </Grid>

              </Grid>
            </Grid>

          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
