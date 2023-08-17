import { createStore } from '@cmkk/relux'

export type CounterStore = {
  count: number
  loading: boolean
  addCount: () => Promise<void>
  setLoading: (flag: boolean) => void
}

const store = createStore<CounterStore>((set) => ({
  count: 0,
  loading: false,
  addCount: async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 2000)
    })
    set((state) => ({
      count: state.count + 1,
    }))
  },
  setLoading: (flag: boolean) => {
    set(() => ({
      loading: flag,
    }))
  },
}))

export const useStore = store.hook
