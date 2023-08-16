import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from 'antd'

import { useCounterStore, useCounterDispatch } from './store'

import { useStore, addCount, setLoading } from './relux'

function App() {
  const counter = useCounterStore()
  const dispatch = useCounterDispatch()

  const count = useStore((state) => state.count)
  const loading = useStore((state) => state.loading)

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
        onClick={() => {
          setLoading(true)
          setTimeout(() => {
            addCount(2)
            setLoading(false)
          }, 1000)
        }}
      >
        增加2
      </Button>
    </>
  )
}

export default App