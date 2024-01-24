import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function createOrdenProvisionDetalle(supplyOrderDetails) {

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

async function getOrdenesProvisionDetalle() {
  try {
    return await prisma.ordenProvisionDetalle.findMany();
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getOrdenProvisionDetalleById(id) {
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
async function getOrdenProvisionDetalleByOrdenProvisionId(id) {
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
async function getOrdenProvisionDetalleByProductoId(id) {
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

export default { createOrdenProvisionDetalle, getOrdenesProvisionDetalle, getOrdenProvisionDetalleById, getOrdenProvisionDetalleByOrdenProvisionId, getOrdenProvisionDetalleByProductoId };