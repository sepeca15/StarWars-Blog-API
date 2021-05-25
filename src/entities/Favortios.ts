import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, 
    BaseEntity, JoinTable
  } from 'typeorm';

import {Personajes} from "./Personajes"
import {Planetas} from "./Planetas"
import {Users} from "./Users"

  @Entity()
  export class Favoritos extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Users, usuario => usuario.id)
    usuarioId: Users;

    @OneToOne(() => Personajes)
    @JoinColumn()
    personaje: Personajes;

    @OneToOne(() => Planetas)
    @JoinColumn()
    planeta: Planetas;

  }