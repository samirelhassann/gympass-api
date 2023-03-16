export class UserAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`${email} already exists`);
  }
}
