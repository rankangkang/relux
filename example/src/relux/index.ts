import { createStore } from '@cmkk/relux'

const store = createStore({
  count: 0,
  loading: false,
})

export const useStore = store.hook

export const addCount = async (step: number) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
  store.setState((state) => ({
    count: state.count + step,
  }))
}

export const setLoading = (flag: boolean) => {
  store.setState(() => ({
    loading: flag,
  }))
}
