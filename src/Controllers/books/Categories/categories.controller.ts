import { Request, Response } from "express";
import { prismaService } from "../../../Services/prisma/prisma.service"

export class CategoryController {
   async create(req: Request, res: Response) {
        const category = await prismaService.categories.create({
            data: {
                id: req.body.id,
                title: req.body.title,
                Books: {
                    connect: {
                        id: req.body.bookId,
                    }
                }
            }
        })

        return res.json({ message: "Category created" });
    }
};