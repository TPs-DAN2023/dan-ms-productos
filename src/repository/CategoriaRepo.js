import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function create(category) {
  try {
    return await prisma.categoria.create({
      data: {
        nombre: category.nombre,
      }
    });
  } catch (error) {
    throw error;
  }
}

async function get(nombre) {
  try {
    const whereClause = nombre ? { nombre } : {};
    return await prisma.categoria.findMany({ where: whereClause });
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    return await prisma.categoria.findUnique({
      where: {
        id: parseInt(id)
      }
    });
  } catch (error) {
    throw error;
  }
}

export default { create, get, getById };