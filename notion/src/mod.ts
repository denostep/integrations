import { append } from "./appendors.ts";
import { extractFromBlock } from "./extractors.ts";
import * as types from "./blockInterfaces.ts";
import {
  getBlockById,
  getBlocksByPage,
  getChildren,
  getFirstBlock,
} from "./getters.ts";
import { urlToId } from "./helpers.ts";

export default {
  append,
  extract: extractFromBlock,
  types,
  get: {
    blocksOnPage: getBlocksByPage,
    blockById: getBlockById,
    firstBlock: getFirstBlock,
    children: getChildren,
  },
  urlToId,
};
