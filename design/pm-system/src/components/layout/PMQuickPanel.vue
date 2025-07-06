<template>
  <aside class="pm-quick-panel" :class="{ 'pm-quick-panel--collapsed': isCollapsed }">
    <!-- 헤더 섹션 -->
    <div class="pm-quick-panel__header">
      <h2 v-if="!isCollapsed" class="panel-title">빠른 작업</h2>
      <!-- 토글 버튼 -->
      <button 
        class="toggle-btn"
        @click="togglePanel"
        :title="isCollapsed ? '빠른 작업 펼치기' : '빠른 작업 접기'"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path v-if="!isCollapsed" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
          <path v-else d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
        </svg>
      </button>
    </div>

    <!-- 빠른 작업 섹션 -->
    <div v-if="!isCollapsed" class="pm-quick-panel__section">
      <div class="quick-actions">
        <button class="quick-action-btn quick-action-btn--primary" @click="handleCreateProject">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a1 1 0 011 1v6h6a1 1 0 110 2H9v6a1 1 0 11-2 0V9H1a1 1 0 110-2h6V1a1 1 0 011-1z"/>
          </svg>
          <span>새 프로젝트 생성</span>
        </button>
        
        <button class="quick-action-btn quick-action-btn--secondary" @click="handleInviteTeam">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 00-6 6h12a6 6 0 00-6-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
          </svg>
          <span>팀원 초대하기</span>
        </button>
      </div>
    </div>
    <div v-else class="pm-quick-panel__section pm-quick-panel__section--collapsed">
      <button class="icon-btn" @click="handleCreateProject" title="새 프로젝트 생성">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 0a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H1a1 1 0 110-2h8V1a1 1 0 011-1z"/>
        </svg>
      </button>
      <button class="icon-btn" @click="handleInviteTeam" title="팀원 초대하기">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 00-6 6h12a6 6 0 00-6-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
        </svg>
      </button>
    </div>

    <!-- 최근 활동 섹션 -->
    <div v-if="!isCollapsed" class="pm-quick-panel__section pm-quick-panel__section--scrollable">
      <h3 class="section-title">최근 활동</h3>
      <div class="activity-list">
        <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
          <div class="activity-icon" :style="{ backgroundColor: activity.bgColor }">
            <div class="activity-dot" :style="{ backgroundColor: activity.color }"></div>
          </div>
          <div class="activity-content">
            <p class="activity-text">{{ activity.text }}</p>
            <p class="activity-detail">{{ activity.detail }}</p>
            <p class="activity-time">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 다가오는 마감일 섹션 -->
    <div v-if="!isCollapsed" class="pm-quick-panel__section pm-quick-panel__section--scrollable pm-quick-panel__section--last">
      <h3 class="section-title">다가오는 마감일</h3>
      <div class="deadline-list">
        <div v-for="task in upcomingDeadlines" :key="task.id" class="deadline-item">
          <div class="deadline-bar" :style="{ backgroundColor: task.color }"></div>
          <div class="deadline-content">
            <p class="deadline-title">{{ task.title }}</p>
            <p class="deadline-date">{{ task.date }}</p>
          </div>
          <span class="deadline-priority" :class="`deadline-priority--${task.priority}`">
            {{ task.priorityText }}
          </span>
        </div>
      </div>
      
      <button class="view-all-btn">
        모든 마감일 보기
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'PMQuickPanel',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle', 'create-project', 'invite-team'],
  data() {
    return {
      isCollapsed: this.collapsed,
      recentActivities: [
        {
          id: 1,
          text: '김개발님이 작업을 완료했습니다',
          detail: '로그인 페이지 UI 디자인',
          time: '2시간 전',
          bgColor: '#E6FFFA',
          color: '#38B2AC'
        },
        {
          id: 2,
          text: '새 프로젝트가 생성되었습니다',
          detail: '모바일 앱 리뉴얼',
          time: '4시간 전',
          bgColor: '#EBF8FF',
          color: '#3182CE'
        },
        {
          id: 3,
          text: '이디자인님이 댓글을 남겼습니다',
          detail: 'UI 검토 요청',
          time: '6시간 전',
          bgColor: '#F0FFF4',
          color: '#48BB78'
        },
        {
          id: 4,
          text: '마감일이 임박했습니다',
          detail: '데이터베이스 설계',
          time: '1일 전',
          bgColor: '#FEF5E7',
          color: '#D69E2E'
        }
      ],
      upcomingDeadlines: [
        {
          id: 1,
          title: 'API 개발 완료',
          date: '내일 마감',
          priority: 'urgent',
          priorityText: '긴급',
          color: '#F56565'
        },
        {
          id: 2,
          title: 'UI 테스트',
          date: '3일 후',
          priority: 'high',
          priorityText: '중요',
          color: '#D69E2E'
        },
        {
          id: 3,
          title: '문서 작성',
          date: '1주 후',
          priority: 'normal',
          priorityText: '보통',
          color: '#48BB78'
        }
      ]
    }
  },
  watch: {
    collapsed(newVal) {
      this.isCollapsed = newVal
    }
  },
  methods: {
    togglePanel() {
      this.isCollapsed = !this.isCollapsed
      this.$emit('toggle', this.isCollapsed)
    },
    handleCreateProject() {
      this.$emit('create-project')
    },
    handleInviteTeam() {
      this.$emit('invite-team')
    }
  }
}
</script>

