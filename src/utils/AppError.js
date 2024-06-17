class AppError {
  statusError;
  message;

  constructor(message, statusError = 401) {
    (this.statusError = statusError), (this.message = message);
  }
}

module.exports = AppError;
