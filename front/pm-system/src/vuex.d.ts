import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Vuex 스토어 타입 선언
  interface State {
    count: number
    user: {
      name: string
      email: string
    } | null
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
