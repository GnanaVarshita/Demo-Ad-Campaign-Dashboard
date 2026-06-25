import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Grid, Container, Typography, Stack, IconButton } from '@mui/material';
import { 
  Landmark, Receipt, BarChart3, ChevronLeft, ChevronRight,
  Activity, Users, TrendingUp, PieChart, Wallet, 
  Sparkles, FileText, Download, Shield
} from 'lucide-react';
import theme from './theme';

// Import subcomponents
import AppHeader from './components/AppHeader';
import VideoPlayer from './components/VideoPlayer';
import DetailCard from './components/DetailCard';

// Demo video sessions data (3 core sessions with detailed workflow mappings)
const sessions = [
  {
    id: 1,
    step: '01',
    title: 'Budget Request & Approval (B.R.S)',
    role: 'AIM & Management',
    roleColor: '#6366f1', // Indigo
    videoSrc: 'https://www.youtube.com/embed/REGL31kV6KY',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: Landmark,
    description: 'This walkthrough demonstrates the end-to-end budget request lifecycle. First, the AIM (All India Manager) starts a BRS, setting the time limits. Account Managers (AMs) then submit their regional requirements, which flow up to Zonal and Regional Managers for approvals, culminating in automatic P.O generation.',
    features: [
      'AIM initiates the Budget Request Session (B.R.S) with specific deadlines',
      'Prescribed AMs submit their required budgets and estimated sales projections',
      'Respective Zonal Managers (ZM) review and approve requests in the portal',
      'Regional Managers (RM) perform secondary reviews and authorize budget requests',
      'AIM conducts final review and issues approvals (with or without modifications)',
      'Automatic Draft P.O creation with administrative refinement controls',
      'AIM grants final authorization in the P.O Approvals tab to activate the P.O'
    ],
    status: ['AIM (BRS)', 'AM Submission', 'ZM Review', 'RM Review', 'AIM Final', 'Admin PO', 'Active PO'],
    workflowSteps: [
      { role: 'AIM', text: 'Initiates “Budget Request Session” (B.R.S) and prescribes a time limit for submissions.' },
      { role: 'AM', text: 'Receives the B.R.S notification, then submits their required budget and estimated sales for that budget.' },
      { role: 'ZM', text: 'Reviews the regional budget requirements and estimated sales, then approves the budget.' },
      { role: 'RM', text: 'Reviews the zonal outputs, checks estimates, and provides regional-level approval.' },
      { role: 'AIM', text: 'Reviews all submissions, approves them (with/without modifications), triggering an automatic “Draft P.O”.' },
      { role: 'Admin', text: 'Modifies draft P.O in consistence with management requirements and submits it for final review.' },
      { role: 'AIM', text: 'Approves the final P.O in the “P.O Approvals tab”, making it active from the designated date.' }
    ]
  },
  {
    id: 2,
    step: '02',
    title: 'Activity Submission & Vendor Billing',
    role: 'AM, ZM & Vendors',
    roleColor: '#a855f7', // Purple
    videoSrc: 'https://www.youtube.com/embed/ZPWPKee0r9Q',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: Receipt,
    description: 'Once a P.O is active, the AM logs campaign spending in the Activity Sheet. This workflow traces the approval flow from Zonal Managers to external Vendors, who can proceed to billing, add commissions, and submit files to finance.',
    features: [
      'AM submits expenditures and operations data in the Activity Sheet',
      'Respective Zonal Managers (ZM) review and approve/reject logged activities',
      'Approved activities instantly propagate to the Vendors Tab',
      'Vendors select activities and click “Proceed for Billing”',
      'Vendors raise bills with custom commission rates in the Billing Tab',
      'Bills automatically appear in the Finance Tab for compliance and ledger review',
      'Modification requests allow vendors to revise bills after Admin approval'
    ],
    status: ['AM Activity', 'ZM Approval', 'Vendor Select', 'Billing Tab', 'Finance Tab', 'Admin Sync'],
    workflowSteps: [
      { role: 'AM', text: 'Spends money for active P.O and logs detailed entries in the “Activity Sheet”.' },
      { role: 'ZM', text: 'Reviews activity in the “Approvals Tab” and approves or rejects the submission.' },
      { role: 'Vendors', text: 'Sees approved activities in the “Vendors Tab”, selects items, and clicks “Proceed for Billing”.' },
      { role: 'Vendors', text: 'Navigates to the “Billing Tab” and raises a bill by adding their specified commission.' },
      { role: 'Finance', text: 'Receives the raised bill in the “Finance Tab” for auditing and ledger entry.' },
      { role: 'Vendor/Admin', text: 'Vendor can send a “Request for Modification” to Admin. Admin approval allows bill resubmission.' }
    ]
  },
  {
    id: 3,
    step: '03',
    title: 'Sales Updates & Visual Reports',
    role: 'Sales Tracking',
    roleColor: '#10b981', // Emerald
    videoSrc: 'https://www.youtube.com/embed/ktHirpxDUBs',
    url: 'https://gnanavarshita.github.io/Campaign-dashboard/',
    icon: BarChart3,
    description: 'This video demonstrates the sales recording feature, tracking how area-wise sales figures and distributor allocations propagate instantly into automated dashboards and reports.',
    features: [
      'Account Managers update area-wise sales metrics inside the sales module',
      'Direct mapping and tracking of performance per localized distributor',
      'Instant synchronization of sales metrics into real-time visual reports',
      'Elimination of manual spreadsheets for calculating campaign sales volume and ROI'
    ],
    status: ['AM Input', 'Distributor Sync', 'Realtime Reports'],
    workflowSteps: [
      { role: 'AM', text: 'Enters area-wise sales details directly into the database via the sales portal.' },
      { role: 'Distributor', text: 'System matches the sales figures with specific distributors operating in the area.' },
      { role: 'Reports', text: 'Visual charts and performance tables update immediately, allowing management to track ROI.' }
    ]
  }
];

