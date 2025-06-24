import { createEnv } from "@t3-oss/env-nextjs";

const env = createEnv({
  server: {
    // SERVER_VAR: z.string(),
  },
  client: {
    // NEXT_PUBLIC_CLIENT_VAR: z.string(),
  },
  experimental__runtimeEnv: {
    // NEXT_PUBLIC_CLIENT_VAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

export default env;