<style scoped>
.pm-quick-panel {
  width: 320px;
  height: 100vh;
  background-color: #FFFFFF;
  border-left: 1px solid #E2E8F0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
}

.pm-quick-panel--collapsed {
  width: 80px;
}

/* 헤더 */
.pm-quick-panel__header {
  padding: 24px;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: relative;
}

.pm-quick-panel--collapsed .pm-quick-panel__header {
  padding: 16px;
  justify-content: center;
}

.toggle-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #F7FAFC;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667EEA;
  transition: all 0.2s ease;
  flex-shrink: 0;
  order: -1; /* 제목보다 앞에 배치 */
}

.pm-quick-panel--collapsed .toggle-btn {
  order: 0;
}

.toggle-btn:hover {
  background-color: #EBF8FF;
  border-color: #667EEA;
  transform: scale(1.05);
}

.panel-title {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.2;
  color: #2D3748;
  flex: 1;
}

/* 섹션 */
.pm-quick-panel__section {
  padding: 24px;
  border-bottom: 1px solid #E2E8F0;
}

.pm-quick-panel__section--collapsed {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.pm-quick-panel__section--scrollable {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.pm-quick-panel__section--last {
  border-bottom: none;
}

/* 섹션 스크롤바 스타일 - 내부 콘텐츠만 스크롤 */
.pm-quick-panel__section--scrollable {
  scrollbar-width: thin;
  scrollbar-color: #E2E8F0 transparent;
}

.pm-quick-panel__section--scrollable::-webkit-scrollbar {
  width: 6px;
}

.pm-quick-panel__section--scrollable::-webkit-scrollbar-track {
  background: transparent;
}

.pm-quick-panel__section--scrollable::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 3px;
}

.pm-quick-panel__section--scrollable::-webkit-scrollbar-thumb:hover {
  background: #CBD5E0;
}

.section-title {
  margin: 0 0 16px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.2;
  color: #2D3748;
}

/* 빠른 작업 버튼 */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-action-btn--primary {
  background-color: #667EEA;
  color: #FFFFFF;
}

.quick-action-btn--primary:hover {
  background-color: #5a67d8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.quick-action-btn--secondary {
  background-color: #FFFFFF;
  color: #667EEA;
  border: 1px solid #E2E8F0;
}

.quick-action-btn--secondary:hover {
  background-color: #F7FAFC;
  border-color: #667EEA;
}

/* 아이콘 버튼 (축소 상태) */
.icon-btn {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  background-color: #FFFFFF;
  color: #667EEA;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background-color: #F7FAFC;
  border-color: #667EEA;
  transform: translateY(-1px);
}

/* 최근 활동 */
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
  width: 32px;
  height: 32px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-text {
  margin: 0 0 4px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  color: #2D3748;
}

.activity-detail {
  margin: 0 0 4px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.4;
  color: #718096;
}

.activity-time {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.2;
  color: #A0AEC0;
}

/* 마감일 */
.deadline-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.deadline-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.deadline-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
}

.deadline-content {
  flex: 1;
  margin-left: 4px;
}

.deadline-title {
  margin: 0 0 4px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  color: #2D3748;
}

.deadline-date {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.4;
  color: #718096;
}

.deadline-priority {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 1.2;
}

.deadline-priority--urgent {
  color: #F56565;
}

.deadline-priority--high {
  color: #D69E2E;
}

.deadline-priority--normal {
  color: #48BB78;
}

/* 모두 보기 버튼 */
.view-all-btn {
  width: 100%;
  padding: 12px;
  background-color: #FFFFFF;
  border: 1px solid #667EEA;
  border-radius: 8px;
  color: #667EEA;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-all-btn:hover {
  background-color: #667EEA;
  color: #FFFFFF;
}

/* 반응형 */
@media (max-width: 1600px) {
  .pm-quick-panel {
    width: 280px;
  }
  
  .pm-quick-panel--collapsed {
    width: 80px;
  }
}

@media (max-width: 768px) {
  .pm-quick-panel {
    width: 240px;
  }
  
  .pm-quick-panel--collapsed {
    width: 60px;
  }
}

@media (max-width: 480px) {
  .pm-quick-panel {
    width: 200px;
  }
  
  .pm-quick-panel--collapsed {
    width: 50px;
  }
}
</style>