// 9 Core Platform Features
const platformFeatures = [
  {
    title: 'Real-time Activity Sync',
    desc: 'Instant updates on all logged campaign activities across the entire organizational hierarchy.',
    icon: Activity
  },
  {
    title: 'Unified Stakeholder Portal',
    desc: 'One-stop solution connecting AIM, RM, ZM, AM, Vendors, and Finance in a seamless workspace.',
    icon: Users
  },
  {
    title: 'Area-wise Sales & Distributors',
    desc: 'Easily track and update localized sales numbers linked directly to local distributors.',
    icon: TrendingUp
  },
  {
    title: 'Granular Spend Analytics',
    desc: 'Analyze budget spending PO-wise, Product-wise, or Activity-wise across Regions, Zones, and Areas.',
    icon: PieChart
  },
  {
    title: 'Live Budget Tracker',
    desc: 'Real-time visibility into active and remaining budget balances to keep teams informed.',
    icon: Wallet
  },
  {
    title: 'Zero Spreadsheet Overhead',
    desc: 'No more manual Excel preparation. Managers can focus fully on running high-performing campaigns.',
    icon: Sparkles
  },
  {
    title: 'Integrated Vendor Billing',
    desc: 'Vendors can directly select approved activities, raise bills, add commission, and review receivables.',
    icon: FileText
  },
  {
    title: 'Multi-Role Export Options',
    desc: 'Download required activity reports tailored to the permissions of AIM, RM, ZM, AM, and Vendors.',
    icon: Download
  },
  {
    title: 'Guided Budget Allocations',
    desc: 'Interactive budget guidance visualizes available resources to direct team advertising priorities.',
    icon: Shield
  }
];

