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

export default { createOrdenProvisionDetalle };