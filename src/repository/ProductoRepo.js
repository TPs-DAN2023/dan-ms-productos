import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function createProducto(prod) {

  try {
    return await prisma.producto.create({
      data: {
        nombre: prod.nombre,
        descripcion: prod.descripcion,
        stockActual: prod.stockActual,
        proveedor: {connect: {id: prod.proveedorId}},
        categoria: {connect: {id: prod.categoriaId}}
      }
    });
  } catch (error) {
    //TODO: hacer excepciones (aca por ejemplo salta si idproveedor no existe por ej)
    throw error;
  }
}

export default { createProducto };