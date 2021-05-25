import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Planetas } from './entities/Planetas'
import { Personajes } from './entities/Personajes'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if(!req.body.user_name) throw new Exception("Please provide a user_name")
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email , user_name:req.body.email}})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const getPersonajes = async (req: Request, res: Response): Promise<Response> =>{
        const personajes = await getRepository(Personajes).find();
		return res.json(personajes);
}

export const postPersonajes = async (req: Request, res: Response): Promise<Response> =>{
    if(!req.body.user_name) throw new Exception("Please provide a user_name")
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	const user = await userRepo.findOne({ where: {email: req.body.email , user_name:req.body.email}})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);
	const results = await getRepository(Users).save(newUser);
	return res.json(results);
}