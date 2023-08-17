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

## Words in the end

状态管理的两个本质要素：

* 单例对象（store）
* 观察者模式或发布订阅

```ts
class FluxStore {
  state
  listeners

  constructor(initialState) {
    this.listeners = new Set()
    this.state = initialState
  }

  // 订阅，注册到 useSyncExternalStore 后由 react 调用。
  subscribe(listener) {
    this.listeners.add(listener)
    // unsubscribe
    return () => {
      this.listeners.delete(listener)
    }
  }

  // snapshot
  getState() {
    return this.state
  }

  // 更新与通知
  setState(partial) {
    const nextState = typeof partial === 'function' ? partial(this.state!) : partial
    const prevState = this.state
    if (!Object.is(prevState, nextState)) {
      // 浅比较
      this.state = typeof nextState !== 'object' ? nextState : Object.assign({}, this.state, nextState)
      this.notify(this.state, prevState!)
    }
  }

  // 通知更新
  notify(state: T, prevState: T) {
    this.listeners.forEach((listener) => listener(state, prevState))
  }
}
```
