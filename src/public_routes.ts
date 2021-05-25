
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser, getPersonajes, postPersonajes, getPlanetas, postPlanetas, login, getPersonajeID, getPlanetaID } from './actions';

const router = Router();

// signup route, creates a new user in the DB
router.post('/user', safe(createUser));
router.get('/personajes', safe(getPersonajes));
router.post('/personajes', safe(postPersonajes));
router.get('/planetas', safe(getPlanetas));
router.post('/planetas', safe(postPlanetas));
router.post('/login',safe(login))
router.get('/personajes/:personajeid', safe(getPersonajeID));
router.get('/planetas/:planetaid', safe(getPlanetaID));


export default router;
