import PMConfirm from '@/components/modal/PMConfirm.vue'

export default {
  title: 'Components/Modal/PMConfirm',
  component: PMConfirm,
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Confirm 표시 여부'
    },
    type: {
      control: { type: 'select' },
      options: ['question', 'warning', 'danger'],
      description: 'Confirm 타입'
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
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트'
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
        component: '사용자의 확인이 필요한 작업을 처리하는 확인 대화상자 컴포넌트입니다. 질문, 경고, 위험 등의 타입을 지원합니다.'
      }
    }
  }
}

const Template = (args) => ({
  components: { PMConfirm },
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
        Confirm 열기
      </button>
      <PMConfirm
        v-bind="args"
        :visible="isVisible"
        @update:visible="isVisible = $event"
        @confirm="onConfirm"
        @cancel="onCancel"
        @close="onClose"
      />
    </div>
  `,
  methods: {
    onConfirm() {
      console.log('Confirmed')
      alert('확인되었습니다!')
    },
    onCancel() {
      console.log('Cancelled')
    },
    onClose() {
      console.log('Closed')
    }
  }
})

// 일반 질문
export const Question = Template.bind({})
Question.args = {
  type: 'question',
  message: '정말로 이 작업을 진행하시겠습니까?',
  description: '이 작업은 되돌릴 수 있습니다.'
}

// 경고 확인
export const Warning = Template.bind({})
Warning.args = {
  type: 'warning',
  message: '저장하지 않은 변경사항이 있습니다.',
  description: '계속 진행하시면 변경사항이 손실됩니다. 정말 진행하시겠습니까?'
}

// 위험 작업 확인
export const Danger = Template.bind({})
Danger.args = {
  type: 'danger',
  message: '이 프로젝트를 삭제하시겠습니까?',
  description: '삭제된 프로젝트는 복구할 수 없습니다. 관련된 모든 데이터가 영구적으로 삭제됩니다.',
  confirmText: '삭제',
  cancelText: '취소'
}

// 커스텀 제목
export const CustomTitle = Template.bind({})
CustomTitle.args = {
  type: 'question',
  title: '프로필 공개 설정',
  message: '프로필을 모든 사용자에게 공개하시겠습니까?',
  description: '공개 설정은 언제든지 변경할 수 있습니다.'
}

// 로그아웃 확인
export const LogoutConfirm = Template.bind({})
LogoutConfirm.args = {
  type: 'question',
  title: '로그아웃',
  message: '정말 로그아웃 하시겠습니까?',
  confirmText: '로그아웃',
  cancelText: '머무르기'
}

// 권한 변경 확인
export const PermissionChange = Template.bind({})
PermissionChange.args = {
  type: 'warning',
  title: '권한 변경',
  message: '이 사용자를 관리자로 변경하시겠습니까?',
  description: '관리자 권한을 가진 사용자는 프로젝트의 모든 설정을 변경할 수 있습니다.',
  confirmText: '권한 변경',
  cancelText: '취소'
}

// 파일 삭제 확인
export const FileDelete = Template.bind({})
FileDelete.args = {
  type: 'danger',
  title: '파일 삭제',
  message: '선택한 10개의 파일을 삭제하시겠습니까?',
  description: '휴지통에서 30일 동안 복구 가능합니다.',
  confirmText: '삭제하기',
  cancelText: '취소'
}

// 닫기 버튼 없음
export const NotClosable = Template.bind({})
NotClosable.args = {
  type: 'danger',
  message: '중요한 결정입니다. 신중히 선택해주세요.',
  description: '이 작업은 시스템에 영향을 미칠 수 있습니다.',
  closable: false,
  closeOnOverlay: false
}

// Playground
export const Playground = Template.bind({})
Playground.args = {
  type: 'question',
  title: '',
  message: 'Confirm 메시지를 입력하세요',
  description: '추가 설명을 입력할 수 있습니다',
  confirmText: '확인',
  cancelText: '취소',
  closable: true,
  closeOnOverlay: true
}
