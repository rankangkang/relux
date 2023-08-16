import { useDebugValue } from 'react'
import useSyncExternalStoreExports from 'use-sync-external-store/shim/with-selector'
import { createStore } from './createStore'

const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports

export function useStore(
  api,
  selector,
  equalityFn = undefined
) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  )

  useDebugValue(slice)

  return slice
}

export function create(createState) {
  const api = typeof createState === 'function' ? createStore(createState) : createState
  const useBoundStore = (selector, equalityFn = undefined) => useStore(api, selector, equalityFn)
  
  // store 与 hook 结合
  // Object.assign(useBoundStore, api)
  // return useBoundStore

  // store 与 hook 分开返回
  return {
    hook: useBoundStore,
    store: api
  }
}
