export const readEnv = (envName: string) => {
  const value = process.env[envName];

  if (!value || typeof value !== 'string') {
    throw new Error(`Please, specify "${envName}" env var`);
  }

  return value;
};
