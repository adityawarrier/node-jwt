interface IConfig {
  app: {
    port: string;
  };
  db: {
    connection: string;
  };
}

const config = (): IConfig => ({
  app: {
    port: process?.env?.PORT ?? '',
  },
  db: {
    connection: process?.env?.DB_CONNECT ?? '',
  },
});

export { config };
