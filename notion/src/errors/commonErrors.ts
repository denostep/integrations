export class missingURLorIDorBlock extends Error {
  constructor() {
    super(`Missing URL or ID`);
  }
}
