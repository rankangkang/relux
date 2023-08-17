import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from 'antd'

import { useCounterStore, useCounterDispatch } from './store'

import { useStore } from './relux'

function App() {
  const counter = useCounterStore()
  const dispatch = useCounterDispatch()

  const count = useStore((state) => state.count)
  const loading = useStore((state) => state.loading)
  const addCount = useStore(state => state.addCount)
  const setLoading = useStore(state => state.setLoading)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>count: {counter?.count}</h1>
      <Button
        onClick={() => {
          dispatch((counter) => {
            return {
              count: counter?.count + 1,
            }
          })
        }}
      >
        增加
      </Button>
      <h1>store count: {loading ? 'loading...' : count}</h1>
      <Button
        loading={loading}
        onClick={async () => {
          setLoading(true)
          await addCount()
          setLoading(false)
        }}
      >
        异步增加
      </Button>
    </>
  )
}

export default App
