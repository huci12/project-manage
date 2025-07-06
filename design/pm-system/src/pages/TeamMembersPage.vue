<template>
  <div class="team-members-page">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-title">
          <h1 class="page-title">팀 멤버 관리</h1>
          <p class="member-count">총 {{ members.length }}명의 멤버</p>
        </div>
        <PMButton 
          variant="primary" 
          size="medium"
          @click="openInviteModal"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 8px;">
            <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
          멤버 초대
        </PMButton>
      </div>
    </div>

    <!-- 필터 바 -->
    <div class="filter-bar">
      <div class="search-box">
        <div class="search-input">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="search-icon">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="이름 또는 이메일로 검색..."
            class="search-field"
          />
        </div>
      </div>
      
      <div class="filters">
        <select v-model="roleFilter" class="filter-select">
          <option value="">모든 역할</option>
          <option value="admin">관리자</option>
          <option value="leader">팀장</option>
          <option value="member">팀원</option>
          <option value="viewer">보기 전용</option>
        </select>
        
        <select v-model="statusFilter" class="filter-select">
          <option value="">모든 상태</option>
          <option value="active">활성</option>
          <option value="inactive">비활성</option>
          <option value="pending">초대 중</option>
        </select>
      </div>
    </div>

    <!-- 멤버 리스트 -->
    <div class="members-list">
      <PMCard variant="elevated" padding="none">
        <div class="list-header">
          <div class="header-cell name">이름</div>
          <div class="header-cell email">이메일</div>
          <div class="header-cell role">역할</div>
          <div class="header-cell team">소속 팀</div>
          <div class="header-cell status">상태</div>
          <div class="header-cell actions"></div>
        </div>
        
        <div class="list-body">
          <div 
            v-for="member in filteredMembers" 
            :key="member.id"
            class="member-row"
          >
            <div class="member-cell name">
              <div class="member-avatar" :style="{ backgroundColor: member.avatarColor }">
                {{ getInitials(member.name) }}
              </div>
              <div class="member-info">
                <div class="member-name">{{ member.name }}</div>
                <div class="member-position">{{ member.position }}</div>
              </div>
            </div>
            
            <div class="member-cell email">
              {{ member.email }}
            </div>
            
            <div class="member-cell role">
              <span class="role-badge" :class="`role-${member.role}`">
                {{ getRoleText(member.role) }}
              </span>
            </div>
            
            <div class="member-cell team">
              <div class="team-tags">
                <span 
                  v-for="team in member.teams" 
                  :key="team.id"
                  class="team-tag"
                  :style="{ backgroundColor: team.color + '20', color: team.color }"
                >
                  {{ team.name }}
                </span>
              </div>
            </div>
            
            <div class="member-cell status">
              <span class="status-badge" :class="`status-${member.status}`">
                <span class="status-dot"></span>
                {{ getStatusText(member.status) }}
              </span>
            </div>
            
            <div class="member-cell actions">
              <button class="action-button" @click="showMemberMenu(member)">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </PMCard>
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button 
        class="page-button"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
      </button>
      
      <div class="page-numbers">
        <button 
          v-for="page in visiblePages" 
          :key="page"
          class="page-number"
          :class="{ active: page === currentPage }"
          @click="currentPage = page"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        class="page-button"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import PMCard from '@/components/UI/PMCard.vue'
import PMButton from '@/components/UI/PMButton.vue'

