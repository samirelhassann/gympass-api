export class MaxCheckInsPerDayExceededError extends Error {
  constructor() {
    super("Max check ins per day exceeded");
  }
}
