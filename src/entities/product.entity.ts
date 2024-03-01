import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'product' })
export class Product {
  @PrimaryColumn({ default: () => 'gen_random_uuid()' })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  value: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
