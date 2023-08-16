import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'
import { AbstractObservableStore, ObservableStore } from './observable'

// export type StateCreator<T, R = any> = (
//   set: AbstractObservableStore<T, any>['setState'],
//   get: AbstractObservableStore<T, any>['getState'],
//   store: AbstractObservableStore<T, any>
// ) => R

export function useStore(
  store: AbstractObservableStore<any, any>,
  selector?: any,
  equalityFn?: any
) {
  if (!selector) {
    selector = (state: any) => state
  }
  const slice = useSyncExternalStoreWithSelector(
    store.subscribe.bind(store) as any,
    store.getState.bind(store),
    store.getState.bind(store),
    selector,
    equalityFn
  )

  return slice
}

export type UseBoundStore<T> = {
  (): Readonly<T>
  <U>(selector: (state: T) => U): U
  <U>(
    selector: (state: T) => U,
    equalityFn: (a: U, b: U) => boolean
  ): U
}

export type ReluxStore<T> = AbstractObservableStore<T, any> & { hook: UseBoundStore<T> }

// export type StoreCreator = {
//   <T extends Record<string, any>>(initialize: T): ReluxStore<T>
//   <T extends Record<string, any>>(initialize: () => T): ReluxStore<T>
// }

export function createStore<T extends Object>(initialize: (() => T) | T ): ReluxStore<T> {
  const initialState = typeof initialize === 'function' ? initialize() : initialize
  const store = new ObservableStore<T>(initialState)

  const useBoundStore = (selector: any, equalityFn: any) => useStore(store, selector, equalityFn)
  Object.assign(store, { hook: useBoundStore })

  return store as any
}