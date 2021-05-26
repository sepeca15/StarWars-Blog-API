"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteFavoritoPersonaje = exports.deleteFavoritoPlaneta = exports.postFavoritoPersonaje = exports.postFavoritoPlaneta = exports.getFavoritosID = exports.getPlanetaID = exports.getPersonajeID = exports.login = exports.postPlanetas = exports.getPlanetas = exports.postPersonajes = exports.getPersonajes = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var utils_1 = require("./utils");
var Planetas_1 = require("./entities/Planetas");
var Personajes_1 = require("./entities/Personajes");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Favortios_1 = require("./entities/Favortios");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.user_name)
                    throw new utils_1.Exception("Please provide a user_name");
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, user_name: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getPersonajes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var personajes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Personajes_1.Personajes).find()];
            case 1:
                personajes = _a.sent();
                return [2 /*return*/, res.json(personajes)];
        }
    });
}); };
exports.getPersonajes = getPersonajes;
var postPersonajes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, index, personajesRepo, personaje, newPersonaje, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                results = [];
                index = 0;
                _c.label = 1;
            case 1:
                if (!(index < req.body.length)) return [3 /*break*/, 7];
                if (!req.body[index].nombre)
                    results.push("Please provide a nombre " + index);
                if (!req.body[index].altura)
                    results.push("Please provide a altura " + index);
                if (!req.body[index].peso)
                    results.push("Please provide a peso " + index);
                if (!req.body[index].color_de_pelo)
                    results.push("Please provide an color_de_pelo " + index);
                if (!req.body[index].color_de_piel)
                    results.push("Please provide an color_de_piel " + index);
                if (!req.body[index].color_de_ojo)
                    results.push("Please provide a color_de_ojo " + index);
                if (!req.body[index].fecha_nacimiento)
                    results.push("Please provide a fecha_nacimiento " + index);
                if (!req.body[index].genero)
                    results.push("Please provide a genero " + index);
                if (!req.body[index].descripcion)
                    results.push("Please provide a descripcion " + index);
                if (!req.body[index].img_url)
                    results.push("Please provide a img_url " + index);
                personajesRepo = typeorm_1.getRepository(Personajes_1.Personajes);
                return [4 /*yield*/, personajesRepo.findOne({ where: { nombre: req.body[index].nombre } })];
            case 2:
                personaje = _c.sent();
                console.log(personaje);
                if (!personaje) return [3 /*break*/, 3];
                results.push("Ese personaje ya existe");
                return [3 /*break*/, 6];
            case 3:
                if (!(!req.body[index].nombre || !req.body[index].altura || !req.body[index].peso || !req.body[index].color_de_pelo || !req.body[index].color_de_piel || !req.body[index].color_de_ojo || !req.body[index].fecha_nacimiento || !req.body[index].genero || !req.body[index].descripcion || !req.body[index].img_url)) return [3 /*break*/, 4];
                results.push("el personaje " + req.body[index].nombre + " no se guardo");
                return [3 /*break*/, 6];
            case 4:
                newPersonaje = typeorm_1.getRepository(Personajes_1.Personajes).create(req.body[index]);
                _b = (_a = results).push;
                return [4 /*yield*/, typeorm_1.getRepository(Personajes_1.Personajes).save(newPersonaje)];
            case 5:
                _b.apply(_a, [_c.sent()]);
                _c.label = 6;
            case 6:
                index++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postPersonajes = postPersonajes;
