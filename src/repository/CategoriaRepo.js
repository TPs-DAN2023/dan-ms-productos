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

async function getCategorias(nombre) {
  try {
    const whereClause = nombre ? { nombre } : {};
    return await prisma.categoria.findMany({ where: whereClause });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getCategoriaById(id) {
  try {
    return await prisma.categoria.findUnique({
      where: {
        id: parseInt(id)
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

export default { createCategoria, getCategorias, getCategoriaById };