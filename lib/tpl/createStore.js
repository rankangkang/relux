export function createStore(createState) {
  let state
  // 存储 listener
  const listeners = new Set()

  // store setter
  const setState = (partial, replace) => {
    // 计算下一个 state
    const nextState = typeof partial === 'function' ? partial(state) : partial
    // 比较
    if (!Object.is(nextState, state)) {
      const prevState = state
      state = (replace ?? typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
      // if (!!replace || typeof nextState !== 'object') {
      //   state = nextState
      // } else {
      //   state = Object.assign({}, state, nextState)
      // }
      listeners.forEach(listener => listener(state, prevState))
    }
  }

  // store getter
  const getState = () => state

  // 订阅
  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const api = { setState, getState, subscribe }
  state = createState(setState, getState, api)

  return api
}