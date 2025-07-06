<template>
  <PMCard 
    variant="elevated" 
    :hoverable="true" 
    class="team-card"
    @click="$emit('click', team)"
  >
    <template #header>
      <div class="team-header">
        <div class="team-icon" :style="{ backgroundColor: team.color }">
          {{ team.name.substring(0, 2) }}
        </div>
        <div class="team-info">
          <h3 class="team-title">{{ team.name }}</h3>
          <p class="team-description">{{ team.description }}</p>
        </div>
      </div>
    </template>

    <div class="team-stats">
      <div class="stat-item">
        <div class="stat-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
          </svg>
        </div>
        <span class="stat-value">{{ team.memberCount }}</span>
        <span class="stat-label">멤버</span>
      </div>

      <div class="stat-item">
        <div class="stat-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"/>
          </svg>
        </div>
        <span class="stat-value">{{ team.projectCount }}</span>
        <span class="stat-label">프로젝트</span>
      </div>

      <div class="stat-item">
        <div class="stat-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <span class="stat-value">{{ team.completionRate }}%</span>
        <span class="stat-label">완료율</span>
      </div>
    </div>

    <div class="team-members">
      <div 
        v-for="member in team.members.slice(0, maxVisibleMembers)" 
        :key="member.id"
        class="member-avatar"
        :style="{ backgroundColor: member.color }"
        :title="member.name"
      >
        {{ member.name.charAt(0) }}
      </div>
      <div 
        v-if="team.members.length > maxVisibleMembers" 
        class="member-avatar member-avatar--more"
        :title="`${team.members.length - maxVisibleMembers}명 더 보기`"
      >
        +{{ team.members.length - maxVisibleMembers }}
      </div>
    </div>

    <template #footer>
      <div class="team-actions">
        <PMButton 
          variant="primary" 
          size="small"
          @click.stop="$emit('view', team)"
        >
          팀 보기
        </PMButton>
        <PMButton 
          variant="outline" 
          size="small"
          @click.stop="$emit('settings', team)"
        >
          설정
        </PMButton>
      </div>
    </template>
  </PMCard>
</template>

<script>
import PMCard from '@/components/UI/PMCard.vue'
import PMButton from '@/components/UI/PMButton.vue'

export default {
  name: 'TeamCard',
  components: {
    PMCard,
    PMButton
  },
  props: {
    team: {
      type: Object,
      required: true,
      validator: (team) => {
        return team && 
               typeof team.id !== 'undefined' &&
               typeof team.name === 'string' &&
               typeof team.description === 'string' &&
               Array.isArray(team.members)
      }
    },
    maxVisibleMembers: {
      type: Number,
      default: 4
    }
  },
  emits: ['click', 'view', 'settings']
}
</script>

<style scoped>
.team-card {
  cursor: pointer;
}

/* 헤더 */
.team-header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.team-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
}

.team-info {
  flex: 1;
  min-width: 0;
}

.team-title {
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

.team-description {
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
.team-stats {
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

/* 멤버 아바타 */
.team-members {
  display: flex;
  gap: -8px;
  margin: 16px 0;
  flex-wrap: wrap;
}

.member-avatar {
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
  cursor: pointer;
  transition: transform 0.2s ease;
}

.member-avatar:first-child {
  margin-left: 0;
}

.member-avatar:hover {
  transform: scale(1.1);
  z-index: 1;
}

.member-avatar--more {
  background-color: #E2E8F0;
  color: #718096;
  font-size: 10px;
}

/* 액션 */
.team-actions {
  display: flex;
  gap: 8px;
  width: 100%;
}

/* 호버 효과 */
.team-card:hover .team-title {
  color: #293380;
}
</style>
