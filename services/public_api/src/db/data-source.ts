import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    migrationsRun: true,
    entities: [
        'dist/js/db/entity/**/*{.ts,.js}',
        'src/db/entity/**/*{.ts,.js}'
    ],
    subscribers: [],
    migrations: [
        'dist/js/db/migration/**/*{.ts,.js}',
        'src/db/migration/**/*{.ts,.js}'
    ]
})