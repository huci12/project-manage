import PMAlert from '@/components/modal/PMAlert.vue'

export default {
  title: 'Components/Modal/PMAlert',
  component: PMAlert,
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Alert 표시 여부'
    },
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'Alert 타입'
    },
    title: {
      control: 'text',
      description: '제목 (비어있으면 타입에 따른 기본 제목 사용)'
    },
    message: {
      control: 'text',
      description: '주요 메시지'
    },
    description: {
      control: 'text',
      description: '추가 설명 (선택사항)'
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트'
    },
    closable: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부'
    },
    closeOnOverlay: {
      control: 'boolean',
      description: '오버레이 클릭으로 닫기 가능 여부'
    }
  },
  parameters: {
    docs: {
      description: {
        component: '사용자에게 알림 메시지를 표시하는 모달 컴포넌트입니다. 성공, 오류, 경고, 정보 등 다양한 타입을 지원합니다.'
      }
    }
  }
}

const Template = (args) => ({
  components: { PMAlert },
  setup() {
    return { args }
  },
  data() {
    return {
      isVisible: args.visible || false
    }
  },
  template: `
    <div>
      <button @click="isVisible = true" class="px-4 py-2 bg-blue-500 text-white rounded">
        Alert 열기
      </button>
      <PMAlert
        v-bind="args"
        :visible="isVisible"
        @update:visible="isVisible = $event"
        @confirm="onConfirm"
        @close="onClose"
      />
    </div>
  `,
  methods: {
    onConfirm() {
      console.log('Alert confirmed')
    },
    onClose() {
      console.log('Alert closed')
    }
  }
})

// 성공 Alert
export const Success = Template.bind({})
Success.args = {
  type: 'success',
  message: '작업이 성공적으로 완료되었습니다!',
  description: '프로젝트가 성공적으로 생성되었으며, 팀원들에게 초대가 발송되었습니다.'
}

// 오류 Alert
export const Error = Template.bind({})
Error.args = {
  type: 'error',
  message: '작업 처리 중 오류가 발생했습니다.',
  description: '네트워크 연결을 확인하고 다시 시도해주세요.'
}

// 경고 Alert
export const Warning = Template.bind({})
Warning.args = {
  type: 'warning',
  message: '저장되지 않은 변경사항이 있습니다.',
  description: '페이지를 떠나면 변경사항이 손실될 수 있습니다.'
}

// 정보 Alert
export const Info = Template.bind({})
Info.args = {
  type: 'info',
  message: '새로운 업데이트가 있습니다.',
  description: '시스템이 v2.0으로 업데이트되었습니다. 새로운 기능을 확인해보세요.'
}

// 커스텀 제목
export const CustomTitle = Template.bind({})
CustomTitle.args = {
  type: 'success',
  title: '프로젝트 생성 완료',
  message: '새 프로젝트가 생성되었습니다.',
  confirmText: '대시보드로 이동'
}

// 간단한 메시지 (설명 없음)
export const SimpleMessage = Template.bind({})
SimpleMessage.args = {
  type: 'info',
  message: '작업이 완료되었습니다.'
}

// 닫기 버튼 없음
export const NotClosable = Template.bind({})
NotClosable.args = {
  type: 'error',
  message: '필수 작업을 완료해주세요.',
  description: '이 작업은 반드시 완료되어야 합니다.',
  closable: false,
  closeOnOverlay: false
}

// Playground
export const Playground = Template.bind({})
Playground.args = {
  type: 'info',
  title: '',
  message: 'Alert 메시지를 입력하세요',
  description: '추가 설명을 입력할 수 있습니다',
  confirmText: '확인',
  closable: true,
  closeOnOverlay: true
}
