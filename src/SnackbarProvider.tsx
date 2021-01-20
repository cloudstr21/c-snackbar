import React, { ReactNode, useState } from 'react'
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide'
import Grow from '@material-ui/core/Grow'

// #region Local imports
import SnackbarContext from './SnackbarContext'
import DefaultSnackbar from './DefaultSnackbar'
import { TransitionType, SnackbarContexValue, SnackbarOptions } from './Snackbar'
// #endregionend

interface SnackbarProviderProps {
  ButtonProps?: Record<string, unknown>
  children?: ReactNode
  SnackbarComponent?: React.ElementType
  SnackbarProps?: Record<string, unknown>
}

interface SnackbarProviderState {
  open?: boolean
  message?: string
  options?: SnackbarOptions
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  ButtonProps = {},
  children,
  SnackbarComponent = DefaultSnackbar,
  SnackbarProps = {},
}: SnackbarProviderProps) => {
  const [state, setState] = useState<SnackbarProviderState>({
    open: false,
    message: undefined,
    options: undefined,
  })
  const existingSnackbarProps = { ...SnackbarProps }

  const showMessage = (message: string, options: SnackbarOptions) => {
    setState({ open: true, message, options })
  }

  const [stateContextValue] = useState<SnackbarContexValue>({ showMessage })

  const handleClose = (_e: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setState({ open: false, options: undefined })
  }

  const handleActionClick = (e: React.SyntheticEvent | MouseEvent, reason?: string) => {
    handleClose(e, reason)
    if (state.options && state.options.handleAction) {
      state.options.handleAction()
    }
  }

  const RenderTransitionComponent = (transitionType?: TransitionType): any => {
    let transition = Slide
    switch (transitionType) {
      case 'fade':
        transition = Fade
        break
      case 'grow':
        transition = Grow
        break
      case 'slide':
        transition = Slide
        break
      default:
        transition = Slide
    }
    return transition
  }

  return (
    <>
      <SnackbarContext.Provider value={stateContextValue}>{children}</SnackbarContext.Provider>
      <SnackbarComponent
        message={state.message}
        action={state.options && state.options.action}
        ButtonProps={{ ...ButtonProps, onClick: handleActionClick }}
        SnackbarProps={{
          ...existingSnackbarProps,
          open: state.open,
          autoHideDuration: state.options?.autoHideDuration
            ? state.options?.autoHideDuration
            : existingSnackbarProps.autoHideDuration,
          TransitionComponent: RenderTransitionComponent(state.options?.transitionType),
          onClose: handleClose,
        }}
      />
    </>
  )
}

export default SnackbarProvider
