<template>
  <div class="project-detail-page">
    <!-- 프로젝트 헤더 -->
    <div class="project-header">
      <div class="header-content">
        <div class="header-left">
          <div class="project-title-section">
            <h1 class="project-title">{{ project.name }}</h1>
            <div class="project-status" :class="`status-${project.status}`">
              {{ getStatusText(project.status) }}
            </div>
          </div>
          <p class="project-description">{{ project.description }}</p>
          
          <div class="project-meta">
            <div class="meta-item">
              <span class="meta-label">시작일</span>
              <span class="meta-value">{{ formatDate(project.startDate) }}</span>
            </div>
            <div class="meta-divider"></div>
            <div class="meta-item">
              <span class="meta-label">종료일</span>
              <span class="meta-value">{{ formatDate(project.endDate) }}</span>
            </div>
            <div class="meta-divider"></div>
            <div class="meta-item">
              <span class="meta-label">진행률</span>
              <span class="meta-value">{{ project.completionRate }}%</span>
            </div>
          </div>
        </div>
        
        <div class="header-actions">
          <PMButton 
            variant="outline" 
            size="medium"
            @click="editProject"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 8px;">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            수정
          </PMButton>
          <PMButton 
            variant="primary" 
            size="medium"
            @click="openTaskModal"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 8px;">
              <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
            작업 추가
          </PMButton>
        </div>
      </div>
    </div>

    <!-- 탭 네비게이션 -->
    <div class="tab-navigation">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 탭 콘텐츠 -->
    <div class="tab-content">
      <!-- 개요 탭 -->
      <div v-if="activeTab === 'overview'" class="overview-tab">
        <div class="overview-grid">
          <!-- 진행률 카드 -->
          <PMCard variant="elevated" padding="large" class="progress-card">
            <h3 class="card-title">프로젝트 진행률</h3>
            <div class="progress-visual">
              <div class="progress-circle">
                <svg viewBox="0 0 120 120">
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="54" 
                    fill="none" 
                    stroke="#E2E8F0" 
                    stroke-width="12"
                  />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="54" 
                    fill="none" 
                    stroke="#293380" 
                    stroke-width="12"
                    :stroke-dasharray="339.292"
                    :stroke-dashoffset="339.292 * (1 - project.completionRate / 100)"
                    transform="rotate(-90 60 60)"
                    style="transition: stroke-dashoffset 0.3s ease"
                  />
                </svg>
                <div class="progress-text">
                  <span class="progress-value">{{ project.completionRate }}%</span>
                  <span class="progress-label">완료</span>
                </div>
              </div>
            </div>
            
            <div class="progress-stats">
              <div class="stat-item">
                <span class="stat-value">{{ project.tasksCompleted }}</span>
                <span class="stat-label">완료된 작업</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-value">{{ project.totalTasks }}</span>
                <span class="stat-label">전체 작업</span>
              </div>
            </div>
          </PMCard>

          <!-- 팀 멤버 카드 -->
          <PMCard variant="elevated" padding="large" class="team-card">
            <div class="card-header">
              <h3 class="card-title">팀 멤버</h3>
              <button class="icon-button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                </svg>
              </button>
            </div>
            
            <div class="member-list">
              <div 
                v-for="member in project.teamMembers" 
                :key="member.id"
                class="member-item"
              >
                <div class="member-avatar" :style="{ backgroundColor: member.color }">
                  {{ getInitials(member.name) }}
                </div>
                <div class="member-info">
                  <div class="member-name">{{ member.name }}</div>
                  <div class="member-role">{{ member.role }}</div>
                </div>
              </div>
            </div>
          </PMCard>

          <!-- 최근 활동 카드 -->
          <PMCard variant="elevated" padding="large" class="activity-card">
            <h3 class="card-title">최근 활동</h3>
            <div class="activity-list">
              <div 
                v-for="activity in recentActivities" 
                :key="activity.id"
                class="activity-item"
              >
                <div class="activity-icon" :class="`icon-${activity.type}`">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path v-if="activity.type === 'task'" d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM5.5 6.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                    <path v-else-if="activity.type === 'comment'" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894z"/>
                    <path v-else-if="activity.type === 'file'" d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1z"/>
                  </svg>
                </div>
                <div class="activity-content">
                  <div class="activity-text">{{ activity.text }}</div>
                  <div class="activity-time">{{ activity.time }}</div>
                </div>
              </div>
            </div>
          </PMCard>
        </div>
      </div>

      <!-- 작업 탭 -->
      <div v-if="activeTab === 'tasks'" class="tasks-tab">
        <div class="tasks-header">
          <div class="tasks-filters">
            <select class="filter-select" v-model="taskFilter">
              <option value="all">모든 작업</option>
              <option value="todo">할 일</option>
              <option value="inprogress">진행 중</option>
              <option value="done">완료</option>
            </select>
            <select class="filter-select" v-model="taskSort">
              <option value="priority">우선순위순</option>
              <option value="duedate">마감일순</option>
              <option value="recent">최신순</option>
            </select>
          </div>
          
          <div class="search-box">
            <input 
              type="text" 
              placeholder="작업 검색..."
              v-model="taskSearch"
              class="search-input"
            />
          </div>
        </div>

        <div class="task-list">
          <div 
            v-for="task in filteredTasks" 
            :key="task.id"
            class="task-item"
            :class="{ completed: task.status === 'done' }"
          >
            <div class="task-checkbox">
              <input 
                type="checkbox" 
                :checked="task.status === 'done'"
                @change="toggleTask(task)"
              />
            </div>
            <div class="task-content">
              <div class="task-title">{{ task.title }}</div>
              <div class="task-meta">
                <span class="task-priority" :class="`priority-${task.priority}`">
                  {{ getPriorityText(task.priority) }}
                </span>
                <span class="task-due">{{ formatDate(task.dueDate) }}</span>
                <span class="task-assignee">{{ task.assignee }}</span>
              </div>
            </div>
            <button class="task-menu">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 타임라인 탭 -->
      <div v-if="activeTab === 'timeline'" class="timeline-tab">
        <div class="timeline-placeholder">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect x="10" y="20" width="100" height="10" rx="2" fill="#E2E8F0"/>
            <rect x="10" y="40" width="80" height="10" rx="2" fill="#E2E8F0"/>
            <rect x="10" y="60" width="90" height="10" rx="2" fill="#E2E8F0"/>
            <rect x="10" y="80" width="70" height="10" rx="2" fill="#E2E8F0"/>
          </svg>
          <p>간트차트 뷰는 곧 추가될 예정입니다</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PMCard from '@/components/UI/PMCard.vue'
