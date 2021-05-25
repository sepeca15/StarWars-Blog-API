import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
import {Favoritos} from "./Favortios"

  @Entity()
  export class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({unique: true})
    user_name: string;
  
    @Column()
    name: string;

    @Column()
    last_name: string;
  
    @Column({unique: true})
    email: string;
  
    @Column()
    password: string;
  
    @OneToMany(() => Favoritos, favoritos => favoritos.id)
    favoritos: Favoritos[];
    
  }