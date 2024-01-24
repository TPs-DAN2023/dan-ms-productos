import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function createOrdenProvision(supplyOrder) {
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

async function getOrdenesProvision() {
  try {
    return await prisma.ordenProvision.findMany();
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getOrdenProvisionById(id) {
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

async function getOrdenProvisionByProveedorId(id) {
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

async function getOrdenProvisionByFecha(desde, hasta) {
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

async function updateOrdenProvision(id, supplyOrder) {
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

async function updateOrdenProvisionEstado(id, estado) {
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

export default { createOrdenProvision, getOrdenesProvision, getOrdenProvisionById, getOrdenProvisionByProveedorId, getOrdenProvisionByFecha, updateOrdenProvision, updateOrdenProvisionEstado };