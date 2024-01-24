import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function createProveedor(provider) {

  try {
    return await prisma.proveedor.create({
      data: {
        nombre: provider.nombre,
        mail: provider.mail,
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

export default { createProveedor };