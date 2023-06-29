import {MigrationInterface, QueryRunner} from 'typeorm';

export class f1Migration20230624000000 implements MigrationInterface {      
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   public async up(queryRunner: QueryRunner): Promise<any> { 
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS race_result (
            id SERIAL NOT NULL,
            grand_prix VARCHAR(200) NOT NULL,
            date date NOT NULL,
            winner VARCHAR(200) NOT NULL,
            car VARCHAR(200) NOT NULL,
            laps int NOT NULL,
            time VARCHAR(200) NOT NULL,
            created_at date NOT NULL,
            updated_at date NOT NULL
        )`); 
   } 
   
   // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
   public async down(queryRunner: QueryRunner): Promise<any> { } 
}