export type Usubscribe = () => void
export type PartialState<T> = ((state: T) => Partial<T>) | Partial<T>

export interface AbstractObservableStore<T, L extends () => void = () => void> {
  subscribe(l: L): Usubscribe
  getState(): T
  setState(partial: PartialState<T>): void
}

export class ObservableStore<T, L extends () => void = () => void> implements AbstractObservableStore<T> {
  state?: T
  listeners: Set<L>

  constructor(initialState?: T) {
    this.listeners = new Set()
    this.state = initialState
  }

  // 订阅，注册到 useSyncExternalStore 后由 react 调用。
  subscribe(listener: L) {
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
      this.notify()
    }
  }

  // 通知更新
  notify() {
    this.listeners.forEach((listener) => listener())
  }
}
