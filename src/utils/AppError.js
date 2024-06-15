class AppError {
  statusError,
  message

  constructor(statusError = 401, message)
  {
    this.statusError = statusError,
    this.message = message
  }
}

module.exports = AppError