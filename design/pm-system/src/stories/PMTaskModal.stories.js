import PMTaskModal from '@/components/modal/PMTaskModal.vue'

export default {
  title: 'Components/Modal/PMTaskModal',
  component: PMTaskModal,
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Modal 표시 여부'
    },
    mode: {
      control: { type: 'select' },
      options: ['create', 'edit'],
      description: '모달 모드 (생성/수정)'
    },
    task: {
      control: 'object',
      description: '수정 모드일 때 표시할 작업 데이터'
    },
    members: {
      control: 'object',
      description: '담당자 선택을 위한 멤버 목록'
    }
  },
  parameters: {
    docs: {
      description: {
        component: '작업을 생성하거나 수정할 수 있는 폼 모달 컴포넌트입니다. 제목, 설명, 담당자, 날짜, 우선순위, 상태, 태그, 첨부파일 등을 관리할 수 있습니다.'
      }
    }
  }
}

// 샘플 멤버 데이터
const sampleMembers = [
  { id: '1', name: '김철수', email: 'chulsoo@example.com' },
  { id: '2', name: '이영희', email: 'younghee@example.com' },
  { id: '3', name: '박민수', email: 'minsoo@example.com' },
  { id: '4', name: '정수진', email: 'soojin@example.com' },
  { id: '5', name: '최동욱', email: 'dongwook@example.com' }
]

// 샘플 작업 데이터 (수정 모드용)
const sampleTask = {
  title: '프로젝트 관리 시스템 UI 개선',
  description: '사용자 피드백을 반영하여 대시보드 UI를 개선합니다. 반응형 디자인 적용 및 접근성 향상 작업을 포함합니다.',
  assigneeId: '2',
  startDate: '2024-01-15',
  endDate: '2024-01-31',
  priority: 'high',
  status: 'in-progress',
  tags: ['UI/UX', '개선', '우선순위높음'],
  files: []
}

const Template = (args) => ({
  components: { PMTaskModal },
  setup() {
    return { args }
  },
  data() {
    return {
      isVisible: args.visible || false
    }
  },
  template: `
    <div>
      <button @click="isVisible = true" class="px-4 py-2 bg-blue-500 text-white rounded">
        {{ args.mode === 'create' ? '새 작업 만들기' : '작업 수정하기' }}
      </button>
      <PMTaskModal
        v-bind="args"
        :visible="isVisible"
        @update:visible="isVisible = $event"
        @submit="onSubmit"
        @cancel="onCancel"
        @close="onClose"
      />
    </div>
  `,
  methods: {
    onSubmit(data) {
      console.log('Task submitted:', data)
      alert(`작업이 ${this.args.mode === 'create' ? '생성' : '수정'}되었습니다!`)
    },
    onCancel() {
      console.log('Task modal cancelled')
    },
    onClose() {
      console.log('Task modal closed')
    }
  }
})

// 새 작업 생성
export const CreateTask = Template.bind({})
CreateTask.args = {
  mode: 'create',
  members: sampleMembers
}

// 작업 수정
export const EditTask = Template.bind({})
EditTask.args = {
  mode: 'edit',
  task: sampleTask,
  members: sampleMembers
}

// 멤버 목록 없음 (빈 상태)
export const NoMembers = Template.bind({})
NoMembers.args = {
  mode: 'create',
  members: []
}

// 최소 정보만 있는 작업 수정
export const EditMinimalTask = Template.bind({})
EditMinimalTask.args = {
  mode: 'edit',
  task: {
    title: '간단한 작업',
    description: '',
    assigneeId: '1',
    startDate: '2024-01-20',
    endDate: '2024-01-20',
    priority: 'low',
    status: 'todo',
    tags: [],
    files: []
  },
  members: sampleMembers
}

// 복잡한 작업 데이터
export const ComplexTask = Template.bind({})
ComplexTask.args = {
  mode: 'edit',
  task: {
    title: '대규모 시스템 리팩토링 프로젝트',
    description: '레거시 코드베이스를 최신 아키텍처로 마이그레이션하는 대규모 프로젝트입니다. 모든 모듈의 의존성을 정리하고, 테스트 커버리지를 80% 이상으로 높이는 것이 목표입니다.',
    assigneeId: '3',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    priority: 'high',
    status: 'in-progress',
    tags: ['리팩토링', '아키텍처', '장기프로젝트', '우선순위높음', '백엔드', '프론트엔드'],
    files: [
      { name: '시스템_아키텍처_설계서.pdf', size: 2048000 },
      { name: '마이그레이션_계획.xlsx', size: 512000 },
      { name: '기술스택_비교분석.docx', size: 1024000 }
    ]
  },
  members: sampleMembers
}

