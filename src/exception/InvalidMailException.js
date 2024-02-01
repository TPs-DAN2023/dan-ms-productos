export default class InvalidMailException extends Error {
  constructor(message) {
    super(message);
  }
}