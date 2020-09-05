
/**
 * Photion error base class
 */
export class PhotionError extends Error {
  errorCode: string;

  constructor(errorCode: string, message: string) {
    super(message);
    this.errorCode = errorCode;
  }
}
