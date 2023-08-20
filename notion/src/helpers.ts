import Client from 'https://deno.land/x/notion_sdk@v2.2.3/src/Client.ts';
import { urlToIdError } from './errors/formatErrors.ts';
import { Tuner } from './mod.ts';

export const urlToId = {
  page: (url: string): string => {
    const match = url.match(/\/([\w-]+)\?/);
    if (match && match[1]) {
      const parts = match[1].split('-');
      if (parts.length > 1) {
        return parts[parts.length - 1];
      } else {
        return match[1];
      }
    } else {
      throw new urlToIdError(url);
    }
  },
  block: (url: string): string => {
    const match = url.match(/#([\w-]+)$/);
    if (match && match[1]) {
      return match[1];
    } else {
      throw new urlToIdError(url);
    }
  },
};

export async function maybeClient(client: Client | undefined) {
  return client ||
    new Client({ auth: Tuner.getEnv('NOTION_KEY') });
}
