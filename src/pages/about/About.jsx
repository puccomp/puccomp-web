import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  Container,
  Divider,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Paragraph } from '../../styles/Texts'

// API
import { fetchMemories } from '../../api/client'

// ICONS
import HomeIcon from '@mui/icons-material/Home'
import ApartmentIcon from '@mui/icons-material/Apartment'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

// IMAGES
import puccoreuIMG from '../../assets/images/puccoreu.png'
import puclibaIMG from '../../assets/images/pucliba.png'

// COMPONENTS
import SectionContainer from '../../components/SectionContainer'
import SectionTitle from '../../components/SectionTitle'
import TabContent from '../../components/TabContent'
import HistoryTab from './HistoryTab'
import MemoriesTab from './MemoriesTab'

const About = () => {
  const locations = [
    {
      id: 1,
      title: 'PUC - Coração Eucarístico',
      address: 'Av. Dom José Gaspar, 500, Prédio 34 | MG, 30535-901',
      image: puccoreuIMG,
      icon: HomeIcon,
      mapUrl:
        'https://www.google.com/maps?q=Av.+Dom+José+Gaspar,+500,+Prédio+34+MG,+30535-901',
    },
    {
      id: 2,
      title: 'PUC - Campus Lourdes',
      address: 'R. Cláudio Manoel, 1162, Prédio 4 | MG, 30140-100',
      image: puclibaIMG,
      icon: ApartmentIcon,
      mapUrl:
        'https://www.google.com/maps?q=R.+Cláudio+Manoel,+1162,+Prédio+4+MG,+30140-100',
    },
  ]
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const handleSelectLocation = (location) => {
    setSelectedLocation(location)
  }
  const handleViewMap = () => {
    if (selectedLocation.mapUrl) window.open(selectedLocation.mapUrl, '_blank')
  }

  const [tabValue, setTabValue] = useState(0)
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  const {
    data: memories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['memories'],
    queryFn: fetchMemories,
  })

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const isSm = useMediaQuery(
    theme.breakpoints.up('sm') && theme.breakpoints.down('md')
  )

  useEffect(() => {
    locations.forEach((location) => {
      const img = new Image()
      img.src = location.image
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const noMemories = !isLoading && !error && memories?.length === 0

  useEffect(() => {
    if (noMemories && tabValue === 0) setTabValue(1)
  }, [noMemories, tabValue])

  return (
    <>
      <Container sx={{ paddingY: 5 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <SectionContainer
            title="Quem somos nós ?"
            titleBgColor={theme.palette.background.paper}
          >
            <Paragraph>
              A COMP é uma <strong>Empresa Júnior</strong> formada por
              estudantes de graduação dos cursos do Instituto de Ciências Exatas
              e Informática da PUC Minas. Especializamo-nos no desenvolvimento
              de <strong>softwares sob demanda</strong>, criando soluções
              personalizadas que atendem de forma precisa aos desafios e
              objetivos dos nossos clientes.
            </Paragraph>
          </SectionContainer>

          <SectionContainer
            title="Propósito"
            titleBgColor={theme.palette.background.paper}
          >
            <Paragraph>
              Nosso propósito é oferecer <strong>soluções de software</strong>{' '}
              de alta qualidade e inovação, sempre alinhadas às necessidades
              exclusivas de cada cliente. Além disso, temos como missão
              contribuir para o crescimento pessoal e profissional de nossos
              membros, proporcionando vivências reais de mercado que conectam o
              rigor acadêmico à prática empresarial.
            </Paragraph>
          </SectionContainer>
        </Stack>
      </Container>

      {/* TAB SECTION */}
      <Container>
        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              marginBottom: 1,
              backgroundColor: theme.palette.background.paper,
              px: 1,
              pt: 1,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              aria-label="tabs example"
            >
              <Tab label="Memórias" disabled={noMemories} />
              <Tab label="História" />
              <Tab label="Valores" disabled />
            </Tabs>
          </Box>
          <MemoriesTab
            value={tabValue}
            index={0}
            memories={memories}
            breakpoints={{ isXs: isXs, isSm: isSm }}
          />
          <HistoryTab value={tabValue} index={1} />
          <TabContent value={tabValue} index={2}>
            <Paragraph>
              Conteúdo da aba "Valores". Insira os valores ou missões da equipe
              ou da empresa.
            </Paragraph>
          </TabContent>
        </Box>
      </Container>
      {/* LOCATION SECTION */}
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 4 }}
          sx={{
            my: 4,
            py: 4,
            px: { xs: 2, md: 4 },
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            border: 1,
            borderColor: 'divider',
          }}
        >
          {isXs ? (
            <>
              <SectionTitle title="Onde Fica ?" />
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                {locations.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => handleSelectLocation(location)}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'all 0.2s ease-in-out',
                      color:
                        location.id === selectedLocation.id
                          ? 'primary.main'
                          : 'inherit',
                      '&:hover': {
                        color: 'primary.dark',
                      },
                    }}
                  >
                    <location.icon fontSize="large" />
                  </Box>
                ))}
              </Box>
            </>
          ) : (
            <Stack
              spacing={2}
              sx={{
                width: { xs: '100%', md: '80%' },
              }}
            >
              <Box>
                <SectionTitle title="Onde Fica ?" />
                <Divider sx={{ py: 1 }} />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ my: 1.5 }}
                >
                  Nossos espaços estão localizados nas unidades da Pontifícia
                  Universidade Católica de Minas Gerais, em Belo Horizonte.
                </Typography>
              </Box>
              {locations.map((location) => (
                <Card
                  key={location.id}
                  onClick={() => handleSelectLocation(location)}
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    backgroundColor:
                      location.id === selectedLocation.id
                        ? 'primary.dark'
                        : 'inherit',
                    transition: 'all 0.2s ease-in-out',
                    color:
                      location.id === selectedLocation.id ? '#fff' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: '#fff',
                    },
                    border: `1px solid ${location.id === selectedLocation.id ? theme.palette.primary.main : theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius,
                    padding: theme.spacing(0.2),
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      pl: 2,
                    }}
                  >
                    <location.icon fontSize="large" />
                  </Box>

                  <Divider orientation="vertical" flexItem />

                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{location.title}</Typography>
                    <Typography variant="body2">{location.address}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}

          <Box
            sx={{
              width: { xs: '100%', md: '65%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              mt: { xs: 2, md: 0 },
              backgroundColor: 'secundary.main',
              px: 2,
              py: 1,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6">{selectedLocation.title}</Typography>
            <Box
              component="img"
              src={selectedLocation.image}
              alt={selectedLocation.title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 400,
                objectFit: 'cover',
                borderRadius: 1,
                border: 2,
                borderColor: 'divider',
              }}
            />
            <Button variant="outlined" size="small" onClick={handleViewMap}>
              Ver no Mapa
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default About
