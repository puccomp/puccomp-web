
import { Box, Typography, IconButton, useTheme } from '@mui/material'
// ICONS
import PhoneIcon from '@mui/icons-material/Phone'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

const Footer = () => {
  const theme = useTheme()

  return (
    <Box
      component="footer"
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.navs,
        color: theme.palette.background.contrastText,
        zIndex: 10,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        p: 0.5,
      }}
    >
      {/* LEFT */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: { xs: 1, md: 0 },
        }}
      >
        <IconButton
          href="https://wa.me/5531972003328"
          target="_blank"
          rel="noopener"
        >
          <PhoneIcon />
        </IconButton>
        <Typography variant="body2" sx={{ color: 'inherit' }}>
          (31) 97200-3328
        </Typography>
      </Box>

      {/* MID */}
      <Box sx={{ mb: { xs: 1, md: 0 } }}>
        <Typography variant="body2" align="center" sx={{ color: 'inherit' }}>
          © PUC COMP EJ | 2025
        </Typography>
      </Box>

      {/* RIGHT */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <IconButton
          href="https://www.instagram.com/puccomp/"
          target="_blank"
          rel="noopener"
          sx={{ color: 'inherit' }}
        >
          <InstagramIcon />
        </IconButton>

        <IconButton
          href="https://linkedin.com/company/puc-comp"
          target="_blank"
          rel="noopener"
        >
          <LinkedInIcon />
        </IconButton>

        <IconButton
          href="https://github.com/puccomp"
          target="_blank"
          rel="noopener"
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Footer
