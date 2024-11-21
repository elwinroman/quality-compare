import { CustomError } from '@/models/schemas'

export enum CONN_ERROR {
  ELOGIN = 'ELOGIN',
  ETIMEOUT = 'ETIMEOUT',
  ESOCKET = 'ESOCKET',
  EALREADYCONNECTED = 'EALREADYCONNECTED',
  EALREADYCONNECTING = 'EALREADYCONNECTING',
  EINSTLOOKUP = 'EINSTLOOKUP',
}

type CustomErrorList = {
  [key: string]: CustomError
}

export const CONN_ERROR_CODES: CustomErrorList = {
  ELOGIN: {
    status: 'error',
    statusCode: 401,
    message: 'Error de autenticación',
  },
  ETIMEOUT: {
    status: 'error',
    statusCode: 408,
    message: 'Tiempo de espera agotado, el servidor no responde o no existe',
  },
  ESOCKET: {
    status: 'error',
    statusCode: 400,
    message: 'Error de conexión con el servidor',
  },
  EALREADYCONNECTED: {
    status: 'error',
    statusCode: 400,
    message: 'La base de datos ya está conectada',
  },
  EALREADYCONNECTING: {
    status: 'error',
    statusCode: 400,
    message: 'Ya se está conectando a la base de datos',
  },
  EINSTLOOKUP: {
    status: 'error',
    statusCode: 400,
    message: 'Error en la búsqueda de instancias',
  },
}
