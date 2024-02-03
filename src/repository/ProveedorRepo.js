import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function create(provider) {
  try {
    return await prisma.proveedor.create({
      data: {
        nombre: provider.nombre,
        mail: provider.mail,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function get(nombre, mail) {
  try {
    const nameWhereClause = nombre ? { nombre: { contains: nombre } } : {};
    const mailWhereClause = mail ? { mail: { contains: mail } } : {};
    return await prisma.proveedor.findMany({
      where: { AND: [nameWhereClause, mailWhereClause] },
      include: { ordenesDeProvision: true }
    });
  } catch (error) {
    throw error;
  }
}

async function getById(id) {
  try {
    return await prisma.proveedor.findUnique({
      where: {
        id: parseInt(id),
      },
      include: { ordenesDeProvision: true }
    });
  } catch (error) {
    throw error;
  }
}

export default { create, get, getById };
