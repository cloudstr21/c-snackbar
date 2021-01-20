import React from 'react'
import Snackbar, { SnackbarProps as MuiSnackbarProps } from '@material-ui/core/Snackbar'
import Button, { ButtonProps as MuiButtonProps } from '@material-ui/core/Button'

interface DefaultSnackbarProps {
  message?: string
  options?: unknown
  action?: string
  ButtonProps?: Partial<MuiButtonProps>
  SnackbarProps?: Partial<MuiSnackbarProps>
}

const DefaultSnackbar: React.FC<DefaultSnackbarProps> = ({
  message,
  action,
  ButtonProps,
  SnackbarProps,
}: DefaultSnackbarProps) => {
  return (
    <Snackbar
      {...SnackbarProps}
      message={message || undefined}
      action={
        action != null && (
          <Button color="secondary" size="small" {...ButtonProps}>
            {action}
          </Button>
        )
      }
    />
  )
}

export default DefaultSnackbar
