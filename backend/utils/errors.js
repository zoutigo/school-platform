/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */

class GeneralError extends Error {
  constructor(message) {
    super()
    this.message = message
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400
    }
    if (this instanceof NotFound) {
      return 404
    }
    if (this instanceof Unauthorized) {
      return 401
    }
    if (this instanceof Forbidden) {
      return 403
    }
    if (this instanceof TokenInvalid) {
      return 498
    }
    if (this instanceof PreConditionFailed) {
      return 412
    }

    return 500
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {}
class Forbidden extends GeneralError {}
class TokenInvalid extends GeneralError {}
class PreConditionFailed extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  Unauthorized,
  Forbidden,
  TokenInvalid,
  PreConditionFailed,
}
