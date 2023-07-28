import { Button as MUIButton } from '@mui/material'
import { ThemeProvider } from '@mui/system'

import { darkTheme } from '../styles/themes'

interface IButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  label: string
  disabled?: boolean
  width?: number | undefined
  height?: number | undefined
}

export const Button = ({ onClick, disabled, label, width, height }: IButtonProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <MUIButton
        variant="outlined"
        onClick={onClick}
        disabled={disabled}
        sx={{
          width: width || '100%',
          height: height || 42,
          cursor: 'pointer',
          '&.Mui-disabled': {
            background: '#484c53',
            color: '#ddd'
          }
        }}
      >
        {label}
      </MUIButton>
    </ThemeProvider>
  )
}
