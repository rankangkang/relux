import { useSyncExternalStore } from 'react'
import { ObservableStore } from './observer'

export type CounterState = {
  count: number
}

const counterStore = new ObservableStore<CounterState>({ count: 0 })

export function useCounterStore() {
  return useSyncExternalStore(counterStore.subscribe.bind(counterStore), counterStore.getState.bind(counterStore))
}

export function useCounterDispatch() {
  return counterStore.setState.bind(counterStore)
}

// zustand 的思想就是：将 dispatcher 也作为 state 存储，不对外暴露 setState，通过传递 setState 给 dispatcher，再通过 dispatcher 修改 state