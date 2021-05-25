import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, 
    BaseEntity, JoinTable
  } from 'typeorm';

import {Personajes} from "./Personajes"
import {Planetas} from "./Planetas"
import {Usuario} from "./Usuario"

  @Entity()
  export class Favoritos extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Usuario, usuario => usuario.id)
    usuarioId: Usuario;

    @OneToOne(() => Personajes)
    @JoinColumn()
    personaje: Personajes;

    @OneToOne(() => Planetas)
    @JoinColumn()
    planeta: Planetas;

  }