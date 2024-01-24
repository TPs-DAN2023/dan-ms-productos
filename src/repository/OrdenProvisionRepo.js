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

export default { createOrdenProvision };