export type Unsubscribe = () => void
export type Listener<T> = (state: T, prevState: T) => void
export type Subscribe<T> = (listener: Listener<T>) => Unsubscribe
export type PartialState<T> = ((state: T) => Partial<T>) | Partial<T>

export interface AbstractObservableStore<T> {
  subscribe: Subscribe<T>
  getState(): T
  setState(partial: PartialState<T>): void
}

export class ObservableStore<T> implements AbstractObservableStore<T> {
  state?: T
  listeners: Set<Listener<T>>

  constructor(initialState?: T) {
    this.listeners = new Set()
    this.state = initialState
  }

  // 订阅，注册到 useSyncExternalStore 后由 react 调用。
  subscribe(listener: Listener<T>) {
    this.listeners.add(listener)

    // unsubscribe
    return () => {
      this.listeners.delete(listener)
    }
  }

  // snapshot
  getState() {
    return this.state!
  }

  // setter
  setState(partial: ((state: T) => Partial<T> | Partial<T>)) {
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
