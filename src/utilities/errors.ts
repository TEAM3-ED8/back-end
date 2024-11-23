export class ClientError extends Error {
  private statusCode: number
  private description: string

  constructor(
    message: string,
    statusCode: number = 400,
    description: string = ""
  ) {
    super(message)
    this.name = "ClientError"
    this.statusCode = statusCode
    this.description = description
  }
}

export class ServerError extends ClientError {
  constructor(
    message: string,
    statusCode: number = 500,
    description: string = ""
  ) {
    super(message, statusCode, description)
    this.name = "ServerError"
  }
}
