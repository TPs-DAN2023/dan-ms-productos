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
    throw error;
  }
}

async function get() {
  try {
    return await prisma.ordenProvision.findMany(
      {
        include: {
          proveedor: true,
          detalles: true
        }
      }
    );
  } catch (error) {
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
    throw error;
  }
}

async function cancelOorder(id) {
  try {
    return await prisma.ordenProvision.update({
      where: {
        id: parseInt(id)
      },
      data: {
        esCancelada: true
      }
    });
  } catch (error) {
    throw error;
  }
}

async function receiptOrder(id) {
  try {
    return await prisma.ordenProvision.update({
      where: {
        id: parseInt(id)
      },
      data: {
        fechaRecepcion: new Date()
      }
    });
  } catch (error) {
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
    throw error;
  }
}

export default { create, get, getById, getByProviderId, getByDate, update, updateState };