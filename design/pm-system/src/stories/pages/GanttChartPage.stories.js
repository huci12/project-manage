import GanttChartPage from '@/pages/GanttChartPage.vue'

export default {
  title: 'Pages/GanttChartPage',
  component: GanttChartPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '프로젝트 타임라인을 간트차트로 표시하는 페이지입니다. 현재는 플레이스홀더가 표시됩니다.'
      }
    }
  }
}

export const Default = () => ({
  components: { GanttChartPage },
  template: '<GanttChartPage />'
})

export const WithDescription = () => ({
  components: { GanttChartPage },
  template: `
    <div>
      <div style="padding: 16px; background: #E0E7FF; margin-bottom: 24px;">
        <h3 style="margin: 0 0 8px 0; color: #293380;">간트차트 기능 안내</h3>
        <p style="margin: 0; color: #5B21B6;">
          이 페이지는 향후 구현될 간트차트 기능의 플레이스홀더입니다.<br>
          실제 구현 시 작업 간 의존성, 진행률, 마일스톤 등을 시각적으로 관리할 수 있습니다.
        </p>
      </div>
      <GanttChartPage />
    </div>
  `
})

export const MobileView = () => ({
  components: { GanttChartPage },
  template: `
    <div style="max-width: 375px; margin: 0 auto; border: 1px solid #E2E8F0;">
      <GanttChartPage />
    </div>
  `
})
