import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid2,
  Stack,
  IconButton,
  Divider,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import PhoneNumberField from '../inputs/PhoneNumberField'
import NameField from '../inputs/NameField'
import FeedbackSnackbar from '../FeedbackSnackbar'

import useSubmit from '../../hooks/useSubmit'
import { submitProjectProposal } from '../../api/client'

const ProjectProposalForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    projectDescription: '',
    appFeatures: '',
    visualIdentity: 'Não',
  })

  const { fullName, phone, projectDescription, appFeatures, visualIdentity } =
    formData

  const { handleSubmit, loading, success, error } = useSubmit()

  const navigate = useNavigate()

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(formData, submitProjectProposal)
  }

  useEffect(() => {
    if (success) {
      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Projeto enviado com sucesso!',
      })
      setFormData({
        fullName: '',
        phone: '',
        projectDescription: '',
        appFeatures: '',
        visualIdentity: 'Não',
      })
    }
    if (error) {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Ocorreu um erro ao enviar o projeto. Tente novamente.',
      })
    }
  }, [success, error])

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <NameField
              label="Seu Nome"
              name="fullName"
              value={fullName}
              onChange={handleChange}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <PhoneNumberField
              label="Telefone"
              name="phone"
              value={phone}
              onChange={(_e, rawValue) =>
                setFormData((prev) => ({ ...prev, phone: rawValue }))
              }
              required
            />
          </Grid2>
        </Grid2>
        <TextField
          fullWidth
          label="O que você quer construir?"
          variant="outlined"
          margin="dense"
          multiline
          rows={3}
          name="projectDescription"
          value={projectDescription}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Quais seriam as funcionalidades do seu projeto?"
          variant="outlined"
          margin="dense"
          multiline
          rows={4}
          name="appFeatures"
          value={appFeatures}
          onChange={handleChange}
        />
        <FormControl component="fieldset" margin="dense" fullWidth>
          <FormLabel component="legend">
            Já tem identidade visual pronta?
          </FormLabel>
          <RadioGroup
            row
            name="visualIdentity"
            value={visualIdentity}
            onChange={handleChange}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel
              value="Sim, mas gostaria de aprimorá-la"
              control={<Radio />}
              label="Sim, mas gostaria de aprimorá-la"
            />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>
        <Stack
          marginTop="1rem"
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosIcon />}
            onClick={() => navigate(-1)}
            size="small"
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar proposta'}
          </Button>
        </Stack>
      </form>

      <FeedbackSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </>
  )
}

export default ProjectProposalForm
