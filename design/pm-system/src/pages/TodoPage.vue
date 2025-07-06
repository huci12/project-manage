<template>
  <div class="todo-page">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-title">
          <h1 class="page-title">할 일 관리</h1>
          <p class="task-summary">{{ incompleteTasks }}개의 할 일이 남아있습니다</p>
        </div>
        <PMButton 
          variant="primary" 
          size="medium"
          @click="openNewTaskModal"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 8px;">
            <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
          새 할 일
        </PMButton>
      </div>
    </div>

    <!-- 필터 탭 -->
    <div class="filter-tabs">
      <button 
        v-for="filter in filters" 
        :key="filter.id"
        class="filter-tab"
        :class="{ active: activeFilter === filter.id }"
        @click="activeFilter = filter.id"
      >
        {{ filter.label }}
        <span class="filter-count">{{ getFilterCount(filter.id) }}</span>
      </button>
    </div>

    <div class="todo-content">
      <!-- 할 일 목록 -->
      <div class="task-list-container">
        <!-- 검색 바 -->
        <div class="search-bar">
          <div class="search-input">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="search-icon">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="할 일 검색..."
              class="search-field"
            />
          </div>
        </div>

        <!-- 할 일 목록 -->
        <div class="task-list">
          <div v-if="filteredTasks.length === 0" class="empty-state">
            <p class="empty-text">해당하는 할 일이 없습니다</p>
          </div>
          
          <div 
            v-for="task in filteredTasks" 
            :key="task.id"
            class="task-item"
            :class="{ completed: task.completed }"
          >
            <div class="task-checkbox">
              <input 
                type="checkbox" 
                :id="`task-${task.id}`"
                v-model="task.completed"
                @change="toggleTask(task)"
              />
              <label :for="`task-${task.id}`"></label>
            </div>
            
            <div class="task-content">
              <h3 class="task-title">{{ task.title }}</h3>
              <p class="task-description">{{ task.description }}</p>
              
              <div class="task-meta">
                <div class="meta-item">
                  <span :class="{ overdue: isOverdue(task.dueDate) }">
                    마감: {{ formatDueDate(task.dueDate) }}
                  </span>
                </div>
                <div class="meta-item">
                  <span>담당: {{ task.assignee }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PMButton from '@/components/UI/PMButton.vue'

export default {
  name: 'TodoPage',
  components: {
    PMButton
  },
  data() {
    return {
      activeFilter: 'all',
      searchQuery: '',
      filters: [
        { id: 'all', label: '전체' },
        { id: 'today', label: '오늘' },
        { id: 'upcoming', label: '예정' },
        { id: 'overdue', label: '지연' },
        { id: 'completed', label: '완료' }
      ],
      tasks: [
        {
          id: 1,
          title: '헤더 컴포넌트 반응형 디자인 구현',
          description: '모바일, 태블릿, 데스크톱 화면에 맞는 반응형 헤더 컴포넌트를 구현합니다.',
          dueDate: new Date('2024-02-22'),
          assignee: '김개발',
          completed: false
        },
        {
          id: 2,
          title: '로그인 API 연동',
          description: '백엔드 로그인 API와 프론트엔드 연동 작업을 진행합니다.',
          dueDate: new Date('2024-02-21'),
          assignee: '김개발',
          completed: false
        },
        {
          id: 3,
          title: '대시보드 UI 디자인 검토',
          description: '새로운 대시보드 UI 디자인을 검토하고 피드백을 정리합니다.',
          dueDate: new Date('2024-02-23'),
          assignee: '이디자인',
          completed: true
        }
      ]
    }
  },
  computed: {
    incompleteTasks() {
      return this.tasks.filter(task => !task.completed).length
    },
    
    filteredTasks() {
      let filtered = [...this.tasks]
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      switch (this.activeFilter) {
        case 'today':
          filtered = filtered.filter(task => {
            const taskDate = new Date(task.dueDate)
            taskDate.setHours(0, 0, 0, 0)
            return taskDate.getTime() === today.getTime()
          })
          break
        case 'upcoming':
          filtered = filtered.filter(task => new Date(task.dueDate) > today && !task.completed)
          break
        case 'overdue':
          filtered = filtered.filter(task => new Date(task.dueDate) < today && !task.completed)
          break
        case 'completed':
          filtered = filtered.filter(task => task.completed)
          break
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(task => 
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
        )
      }
      
      return filtered
    }
  },
  methods: {
    getFilterCount(filterId) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      switch (filterId) {
        case 'all':
          return this.tasks.length
        case 'today':
          return this.tasks.filter(task => {
            const taskDate = new Date(task.dueDate)
            taskDate.setHours(0, 0, 0, 0)
            return taskDate.getTime() === today.getTime()
          }).length
        case 'upcoming':
          return this.tasks.filter(task => new Date(task.dueDate) > today && !task.completed).length
        case 'overdue':
          return this.tasks.filter(task => new Date(task.dueDate) < today && !task.completed).length
        case 'completed':
          return this.tasks.filter(task => task.completed).length
        default:
          return 0
      }
    },
    
    formatDueDate(date) {
      const d = new Date(date)
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
    },
    
    isOverdue(date) {
      return new Date(date) < new Date()
    },
    
    toggleTask(task) {
      console.log('Toggle task:', task)
    },
    
    openNewTaskModal() {
      console.log('Open new task modal')
    }
  }
}
</script>

<style scoped>
.todo-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 페이지 헤더 */
.page-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.page-title {
  margin: 0 0 8px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #1A202C;
}

.task-summary {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #718096;
}

/* 필터 탭 */
.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 0;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  bottom: -1px;
}

.filter-tab:hover {
  color: #2D3748;
}

.filter-tab.active {
  color: #293380;
  border-bottom-color: #293380;
}

.filter-count {
  padding: 2px 8px;
  background-color: #F8FAFC;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}

.filter-tab.active .filter-count {
  background-color: #E0E7FF;
  color: #293380;
}

/* 검색 바 */
.search-bar {
  margin-bottom: 24px;
}

.search-input {
  position: relative;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
}

.search-field {
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #2D3748;
  background-color: white;
  transition: all 0.2s ease;
}

.search-field:focus {
  outline: none;
  border-color: #293380;
  box-shadow: 0 0 0 3px rgba(41, 51, 128, 0.1);
}

/* 할 일 목록 */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  text-align: center;
  padding: 64px;
}

.empty-text {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #A0AEC0;
}

/* 할 일 아이템 */
.task-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background-color: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.task-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #A0AEC0;
}

/* 체크박스 */
.task-checkbox {
  flex-shrink: 0;
  padding-top: 2px;
}

.task-checkbox input[type="checkbox"] {
  display: none;
}

.task-checkbox label {
  display: block;
  width: 20px;
  height: 20px;
  border: 2px solid #E2E8F0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.task-checkbox input[type="checkbox"]:checked + label {
  background-color: #293380;
  border-color: #293380;
}

.task-checkbox input[type="checkbox"]:checked + label::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* 할 일 콘텐츠 */
.task-content {
  flex: 1;
  min-width: 0;
}

.task-title {
  margin: 0 0 8px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1A202C;
}

.task-description {
  margin: 0 0 12px 0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #718096;
}

.task-meta {
  display: flex;
  gap: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #718096;
}

.meta-item .overdue {
  color: #F56565;
  font-weight: 500;
}

/* 반응형 */
@media (max-width: 768px) {
  .todo-page {
    padding: 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .filter-tabs {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .filter-tab {
    white-space: nowrap;
  }

  .task-item {
    padding: 16px;
  }

  .task-meta {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
