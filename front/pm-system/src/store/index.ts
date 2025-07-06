// Vuex Store
import { createStore } from 'vuex'
import type { Store } from 'vuex'

// Define the state interface
interface State {
  count: number
  user: {
    name: string
    email: string
  } | null
}

// Define user interface
interface User {
  name: string
  email: string
}

// Define credentials interface
interface Credentials {
  username: string
  password: string
}

// Create a new store instance
export const store: Store<State> = createStore<State>({
  state(): State {
    return {
      count: 0,
      user: null
    }
  },
  
  getters: {
    doubleCount(state: State): number {
      return state.count * 2
    },
    
    isLoggedIn(state: State): boolean {
      return !!state.user
    }
  },
  
  mutations: {
    increment(state: State): void {
      state.count++
    },
    
    decrement(state: State): void {
      state.count--
    },
    
    setUser(state: State, user: User): void {
      state.user = user
    },
    
    clearUser(state: State): void {
      state.user = null
    }
  },
  
  actions: {
    async incrementAsync({ commit }): Promise<void> {
      // 비동기 작업 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      commit('increment')
    },
    
    async login({ commit }, credentials: Credentials): Promise<User> {
      // API 호출 시뮬레이션
      const user: User = {
        name: credentials.username,
        email: `${credentials.username}@example.com`
      }
      commit('setUser', user)
      return user
    },
    
    logout({ commit }): void {
      commit('clearUser')
    }
  },
  
  modules: {
    // 모듈을 여기에 추가할 수 있습니다
  }
})
