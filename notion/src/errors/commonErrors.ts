export class missingURLorID extends Error {
  constructor() {
    super(`Missing URL or ID`);
  }
}
