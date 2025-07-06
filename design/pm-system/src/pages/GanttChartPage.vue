<template>
  <div class="gantt-chart-page">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-title">
          <h1 class="page-title">프로젝트 타임라인</h1>
          <p class="page-subtitle">간트차트로 프로젝트 일정을 한눈에 확인하세요</p>
        </div>
      </div>
    </div>

    <!-- 간트차트 플레이스홀더 -->
    <div class="gantt-container">
      <PMCard variant="elevated" padding="large">
        <div class="placeholder-content">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect x="10" y="20" width="100" height="10" rx="2" fill="#E2E8F0"/>
            <rect x="10" y="40" width="80" height="10" rx="2" fill="#667EEA"/>
            <rect x="10" y="60" width="90" height="10" rx="2" fill="#48BB78"/>
            <rect x="10" y="80" width="70" height="10" rx="2" fill="#4299E1"/>
          </svg>
          <h2 class="placeholder-title">간트차트 뷰</h2>
          <p class="placeholder-text">
            프로젝트의 타임라인과 작업 일정을 시각적으로 표현하는<br>
            간트차트 기능이 곧 추가될 예정입니다.
          </p>
          
          <div class="feature-list">
            <div class="feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>작업 간 의존성 관리</span>
            </div>
            <div class="feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>진행률 시각화</span>
            </div>
            <div class="feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>일정 조정 및 변경</span>
            </div>
            <div class="feature-item">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>마일스톤 설정</span>
            </div>
          </div>
        </div>
      </PMCard>
    </div>

    <!-- 샘플 프로젝트 타임라인 -->
    <div class="sample-timeline">
      <h3 class="section-title">프로젝트 타임라인 예시</h3>
      <div class="timeline-grid">
        <div 
          v-for="project in sampleProjects" 
          :key="project.id"
          class="timeline-item"
        >
          <div class="project-info">
            <h4 class="project-name">{{ project.name }}</h4>
            <p class="project-period">{{ formatPeriod(project.startDate, project.endDate) }}</p>
          </div>
          <div class="progress-bar-container">
            <div 
              class="progress-bar" 
              :style="{ width: `${project.progress}%`, backgroundColor: project.color }"
            ></div>
            <span class="progress-text">{{ project.progress }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PMCard from '@/components/UI/PMCard.vue'

export default {
  name: 'GanttChartPage',
  components: {
    PMCard
  },
  data() {
    return {
      sampleProjects: [
        {
          id: 1,
          name: '웹사이트 리뉴얼',
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-06-30'),
          progress: 75,
          color: '#667EEA'
        },
        {
          id: 2,
          name: '모바일 앱 개발',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-07-31'),
          progress: 45,
          color: '#48BB78'
        },
        {
          id: 3,
          name: 'API 서버 구축',
          startDate: new Date('2024-03-01'),
          endDate: new Date('2024-05-31'),
          progress: 90,
          color: '#4299E1'
        },
        {
          id: 4,
          name: 'UI/UX 디자인',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-03-31'),
          progress: 100,
          color: '#ED8936'
        }
      ]
    }
  },
  methods: {
    formatPeriod(startDate, endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const startStr = `${start.getFullYear()}.${String(start.getMonth() + 1).padStart(2, '0')}.${String(start.getDate()).padStart(2, '0')}`
      const endStr = `${end.getFullYear()}.${String(end.getMonth() + 1).padStart(2, '0')}.${String(end.getDate()).padStart(2, '0')}`
      return `${startStr} - ${endStr}`
    }
  }
}
</script>

<style scoped>
.gantt-chart-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 페이지 헤더 */
.page-header {
  margin-bottom: 32px;
}

.page-title {
  margin: 0 0 8px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #1A202C;
}

.page-subtitle {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #718096;
}

/* 플레이스홀더 */
.gantt-container {
  margin-bottom: 48px;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  text-align: center;
  gap: 24px;
}

.placeholder-title {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #1A202C;
}

.placeholder-text {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #718096;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 32px;
  width: 100%;
  max-width: 600px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #2D3748;
}

.feature-item svg {
  color: #48BB78;
  flex-shrink: 0;
}

/* 샘플 타임라인 */
.sample-timeline {
  margin-bottom: 48px;
}

.section-title {
  margin: 0 0 24px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #1A202C;
}

.timeline-grid {
  display: grid;
  gap: 24px;
}

.timeline-item {
  background-color: white;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  transition: all 0.2s ease;
}

.timeline-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.project-info {
  flex: 1;
}

.project-name {
  margin: 0 0 8px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1A202C;
}

.project-period {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #718096;
}

.progress-bar-container {
  width: 300px;
  height: 20px;
  background-color: #F8FAFC;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #1A202C;
}

/* 반응형 */
@media (max-width: 768px) {
  .gantt-chart-page {
    padding: 16px;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }

  .timeline-item {
    flex-direction: column;
    align-items: stretch;
  }

  .progress-bar-container {
    width: 100%;
  }
}
</style>
