import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function create(supplyOrderDetails) {

  try {
    return await prisma.ordenProvisionDetalle.create({
      data: {
        proveedor: { connect: { id: supplyOrderDetails.ordenProvisionId } },
        cantidad: supplyOrderDetails.cantidad,
        producto: { connect: { id: supplyOrderDetails.productoId } },
        precio: supplyOrderDetails.precio,
      }
    });
  } catch (error) {
    //TODO: hacer excepciones (aca por ejemplo salta si idproveedor no existe por ej)
    throw error;
  }
}

async function get() {
  try {
    return await prisma.ordenProvisionDetalle.findMany();
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getById(id) {
  try {
    return await prisma.ordenProvisionDetalle.findUnique({
      where: {
        id: parseInt(id)
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

// Puede ser interesante
async function getByProvisionOrderId(id) {
  try {
    return await prisma.ordenProvisionDetalle.findMany({
      where: {
        ordenProvisionId: parseInt(id)
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

// Puede ser interesante
async function getByProductId(id) {
  try {
    return await prisma.ordenProvisionDetalle.findMany({
      where: {
        productoId: parseInt(id)
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

export default { create, get, getById, getByProvisionOrderId, getByProductId };