function App() {
  const [activeSession, setActiveSession] = useState(sessions[0]);

  const handlePrev = () => {
    const currentIndex = sessions.findIndex(s => s.id === activeSession.id);
    if (currentIndex > 0) {
      setActiveSession(sessions[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = sessions.findIndex(s => s.id === activeSession.id);
    if (currentIndex < sessions.length - 1) {
      setActiveSession(sessions[currentIndex + 1]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', pb: 10 }}>
        
        {/* HEADER SECTION */}
        <AppHeader />

        {/* HERO SECTION / INTRO */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Stack spacing={2} sx={{ maxWidth: 850, mb: 5 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                lineHeight: 1.2,
                fontWeight: 800,
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                background: 'linear-gradient(135deg, #ffffff 40%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Outfit", sans-serif',
                letterSpacing: '-1px'
              }}
            >
              Interactive Campaign Dashboard Walkthroughs
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
              Shift through our 3 guided video walkthoughs below using the slider controls. Watch recorded dashboard sessions on the left and see interactive functional timelines and pipelines on the right.
            </Typography>
          </Stack>

          {/* SLIDER / SWITCHER NAVIGATION BAR */}
          <Box 
            className="hover-gradient-border"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              p: 2, 
              mb: 4, 
              background: 'rgba(11, 15, 25, 0.6)',
              borderRadius: 3,
              border: '1px solid rgba(255, 255, 255, 0.04)',
            }}
          >
            <IconButton 
              onClick={handlePrev} 
              disabled={activeSession.id === 1}
              sx={{ 
                color: '#ffffff',
                '&.Mui-disabled': { color: 'rgba(255,255,255,0.15)' },
                border: '1px solid rgba(255,255,255,0.06)',
                backgroundColor: 'rgba(255,255,255,0.01)',
                transition: 'all 0.3s ease',
                '&:not(.Mui-disabled):hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  transform: 'translateX(-2px)'
                }
              }}
            >
              <ChevronLeft size={20} />
            </IconButton>

            {/* Stepper Dots & Title Indicators */}
            <Stack direction="row" spacing={{ xs: 2, md: 5 }} alignItems="center">
              {sessions.map((session) => {
                const isActive = session.id === activeSession.id;
                return (
                  <Box 
                    key={session.id}
                    onClick={() => setActiveSession(session)}
                    sx={{ 
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      opacity: isActive ? 1 : 0.35,
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        opacity: 0.8
                      }
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 800, 
                        color: isActive ? activeSession.roleColor : 'text.secondary',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        mb: 0.5,
                        fontSize: '0.7rem'
                      }}
                    >
                      Video {session.step}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 700, 
                        color: '#ffffff',
                        fontSize: { xs: '0.8rem', sm: '0.95rem' },
                        display: { xs: isActive ? 'block' : 'none', sm: 'block' },
                        textAlign: 'center'
                      }}
                    >
                      {session.title.split(' (')[0]}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>

            <IconButton 
              onClick={handleNext} 
              disabled={activeSession.id === 3}
              sx={{ 
                color: '#ffffff',
                '&.Mui-disabled': { color: 'rgba(255,255,255,0.15)' },
                border: '1px solid rgba(255,255,255,0.06)',
                backgroundColor: 'rgba(255,255,255,0.01)',
                transition: 'all 0.3s ease',
                '&:not(.Mui-disabled):hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  transform: 'translateX(2px)'
                }
              }}
            >
              <ChevronRight size={20} />
            </IconButton>
          </Box>

          {/* MAIN SHOWCASE WORKSPACE */}
          <Grid container spacing={4} alignItems="flex-start">
            
            {/* VIDEO PANEL (Wide View) */}
            <Grid item xs={12} md={8}>
              <VideoPlayer activeSession={activeSession} />
            </Grid>

            {/* DESCRIPTION PANEL */}
            <Grid item xs={12} md={4}>
              <DetailCard activeSession={activeSession} />
            </Grid>

          </Grid>

          {/* FEATURES GRID SECTION */}
          <Box sx={{ mt: 10 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center"
              sx={{ 
                fontWeight: 800, 
                mb: 1.5,
                fontFamily: '"Outfit", sans-serif',
                background: 'linear-gradient(135deg, #ffffff 40%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Key Platform Capabilities
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              align="center" 
              sx={{ mb: 6, maxWidth: 650, mx: 'auto', fontSize: '0.95rem', lineHeight: 1.6 }}
            >
              A real-time, automated operational toolkit designed to orchestrate budget campaigns and billing processes across all organizational tiers.
            </Typography>

            <Grid container spacing={3}>
              {platformFeatures.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Box 
                      className="hover-gradient-border"
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        background: 'rgba(15, 23, 42, 0.3)',
                        borderRadius: 3,
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)'
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          p: 1.5, 
                          borderRadius: 2, 
                          width: 'fit-content',
                          backgroundColor: 'rgba(99, 102, 241, 0.08)',
                          color: '#818cf8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)'
                        }}
                      >
                        <FeatIcon size={20} />
                      </Box>
                      
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem' }}>
                        {feat.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.875rem' }}>
                        {feat.desc}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