var getPlanetas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planetas_1.Planetas).find()];
            case 1:
                planetas = _a.sent();
                return [2 /*return*/, res.json(planetas)];
        }
    });
}); };
exports.getPlanetas = getPlanetas;
var postPlanetas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, index, planetasRepo, planeta, newPlaneta, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                results = [];
                index = 0;
                _c.label = 1;
            case 1:
                if (!(index < req.body.length)) return [3 /*break*/, 7];
                if (!req.body[index].nombre)
                    results.push("Please provide a nombre " + index);
                if (!req.body[index].diametro)
                    results.push("Please provide a diametro " + index);
                if (!req.body[index].periodo_de_rotacion)
                    results.push("Please provide a periodo_de_rotacion " + index);
                if (!req.body[index].periodo_orbital)
                    results.push("Please provide an periodo_orbital " + index);
                if (!req.body[index].gravedad)
                    results.push("Please provide an gravedad " + index);
                if (!req.body[index].poblacion)
                    results.push("Please provide a poblacion " + index);
                if (!req.body[index].clima)
                    results.push("Please provide a clima " + index);
                if (!req.body[index].terreno)
                    results.push("Please provide a terreno " + index);
                if (!req.body[index].agua_en_la_superficie)
                    results.push("Please provide a agua_en_la_superficie " + index);
                if (!req.body[index].img_url)
                    results.push("Please provide a img_url " + index);
                planetasRepo = typeorm_1.getRepository(Planetas_1.Planetas);
                return [4 /*yield*/, planetasRepo.findOne({ where: { nombre: req.body[index].nombre } })];
            case 2:
                planeta = _c.sent();
                console.log(planeta);
                if (!planeta) return [3 /*break*/, 3];
                results.push("Ese planeta ya existe");
                return [3 /*break*/, 6];
            case 3:
                if (!(!req.body[index].nombre || !req.body[index].diametro || !req.body[index].periodo_de_rotacion || !req.body[index].periodo_orbital || !req.body[index].gravedad || !req.body[index].poblacion || !req.body[index].clima || !req.body[index].terreno || !req.body[index].agua_en_la_superficie || !req.body[index].img_url)) return [3 /*break*/, 4];
                results.push("el planeta " + req.body[index].nombre + " no se guardo");
                return [3 /*break*/, 6];
            case 4:
                newPlaneta = typeorm_1.getRepository(Planetas_1.Planetas).create(req.body[index]);
                _b = (_a = results).push;
                return [4 /*yield*/, typeorm_1.getRepository(Planetas_1.Planetas).save(newPlaneta)];
            case 5:
                _b.apply(_a, [_c.sent()]);
                _c.label = 6;
            case 6:
                index++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postPlanetas = postPlanetas;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
var getPersonajeID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var personaje;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Personajes_1.Personajes).findOne(req.params.personajeid)];
            case 1:
                personaje = _a.sent();
                return [2 /*return*/, res.json(personaje)];
        }
    });
}); };
exports.getPersonajeID = getPersonajeID;
var getPlanetaID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planeta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planetas_1.Planetas).findOne(req.params.planetaid)];
            case 1:
                planeta = _a.sent();
                return [2 /*return*/, res.json(planeta)];
        }
    });
}); };
exports.getPlanetaID = getPlanetaID;
var getFavoritosID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var favoritos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Favortios_1.Favoritos).find({ where: { usuarioId: req.params.userid } })];
            case 1:
                favoritos = _a.sent();
                return [2 /*return*/, res.json(favoritos)];
        }
    });
}); };
exports.getFavoritosID = getFavoritosID;
var postFavoritoPlaneta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, newFavoritoPlaneta, planeta, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                newFavoritoPlaneta = new Favortios_1.Favoritos();
                newFavoritoPlaneta.usuarioId = token.user;
                return [4 /*yield*/, typeorm_1.getRepository(Planetas_1.Planetas).findOne(req.params.planetaid)];
            case 1:
                planeta = _a.sent();
                newFavoritoPlaneta.planeta = planeta;
                return [4 /*yield*/, typeorm_1.getRepository(Favortios_1.Favoritos).save(newFavoritoPlaneta)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postFavoritoPlaneta = postFavoritoPlaneta;
var postFavoritoPersonaje = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, newFavoritoPersonaje, personaje, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                newFavoritoPersonaje = new Favortios_1.Favoritos();
                newFavoritoPersonaje.usuarioId = token.user;
                return [4 /*yield*/, typeorm_1.getRepository(Personajes_1.Personajes).findOne(req.params.personajeid)];
            case 1:
                personaje = _a.sent();
                newFavoritoPersonaje.personaje = personaje;
                return [4 /*yield*/, typeorm_1.getRepository(Favortios_1.Favoritos).save(newFavoritoPersonaje)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postFavoritoPersonaje = postFavoritoPersonaje;
var deleteFavoritoPlaneta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planeta, planetaFavorito, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planetas_1.Planetas).findOne(req.params.planetaid)];
            case 1:
                planeta = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Favortios_1.Favoritos).findOne({ where: { planeta: planeta } })];
            case 2:
                planetaFavorito = _a.sent();
                if (!planetaFavorito)
                    throw new utils_1.Exception("No tenes ese planeta en favoritos");
                return [4 /*yield*/, typeorm_1.getRepository(Favortios_1.Favoritos)["delete"]({ planeta: planeta })];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteFavoritoPlaneta = deleteFavoritoPlaneta;
var deleteFavoritoPersonaje = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var personaje, personajeFavorito, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Personajes_1.Personajes).findOne(req.params.personajeid)];
            case 1:
                personaje = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Favortios_1.Favoritos).findOne({ where: { persoaneje: personaje } })];
            case 2:
                personajeFavorito = _a.sent();
                if (!personajeFavorito)
                    throw new utils_1.Exception("No tienes ese personaje en favoritos");
                return [4 /*yield*/, typeorm_1.getRepository(Favortios_1.Favoritos)["delete"]({ personaje: personaje })];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteFavoritoPersonaje = deleteFavoritoPersonaje;
