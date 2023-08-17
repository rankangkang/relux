import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'
import { AbstractObservableStore, ObservableStore } from './observable'

// export type StateCreator<T, R = any> = (
//   set: AbstractObservableStore<T, any>['setState'],
//   get: AbstractObservableStore<T, any>['getState'],
//   store: AbstractObservableStore<T, any>
// ) => R

function useStore<T, U>(
  store: AbstractObservableStore<T>,
  selector?: (state: T) => U,
  equalityFn?: (a: U, b: U) => boolean
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

type UseBoundStore<T> = {
  (): Readonly<T>
  <U>(selector: (state: T) => U): U
  <U>(
    selector: (state: T) => U,
    equalityFn: (a: U, b: U) => boolean
  ): U
}

export type Store<T> = AbstractObservableStore<T> & { hook: UseBoundStore<T> }

export function createStore<T extends Object>(initialize: (() => T) | T ): Store<T> {
  const initialState = typeof initialize === 'function' ? initialize() : initialize
  const store = new ObservableStore<T>(initialState)

  const useBoundStore = ((selector, equalityFn) => useStore<T, any>(store, selector, equalityFn)) as UseBoundStore<T>
  Object.assign(store, { hook: useBoundStore })

  return store as any
}