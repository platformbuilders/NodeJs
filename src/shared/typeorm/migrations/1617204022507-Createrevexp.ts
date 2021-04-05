import {MigrationInterface, QueryRunner, Table} from "typeorm";
// 1 - receita / 2- Despesa
export class Createrevexp1617204022507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'rev_exp',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'rev_exp_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'rec_des',
              type: 'int',
            },
            {
              name: 'status',
              type: 'int',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'RevExp',
              referencedTableName: 'rev_exp',
              referencedColumnNames: ['id'],
              columnNames: ['rev_exp_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }
          ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('rev_exp');
    }

}
