import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function create(supplyOrder) {
  try {
    return await prisma.ordenProvision.create({
      data: {
        fechaGeneracion: supplyOrder.fechaGeneracion,
        fechaRecepcion: supplyOrder.fechaRecepcion,
        esCancelada: supplyOrder.esCancelada,
        proveedor: { connect: { id: supplyOrder.proveedorId } },
      }
    });
  } catch (error) {
    //TODO: hacer excepciones (aca por ejemplo salta si idproveedor no existe por ej)
    throw error;
  }
}

async function get() {
  try {
    return await prisma.ordenProvision.findMany();
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getById(id) {
  try {
    return await prisma.ordenProvision.findUnique({
      where: {
        id: parseInt(id)
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getByProviderId(id) {
  try {
    return await prisma.ordenProvision.findMany({
      where: {
        proveedorId: parseInt(id)
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getByDate(desde, hasta) {
  try {
    return await prisma.ordenProvision.findMany({
      where: {
        fechaGeneracion: {
          gte: desde,
          lte: hasta
        }
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function update(id, supplyOrder) {
  try {
    return await prisma.ordenProvision.update({
      where: {
        id: parseInt(id)
      },
      data: {
        fechaGeneracion: supplyOrder.fechaGeneracion,
        fechaRecepcion: supplyOrder.fechaRecepcion,
        esCancelada: supplyOrder.esCancelada,
        proveedor: { connect: { id: supplyOrder.proveedorId } },
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function updateState(id, estado) {
  try {
    return await prisma.ordenProvision.update({
      where: {
        id: parseInt(id)
      },
      data: {
        esCancelada: estado
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

export default { create, get, getById, getByProviderId, getByDate, update, updateState };