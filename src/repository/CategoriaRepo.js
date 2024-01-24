import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function createCategoria(category) {

  try {
    return await prisma.categoria.create({
      data: {
        nombre: category.nombre,
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

export default { createCategoria };