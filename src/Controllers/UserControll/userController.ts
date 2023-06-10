import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { prismaService } from '../../Services/prisma/prisma.service';

const prisma = new PrismaClient();

export class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      await prisma.users.create({
        data: {
          name,
          email,
          password,
        },
      });

      res.json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  }
  public async getBookUrl(req: Request, res: Response) {
    const { userId } = req.params;
    const { bookId } = req.query;

    try {
      const book = await prisma.books.findUnique({
        where: {
          id: String(bookId),
        },
      });

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      if (book.fileId === userId) {
        return res.json({ url: 'https://google.com.br' });
      }

      const books = await prisma.books.findFirst({
        where: {
          id: String(bookId),
          category: {
            some: {
              booksId: userId,
            },
          },
        },
      });

      if (books) {
        return res.json({ url: books.fileId });
      }

      return res.status(403).json({ error: 'Acess denied' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error getting book URL' });
    }
  }
  public async listUsers(req: Request, res: Response) {
    const users = await prisma.users.findMany();

    return res.json(users);
  }
}