import PMButton from '@/components/UI/PMButton.vue'

export default {
  name: 'ProjectDetailPage',
  components: {
    PMCard,
    PMButton
  },
  data() {
    return {
      activeTab: 'overview',
      taskFilter: 'all',
      taskSort: 'priority',
      taskSearch: '',
      project: {
        id: 1,
        name: '웹사이트 리뉴얼',
        description: '회사 웹사이트 전면 리뉴얼 프로젝트로, 새로운 디자인 시스템을 적용하고 사용자 경험을 개선합니다.',
        status: 'inprogress',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-06-30'),
        completionRate: 75,
        tasksCompleted: 18,
        totalTasks: 24,
        teamMembers: [
          { id: 1, name: '김개발', role: '프론트엔드 개발', color: '#667EEA' },
          { id: 2, name: '이디자인', role: 'UI/UX 디자이너', color: '#48BB78' },
          { id: 3, name: '박기획', role: '프로젝트 매니저', color: '#ED8936' },
          { id: 4, name: '최퍼블', role: '퍼블리셔', color: '#9F7AEA' }
        ]
      },
      tabs: [
        { id: 'overview', label: '개요' },
        { id: 'tasks', label: '작업' },
        { id: 'timeline', label: '타임라인' },
        { id: 'files', label: '파일' },
        { id: 'team', label: '팀' }
      ],
      recentActivities: [
        { id: 1, type: 'task', text: '김개발님이 "헤더 컴포넌트 개발" 작업을 완료했습니다', time: '10분 전' },
        { id: 2, type: 'comment', text: '이디자인님이 "디자인 시안 v2"에 댓글을 남겼습니다', time: '1시간 전' },
        { id: 3, type: 'file', text: '박기획님이 "프로젝트 일정표.xlsx"를 업로드했습니다', time: '3시간 전' },
        { id: 4, type: 'task', text: '최퍼블님이 "반응형 레이아웃 구현" 작업을 시작했습니다', time: '오늘' }
      ],
      tasks: [
        { id: 1, title: '헤더 컴포넌트 개발', status: 'done', priority: 'high', dueDate: new Date('2024-02-15'), assignee: '김개발' },
        { id: 2, title: '메인 페이지 디자인', status: 'inprogress', priority: 'high', dueDate: new Date('2024-02-20'), assignee: '이디자인' },
        { id: 3, title: '데이터베이스 스키마 설계', status: 'todo', priority: 'medium', dueDate: new Date('2024-02-25'), assignee: '김개발' },
        { id: 4, title: '반응형 레이아웃 구현', status: 'inprogress', priority: 'medium', dueDate: new Date('2024-02-28'), assignee: '최퍼블' },
        { id: 5, title: 'API 문서 작성', status: 'todo', priority: 'low', dueDate: new Date('2024-03-05'), assignee: '김개발' }
      ]
    }
  },
  computed: {
    filteredTasks() {
      let filtered = this.tasks

      // 상태 필터
      if (this.taskFilter !== 'all') {
        filtered = filtered.filter(task => task.status === this.taskFilter)
      }

      // 검색 필터
      if (this.taskSearch) {
        const search = this.taskSearch.toLowerCase()
        filtered = filtered.filter(task => 
          task.title.toLowerCase().includes(search) ||
          task.assignee.toLowerCase().includes(search)
        )
      }

      // 정렬
      filtered.sort((a, b) => {
        switch (this.taskSort) {
          case 'priority':
            const priorityOrder = { high: 0, medium: 1, low: 2 }
            return priorityOrder[a.priority] - priorityOrder[b.priority]
          case 'duedate':
            return a.dueDate - b.dueDate
          case 'recent':
            return b.id - a.id
          default:
            return 0
        }
      })

      return filtered
    }
  },
  methods: {
    getStatusText(status) {
      const statusMap = {
        'planning': '계획 중',
        'inprogress': '진행 중',
        'completed': '완료',
        'paused': '일시 중지'
      }
      return statusMap[status] || status
    },
    
    getPriorityText(priority) {
      const priorityMap = {
        'high': '높음',
        'medium': '보통',
        'low': '낮음'
      }
      return priorityMap[priority] || priority
    },
    
    formatDate(date) {
      if (!date) return '-'
      const d = new Date(date)
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
    },
    
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').slice(0, 2)
    },
    
    editProject() {
      console.log('Edit project')
    },
    
    openTaskModal() {
      console.log('Open task modal')
    },
    
    toggleTask(task) {
      task.status = task.status === 'done' ? 'todo' : 'done'
    }
  }
}
</script>

