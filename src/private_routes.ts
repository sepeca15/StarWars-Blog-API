/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router, Request, Response, NextFunction  } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken'

// declare a new router to include all the endpoints
const router = Router();

//middleware de verificación
const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
     
    const token = req.header('Authorization')?.replace("Bearer ","");
    if(!token) return res.status(400).json('ACCESS DENIED');

    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;

    
    next()
}

router.get('/user', verifyToken, safe(actions.getUsers));
router.get('/user/favoritos/:userid', verifyToken, safe(actions.getFavoritosID))
router.post('/favoritos/planetas/:planetaid', verifyToken, safe(actions.postFavoritoPlaneta));
router.post('/favoritos/personajes/:personajeid', verifyToken, safe(actions.postFavoritoPersonaje));
router.delete('/favoritos/planetas/:planetaid', verifyToken, safe(actions.deleteFavoritoPlaneta));
router.delete('/favoritos/personajes/:personajeid', verifyToken, safe(actions.deleteFavoritoPersonaje));

export default router;
