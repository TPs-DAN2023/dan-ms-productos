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

async function getProveedores() {
  try {
    return await prisma.proveedor.findMany();
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getProveedorById(id) {
  try {
    return await prisma.proveedor.findUnique({
      where: {
        id: parseInt(id)
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getProveedorByNombre(nombre) {
  try {
    return await prisma.proveedor.findUnique({
      where: {
        nombre: nombre
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

export default { createProveedor, getProveedores, getProveedorById, getProveedorByNombre };