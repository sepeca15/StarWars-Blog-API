import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, 
    BaseEntity, JoinTable
  } from 'typeorm';

import {Planetas} from "./Planetas"
import {Personajes} from "./Personajes"
import {Users} from "./Users"

  @Entity()
  export class Favoritos extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Users, usuario => usuario.id)
    usuarioId: Users;

    @ManyToOne(() => Personajes, personaje => personaje.id)
    personaje: Personajes;

    @ManyToOne(() => Planetas, planeta => planeta.id)
    planeta: Planetas;

  }