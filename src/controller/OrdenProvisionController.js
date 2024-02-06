import ordenProvisionService from '../service/OrdenProvisionService.js';
import DuplicatedNameException from '../exception/DuplicatedFieldException.js';
import errorHandler from '../utils/errorHandler.js';
import InvalidFieldException from '../exception/InvalidFieldException.js';
import MissingDataException from '../exception/MissingDataException.js';
import NotFoundException from '../exception/NotFoundException.js';
import ProductStockNotAvailableException from '../exception/ProductStockNotAvailableException.js';

async function create(req, res) {
  const supplyOrder = req.body;

  try {
    const supplyOrderResult = await ordenProvisionService.create(supplyOrder);
    return res.status(201).json(supplyOrderResult)
  } catch (error) {
    const response = errorHandler(error, [DuplicatedNameException, InvalidFieldException, MissingDataException]);
    return res.status(response.status).json(response.body);
  }

};

async function get(req, res) {

  try {
    const supplyOrders = await ordenProvisionService.get();
    return res.status(200).json(supplyOrders);
  } catch (error) {
    const response = errorHandler(error, []);
    return res.status(response.status).json(response.body);
  }

}

async function getById(req, res) {

  const id = req.params.id;

  try {
    const supplyOrder = await ordenProvisionService.getById(id);
    return res.status(200).json(supplyOrder);
  } catch (error) {
    const response = errorHandler(error, [NotFoundException]);
    return res.status(response.status).json(response.body);
  }

}

async function getByProviderId(req, res) {

  const id = req.params.id;

  try {
    const supplyOrder = await ordenProvisionService.getByProviderId(id);
    return res.status(200).json(supplyOrder);
  } catch (error) {
    const response = errorHandler(error, [NotFoundException, MissingDataException]);
    return res.status(response.status).json(response.body);
  }

}

async function getByGenerationDate(req, res) {

  const fechaInicio = req.params.fechaInicio;
  const fechaFin = req.params.fechaFin;

  try {
    const supplyOrder = await ordenProvisionService.getByGenerationDate(fechaInicio, fechaFin);
    return res.status(200).json(supplyOrder);
  } catch (error) {
    const response = errorHandler(error, [MissingDataException]);
    return res.status(response.status).json(response.body);
  }

}

async function getByReceptionDate(req, res) {

  const fechaInicio = req.params.fechaInicio;
  const fechaFin = req.params.fechaFin;

  try {
    const supplyOrder = await ordenProvisionService.getByReceptionDate(fechaInicio, fechaFin);
    return res.status(200).json(supplyOrder);
  } catch (error) {
    const response = errorHandler(error, [MissingDataException]);
    return res.status(response.status).json(response.body);
  }

}

async function update(req, res) {

  const id = req.params.id;
  const supplyOrder = req.body;

  try {
    const supplyOrderResult = await ordenProvisionService.update(id, supplyOrder);
    return res.status(200).json(supplyOrderResult);
  } catch (error) {
    const response = errorHandler(error, [NotFoundException, MissingDataException]);
    return res.status(response.status).json(response.body);
  }

}

async function updateState(req, res) {

  const id = req.params.id;
  const estado = req.params.estado;

  try {
    const supplyOrderResult = await ordenProvisionService.updateState(id, estado);
    return res.status(200).json(supplyOrderResult);
  } catch (error) {
    const response = errorHandler(error, [NotFoundException, MissingDataException, InvalidFieldException, ProductStockNotAvailableException]);
    return res.status(response.status).json(response.body);
  }

}

export default { create, get, getById, getByProviderId, getByGenerationDate, getByReceptionDate, update, updateState };