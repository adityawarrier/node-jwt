interface IConfig {
  app: {
    port: string;
  };
  db: {
    connection: string;
  };
  token: {
    secret: string;
  };
}

const config = (): IConfig => ({
  app: {
    port: process?.env?.PORT ?? '',
  },
  db: {
    connection: process?.env?.DB_CONNECT ?? '',
  },
  token: {
    secret: process?.env?.TOKEN_SECRET ?? '',
  },
});

export { config };
