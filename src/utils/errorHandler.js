export default function handleErrors(error, errorClasses) {
  for (const ErrorClass of errorClasses) {
    if (error instanceof ErrorClass) {
      return {
        status: 400,
        body: { error: ErrorClass.name, message: error.message },
      };
    }
  }

  return {
    status: 500,
    body: { error: 'Ocurrió un error inesperado. Vuelva a intentar en unos minutos.' },
  };
}