<style scoped>
.project-detail-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 프로젝트 헤더 */
.project-header {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
}

.header-left {
  flex: 1;
  min-width: 0;
}

.project-title-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.project-title {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: #1A202C;
}

.project-status {
  padding: 6px 16px;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;
}

.status-planning {
  background-color: #E2E8F0;
  color: #4A5568;
}

.status-inprogress {
  background-color: #BEE3F8;
  color: #2B6CB0;
}

.status-completed {
  background-color: #C6F6D5;
  color: #276749;
}

.status-paused {
  background-color: #FED7D7;
  color: #C53030;
}

.project-description {
  margin: 0 0 24px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #718096;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  color: #A0AEC0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-value {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.2;
  color: #2D3748;
}

.meta-divider {
  width: 1px;
  height: 32px;
  background-color: #E2E8F0;
}

.header-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

/* 탭 네비게이션 */
.tab-navigation {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 0;
}

.tab-button {
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  bottom: -1px;
}

.tab-button:hover {
  color: #2D3748;
}

.tab-button.active {
  color: #293380;
  border-bottom-color: #293380;
}

/* 탭 콘텐츠 */
.tab-content {
  min-height: 400px;
}

/* 개요 탭 */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.card-title {
  margin: 0 0 20px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.2;
  color: #1A202C;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.icon-button {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background-color: #F8FAFC;
  color: #718096;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-button:hover {
  background-color: #E2E8F0;
  color: #2D3748;
}

