export class urlToIdError extends Error {
  constructor(url: string) {
    super(`Cannot extract ID from ${url}!`);
  }
}
