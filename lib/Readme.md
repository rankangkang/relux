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
import { Button } from 'antd'

import { useStore, addCount, setLoading } from './store'

function App() {
  // ✅ good, use selector to avoid unnecessary rendering
  const count = useStore((state) => state.count)
  const loading = useStore((state) => state.loading)

  // ❌ bad, unnecessary rendering cannot be skipped
  // const { count, loading } = useState()
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
