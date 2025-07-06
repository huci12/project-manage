<template>
  <PMLayout active-item="dashboard" :show-quick-panel="true">
    <div class="dashboard-page">
      <!-- 헤더 영역 -->
      <div class="dashboard-header">
        <div class="header-content">
          <h1 class="page-title">대시보드</h1>
          <p class="page-subtitle">오늘도 좋은 하루 되세요, 김프로님!</p>
        </div>
        
        <div class="header-actions">
          <div class="search-box">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
            <input type="text" placeholder="프로젝트 검색..." class="search-input">
          </div>
          
          <button class="notification-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
            </svg>
            <span class="notification-badge">3</span>
          </button>
          
          <div class="user-avatar">
            <span>김</span>
          </div>
        </div>
      </div>

      <!-- 통계 카드 섹션 -->
      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-icon" style="background-color: #E6FFFA;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38B2AC" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="7" y1="8" x2="17" y2="8"/>
              <line x1="7" y1="12" x2="17" y2="12"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">전체 프로젝트</p>
            <p class="stat-value">12개</p>
            <p class="stat-change positive">+8%</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background-color: #EBF8FF;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3182CE" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">진행 중</p>
            <p class="stat-value">8개</p>
            <p class="stat-change positive">+2</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background-color: #F0FFF4;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48BB78" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">완료된 작업</p>
            <p class="stat-value">156개</p>
            <p class="stat-change positive">+12</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background-color: #FEF5E7;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D69E2E" stroke-width="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/>
              <path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">팀 멤버</p>
            <p class="stat-value">24명</p>
            <p class="stat-change positive">+3</p>
          </div>
        </div>
      </div>

      <!-- 최근 프로젝트 섹션 -->
      <div class="recent-projects">
        <div class="section-header">
          <h2 class="section-title">최근 프로젝트</h2>
          <a href="#" class="view-all-link">모두 보기 →</a>
        </div>

        <div class="project-grid">
          <div class="project-card">
            <div class="project-header">
              <div class="project-indicator" style="background-color: #667EEA;"></div>
              <h3 class="project-title">웹 애플리케이션 개발</h3>
            </div>
            <p class="project-description">React 기반 프로젝트 관리 시스템 개발</p>
            <div class="project-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 70%; background-color: #667EEA;"></div>
              </div>
              <span class="progress-text">진행률: 70%</span>
            </div>
            <div class="project-footer">
              <div class="project-members">
                <div class="member-avatar" style="background-color: #667EEA;">김</div>
                <div class="member-avatar" style="background-color: #38B2AC;">이</div>
                <div class="member-avatar" style="background-color: #D69E2E;">박</div>
                <span class="member-count">+2명</span>
              </div>
              <span class="project-deadline">마감: 12/31</span>
            </div>
          </div>

          <div class="project-card">
            <div class="project-header">
              <div class="project-indicator" style="background-color: #38B2AC;"></div>
              <h3 class="project-title">모바일 앱 리뉴얼</h3>
            </div>
            <p class="project-description">Flutter를 활용한 크로스 플랫폼 앱 개발</p>
            <div class="project-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 40%; background-color: #38B2AC;"></div>
              </div>
              <span class="progress-text">진행률: 40%</span>
            </div>
            <div class="project-footer">
              <div class="project-members">
                <div class="member-avatar" style="background-color: #9F7AEA;">최</div>
                <div class="member-avatar" style="background-color: #F56565;">정</div>
                <span class="member-count">+1명</span>
              </div>
              <span class="project-deadline">마감: 1/15</span>
            </div>
          </div>

          <div class="project-card">
            <div class="project-header">
              <div class="project-indicator" style="background-color: #48BB78;"></div>
              <h3 class="project-title">데이터 분석 플랫폼</h3>
            </div>
            <p class="project-description">AI 기반 비즈니스 인텔리전스 구축</p>
            <div class="project-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 85%; background-color: #48BB78;"></div>
              </div>
              <span class="progress-text">진행률: 85%</span>
            </div>
            <div class="project-footer">
              <div class="project-members">
                <div class="member-avatar" style="background-color: #ED8936;">한</div>
                <div class="member-avatar" style="background-color: #3182CE;">송</div>
              </div>
              <span class="project-deadline">마감: 11/30</span>
            </div>
          </div>

          <div class="project-card">
            <div class="project-header">
              <div class="project-indicator" style="background-color: #D69E2E;"></div>
              <h3 class="project-title">마케팅 캠페인</h3>
            </div>
            <p class="project-description">Q4 브랜드 캠페인 기획 및 실행</p>
            <div class="project-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 25%; background-color: #D69E2E;"></div>
              </div>
              <span class="progress-text">진행률: 25%</span>
            </div>
            <div class="project-footer">
              <div class="project-members">
                <div class="member-avatar" style="background-color: #805AD5;">윤</div>
                <div class="member-avatar" style="background-color: #38A169;">조</div>
                <div class="member-avatar" style="background-color: #E53E3E;">강</div>
              </div>
              <span class="project-deadline">마감: 2/28</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PMLayout>
</template>

<script>
import PMLayout from '@/components/layout/PMLayout.vue'

export default {
  name: 'DashboardPage',
  components: {
    PMLayout
  }
}
</script>

<style scoped>
.dashboard-page {
  padding: 40px;
}

/* 헤더 */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  margin: 0 0 8px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: #2D3748;
}

.page-subtitle {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #718096;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #A0AEC0;
}

.search-input {
  width: 100%;
  padding: 10px 16px 10px 44px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  background-color: #F7FAFC;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667EEA;
  background-color: #FFFFFF;
}

.notification-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background-color: #F7FAFC;
  color: #667EEA;
  cursor: pointer;
  transition: all 0.2s ease;
}

.notification-btn:hover {
  background-color: #E2E8F0;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background-color: #F56565;
  color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #667EEA;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

/* 통계 카드 */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.stat-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 20px;
  align-items: center;
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-label {
  margin: 0 0 8px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #718096;
}

.stat-value {
  margin: 0 0 4px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #2D3748;
}

.stat-change {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
}

.stat-change.positive {
  color: #48BB78;
}

/* 최근 프로젝트 */
.recent-projects {
  margin-bottom: 48px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #2D3748;
}

.view-all-link {
  color: #667EEA;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: #5a67d8;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
}

.project-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.project-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.project-indicator {
  width: 4px;
  height: 24px;
  border-radius: 2px;
}

.project-title {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #2D3748;
}

.project-description {
  margin: 0 0 20px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #718096;
}

.project-progress {
  margin-bottom: 20px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #F7FAFC;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #718096;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-members {
  display: flex;
  align-items: center;
  gap: -8px;
}

.member-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  border: 2px solid #FFFFFF;
  margin-right: -8px;
}

.member-count {
  margin-left: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #718096;
}

.project-deadline {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #718096;
}

/* 반응형 */
@media (max-width: 1280px) {
  .project-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 24px;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .search-box {
    flex: 1;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
  
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
