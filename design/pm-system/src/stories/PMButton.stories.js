import PMButton from '@/components/UI/PMButton.vue'

export default {
  title: 'Components/UI/PMButton',
  component: PMButton,
  parameters: {
    docs: {
      description: {
        component: '프로젝트 관리 시스템의 기본 버튼 컴포넌트입니다. 다양한 변형과 크기를 지원합니다.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: '버튼의 스타일 변형'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기'
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 상태'
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태'
    },
    onClick: {
      action: 'clicked'
    }
  }
}

// Primary 버튼
export const Primary = {
  args: {
    variant: 'primary',
    default: '확인'
  }
}

// Secondary 버튼
export const Secondary = {
  args: {
    variant: 'secondary',
    default: '취소'
  }
}

// Outline 버튼
export const Outline = {
  args: {
    variant: 'outline',
    default: '더보기'
  }
}

// Ghost 버튼
export const Ghost = {
  args: {
    variant: 'ghost',
    default: '삭제'
  }
}

// 크기 변형
export const Sizes = () => ({
  components: { PMButton },
  template: `
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <PMButton size="small">작은 버튼</PMButton>
      <PMButton size="medium">중간 버튼</PMButton>
      <PMButton size="large">큰 버튼</PMButton>
    </div>
  `
})

// 비활성화 상태
export const Disabled = () => ({
  components: { PMButton },
  template: `
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <PMButton variant="primary" disabled>비활성화</PMButton>
      <PMButton variant="secondary" disabled>비활성화</PMButton>
      <PMButton variant="outline" disabled>비활성화</PMButton>
      <PMButton variant="ghost" disabled>비활성화</PMButton>
    </div>
  `
})

// 로딩 상태
export const Loading = () => ({
  components: { PMButton },
  template: `
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <PMButton variant="primary" loading>로딩 중...</PMButton>
      <PMButton variant="secondary" loading>처리 중...</PMButton>
      <PMButton variant="outline" loading>대기 중...</PMButton>
    </div>
  `
})

// 아이콘 포함
export const WithIcon = () => ({
  components: { PMButton },
  template: `
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <PMButton variant="primary">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 8px;">
          <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
        </svg>
        새로 만들기
      </PMButton>
      
      <PMButton variant="secondary">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 8px;">
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
        </svg>
        저장
      </PMButton>
      
      <PMButton variant="outline">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 8px;">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        더보기
      </PMButton>
    </div>
  `
})

// 전체 너비 버튼
export const FullWidth = () => ({
  components: { PMButton },
  template: `
    <div style="max-width: 400px;">
      <PMButton variant="primary" style="width: 100%;">
        전체 너비 버튼
      </PMButton>
    </div>
  `
})