// 긴 멤버 목록
export const ManyMembers = Template.bind({})
ManyMembers.args = {
  mode: 'create',
  members: [
    ...sampleMembers,
    { id: '6', name: '강지훈', email: 'jihoon@example.com' },
    { id: '7', name: '윤서연', email: 'seoyeon@example.com' },
    { id: '8', name: '임태준', email: 'taejun@example.com' },
    { id: '9', name: '한미래', email: 'mirae@example.com' },
    { id: '10', name: '송현우', email: 'hyunwoo@example.com' }
  ]
}

// Playground
export const Playground = Template.bind({})
Playground.args = {
  mode: 'create',
  task: null,
  members: sampleMembers
}

// 인터랙티브 데모
const InteractiveTemplate = (args) => ({
  components: { PMTaskModal },
  setup() {
    return { args }
  },
  data() {
    return {
      isVisible: false,
      currentMode: 'create',
      tasks: [],
      selectedTask: null
    }
  },
  template: `
    <div class="p-8">
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">작업 관리 데모</h2>
        <div class="flex gap-4 mb-4">
          <button 
            @click="openCreateModal" 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            새 작업 만들기
          </button>
        </div>
      </div>

      <div v-if="tasks.length > 0" class="space-y-4">
        <h3 class="text-lg font-semibold">작업 목록</h3>
        <div 
          v-for="(task, index) in tasks" 
          :key="index"
          class="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
          @click="openEditModal(task, index)"
        >
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-semibold text-lg">{{ task.title }}</h4>
              <p class="text-gray-600 text-sm mt-1">{{ task.description }}</p>
              <div class="flex gap-4 mt-2 text-sm text-gray-500">
                <span>담당자: {{ getMemberName(task.assigneeId) }}</span>
                <span>{{ task.startDate }} ~ {{ task.endDate }}</span>
                <span class="capitalize">{{ getPriorityLabel(task.priority) }}</span>
              </div>
              <div v-if="task.tags.length > 0" class="flex gap-2 mt-2">
                <span 
                  v-for="tag in task.tags" 
                  :key="tag"
                  class="px-2 py-1 bg-gray-200 text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <button 
              @click.stop="deleteTask(index)"
              class="text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 text-center py-8">
        아직 작업이 없습니다. 새 작업을 만들어보세요!
      </div>

      <PMTaskModal
        :visible="isVisible"
        :mode="currentMode"
        :task="selectedTask"
        :members="args.members"
        @update:visible="isVisible = $event"
        @submit="handleSubmit"
      />
    </div>
  `,
  methods: {
    openCreateModal() {
      this.currentMode = 'create'
      this.selectedTask = null
      this.isVisible = true
    },
    openEditModal(task, index) {
      this.currentMode = 'edit'
      this.selectedTask = { ...task, _index: index }
      this.isVisible = true
    },
    handleSubmit(data) {
      if (this.currentMode === 'create') {
        this.tasks.push(data)
        console.log('새 작업 생성:', data)
      } else {
        const index = this.selectedTask._index
        this.tasks[index] = { ...data }
        console.log('작업 수정:', data)
      }
    },
    deleteTask(index) {
      if (confirm('정말 이 작업을 삭제하시겠습니까?')) {
        this.tasks.splice(index, 1)
      }
    },
    getMemberName(id) {
      const member = this.args.members.find(m => m.id === id)
      return member ? member.name : '미지정'
    },
    getPriorityLabel(priority) {
      const labels = {
        high: '높음',
        medium: '보통',
        low: '낮음'
      }
      return labels[priority] || priority
    }
  }
})

export const InteractiveDemo = InteractiveTemplate.bind({})
InteractiveDemo.args = {
  members: sampleMembers
}
InteractiveDemo.parameters = {
  docs: {
    description: {
      story: '작업을 생성, 수정, 삭제할 수 있는 인터랙티브 데모입니다. 작업을 클릭하면 수정할 수 있습니다.'
    }
  }
}
