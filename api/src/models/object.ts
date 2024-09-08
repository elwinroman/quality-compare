import sql from 'mssql'

import { connection } from '@/config/database'
import { COMMON_ERROR_CODES } from '@/constants'
import { formatSQLDataType } from '@/utils'
import { handleRequestError } from '@/utils'

import {
  Column,
  Credentials,
  CustomError,
  ExtendedProperty,
  ForRetrievingObject,
  MyCustomError,
  RecordObject,
  ResponseSQLDefinitionObject,
  ResponseUserTableObject,
  UserTableObject,
} from './schemas'

export class ObjectModel implements ForRetrievingObject {
  private credentials: Credentials

  constructor(credentials: Credentials) {
    this.credentials = { ...credentials }
  }

  // Busca un objecto por su nombre que tiene una definición SQL
  public async getSQLDefinitionByName(name: string): Promise<ResponseSQLDefinitionObject | CustomError | undefined> {
    const conn = await connection(this.credentials)
    const request = await conn?.request()

    try {
      const stmt = `
        SELECT  
          A.object_id,  
          A.name, 
          A.type, 
          A.type_desc,
          B.schema_id,  
          B.name AS schema_name,  
          A.create_date, 
          A.modify_date, 
          C.definition
        FROM sys.objects            A
        INNER JOIN sys.schemas      B ON B.schema_id = A.schema_id
        INNER JOIN sys.sql_modules  C ON C.object_id = A.object_id
        WHERE type IN('P','FN','R','RF','TR','IF','TF','V')
          AND A.name = @name
      `

      await request?.input('name', sql.VarChar, name)
      const res = await request?.query(stmt)

      if (res?.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.NOTFOUND)

      // adapter
      const data =
        res?.recordset.map((obj): RecordObject => {
          return {
            id: obj.object_id,
            name: obj.name,
            type: obj.type.trim(),
            typeDesc: obj.type_desc,
            schemaId: obj.schema_id,
            schema: obj.schema_name,
            createDate: obj.create_date,
            modifyDate: obj.modify_date,
            definition: obj.definition,
          }
        }) ?? []

      return { data, meta: { length: data?.length } }
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      handleRequestError(error)
    } finally {
      conn?.close()
    }
  }

  // Busca un user table por su nombre para obtener sus descripciones, columnas, etc.
  public async getUserTableByName(name: string): Promise<ResponseUserTableObject | CustomError | undefined> {
    const conn = await connection(this.credentials)
    const request = await conn?.request()

    try {
      // variables de respuesta
      const data: UserTableObject[] = []
      // let columns = []

      // busca el usertable por su nombre
      const stmtSearch = `
        SELECT  
          A.object_id,  
          A.name, 
          A.type, 
          A.type_desc,
          B.schema_id,  
          B.name AS schema_name,  
          A.create_date, 
          A.modify_date
        FROM sys.objects        A
        INNER JOIN sys.schemas  B ON B.schema_id = A.schema_id
        WHERE type IN('U') AND A.name = @name
      `
      await request?.input('name', sql.VarChar, name)
      const res = await request?.query(stmtSearch)

      // si no encuentra el usertable, lanza un error de no encontrado
      if (res && res.rowsAffected[0] === 0) throw new MyCustomError(COMMON_ERROR_CODES.NOTFOUND)

      // si encuentra mas de una coincidencia, devuelve los datos de usertables
      let index = 0
      if (res && res.rowsAffected[0] > 0) {
        for (const obj of res.recordset) {
          // obtener columnas
          const stmtColumns = `
            SELECT
              A.column_id,
              A.name,
              B.name AS type_name,
              A.max_length,
              A.precision,
              A.scale,
              A.is_nullable
            FROM sys.columns      A
            INNER JOIN sys.types  B ON B.user_type_id = A.user_type_id
            WHERE A.object_id = ${obj.object_id}
          `
          const resColumns = await request?.query(stmtColumns)

          // obtener las propiedades extendidas de las columnas
          const stmtExtendedProperties = `
            SELECT 
              A.column_id,
              B.value,
              B.name
            FROM sys.columns A
            INNER JOIN sys.extended_properties B ON B.major_id = A.object_id AND B.minor_id = A.column_id
            WHERE B.class = 1 -- (1: OBJECT_OR_COLUMN)
              AND A.object_id = ${obj.object_id}
          `
          const resExtendedProperties = await request?.query(stmtExtendedProperties)

          const stmtIndexes = `
            SELECT 
              A.column_id,
              C.name,
              C.type_desc,
              C.is_primary_key,
              C.is_unique
            FROM sys.columns              A
            INNER JOIN sys.index_columns  B ON B.column_id = A.column_id AND B.object_id = A.object_id
            INNER JOIN sys.indexes        C ON C.index_id = B.index_id AND C.object_id = A.object_id
            WHERE A.object_id = ${obj.object_id}
          `
          const resIndexes = await request?.query(stmtIndexes)

          const stmtForeignKeys = `
            SELECT 
              A.column_id,
              B.referenced_object_id,
              SCHEMA_NAME(C.schema_id) AS referenced_schema,
              C.name AS referenced_object,
              B.referenced_column_id,
              D.name AS referenced_column
            FROM sys.columns A
            INNER JOIN sys.foreign_key_columns	B ON B.parent_column_id = A.column_id AND B.parent_object_id = A.object_id
            INNER JOIN sys.objects				C ON C.object_id = B.referenced_object_id
            INNER JOIN sys.columns				D ON D.column_id = B.referenced_column_id AND D.object_id = B.referenced_object_id
            WHERE A.object_id = ${obj.object_id}
          `
          const resForeignKeys = await request?.query(stmtForeignKeys)

          const stmtTableExtendedProperties = `
            SELECT value, name FROM sys.extended_properties
            WHERE major_id = ${obj.object_id} AND minor_id = 0
          `
          const resTableExtendedProperties = await request?.query(stmtTableExtendedProperties)

          //todo: adapter
          const recordObject = {
            id: res.recordset[index].object_id,
            name: res.recordset[index].name,
            type: res.recordset[index].type.trim(),
            typeDesc: res.recordset[index].type_desc,
            schemaId: res.recordset[index].schema_id,
            schema: res.recordset[index].schema_name,
            createDate: res.recordset[index].create_date,
            modifyDate: res.recordset[index].modify_date,
          }

          const tableExtendedProperties =
            resTableExtendedProperties?.recordset.map((obj): ExtendedProperty => {
              return {
                propertyValue: obj.value,
                propertyName: obj.name,
              }
            }) ?? []

          const columns =
            resColumns?.recordset.map((obj): Column => {
              return {
                id: obj.column_id,
                name: obj.name,
                type: formatSQLDataType(obj.type_name, obj.max_length, obj.precision, obj.scale),
                isNullable: obj.is_nullable,
                extendedProperties:
                  resExtendedProperties?.recordset
                    .filter(element => element.column_id === obj.column_id)
                    .map(obj2 => ({
                      propertyValue: obj2.value,
                      propertyName: obj2.name,
                    })) ?? [],
              }
            }) ?? []

          data.push({ ...recordObject, extendedProperties: tableExtendedProperties, columns })
          index++
        }

        return { data, meta: { length: data?.length } }
      }

      // console.log(res?.recordset)
    } catch (error) {
      if (!(error instanceof sql.RequestError)) throw error
      handleRequestError(error)
    } finally {
      conn?.close()
    }
  }
}
