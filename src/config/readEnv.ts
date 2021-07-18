const readEnv = (envName: string) => {
  const value = process.env[envName];

  if (!value || typeof value !== 'string') {
    throw new Error(`Please, specify "${envName}" env var`);
  }

  return value;
};

export default readEnv;
