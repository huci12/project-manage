// Pinia Store
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'

// Interfaces
interface User {
  name: string
  email: string
}

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface LoginResult {
  success: boolean
  error?: unknown
}

// Option API style store
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Counter Store'
  }),
  
  getters: {
    doubleCount: (state): number => state.count * 2,
    
    formattedCount(): string {
      return `Current count: ${this.count}`
    }
  },
  
  actions: {
    increment(): void {
      this.count++
    },
    
    decrement(): void {
      this.count--
    },
    
    async incrementAsync(): Promise<void> {
      // 비동기 작업 시뮬레이션
      await new Promise<void>(resolve => setTimeout(resolve, 1000))
      this.count++
    },
    
    reset(): void {
      this.count = 0
    }
  }
})

// Composition API style store
export const useUserStore = defineStore('user', () => {
  // State
  const currentUser: Ref<User | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)
  
  // Getters
  const isLoggedIn: ComputedRef<boolean> = computed(() => !!currentUser.value)
  const userName: ComputedRef<string> = computed(() => currentUser.value?.name || 'Guest')
  
  // Actions
  async function login(username: string, password: string): Promise<LoginResult> {
    isLoading.value = true
    try {
      // API 호출 시뮬레이션
      await new Promise<void>(resolve => setTimeout(resolve, 1000))
      
      currentUser.value = {
        name: username,
        email: `${username}@example.com`
      }
      
      return { success: true }
    } catch (error) {
      return { success: false, error }
    } finally {
      isLoading.value = false
    }
  }
  
  function logout(): void {
    currentUser.value = null
  }
  
  function updateProfile(name: string, email: string): void {
    if (currentUser.value) {
      currentUser.value.name = name
      currentUser.value.email = email
    }
  }
  
  return {
    // State
    currentUser,
    isLoading,
    
    // Getters
    isLoggedIn,
    userName,
    
    // Actions
    login,
    logout,
    updateProfile
  }
})

// 다른 스토어 예제 - Todo Store
export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    nextId: 1
  }),
  
  getters: {
    completedTodos: (state): Todo[] => state.todos.filter(todo => todo.completed),
    
    incompleteTodos: (state): Todo[] => state.todos.filter(todo => !todo.completed),
    
    totalCount: (state): number => state.todos.length,
    
    completedCount(): number {
      return this.completedTodos.length
    }
  },
  
  actions: {
    addTodo(text: string): void {
      this.todos.push({
        id: this.nextId++,
        text,
        completed: false
      })
    },
    
    removeTodo(id: number): void {
      const index = this.todos.findIndex(todo => todo.id === id)
      if (index > -1) {
        this.todos.splice(index, 1)
      }
    },
    
    toggleTodo(id: number): void {
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    
    clearCompleted(): void {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
})
