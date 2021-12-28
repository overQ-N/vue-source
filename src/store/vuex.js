
let Vue

const forEachValue = (obj, callback) => {
  Object.keys(obj).forEach((key) => {
    callback(key, obj[key])
  })
}

class Store {
  constructor(options) {
    const { getters = {}, actions = {}, mutations = {} } = options
    this._vm = new Vue({
      data: {
        state: options.state
      }
    })

    this.getters = {}
    forEachValue(getters, (key, callback) => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return callback.call(this, this.state)
        }
      })
    })


    this.mutations = {}
    forEachValue(mutations, (key, callback) => {
      this.mutations[key] = (payload) => {
        return callback.call(this, this.state, payload)
      }
    })

    this.actions = {}
    forEachValue(actions, (key, callback) => {
      this.actions[key] = payload => {
        callback.call(this, this, payload)
      }
    })


    // this 回绑
    // 由于 actions 通过 {commit,dispatch} 的方法使用时this会丢失，这里需要绑回去
    // this.dispatch = this.dispatch.bind(this)
    // this.commit = this.commit.bind(this)
    // 源码写法
    const store = this
    const { commit, dispatch } = this
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload) {
      return commit.call(store, type, payload)
    }
  }
  commit(type, payload) {
    this.mutations[type](payload)
  }
  dispatch(type, payload) {
    this.actions[type](payload)
  }
  get state() {
    return this._vm.state
  }
}

const install = _Vue => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      // 根组件注册 store
      if (this.$options.store) {
        this.$store = this.$options.store
      } else {
        // 子组件注册store
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}


export default {
  install,
  Store
}