export default {
  name: 'TeamMembersPage',
  components: {
    PMCard,
    PMButton
  },
  data() {
    return {
      searchQuery: '',
      roleFilter: '',
      statusFilter: '',
      currentPage: 1,
      itemsPerPage: 10,
      members: [
        {
          id: 1,
          name: '김개발',
          email: 'kim.dev@company.com',
          position: '시니어 프론트엔드 개발자',
          role: 'leader',
          status: 'active',
          avatarColor: '#667EEA',
          teams: [
            { id: 1, name: '웹 개발팀', color: '#667EEA' },
            { id: 2, name: 'UI/UX팀', color: '#48BB78' }
          ]
        },
        {
          id: 2,
          name: '이디자인',
          email: 'lee.design@company.com',
          position: 'UI/UX 디자이너',
          role: 'member',
          status: 'active',
          avatarColor: '#48BB78',
          teams: [
            { id: 2, name: 'UI/UX팀', color: '#48BB78' }
          ]
        },
        {
          id: 3,
          name: '박기획',
          email: 'park.pm@company.com',
          position: '프로젝트 매니저',
          role: 'admin',
          status: 'active',
          avatarColor: '#ED8936',
          teams: [
            { id: 3, name: '기획팀', color: '#ED8936' }
          ]
        },
        {
          id: 4,
          name: '최백엔드',
          email: 'choi.backend@company.com',
          position: '백엔드 개발자',
          role: 'member',
          status: 'inactive',
          avatarColor: '#9F7AEA',
          teams: [
            { id: 5, name: '서버팀', color: '#E53E3E' }
          ]
        },
        {
          id: 5,
          name: '정데이터',
          email: 'jung.data@company.com',
          position: '데이터 분석가',
          role: 'member',
          status: 'pending',
          avatarColor: '#38B2AC',
          teams: [
            { id: 6, name: '데이터팀', color: '#38B2AC' }
          ]
        }
      ]
    }
  },
  computed: {
    filteredMembers() {
      let filtered = this.members

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(member => 
          member.name.toLowerCase().includes(query) ||
          member.email.toLowerCase().includes(query)
        )
      }

      if (this.roleFilter) {
        filtered = filtered.filter(member => member.role === this.roleFilter)
      }

      if (this.statusFilter) {
        filtered = filtered.filter(member => member.status === this.statusFilter)
      }

      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return filtered.slice(start, end)
    },
    
    totalPages() {
      return Math.ceil(this.members.length / this.itemsPerPage)
    },
    
    visiblePages() {
      const pages = []
      const total = this.totalPages
      const current = this.currentPage
      
      if (total <= 5) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        if (current > 3) pages.push('...')
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
          if (i !== 1 && i !== total) pages.push(i)
        }
        if (current < total - 2) pages.push('...')
        pages.push(total)
      }
      
      return pages
    }
  },
  methods: {
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').slice(0, 2)
    },
    
    getRoleText(role) {
      const roleMap = {
        'admin': '관리자',
        'leader': '팀장',
        'member': '팀원',
        'viewer': '보기 전용'
      }
      return roleMap[role] || role
    },
    
    getStatusText(status) {
      const statusMap = {
        'active': '활성',
        'inactive': '비활성',
        'pending': '초대 중'
      }
      return statusMap[status] || status
    },
    
    openInviteModal() {
      console.log('Open invite modal')
    },
    
    showMemberMenu(member) {
      console.log('Show member menu:', member)
    }
  }
}
</script>

<style scoped>
.team-members-page {
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

.member-count {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #718096;
}

/* 필터 바 */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.search-box {
  flex: 1;
  max-width: 400px;
}

.search-input {
  position: relative;
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

.filters {
  display: flex;
  gap: 12px;
}

.filter-select {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background-color: white;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #2D3748;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 멤버 리스트 */
.list-header {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1.5fr 1fr 60px;
  gap: 16px;
  padding: 16px 24px;
  background-color: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
}

.header-cell {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #4A5568;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.member-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1.5fr 1fr 60px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #E2E8F0;
  transition: background-color 0.2s ease;
}

.member-row:hover {
  background-color: #F8FAFC;
}

.member-cell {
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #2D3748;
}

.member-cell.name {
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

.member-name {
  font-weight: 600;
  font-size: 16px;
  color: #1A202C;
  margin-bottom: 4px;
}

.member-position {
  font-size: 12px;
  color: #718096;
}

.role-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
}

.role-admin {
  background-color: #E0E7FF;
  color: #5B21B6;
}

.role-leader {
  background-color: #DBEAFE;
  color: #1E40AF;
}

.role-member {
  background-color: #D1FAE5;
  color: #065F46;
}

.role-viewer {
  background-color: #FEF3C7;
  color: #92400E;
}

.team-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.team-tag {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-active .status-dot {
  background-color: #48BB78;
}

.status-inactive .status-dot {
  background-color: #718096;
}

.status-pending .status-dot {
  background-color: #F6AD55;
}

.action-button {
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

.action-button:hover {
  background-color: #F8FAFC;
  color: #2D3748;
}

/* 페이지네이션 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.page-button {
  width: 36px;
  height: 36px;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  background-color: white;
  color: #4A5568;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-button:hover:not(:disabled) {
  border-color: #CBD5E0;
  background-color: #F8FAFC;
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-number {
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: transparent;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #4A5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-number:hover:not(:disabled) {
  background-color: #F8FAFC;
}

.page-number:disabled {
  cursor: default;
  color: #4A5568;
}

.page-number.active {
  background-color: #293380;
  color: white;
}

/* 반응형 */
@media (max-width: 1024px) {
  .list-header,
  .member-row {
    grid-template-columns: 2fr 1fr 1fr 60px;
  }

  .header-cell.email,
  .header-cell.team,
  .member-cell.email,
  .member-cell.team {
    display: none;
  }
}

@media (max-width: 768px) {
  .team-members-page {
    padding: 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    max-width: none;
  }

  .filters {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .list-header,
  .member-row {
    grid-template-columns: 1fr 60px;
  }

  .header-cell.role,
  .header-cell.status,
  .member-cell.role,
  .member-cell.status {
    display: none;
  }
}

/* 스크롤바 스타일 */
.list-body::-webkit-scrollbar {
  width: 6px;
}

.list-body::-webkit-scrollbar-track {
  background: #F8FAFC;
}

.list-body::-webkit-scrollbar-thumb {
  background: #CBD5E0;
  border-radius: 3px;
}

.list-body::-webkit-scrollbar-thumb:hover {
  background: #A0AEC0;
}
</style>
