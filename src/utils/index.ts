import { cloneDeep, isEqual, mergeWith, unionWith } from 'lodash-es'
import { isArray, isObject } from './is'

export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(target: T, source: U): T & U {
  return mergeWith(cloneDeep(target), source, (objValue, srcValue) => {
    if (isObject(objValue) && isObject(srcValue)) {
      return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
        return isArray(prevValue) ? unionWith(prevValue, nextValue, isEqual) : undefined;
      })
    }
  })
}