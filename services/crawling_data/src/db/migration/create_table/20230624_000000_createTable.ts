import {MigrationInterface, QueryRunner} from 'typeorm';

export class myMigration1587101104904 implements MigrationInterface {      

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
   
   public async down(queryRunner: QueryRunner): Promise<any> { 
   } 
}