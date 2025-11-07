import { GlobalStyles, useTheme } from '@mui/material'

const CustomScrollbar = () => {
  const theme = useTheme()

  return (
    <GlobalStyles
      styles={{
        '::-webkit-scrollbar': {
          width: '10px',
          height: '10px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default,
          borderRadius: '10px',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.background.paper,
          borderRadius: '10px',
          border: `2px solid ${theme.palette.background.default}`,
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
        '::-webkit-scrollbar-corner': {
          backgroundColor: theme.palette.background.default,
        },
      }}
    />
  )
}

export default CustomScrollbar
