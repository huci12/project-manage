import PMCard from '@/components/UI/PMCard.vue'
import PMButton from '@/components/UI/PMButton.vue'

export default {
  title: 'UI Components/PMCard',
  component: PMCard,
  parameters: {
    docs: {
      description: {
        component: '프로젝트 관리 시스템에서 사용되는 카드 컴포넌트입니다. 헤더, 콘텐츠, 푸터 슬롯을 지원합니다.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined'],
      description: '카드의 스타일 변형'
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
      description: '카드의 패딩 크기'
    },
    hoverable: {
      control: { type: 'boolean' },
      description: '호버 효과 활성화'
    }
  }
}

const Template = (args) => ({
  components: { PMCard },
  setup() {
    return { args }
  },
  template: `
    <PMCard v-bind="args">
      <h3 style="margin: 0 0 16px 0; color: #1A202C;">카드 제목</h3>
      <p style="margin: 0; color: #718096; line-height: 1.6;">
        이것은 기본 카드 컴포넌트입니다. 다양한 콘텐츠를 담을 수 있으며, 
        유연한 레이아웃을 제공합니다.
      </p>
    </PMCard>
  `
})

export const Default = Template.bind({})
Default.args = {
  variant: 'default',
  padding: 'medium'
}

export const Elevated = Template.bind({})
Elevated.args = {
  variant: 'elevated',
  padding: 'medium'
}

export const Outlined = Template.bind({})
Outlined.args = {
  variant: 'outlined',
  padding: 'medium'
}

export const Hoverable = Template.bind({})
Hoverable.args = {
  variant: 'elevated',
  padding: 'medium',
  hoverable: true
}

export const WithHeader = () => ({
  components: { PMCard, PMButton },
  template: `
    <PMCard variant="elevated" padding="medium">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; color: #1A202C;">프로젝트 카드</h3>
          <PMButton variant="outline" size="small">편집</PMButton>
        </div>
      </template>
      
      <p style="margin: 0; color: #718096; line-height: 1.6;">
        헤더가 있는 카드입니다. 제목과 액션 버튼을 포함할 수 있습니다.
      </p>
    </PMCard>
  `
})

export const WithFooter = () => ({
  components: { PMCard, PMButton },
  template: `
    <PMCard variant="elevated" padding="medium">
      <h3 style="margin: 0 0 16px 0; color: #1A202C;">알림 메시지</h3>
      <p style="margin: 0 0 16px 0; color: #718096; line-height: 1.6;">
        푸터가 있는 카드입니다. 액션 버튼들을 배치할 수 있습니다.
      </p>
      
      <template #footer>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <PMButton variant="outline" size="small">취소</PMButton>
          <PMButton variant="primary" size="small">확인</PMButton>
        </div>
      </template>
    </PMCard>
  `
})

export const FullExample = () => ({
  components: { PMCard, PMButton },
  template: `
    <PMCard variant="elevated" padding="medium" hoverable>
      <template #header>
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: #667EEA; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
            W
          </div>
          <div>
            <h3 style="margin: 0; color: #1A202C;">웹사이트 리뉴얼</h3>
            <p style="margin: 0; color: #718096; font-size: 14px;">UI/UX 디자인 & 개발</p>
          </div>
        </div>
      </template>
      
      <div style="margin: 16px 0;">
        <div style="display: flex; gap: 24px; text-align: center;">
          <div>
            <div style="font-size: 24px; font-weight: bold; color: #1A202C;">6</div>
            <div style="font-size: 12px; color: #718096;">멤버</div>
          </div>
          <div>
            <div style="font-size: 24px; font-weight: bold; color: #1A202C;">24</div>
            <div style="font-size: 12px; color: #718096;">작업</div>
          </div>
          <div>
            <div style="font-size: 24px; font-weight: bold; color: #1A202C;">75%</div>
            <div style="font-size: 12px; color: #718096;">완료율</div>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div style="display: flex; gap: 8px;">
          <PMButton variant="primary" size="small">프로젝트 보기</PMButton>
          <PMButton variant="outline" size="small">설정</PMButton>
        </div>
      </template>
    </PMCard>
  `
})

export const PaddingVariants = () => ({
  components: { PMCard },
  template: `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
      <PMCard variant="elevated" padding="small">
        <h4 style="margin: 0 0 8px 0;">Small Padding</h4>
        <p style="margin: 0; color: #718096;">작은 패딩이 적용된 카드입니다.</p>
      </PMCard>
      
      <PMCard variant="elevated" padding="medium">
        <h4 style="margin: 0 0 8px 0;">Medium Padding</h4>
        <p style="margin: 0; color: #718096;">중간 패딩이 적용된 카드입니다.</p>
      </PMCard>
      
      <PMCard variant="elevated" padding="large">
        <h4 style="margin: 0 0 8px 0;">Large Padding</h4>
        <p style="margin: 0; color: #718096;">큰 패딩이 적용된 카드입니다.</p>
      </PMCard>
      
      <PMCard variant="elevated" padding="none">
        <div style="padding: 20px;">
          <h4 style="margin: 0 0 8px 0;">No Padding</h4>
          <p style="margin: 0; color: #718096;">패딩이 없는 카드입니다. 내부에서 직접 패딩을 제어합니다.</p>
        </div>
      </PMCard>
    </div>
  `
})

export const GridLayout = () => ({
  components: { PMCard, PMButton },
  template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
      <PMCard v-for="i in 6" :key="i" variant="elevated" padding="medium" hoverable>
        <template #header>
          <h3 style="margin: 0; color: #1A202C;">카드 {{ i }}</h3>
        </template>
        
        <p style="margin: 0; color: #718096; line-height: 1.6;">
          그리드 레이아웃에서 사용되는 카드 예제입니다. 
          반응형으로 동작하며 호버 효과가 적용됩니다.
        </p>
        
        <template #footer>
          <PMButton variant="outline" size="small" full-width>자세히 보기</PMButton>
        </template>
      </PMCard>
    </div>
  `
})

export const InteractiveDemo = () => ({
  components: { PMCard, PMButton },
  data() {
    return {
      cards: [
        { id: 1, title: '할 일', count: 5, color: '#667EEA' },
        { id: 2, title: '진행 중', count: 3, color: '#4299E1' },
        { id: 3, title: '완료', count: 12, color: '#48BB78' }
      ]
    }
  },
  methods: {
    incrementCount(card) {
      card.count++
    },
    decrementCount(card) {
      if (card.count > 0) {
        card.count--
      }
    }
  },
  template: `
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
      <PMCard 
        v-for="card in cards" 
        :key="card.id"
        variant="elevated" 
        padding="medium"
        hoverable
      >
        <div style="text-align: center;">
          <div 
            style="width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;"
            :style="{ backgroundColor: card.color }"
          >
            {{ card.count }}
          </div>
          <h3 style="margin: 0 0 16px 0; color: #1A202C;">{{ card.title }}</h3>
          <div style="display: flex; gap: 8px; justify-content: center;">
            <PMButton variant="outline" size="small" @click="decrementCount(card)">-</PMButton>
            <PMButton variant="primary" size="small" @click="incrementCount(card)">+</PMButton>
          </div>
        </div>
      </PMCard>
    </div>
  `
})
