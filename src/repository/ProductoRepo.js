import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function createProducto(prod) {
  try {
    return await prisma.producto.create({
      data: {
        nombre: prod.nombre,
        descripcion: prod.descripcion,
        stockActual: prod.stockActual,
        proveedor: { connect: { id: prod.proveedorId } },
        categoria: { connect: { id: prod.categoriaId } }
      }
    });
  } catch (error) {
    //TODO: hacer excepciones (aca por ejemplo salta si idproveedor no existe por ej)
    throw error;
  }
}

async function getProductos(nombre) {
  try {
    const nameWhereClause = nombre ? { nombre: { contains: nombre } } : {};
    return await prisma.producto.findMany(
      {
        where: nameWhereClause,
        include: {
          proveedor: true,
          categoria: true
        }
      }
    );
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getProductoById(id) {
  try {
    return await prisma.producto.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        proveedor: true,
        categoria: true
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getProductoByNombreCategoria(nombre) {
  try {
    return await prisma.producto.findMany({
      where: {
        categoria: {
          nombre: nombre
        }
      },
      include: {
        proveedor: true,
        categoria: true
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getProductoByNombreProveedor(nombre) {
  try {
    return await prisma.producto.findMany({
      where: {
        proveedor: {
          nombre: { contains: nombre }
        }
      },
      include: {
        proveedor: true,
        categoria: true
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function getProductoByStockActual(cantidad) {
  try {
    return await prisma.producto.findMany({
      where: {
        stockActual: parseInt(cantidad)
      },
      include: {
        proveedor: true,
        categoria: true
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function updateProducto(id, prod) {
  try {
    return await prisma.producto.update({
      where: { id: parseInt(id) },
      data: {
        nombre: prod.nombre,
        descripcion: prod.descripcion,
        stockActual: prod.stockActual,
        proveedor: { connect: { id: prod.proveedorId } },
        categoria: { connect: { id: prod.categoriaId } }
      }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

async function deleteProducto(id) {
  try {
    return await prisma.producto.delete({
      where: { id: parseInt(id) }
    });
  } catch (error) {
    //TODO: hacer excepciones
    throw error;
  }
}

export default { createProducto, getProductos, getProductoById, getProductoByNombreCategoria, getProductoByNombreProveedor, getProductoByStockActual, updateProducto, deleteProducto };