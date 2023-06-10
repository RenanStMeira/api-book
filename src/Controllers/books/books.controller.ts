import { Request, Response } from "express"
import { prismaService } from "../../Services/prisma/prisma.service";

//Criar livros
export class BooksController {
    async create(req: Request, res: Response) {
        await prismaService.books.create({
            data: {
                author: req.body.author,
                title: req.body.title,
            }
        })

        return res.json({ message: 'sucess' })
    }

    // Listar todos os livros
    async list(req: Request, res:Response) {
        const books =  await prismaService.books.findMany({ // mostrar a categoria no banco
            include: { category: true },
        });

        return res.json(books);
    }

    //Metodos de upload
    upload(req: Request, res: Response) {
        console.log(req.file);

        return res.json({ message: 'file created witch sucess' })
    }
}