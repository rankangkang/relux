# @cmkk/relux

状态管理的两个本质要素：

* 单例对象（store）
* 观察者模式或发布订阅

```ts
function CreateStore(initState) {
  const listeners = []; // 监听事件
  const state = initState || {}; // 单例
  const setState = (newState) => {
    // xxx 修改state 并且触发监听事件
    listeners.forEach((listener) => listener(newState, state));
    state = newState;
  };
  const getState = () => state;
  const describe = (f) => {
    // 将事件推入listeners
    // 对外提供取消监听方法
    return () => xxxxx
  }
  return {
    setState,
    getState,
    describe
  }
}

```

## TODO

* [ ] action/dispatcher 也一起放在 store 中，实现类似 zustand 的效果。
* [ ] ...
