import TodoPage from '@/pages/TodoPage.vue'

export default {
  title: 'Pages/TodoPage',
  component: TodoPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '할 일을 관리하는 페이지입니다. 필터링, 검색, 빠른 추가 기능을 제공합니다.'
      }
    }
  }
}

export const Default = () => ({
  components: { TodoPage },
  template: '<TodoPage />'
})

export const TodayFilter = () => ({
  components: { TodoPage },
  template: '<TodoPage :initial-filter="\'today\'" />'
})

export const CompletedFilter = () => ({
  components: { TodoPage },
  template: '<TodoPage :initial-filter="\'completed\'" />'
})

export const OverdueFilter = () => ({
  components: { TodoPage },
  template: '<TodoPage :initial-filter="\'overdue\'" />'
})

export const EmptyState = () => ({
  components: { TodoPage },
  template: '<TodoPage :initial-tasks="[]" />'
})

export const WithManyTasks = () => ({
  components: { TodoPage },
  data() {
    return {
      manyTasks: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `할 일 ${i + 1}`,
        description: `할 일 ${i + 1}에 대한 설명입니다.`,
        dueDate: new Date(Date.now() + (i - 10) * 24 * 60 * 60 * 1000),
        assignee: ['김개발', '이디자인', '박기획'][i % 3],
        completed: i % 4 === 0
      }))
    }
  },
  template: '<TodoPage :initial-tasks="manyTasks" />'
})
