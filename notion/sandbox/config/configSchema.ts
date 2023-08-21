import { z } from "https://deno.land/x/zod/mod.ts";

export const configSchema = z.object({
  config: z.object({
    testPageID: z.string(),
  }),
  env: z.object({
    NOTION_KEY: z.string(),
  }),
});

export type Config = z.infer<typeof configSchema>;

//├─ config
//│  └─ testPageID
//└─ env
//   └─ NOTION_KEY
//
