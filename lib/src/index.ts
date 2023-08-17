import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'
import { create, CreateState, StoreApi } from './core'

export type UseBoundStore<T> = {
  (): Readonly<T>
  <U>(selector: (state: T) => U): U
  <U>(selector: (state: T) => U, equalityFn: (a: U, b: U) => boolean): U
}

export type Store<T> = StoreApi<T> & {
  hook: UseBoundStore<T>
}

export function useStore<T, U>(
  storeApi: StoreApi<T>,
  selector?: (state: T) => U,
  equalityFn?: (a: U, b: U) => boolean
) {
  if (!selector) {
    selector = (state: T) => state as unknown as U
  }

  const slice = useSyncExternalStoreWithSelector(
    storeApi.subscribe,
    storeApi.getState,
    storeApi.getState,
    selector,
    equalityFn
  )

  return slice
}

export function createStore<T>(createState: CreateState<T>): Store<T> {
  const store = create<T>(createState)
  const hook = ((selector, equalityFn) => useStore<T, any>(store, selector, equalityFn)) as UseBoundStore<T>
  Object.assign(store, { hook })
  return store as Store<T>
}
