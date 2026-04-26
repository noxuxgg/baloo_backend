import { DataSource } from "typeorm"

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5436,
    username: 'postgres',
    password: 'postgresql',
    database: 'bdBaloo',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts']
});