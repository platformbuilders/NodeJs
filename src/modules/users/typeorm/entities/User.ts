import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Exclude, Expose} from 'class-transformer';
import Transaction from '@modules/transactions/typeorm/entities/Transaction';
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('int', {default: 1})
  status: number = 1;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @Expose({name: 'avatar_url'})
  getAvatarUrl(): string | null {
    if(!this.avatar) {
      return null;
    }

    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

}

export default User;
