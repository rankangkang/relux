export type Listener<T> = (state: T, prevState: T) => void
export type Subscribe<T> = (l: Listener<T>) => () => void
export type SetState<T> = (partial: (state: T) => Partial<T> | Partial<T>, replace?: boolean) => void
export type GetState<T> = () => T
export type StoreApi<T> = {
  setState: SetState<T>
  getState: GetState<T>
  subscribe: Subscribe<T>
}
export type CreateState<T> = (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) => T

// 创建 store
export function create<T>(createState: CreateState<T>): StoreApi<T> {
  // 创建 state
  let state: T
  const listeners = new Set<Listener<T>>()

  // 创建 getState
  const getState = () => state

  // 创建 setState
  const setState: SetState<T> = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state!) : partial
    const prevState = state
    if (!Object.is(prevState, nextState)) {
      // 浅比较
      state = (replace ?? typeof nextState !== 'object') ? nextState as T : Object.assign({}, state, nextState)
      listeners.forEach((listener) => listener(state, prevState))
    }
  }

  // 创建 subscribe
  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  const storeApi = { getState, setState, subscribe }
  state = createState(setState, getState, storeApi)

  return storeApi
}
