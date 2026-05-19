import z from 'zod';
import { envSchema } from './env.schema';

export function validateEnv(config: Record<string, unknown>) {
  const parsed = envSchema.safeParse(config);

  if (!parsed.success) {
    console.error(
      'Invalid environment variables:',
      z.treeifyError(parsed.error),
    );

    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}
