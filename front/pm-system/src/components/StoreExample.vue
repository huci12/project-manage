<template>
  <div class="store-example">
    <div class="section">
      <h2>Vuex Example</h2>
      <div class="counter">
        <p>Count: {{ vuexCount }}</p>
        <p>Double Count: {{ vuexDoubleCount }}</p>
        <button @click="vuexIncrement">Increment</button>
        <button @click="vuexDecrement">Decrement</button>
        <button @click="vuexIncrementAsync">Increment Async</button>
      </div>
      
      <div class="user" v-if="vuexUser">
        <p>Logged in as: {{ vuexUser.name }}</p>
        <p>Email: {{ vuexUser.email }}</p>
        <button @click="vuexLogout">Logout</button>
      </div>
      <div v-else>
        <button @click="vuexLogin">Login</button>
      </div>
    </div>

    <div class="section">
      <h2>Pinia Example</h2>
      <div class="counter">
        <p>Count: {{ counterStore.count }}</p>
        <p>Double Count: {{ counterStore.doubleCount }}</p>
        <p>{{ counterStore.formattedCount }}</p>
        <button @click="counterStore.increment()">Increment</button>
        <button @click="counterStore.decrement()">Decrement</button>
        <button @click="counterStore.incrementAsync()">Increment Async</button>
        <button @click="counterStore.reset()">Reset</button>
      </div>
      
      <div class="user">
        <p>User: {{ userStore.userName }}</p>
        <p v-if="userStore.isLoggedIn">Email: {{ userStore.currentUser?.email }}</p>
        <button v-if="!userStore.isLoggedIn" @click="piniaLogin" :disabled="userStore.isLoading">
          {{ userStore.isLoading ? 'Loading...' : 'Login' }}
        </button>
        <button v-else @click="userStore.logout()">Logout</button>
      </div>
    </div>

    <div class="section">
      <h2>Pinia Todo Example</h2>
      <div class="todo">
        <input 
          v-model="newTodoText" 
          @keyup.enter="addTodo"
          placeholder="Add a new todo..."
        />
        <button @click="addTodo">Add</button>
        
        <p>Total: {{ todoStore.totalCount }}, Completed: {{ todoStore.completedCount }}</p>
        
        <ul>
          <li v-for="todo in todoStore.todos" :key="todo.id">
            <input 
              type="checkbox" 
              :checked="todo.completed"
              @change="todoStore.toggleTodo(todo.id)"
            />
            <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
            <button @click="todoStore.removeTodo(todo.id)">×</button>
          </li>
        </ul>
        
        <button @click="todoStore.clearCompleted()" v-if="todoStore.completedCount > 0">
          Clear Completed
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useCounterStore, useUserStore, useTodoStore } from '../store/pinia'

// Vuex
const vuexStore = useStore()
const vuexCount = computed(() => vuexStore.state.count)
const vuexDoubleCount = computed(() => vuexStore.getters.doubleCount)
const vuexUser = computed(() => vuexStore.state.user)

const vuexIncrement = () => vuexStore.commit('increment')
const vuexDecrement = () => vuexStore.commit('decrement')
const vuexIncrementAsync = () => vuexStore.dispatch('incrementAsync')
const vuexLogin = () => vuexStore.dispatch('login', { username: 'testuser' })
const vuexLogout = () => vuexStore.dispatch('logout')

// Pinia
const counterStore = useCounterStore()
const userStore = useUserStore()
const todoStore = useTodoStore()

const newTodoText = ref('')

const piniaLogin = async () => {
  await userStore.login('piniauser', 'password123')
}

const addTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value)
    newTodoText.value = ''
  }
}
</script>

<style scoped>
.store-example {
  padding: 20px;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.section h2 {
  margin-top: 0;
  color: #333;
}

.counter, .user, .todo {
  margin-top: 20px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #35a271;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.todo input[type="text"] {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}

.todo ul {
  list-style: none;
  padding: 0;
}

.todo li {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.todo li span {
  flex: 1;
  margin-left: 10px;
}

.todo li span.completed {
  text-decoration: line-through;
  color: #999;
}

.todo li button {
  background-color: #ff6b6b;
  padding: 4px 8px;
  font-size: 18px;
  line-height: 1;
}

.todo li button:hover {
  background-color: #ff5252;
}
</style>
