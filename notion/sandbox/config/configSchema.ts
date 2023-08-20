import { z } from 'https://deno.land/x/zod/mod.ts';

export const configSchema = z.object({
  config: z.object({
  pageId: z.string()
}),
  env: z.object({
  
})
})

export type Config = z.infer<typeof configSchema>;

//├─ config
//│  └─ pageId
//└─ env
//