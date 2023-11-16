import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function createProducto(prod) {


  try {
    return await prisma.producto.create({
      data: {
        ...prod,
        proveedor: {connect: prod.proveedorId},
        categoria: {connect: prod.categoriaId}
      }
    });
  } catch (error) {
    //TODO: hacer excepciones (aca por ejemplo salta si idproveedor no existe por ej)
    throw error;
  }
}

export { createProducto };