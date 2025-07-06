<template>
  <PMCard 
    variant="elevated" 
    :hoverable="true" 
    class="project-card"
    @click="$emit('click', project)"
  >
    <template #header>
      <div class="project-header">
        <div class="project-icon" :style="{ backgroundColor: project.color }">
          {{ project.name.charAt(0) }}
        </div>
        <div class="project-info">
          <h3 class="project-title">{{ project.name }}</h3>
          <p class="project-description">{{ project.description }}</p>
        </div>
      </div>
    </template>

    <div class="project-stats">
      <div class="stat-item">
        <div class="stat-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
          </svg>
        </div>
        <span class="stat-value">{{ project.memberCount }}</span>
        <span class="stat-label">멤버</span>
      </div>

      <div class="stat-item">
        <div class="stat-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"/>
          </svg>
        </div>
        <span class="stat-value">{{ project.taskCount }}</span>
        <span class="stat-label">작업</span>
      </div>

      <div class="stat-item">
        <div class="stat-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <span class="stat-value">{{ project.completionRate }}%</span>
        <span class="stat-label">완료율</span>
      </div>
    </div>

    <template #footer>
      <div class="project-footer">
        <div class="team-avatars">
          <div 
            v-for="member in project.teamMembers.slice(0, 3)" 
            :key="member.id"
            class="avatar"
            :style="{ backgroundColor: member.color }"
          >
            {{ member.name.charAt(0) }}
          </div>
          <div 
            v-if="project.teamMembers.length > 3" 
            class="avatar avatar-more"
          >
            +{{ project.teamMembers.length - 3 }}
          </div>
        </div>

        <div class="project-actions">
          <PMButton 
            variant="primary" 
            size="small"
            @click.stop="$emit('view', project)"
          >
            프로젝트 보기
          </PMButton>
          <PMButton 
            variant="outline" 
            size="small"
            @click.stop="$emit('settings', project)"
          >
            설정
          </PMButton>
        </div>
      </div>
    </template>
  </PMCard>
</template>

<script>
import PMCard from '@/components/UI/PMCard.vue'
import PMButton from '@/components/UI/PMButton.vue'

export default {
  name: 'ProjectCard',
  components: {
    PMCard,
    PMButton
  },
  props: {
    project: {
      type: Object,
      required: true,
      validator: (project) => {
        return project && 
               typeof project.id !== 'undefined' &&
               typeof project.name === 'string' &&
               typeof project.description === 'string'
      }
    }
  },
  emits: ['click', 'view', 'settings']
}
</script>

<style scoped>
.project-card {
  cursor: pointer;
  min-height: 280px;
}

/* 헤더 */
.project-header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.project-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
}

.project-info {
  flex: 1;
  min-width: 0;
}

.project-title {
  margin: 0 0 8px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.3;
  color: #1A202C;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-description {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #718096;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 통계 */
.project-stats {
  display: flex;
  gap: 24px;
  margin: 16px 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.stat-icon {
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 6px;
  background-color: #F0EFF7;
  color: #293380;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.2;
  color: #1A202C;
}

.stat-label {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.4;
  color: #718096;
}

/* 푸터 */
.project-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.team-avatars {
  display: flex;
  gap: -8px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 12px;
  border: 2px solid #FFFFFF;
  margin-left: -8px;
}

.avatar:first-child {
  margin-left: 0;
}

.avatar-more {
  background-color: #E2E8F0;
  color: #718096;
  font-size: 10px;
}

.project-actions {
  display: flex;
  gap: 8px;
}

/* 호버 효과 */
.project-card:hover .project-title {
  color: #293380;
}
</style>
