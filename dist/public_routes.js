"use strict";
exports.__esModule = true;
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 *
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
var router = express_1.Router();
// signup route, creates a new user in the DB
router.post('/user', utils_1.safe(actions_1.createUser));
router.get('/personajes', utils_1.safe(actions_1.getPersonajes));
router.post('/personajes', utils_1.safe(actions_1.postPersonajes));
router.get('/planetas', utils_1.safe(actions_1.getPlanetas));
router.post('/planetas', utils_1.safe(actions_1.postPlanetas));
router.post('/login', utils_1.safe(actions_1.login));
exports["default"] = router;
