type TransitionType = 'fade' | 'grow' | 'slide'

interface SnackbarContexValue {
  /**
   * Display a message with this snackbar.
   * @param {string} message message to display
   * @param {object} options options parameters that will be passed to the snackbar renderer
   */
  showMessage(message: string, options?: SnackbarOptions): void
}

interface SnackbarOptions {
  /**
   * Display a message with this snackbar.
   * @param {string} [action] label for the action button
   * @param {number} [autoHideDuration] numbers for auto hide duration
   * @param {string} [transitionType] type of transition will be use on show/hide snackbar
   * @param {function} [handleAction] click handler for the action button
   */
  action?: string
  autoHideDuration?: number
  transitionType?: TransitionType
  handleAction?: () => void
}

export type { TransitionType, SnackbarContexValue, SnackbarOptions }
