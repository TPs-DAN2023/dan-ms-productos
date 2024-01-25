import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createProveedor(provider) {
  try {
    return await prisma.proveedor.create({
      data: {
        nombre: provider.nombre,
        mail: provider.mail,
      },
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getProveedores(nombre, mail) {
  try {
    const nameWhereClause = nombre ? { nombre: { contains: nombre } } : {};
    const mailWhereClause = mail ? { mail: { contains: mail } } : {};
    return await prisma.proveedor.findMany({ where: { AND: [nameWhereClause, mailWhereClause] } });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getProveedorById(id) {
  try {
    return await prisma.proveedor.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

export default { createProveedor, getProveedores, getProveedorById };