/* 진행률 카드 */
.progress-visual {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.progress-circle {
  position: relative;
  width: 120px;
  height: 120px;
}

.progress-circle svg {
  width: 100%;
  height: 100%;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-value {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
  color: #1A202C;
}

.progress-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  color: #718096;
  margin-top: 4px;
}

.progress-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: #1A202C;
  margin-bottom: 8px;
}

.stat-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  color: #718096;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background-color: #E2E8F0;
}

/* 팀 멤버 카드 */
.member-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.member-info {
  flex: 1;
  min-width: 0;
}

.member-name {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.2;
  color: #1A202C;
  margin-bottom: 4px;
}

.member-role {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2;
  color: #718096;
}

/* 최근 활동 카드 */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  gap: 12px;
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-task {
  background-color: #E0E7FF;
  color: #5B21B6;
}

.icon-comment {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.icon-file {
  background-color: #D1FAE5;
  color: #065F46;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  color: #2D3748;
  margin-bottom: 4px;
}

.activity-time {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  color: #A0AEC0;
}

/* 작업 탭 */
.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.tasks-filters {
  display: flex;
  gap: 12px;
}

.filter-select {
  padding: 8px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background-color: white;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #2D3748;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-select:hover {
  border-color: #CBD5E0;
}

.filter-select:focus {
  outline: none;
  border-color: #293380;
  box-shadow: 0 0 0 3px rgba(41, 51, 128, 0.1);
}

.search-box {
  width: 280px;
}

.search-input {
  width: 100%;
  padding: 8px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background-color: white;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #2D3748;
  transition: all 0.2s ease;
}

.search-input::placeholder {
  color: #A0AEC0;
}

.search-input:focus {
  outline: none;
  border-color: #293380;
  box-shadow: 0 0 0 3px rgba(41, 51, 128, 0.1);
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
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
}

.task-checkbox {
  flex-shrink: 0;
}

.task-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  color: #1A202C;
  margin-bottom: 8px;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.task-priority {
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
}

.priority-high {
  background-color: #FED7D7;
  color: #C53030;
}

.priority-medium {
  background-color: #FEFCBF;
  color: #C05621;
}

.priority-low {
  background-color: #BEE3F8;
  color: #2B6CB0;
}

.task-due {
  color: #718096;
}

.task-assignee {
  color: #718096;
}

.task-menu {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: #A0AEC0;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.task-menu:hover {
  background-color: #F8FAFC;
  color: #2D3748;
}

/* 타임라인 탭 */
.timeline-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #A0AEC0;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  gap: 24px;
}

/* 반응형 */
@media (max-width: 768px) {
  .project-detail-page {
    padding: 16px;
  }

  .project-header {
    padding: 24px;
  }

  .header-content {
    flex-direction: column;
    gap: 24px;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions button {
    flex: 1;
  }

  .project-title {
    font-size: 24px;
  }

  .tab-navigation {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab-button {
    padding: 12px 16px;
    font-size: 14px;
    white-space: nowrap;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .tasks-header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    width: 100%;
  }

  .task-meta {
    flex-wrap: wrap;
    gap: 8px;
  }
}

/* 포커스 스타일 */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid #293380;
  outline-offset: 2px;
}

/* 스크롤바 스타일 */
.tab-navigation::-webkit-scrollbar {
  height: 4px;
}

.tab-navigation::-webkit-scrollbar-track {
  background: transparent;
}

.tab-navigation::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 2px;
}
</style>
