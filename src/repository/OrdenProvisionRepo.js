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
      },
      include: {
        proveedor: true,
        detalles: true
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
      },
      include: {
        proveedor: true,
        detalles: true
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
      },
      include: {
        proveedor: true,
        detalles: true
      }
    });
  } catch (error) {
    throw error;
  }
}

async function getByGenerationDate(fechaInicio, fechaFin) {
  try {
    return await prisma.ordenProvision.findMany({
      where: {
        fechaGeneracion: {
          gte: new Date(fechaInicio),
          lte: new Date(fechaFin)
        }
      },
      include: {
        proveedor: true,
        detalles: true
      }
    });
  } catch (error) {
    throw error;
  }
}

async function getByReceptionDate(fechaInicio, fechaFin) {
  try {
    return await prisma.ordenProvision.findMany({
      where: {
        fechaRecepcion: {
          gte: new Date(fechaInicio),
          lte: new Date(fechaFin)
        }
      },
      include: {
        proveedor: true,
        detalles: true
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
      },
      include: {
        proveedor: true,
        detalles: true
      }
    });
  } catch (error) {
    throw error;
  }
}

async function cancelOrder(id) {
  try {
    return await prisma.ordenProvision.update({
      where: {
        id: parseInt(id)
      },
      data: {
        esCancelada: true
      },
      include: {
        proveedor: true,
        detalles: true
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
      },
      include: {
        proveedor: true,
        detalles: true
      }
    });
  } catch (error) {
    throw error;
  }
}

export default { create, get, getById, getByProviderId, getByGenerationDate, getByReceptionDate, update, cancelOrder, receiptOrder };