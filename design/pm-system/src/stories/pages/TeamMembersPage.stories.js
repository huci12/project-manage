import TeamMembersPage from '@/pages/TeamMembersPage.vue'

export default {
  title: 'Pages/TeamMembersPage',
  component: TeamMembersPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '팀 멤버를 관리하는 페이지입니다. 멤버 목록, 검색, 필터링, 초대 기능을 제공합니다.'
      }
    }
  }
}

export const Default = () => ({
  components: { TeamMembersPage },
  template: '<TeamMembersPage />'
})

export const FilteredByRole = () => ({
  components: { TeamMembersPage },
  template: `
    <div>
      <div style="padding: 16px; background: #FEF3C7; margin-bottom: 24px;">
        <p style="margin: 0; color: #92400E;">
          역할별 필터링 테스트: 관리자, 팀장, 팀원, 보기 전용 필터를 사용해보세요.
        </p>
      </div>
      <TeamMembersPage />
    </div>
  `
})

export const SearchDemo = () => ({
  components: { TeamMembersPage },
  template: `
    <div>
      <div style="padding: 16px; background: #DBEAFE; margin-bottom: 24px;">
        <p style="margin: 0; color: #1E40AF;">
          검색 테스트: "김", "이", "박" 등의 성씨나 이메일 주소로 검색해보세요.
        </p>
      </div>
      <TeamMembersPage />
    </div>
  `
})

export const EmptyState = () => ({
  components: { TeamMembersPage },
  template: '<TeamMembersPage :initial-members="[]" />'
})
