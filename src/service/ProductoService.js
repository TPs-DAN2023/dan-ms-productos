import { createProducto } from "../repository/ProductoRepo"


async function crearProducto(producto) {

  //TODO: validar logica de negocio
  return await createProducto(producto);

}

export { crearProducto }