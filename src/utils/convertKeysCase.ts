import lodash from 'lodash'

// need furthurmore implement

export const camelCaseKeys = (object: Record<string, any>): Record<string, any> => {
  const mappedObject = lodash.mapKeys(object, (v: any, k: any) => lodash.camelCase(k))
  return mappedObject
}

export const snakeCaseKeys = (object: Record<string, any>): Record<string, any> => {
  const mappedObject = lodash.mapKeys(object, (v: any, k: any) => lodash.snakeCase(k))
  return mappedObject
}

export const kebabCaseKeys = (object: Record<string, any>): Record<string, any> => {
  const mappedObject = lodash.mapKeys(object, (v: any, k: any) => lodash.kebabCase(k))
  return mappedObject
}
