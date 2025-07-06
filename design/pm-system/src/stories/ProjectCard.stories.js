import ProjectCard from '@/components/project/ProjectCard.vue'

export default {
  title: 'Project/ProjectCard',
  component: ProjectCard,
  parameters: {
    docs: {
      description: {
        component: '프로젝트 정보를 표시하는 카드 컴포넌트입니다. 프로젝트명, 설명, 통계, 팀 멤버 정보를 포함합니다.'
      }
    }
  },
  argTypes: {
    project: {
      control: { type: 'object' },
      description: '프로젝트 데이터 객체'
    }
  }
}

const sampleProject = {
  id: 1,
  name: '웹사이트 리뉴얼',
  description: '회사 웹사이트 전면 리뉴얼 프로젝트',
  color: '#667EEA',
  memberCount: 6,
  taskCount: 24,
  completionRate: 75,
  teamMembers: [
    { id: 1, name: '김개발', color: '#667EEA' },
    { id: 2, name: '이디자인', color: '#48BB78' },
    { id: 3, name: '박기획', color: '#ED8936' },
    { id: 4, name: '최퍼블', color: '#9F7AEA' }
  ]
}

const Template = (args) => ({
  components: { ProjectCard },
  setup() {
    return { args }
  },
  methods: {
    onProjectClick(project) {
      console.log('Project clicked:', project)
    },
    onProjectView(project) {
      console.log('View project:', project)
    },
    onProjectSettings(project) {
      console.log('Project settings:', project)
    }
  },
  template: `
    <div style="width: 360px;">
      <ProjectCard 
        v-bind="args"
        @click="onProjectClick"
        @view="onProjectView"
        @settings="onProjectSettings"
      />
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
  project: sampleProject
}

export const HighCompletion = Template.bind({})
HighCompletion.args = {
  project: {
    ...sampleProject,
    id: 2,
    name: 'API 서버 구축',
    description: 'RESTful API 서버 구축 및 데이터베이스 설계',
    color: '#48BB78',
    memberCount: 4,
    taskCount: 18,
    completionRate: 90,
    teamMembers: [
      { id: 5, name: '서백엔드', color: '#805AD5' },
      { id: 6, name: 'DB관리', color: '#D69E2E' }
    ]
  }
}

export const InteractiveDemo = () => ({
  components: { ProjectCard },
  data() {
    return {
      selectedProject: null,
      project: {
        id: 1,
        name: '인터랙티브 프로젝트',
        description: '클릭 가능한 프로젝트 카드 데모',
        color: '#667EEA',
        memberCount: 5,
        taskCount: 20,
        completionRate: 65,
        teamMembers: [
          { id: 1, name: '김개발', color: '#667EEA' },
          { id: 2, name: '이디자인', color: '#48BB78' },
          { id: 3, name: '박기획', color: '#ED8936' }
        ]
      }
    }
  },
  methods: {
    onProjectClick(project) {
      this.selectedProject = project
      setTimeout(() => {
        this.selectedProject = null
      }, 2000)
    },
    onProjectView(project) {
      alert(`"${project.name}" 프로젝트를 자세히 봅니다.`)
    },
    onProjectSettings(project) {
      alert(`"${project.name}" 프로젝트 설정을 엽니다.`)
    }
  },
  template: `
    <div style="max-width: 360px;">
      <div v-if="selectedProject" style="margin-bottom: 16px; padding: 12px; background: #F0FDF4; border: 1px solid #22C55E; border-radius: 8px; color: #15803D;">
        선택된 프로젝트: {{ selectedProject.name }}
      </div>
      
      <ProjectCard 
        :project="project"
        @click="onProjectClick"
        @view="onProjectView"
        @settings="onProjectSettings"
      />
      
      <div style="margin-top: 16px; padding: 12px; background: #F8FAFC; border-radius: 8px; font-size: 14px; color: #64748B;">
        💡 카드를 클릭하거나 버튼을 눌러서 인터랙션을 확인해보세요!
      </div>
    </div>
  `
})
