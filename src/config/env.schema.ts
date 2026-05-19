import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),

  DATABASE_URL: z.url(),

  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.union([z.string(), z.number()]).default('1d'),

  // REDIS_HOST: z.string(),
  // REDIS_PORT: z.coerce.number().default(6379),
});

export type Env = z.infer<typeof envSchema>;
