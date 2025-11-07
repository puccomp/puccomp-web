import { useTheme } from '@emotion/react'
import { alpha, Grid2, Typography } from '@mui/material'
import ServiceCard from '../../components/cards/ServiceCard'
import UniformSection from '../../components/UniformSection'

// ICONS
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import AppShortcutIcon from '@mui/icons-material/AppShortcut'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'

const services = [
  {
    title: 'Sistemas Web',
    icon: <BrandingWatermarkIcon fontSize="large" />,
    description: 'Desenvolvemos sites e sistemas web sob medida.',
  },
  {
    title: 'Aplicativos Mobile',
    icon: <AppShortcutIcon fontSize="large" />,
    description: 'Criamos aplicativos nativos ou multiplataforma.',
  },
  {
    title: 'UI & UX Design',
    icon: <DesignServicesIcon fontSize="large" />,
    description: 'Projetamos interfaces modernas e intuitivas.',
  },
  {
    title: 'Automatização',
    icon: <SettingsSuggestIcon fontSize="large" />,
    description: 'Automatizamos processos para aumentar a eficiência.',
  },
]

const OurServicesSection = () => {
  const theme = useTheme()
  return (
    <UniformSection bgColor={alpha(theme.palette.background.paper, 0.8)}>
      <Typography variant="h5" align="center" gutterBottom>
        Nossos serviços
      </Typography>

      <Typography
        component="h2"
        variant="h3"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        O que fazemos de melhor.
      </Typography>

      <Typography
        variant="subtitle2"
        align="center"
        sx={{ maxWidth: 600, margin: '0 auto', pb: 4 }}
        color="text.secondary"
      >
        Oferecemos soluções em tecnologia para transformar ideias em realidade.
        Nosso foco é criar experiências digitais que impulsionam negócios e
        entregam resultados.
      </Typography>

      <Grid2 container spacing={2} justifyContent="center">
        {services.map((service, index) => (
          <Grid2 key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <ServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
              customStyles={{
                backgroundColor: theme.palette.background.default,
              }}
            />
          </Grid2>
        ))}
      </Grid2>
    </UniformSection>
  )
}

export default OurServicesSection
