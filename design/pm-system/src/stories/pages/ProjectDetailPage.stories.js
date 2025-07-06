import ProjectDetailPage from '@/pages/ProjectDetailPage.vue'

export default {
  title: 'Pages/ProjectDetailPage',
  component: ProjectDetailPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '프로젝트 상세 정보를 보여주는 페이지입니다. 개요, 작업, 타임라인 등의 탭으로 구성되어 있습니다.'
      }
    }
  }
}

export const Default = () => ({
  components: { ProjectDetailPage },
  template: '<ProjectDetailPage />'
})

export const OverviewTab = () => ({
  components: { ProjectDetailPage },
  template: '<ProjectDetailPage :initial-tab="\'overview\'" />'
})

export const TasksTab = () => ({
  components: { ProjectDetailPage },
  template: '<ProjectDetailPage :initial-tab="\'tasks\'" />'
})

export const TimelineTab = () => ({
  components: { ProjectDetailPage },
  template: '<ProjectDetailPage :initial-tab="\'timeline\'" />'
})

export const CompletedProject = () => ({
  components: { ProjectDetailPage },
  data() {
    return {
      completedProject: {
        id: 1,
        name: '완료된 프로젝트',
        description: '성공적으로 완료된 프로젝트입니다.',
        status: 'completed',
        completionRate: 100,
        tasksCompleted: 24,
        totalTasks: 24
      }
    }
  },
  template: '<ProjectDetailPage :project="completedProject" />'
})
