# @cmkk/relux

Simple react state-management lib, inspired by zustand.

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
        loading={loading}
        onClick={async () => {
          setLoading(true)
          await addCount(2)
          setLoading(false)
        }}
      >
        increase async
      </Button>
    </>
  )
}

```
