import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function create(prod) {
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
    throw error;
  }
}

async function get(nombre) {
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
    throw error;
  }
}

async function getById(id) {
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
    throw error;
  }
}

async function getByCategoryName(nombre) {
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
    throw error;
  }
}

async function getByProviderName(nombre) {
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
    throw error;
  }
}

async function getByActualStock(cantidad) {
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
    throw error;
  }
}

async function update(id, prod) {
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
    throw error;
  }
}

async function updateStock(id, cantidad) {
  try {
    return await prisma.producto.update({
      where: { id: parseInt(id) },
      data: {
        stockActual: cantidad
      }
    });
  } catch (error) {
    throw error;
  }
}

// 'delete' sola es palabra reservada
async function deleteProd(id) {
  try {
    return await prisma.producto.delete({
      where: { id: parseInt(id) }
    });
  } catch (error) {
    throw error;
  }
}

export default { create, get, getById, getByCategoryName, getByProviderName, getByActualStock, update, updateStock, deleteProd };