import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddPassword1629726672458 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "user",
            new TableColumn({
                name: "password",
                type: "varchar",
                isNullable: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "password")
    }

}
