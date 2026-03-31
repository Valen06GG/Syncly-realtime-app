import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from "dotenv"
import { DataSource, DataSourceOptions } from 'typeorm';


dotenvConfig({path: ".env"});

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ["dist/migrations/*{.js,.ts}"],
  synchronize: true,
};
export default registerAs("typeorm", () => databaseConfig);

export const connectionSource = new DataSource(databaseConfig as DataSourceOptions)