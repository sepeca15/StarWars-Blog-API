import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, 
    BaseEntity, JoinTable
  } from 'typeorm';
  
import {Favoritos} from "./Favortios"

  @Entity()
  export class Personajes extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column()
    diametro: string;

    @Column()
    periodo_de_rotacion: string;

    @Column()
    periodo_orbital: string;

    @Column()
    gravedad: string;

    @Column()
    poblacion: string;

    @Column()
    clima: string;

    @Column()
    terreno: string;

    @Column()
    agua_en_la_superficie: string;

    @Column()
    img_url: string;
    
  }