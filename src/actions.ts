import { Request, Response } from 'express'
import { getRepository, JoinColumn } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Planetas } from './entities/Planetas'
import { Personajes } from './entities/Personajes'
import jwt from 'jsonwebtoken'
import { Favoritos } from './entities/Favortios'

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
    let results = []
    if(!req.body.length) return res.status(400).json('que está vacio')
    for (let index = 0; index < req.body.length; index++) {
        
        if(!req.body[index].nombre) results.push(`Please provide a nombre ${index}`) 
        if(!req.body[index].altura) results.push(`Please provide a altura ${index}`)
        if(!req.body[index].peso) results.push(`Please provide a peso ${index}`)
        if(!req.body[index].color_de_pelo) results.push(`Please provide an color_de_pelo ${index}`)
        if(!req.body[index].color_de_piel) results.push(`Please provide an color_de_piel ${index}`)
        if(!req.body[index].color_de_ojo) results.push(`Please provide a color_de_ojo ${index}`)
        if(!req.body[index].fecha_nacimiento) results.push(`Please provide a fecha_nacimiento ${index}`)
        if(!req.body[index].genero) results.push(`Please provide a genero ${index}`)
        if(!req.body[index].descripcion) results.push(`Please provide a descripcion ${index}`)
        if(!req.body[index].img_url) results.push(`Please provide a img_url ${index}`)
    
        const personajesRepo = getRepository(Personajes)
        const personaje = await personajesRepo.findOne({ where: {nombre:req.body[index].nombre}})
        console.log(personaje)
        if(personaje)results.push("Ese personaje ya existe")
        else if(!req.body[index].nombre||!req.body[index].altura||!req.body[index].peso||!req.body[index].color_de_pelo||!req.body[index].color_de_piel||!req.body[index].color_de_ojo||!req.body[index].fecha_nacimiento||!req.body[index].genero||!req.body[index].descripcion||!req.body[index].img_url){
            results.push(`el personaje ${req.body[index].nombre} no se guardo`)
        } else {
        const newPersonaje = getRepository(Personajes).create(req.body[index]);
        results.push(await getRepository(Personajes).save(newPersonaje))
        } 
    }  
    return res.json(results);
}

export const getPlanetas = async (req: Request, res: Response): Promise<Response> =>{
        const planetas = await getRepository(Planetas).find();
		return res.json(planetas);
}

export const postPlanetas = async (req: Request, res: Response): Promise<Response> =>{
    let results = []
    if(!req.body.length) return res.status(400).json('que está vacio')
    for (let index = 0; index < req.body.length; index++) {
        
        if(!req.body[index].nombre) results.push(`Please provide a nombre ${index}`) 
        if(!req.body[index].diametro) results.push(`Please provide a diametro ${index}`)
        if(!req.body[index].periodo_de_rotacion) results.push(`Please provide a periodo_de_rotacion ${index}`)
        if(!req.body[index].periodo_orbital) results.push(`Please provide an periodo_orbital ${index}`)
        if(!req.body[index].gravedad) results.push(`Please provide an gravedad ${index}`)
        if(!req.body[index].poblacion) results.push(`Please provide a poblacion ${index}`)
        if(!req.body[index].clima) results.push(`Please provide a clima ${index}`)
        if(!req.body[index].terreno) results.push(`Please provide a terreno ${index}`)
        if(!req.body[index].agua_en_la_superficie) results.push(`Please provide a agua_en_la_superficie ${index}`)
        if(!req.body[index].img_url) results.push(`Please provide a img_url ${index}`)
    
        const planetasRepo = getRepository(Planetas)
        const planeta = await planetasRepo.findOne({ where: {nombre:req.body[index].nombre}})
        console.log(planeta)
        if(planeta)results.push("Ese planeta ya existe")
        else if(!req.body[index].nombre||!req.body[index].diametro||!req.body[index].periodo_de_rotacion||!req.body[index].periodo_orbital||!req.body[index].gravedad||!req.body[index].poblacion||!req.body[index].clima||!req.body[index].terreno||!req.body[index].agua_en_la_superficie||!req.body[index].img_url){
            results.push(`el planeta ${req.body[index].nombre} no se guardo`)
        } else {
        const newPlaneta = getRepository(Planetas).create(req.body[index]);
        results.push(await getRepository(Planetas).save(newPlaneta))
        } 
    }  
    return res.json(results);
}

export const login = async (req: Request, res: Response): Promise<Response> =>{
		
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

	const userRepo = await getRepository(Users)

	const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Invalid email or password", 401)

	const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });
	
	return res.json({ user, token });
}

export const getPersonajeID = async (req: Request, res: Response): Promise<Response> =>{
        const personaje = await getRepository(Personajes).findOne(req.params.personajeid);
		return res.json(personaje);
}

export const getPlanetaID = async (req: Request, res: Response): Promise<Response> =>{
        const planeta = await getRepository(Planetas).findOne(req.params.planetaid);
		return res.json(planeta);
}

export const getFavoritosID = async (req: Request, res: Response): Promise<Response> =>{
         //const favoritos = await getRepository(Favoritos).find({where:{usuarioId:req.params.userid}});
         const favoritos = await getRepository(Favoritos).find({relations:["personaje", "planeta"],where:{usuarioId:req.params.userid}});
		return res.json(favoritos);
}

interface IToken{
    user:Users,
    iat:number,
    exp:number
}


export const postFavoritoPlaneta = async (req: Request, res: Response): Promise<Response> =>{
        const token = req.user as IToken
        let newFavoritoPlaneta = new Favoritos()
        newFavoritoPlaneta.usuarioId=token.user
        const planeta = await getRepository(Planetas).findOne(req.params.planetaid);
        newFavoritoPlaneta.planeta=planeta as Planetas

	    const results = await getRepository(Favoritos).save(newFavoritoPlaneta); 
	    return res.json(results);
}

export const postFavoritoPersonaje = async (req: Request, res: Response): Promise<Response> =>{
        const token = req.user as IToken
        let newFavoritoPersonaje = new Favoritos()
        newFavoritoPersonaje.usuarioId=token.user
        const personaje = await getRepository(Personajes).findOne(req.params.personajeid);
        newFavoritoPersonaje.personaje=personaje as Personajes

	    const results = await getRepository(Favoritos).save(newFavoritoPersonaje); 
	    return res.json(results);
}

export const deleteFavoritoPlaneta = async (req: Request, res: Response): Promise<Response> =>{
        const planeta = await getRepository(Planetas).findOne(req.params.planetaid);
        const planetaFavorito = await getRepository(Favoritos).findOne({where:{planeta:planeta}});
        if(!planetaFavorito) throw new Exception("No tenes ese planeta en favoritos")
        const results = await getRepository(Favoritos).delete({planeta:planeta})
	    return res.json(results);
}

export const deleteFavoritoPersonaje = async (req: Request, res: Response): Promise<Response> =>{
        const personaje = await getRepository(Personajes).findOne(req.params.personajeid);
        const personajeFavorito = await getRepository(Favoritos).findOne({where:{persoaneje:personaje}});
        if(!personajeFavorito) throw new Exception("No tienes ese personaje en favoritos")
        const results = await getRepository(Favoritos).delete({personaje:personaje})
	    return res.json(results);
}