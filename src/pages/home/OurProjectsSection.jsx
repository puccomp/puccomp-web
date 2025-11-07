import {
  Box,
  Card,
  Stack,
  Chip,
  Avatar,
  Grid2,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Alert,
  Skeleton,
} from '@mui/material'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAllProjects } from '../../api/client'
import { formatDateTextual } from '../../utils/dateUtils'

// ICONS
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

// COMPONENTS
import SectionTitle from '../../components/SectionTitle'
import UniformSection from '../../components/UniformSection'
import TechnologyIcon from '../../components/TechnologyIcon'

const formatProjectName = (name) => {
  if (!name || typeof name !== 'string') return ''
  return name.replace(/-/g, ' ')
}

const ProjectCard = ({ name, createdAt, selected, onClick }) => {
  return (
    <Card
      variant="outlined"
      onClick={onClick}
      sx={{
        p: 2,
        cursor: 'pointer',
        borderRadius: 2,
        backgroundColor: selected ? 'action.selected' : 'background.paper',
        transition: '0.2s',
        '&:hover': {
          boxShadow: 2,
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <PlayArrowIcon
          fontSize="large"
          sx={{
            color: selected ? 'primary.main' : 'text.secondary',
          }}
        />
        <Box>
          <Typography
            color="text.primary"
            variant="h6"
            fontWeight="bold"
            gutterBottom
          >
            {formatProjectName(name)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {formatDateTextual(createdAt)}
          </Typography>
        </Box>
      </Stack>
    </Card>
  )
}

const ProjectDetails = ({ open, handleClose, project }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogContent>
        {/* HEADER */}
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {formatProjectName(project.name)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatDateTextual(project.createdAt)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* DESCRIPTION */}
        <Typography variant="body1" color="text.primary" gutterBottom>
          <strong>Descrição: </strong>
          {project.description || 'Nenhuma disponível.'}
        </Typography>

        {(project.technologies?.length > 0 ||
          project.contributors?.length > 0) && <Divider sx={{ my: 2 }} />}

        <Grid2 container spacing={2}>
          {project.technologies?.length > 0 && (
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Tecnologias
              </Typography>
              <Stack direction="row" flexWrap="wrap">
                {project.technologies.map((tech) => (
                  <TechnologyIcon key={tech.id} technology={tech} />
                ))}
              </Stack>
            </Grid2>
          )}

          {project.contributors?.length > 0 && (
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contribuidores
              </Typography>
              <Stack direction="row" flexWrap="wrap">
                {project.contributors.map((contributor) => (
                  <Chip
                    key={contributor.member_id}
                    avatar={
                      contributor.avatar_url ? (
                        <Avatar src={contributor.avatar_url} />
                      ) : (
                        <Avatar>
                          {contributor.name?.[0]?.toUpperCase() || '?'}
                        </Avatar>
                      )
                    }
                    variant="outlined"
                    label={contributor.name}
                    clickable={!!contributor.github_url}
                    component={contributor.github_url ? 'a' : 'div'}
                    href={contributor.github_url || undefined}
                    target={contributor.github_url ? '_blank' : undefined}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Stack>
            </Grid2>
          )}
        </Grid2>
      </DialogContent>
    </Dialog>
  )
}

const ProjectsSkeleton = () => (
  <Grid2 container spacing={4}>
    <Grid2 size={{ sm: 12, md: 6 }}>
      <Skeleton variant="text" width="60%" height={56} sx={{ mb: 2 }} />

      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="85%" sx={{ mb: 4 }} />

      <Stack
        spacing={2}
        sx={{
          display: { xs: 'none', sm: 'flex' },
        }}
      >
        <Skeleton variant="rounded" height={90} />
        <Skeleton variant="rounded" height={90} />
        <Skeleton variant="rounded" height={90} />
      </Stack>
    </Grid2>

    <Grid2 size={{ sm: 12, md: 6 }}>
      <Skeleton
        variant="rounded"
        height={467}
        sx={{
          display: { xs: 'none', sm: 'block' },
          height: '100%',
          minHeight: 467,
        }}
      />
    </Grid2>
  </Grid2>
)

const OurProjectsSection = ({ bgColor }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const PLACEHOLDER_IMAGE_URL = '/placeholder-unavailable-image.png'

      const response = await fetchAllProjects()
      const top3Projects = response.slice(0, 3).map((project) => ({
        ...project,
        image_url: project.image_url || PLACEHOLDER_IMAGE_URL,
      }))

      const enrichedProjects = await Promise.all(
        top3Projects.map(async (project) => {
          try {
            const [contributorsRes, technologiesRes] = await Promise.all([
              fetch(project.contributors_url),
              fetch(project.technologies_url),
            ])

            const [contributors, technologies] = await Promise.all([
              contributorsRes.json(),
              technologiesRes.json(),
            ])

            return { ...project, contributors, technologies }
          } catch (error) {
            console.error(
              `Error fetching details for project ${project.name}:`,
              error
            )
            return { ...project, contributors: [], technologies: [] }
          }
        })
      )
      console.log('Enriched Projects:', enrichedProjects)

      return enrichedProjects
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  })

  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const selectedFeature = projects[selectedItemIndex] || {}

  return (
    <UniformSection bgColor={bgColor}>
      {isError && (
        <Alert severity="error">
          Ocorreu um erro ao carregar sessão dos projetos.
        </Alert>
      )}
      {isLoading && !isError && <ProjectsSkeleton />}
      {!isLoading && !isError && (
        <Grid2 container spacing={4}>
          {/* LEFT SECTION */}
          <Grid2 size={{ sm: 12, md: 6 }} component="nav">
            <SectionTitle
              title="Alguns de Nossos Projetos"
              titleSize="h4"
              sx={{ marginBottom: 2 }}
            />
            <Typography
              component="p"
              variant="body1"
              color="text.secondary"
              sx={{ marginBottom: { xs: 2, sm: 4 } }}
            >
              Aqui você encontra exemplo de projetos desenvolvidos pela{' '}
              <strong>COMP</strong>. Alguns projetos podem ser aberto, com o
              codigo publicado no github da empresa.
            </Typography>

            {/* MOBILE VIEW - Chips */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              {projects.map(({ name }, index) => (
                <Chip
                  key={index}
                  label={`Projeto ${index + 1}`}
                  onClick={() => setSelectedItemIndex(index)}
                  clickable
                  color={selectedItemIndex === index ? 'primary' : 'default'}
                />
              ))}
            </Stack>

            {/* MOBILE VIEW - Selected Project */}
            <Card
              variant="outlined"
              sx={{
                display: { xs: 'block', sm: 'none' },
                marginTop: 4,
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${selectedFeature.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: 280,
                }}
              />
              <Box sx={{ padding: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1" fontWeight="bold">
                    {formatProjectName(selectedFeature.name)}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {formatDateTextual(selectedFeature.createdAt)}
                  </Typography>
                </Stack>

                <Typography
                  color="primary"
                  variant="body2"
                  fontWeight="bold"
                  onClick={handleOpen}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginTop: 2,
                  }}
                >
                  Ver projeto completo
                  <ChevronRightRoundedIcon fontSize="small" />
                </Typography>
              </Box>
            </Card>

            {/* DESKTOP VIEW - Project List */}
            <Stack
              spacing={2}
              sx={{
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  createdAt={project.createdAt}
                  language={project.language}
                  selected={selectedItemIndex === index}
                  onClick={() => setSelectedItemIndex(index)}
                />
              ))}
            </Stack>
          </Grid2>

          {/* RIGHT SECTION - Project Image */}
          <Grid2 size={{ sm: 12, md: 6 }}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                px: 2,
                pt: 2,
              }}
            >
              <Box
                component="img"
                src={selectedFeature.image_url}
                alt={selectedFeature.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  maxHeight: 467,
                  objectFit: 'cover',
                  borderRadius: 1,
                  border: 2,
                  borderColor: 'divider',
                }}
              />
              <Box textAlign="center">
                <Button onClick={handleOpen}>Ver Projeto</Button>
              </Box>
            </Card>
          </Grid2>
        </Grid2>
      )}
      <ProjectDetails
        open={open}
        handleClose={handleClose}
        loading={isLoading}
        project={selectedFeature}
      />
    </UniformSection>
  )
}

export default OurProjectsSection
