import {Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('rev_exp')
class RevExp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  rev_exp_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default RevExp;
