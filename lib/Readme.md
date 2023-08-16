# @cmkk/relux

## installation

```shell
npm install @cmkk/relux
```

## usage

store.ts

```ts
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

// 
```

app.ts

```ts
import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from 'antd'

import { useCounterStore, useCounterDispatch } from './store'

import { useStore, addCount, setLoading } from './relux'

function App() {
  const count = useStore((state) => state.count)
  const loading = useStore((state) => state.loading)

  return (
    <>
      <h1>store count: {loading ? 'loading...' : count}</h1>
      <Button
        onClick={() => {
          setLoading(true)
          setTimeout(() => {
            addCount(1)
            setLoading(false)
          }, 1000)
        }}
      >
        increase
      </Button>
    </>
  )
}

```
