import { createStore } from '@cmkk/relux'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = createStore<Record<string, any>>((set) => ({
  count: 0,
  loading: false,
  addCount: () => {
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
