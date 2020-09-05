
import { PhotionError } from '~/src/errors/Error';


/**
 * HttpError base class
 */
export class HttpError extends PhotionError {
  public static statusCode = 0;

  /**
   * Wrapper over `this.constructor.statusCode`
   */
  get statusCode() {
    return (this.constructor as typeof HttpError).statusCode;
  }
}
