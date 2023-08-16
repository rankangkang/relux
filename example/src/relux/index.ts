import { createStore } from '@cmkk/relux'

const store = createStore({
  count: 0,
  loading: false,
})

export const useStore = store.hook

export const addCount = (step: number) => {
  store.setState((state) => ({
    ...state,
    count: state.count + step,
  }))
}

export const setLoading = (flag: boolean) => {
  store.setState((state) => {
    return {
      ...state,
      loading: flag,
    }
  })
}