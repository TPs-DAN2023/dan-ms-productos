export default class ProductStockNotAvailableException extends Error {
  constructor(message) {
    super(message);
  }
}