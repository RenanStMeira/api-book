import { Router } from "express";
import  { BooksController } from "../Controllers/books/books.controller";
import { UploadService } from "../Core/Services/upload/upload.sevice";
import { CategoryController } from "../Controllers/books/Categories/categories.controller";
import { UserController } from "../Controllers/UserControll/userController";


const router = Router();

const booksController = new BooksController();

const categoriesController = new CategoryController();

const uploadService = new UploadService();

const userController = new UserController();

//Caminho das rotas para uploads
router.post('/book/upload', uploadService.guard('uploads/books/'), booksController.upload);
router.post('/book/images/upload', uploadService.guard('uploads/images/'), booksController.upload);

router.post('/book', booksController.create);
router.get('/book', booksController.list);

//Rotas categorias
router.post('/category', categoriesController.create)

//Rotas Usuarios
router.get('/users', userController.listUsers);
router.post('/users/create', userController.create);




export { router };