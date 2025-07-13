<template>
  <PMModal
    :visible="visible"
    :title="modalTitle"
    size="medium"
    :closable="true"
    :close-on-overlay="false"
    :show-cancel="true"
    :show-confirm="true"
    :confirm-text="confirmText"
    cancel-text="취소"
    @update:visible="$emit('update:visible', $event)"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    @close="handleClose"
  >
    <form class="pm-task-form" @submit.prevent="handleConfirm">
      <!-- 작업 제목 -->
      <div class="pm-task-form__group">
        <label class="pm-task-form__label" for="task-title">
          작업 제목 <span class="pm-task-form__required">*</span>
        </label>
        <input
          id="task-title"
          v-model="formData.title"
          type="text"
          class="pm-task-form__input"
          :class="{ 'pm-task-form__input--error': errors.title }"
          placeholder="작업 제목을 입력하세요"
          maxlength="100"
        />
        <span v-if="errors.title" class="pm-task-form__error">{{ errors.title }}</span>
      </div>

      <!-- 작업 설명 -->
      <div class="pm-task-form__group">
        <label class="pm-task-form__label" for="task-description">
          작업 설명
        </label>
        <textarea
          id="task-description"
          v-model="formData.description"
          class="pm-task-form__textarea"
          placeholder="작업에 대한 상세 설명을 입력하세요"
          rows="4"
          maxlength="500"
        />
        <span class="pm-task-form__char-count">
          {{ formData.description.length }} / 500
        </span>
      </div>

      <!-- 담당자 선택 -->
      <div class="pm-task-form__group">
        <label class="pm-task-form__label" for="task-assignee">
          담당자 <span class="pm-task-form__required">*</span>
        </label>
        <select
          id="task-assignee"
          v-model="formData.assigneeId"
          class="pm-task-form__select"
          :class="{ 'pm-task-form__input--error': errors.assigneeId }"
        >
          <option value="">담당자를 선택하세요</option>
          <option 
            v-for="member in members" 
            :key="member.id"
            :value="member.id"
          >
            {{ member.name }} ({{ member.email }})
          </option>
        </select>
        <span v-if="errors.assigneeId" class="pm-task-form__error">{{ errors.assigneeId }}</span>
      </div>

      <!-- 날짜 선택 (시작일/종료일) -->
      <div class="pm-task-form__row">
        <div class="pm-task-form__group pm-task-form__group--half">
          <label class="pm-task-form__label" for="task-start-date">
            시작일 <span class="pm-task-form__required">*</span>
          </label>
          <input
            id="task-start-date"
            v-model="formData.startDate"
            type="date"
            class="pm-task-form__input"
            :class="{ 'pm-task-form__input--error': errors.startDate }"
            :min="minDate"
            @change="validateDates"
          />
          <span v-if="errors.startDate" class="pm-task-form__error">{{ errors.startDate }}</span>
        </div>

        <div class="pm-task-form__group pm-task-form__group--half">
          <label class="pm-task-form__label" for="task-end-date">
            종료일 <span class="pm-task-form__required">*</span>
          </label>
          <input
            id="task-end-date"
            v-model="formData.endDate"
            type="date"
            class="pm-task-form__input"
            :class="{ 'pm-task-form__input--error': errors.endDate }"
            :min="formData.startDate || minDate"
            @change="validateDates"
          />
          <span v-if="errors.endDate" class="pm-task-form__error">{{ errors.endDate }}</span>
        </div>
      </div>

      <!-- 우선순위 선택 -->
      <div class="pm-task-form__group">
        <label class="pm-task-form__label">
          우선순위
        </label>
        <div class="pm-task-form__radio-group">
          <label 
            v-for="priority in priorities" 
            :key="priority.value"
            class="pm-task-form__radio-label"
          >
            <input
              v-model="formData.priority"
              type="radio"
              :value="priority.value"
              class="pm-task-form__radio"
            />
            <span 
              class="pm-task-form__radio-text"
              :class="`pm-task-form__radio-text--${priority.value}`"
            >
              {{ priority.label }}
            </span>
          </label>
        </div>
      </div>

      <!-- 상태 선택 -->
      <div class="pm-task-form__group">
        <label class="pm-task-form__label" for="task-status">
          상태
        </label>
        <select
          id="task-status"
          v-model="formData.status"
          class="pm-task-form__select"
        >
          <option value="todo">할 일</option>
          <option value="in-progress">진행 중</option>
          <option value="review">검토 중</option>
          <option value="done">완료</option>
        </select>
      </div>

      <!-- 태그 입력 -->
      <div class="pm-task-form__group">
        <label class="pm-task-form__label" for="task-tags">
          태그
        </label>
        <div class="pm-task-form__tags">
          <div class="pm-task-form__tag-list">
            <span 
              v-for="(tag, index) in formData.tags" 
              :key="index"
              class="pm-task-form__tag"
            >
              {{ tag }}
              <button
                type="button"
                class="pm-task-form__tag-remove"
                @click="removeTag(index)"
              >
                ×
              </button>
            </span>
          </div>
          <input
            id="task-tags"
            v-model="tagInput"
            type="text"
            class="pm-task-form__input pm-task-form__input--tags"
            placeholder="태그를 입력하고 Enter를 누르세요"
            @keydown.enter.prevent="addTag"
          />
        </div>
      </div>

      <!-- 첨부파일 -->
      <div class="pm-task-form__group">
        <label class="pm-task-form__label">
          첨부파일
        </label>
        <div class="pm-task-form__file">
          <input
            id="task-file"
            ref="fileInput"
            type="file"
            class="pm-task-form__file-input"
            multiple
            @change="handleFileChange"
          />
          <label for="task-file" class="pm-task-form__file-label">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            파일 선택
          </label>
          <span class="pm-task-form__file-info">
            {{ fileInfo }}
          </span>
        </div>
        <div v-if="formData.files.length > 0" class="pm-task-form__file-list">
          <div 
            v-for="(file, index) in formData.files" 
            :key="index"
            class="pm-task-form__file-item"
          >
            <span class="pm-task-form__file-name">{{ file.name }}</span>
            <span class="pm-task-form__file-size">{{ formatFileSize(file.size) }}</span>
            <button
              type="button"
              class="pm-task-form__file-remove"
              @click="removeFile(index)"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </form>
  </PMModal>
</template>

<script>
import PMModal from './PMModal.vue'

export default {
  name: 'PMTaskModal',
  components: {
    PMModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'create', // create, edit
      validator: (value) => ['create', 'edit'].includes(value)
    },
    task: {
      type: Object,
      default: null
    },
    members: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:visible', 'submit', 'cancel', 'close'],
  data() {
    return {
      formData: {
        title: '',
        description: '',
        assigneeId: '',
        startDate: '',
        endDate: '',
        priority: 'medium',
        status: 'todo',
        tags: [],
        files: []
      },
      errors: {},
      tagInput: '',
      priorities: [
        { value: 'high', label: '높음' },
        { value: 'medium', label: '보통' },
        { value: 'low', label: '낮음' }
      ]
    }
  },
  computed: {
    modalTitle() {
      return this.mode === 'create' ? '새 작업 만들기' : '작업 수정하기'
    },
    confirmText() {
      return this.mode === 'create' ? '작업 생성' : '수정 완료'
    },
    minDate() {
      return new Date().toISOString().split('T')[0]
    },
    fileInfo() {
      const count = this.formData.files.length
      return count === 0 ? '선택된 파일 없음' : `${count}개 파일 선택됨`
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.initializeForm()
      }
    }
  },
  methods: {
    initializeForm() {
      if (this.mode === 'edit' && this.task) {
        this.formData = {
          ...this.task,
          tags: [...(this.task.tags || [])],
          files: [...(this.task.files || [])]
        }
      } else {
        this.resetForm()
      }
      this.errors = {}
    },
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        assigneeId: '',
        startDate: '',
        endDate: '',
        priority: 'medium',
        status: 'todo',
        tags: [],
        files: []
      }
      this.tagInput = ''
    },
    validateForm() {
      this.errors = {}
      let isValid = true

      if (!this.formData.title.trim()) {
        this.errors.title = '작업 제목을 입력해주세요.'
        isValid = false
      }

      if (!this.formData.assigneeId) {
        this.errors.assigneeId = '담당자를 선택해주세요.'
        isValid = false
      }

      if (!this.formData.startDate) {
        this.errors.startDate = '시작일을 선택해주세요.'
        isValid = false
      }

      if (!this.formData.endDate) {
        this.errors.endDate = '종료일을 선택해주세요.'
        isValid = false
      }

      if (this.formData.startDate && this.formData.endDate) {
        const start = new Date(this.formData.startDate)
        const end = new Date(this.formData.endDate)
        if (end < start) {
          this.errors.endDate = '종료일은 시작일 이후여야 합니다.'
          isValid = false
        }
      }

      return isValid
    },
    validateDates() {
      if (this.formData.startDate && this.formData.endDate) {
        const start = new Date(this.formData.startDate)
        const end = new Date(this.formData.endDate)
        if (end < start) {
          this.errors.endDate = '종료일은 시작일 이후여야 합니다.'
        } else {
          delete this.errors.endDate
        }
      }
    },
    handleConfirm() {
      if (this.validateForm()) {
        this.$emit('submit', { ...this.formData })
        this.$emit('update:visible', false)
      }
    },
    handleCancel() {
      this.$emit('cancel')
      this.$emit('update:visible', false)
    },
    handleClose() {
      this.$emit('close')
    },
    addTag() {
      const tag = this.tagInput.trim()
      if (tag && !this.formData.tags.includes(tag)) {
        this.formData.tags.push(tag)
        this.tagInput = ''
      }
    },
    removeTag(index) {
      this.formData.tags.splice(index, 1)
    },
    handleFileChange(event) {
      const files = Array.from(event.target.files)
      this.formData.files.push(...files)
    },
    removeFile(index) {
      this.formData.files.splice(index, 1)
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
  }
}
</script>

<style scoped>
.pm-task-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pm-task-form__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pm-task-form__row {
  display: flex;
  gap: 16px;
}

.pm-task-form__group--half {
  flex: 1;
}

.pm-task-form__label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  color: #4A5568;
}

.pm-task-form__required {
  color: #E53E3E;
}

.pm-task-form__input,
.pm-task-form__select,
.pm-task-form__textarea {
  width: 100%;
  padding: 10px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #2D3748;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  transition: all 0.2s;
}

.pm-task-form__input:focus,
.pm-task-form__select:focus,
.pm-task-form__textarea:focus {
  outline: none;
  border-color: #293380;
  box-shadow: 0 0 0 3px rgba(41, 51, 128, 0.1);
}

.pm-task-form__input--error,
.pm-task-form__select--error {
  border-color: #E53E3E;
}

.pm-task-form__textarea {
  resize: vertical;
  min-height: 100px;
}

.pm-task-form__error {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #E53E3E;
}

.pm-task-form__char-count {
  align-self: flex-end;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #A0AEC0;
}

/* Radio Buttons */
.pm-task-form__radio-group {
  display: flex;
  gap: 16px;
}

.pm-task-form__radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.pm-task-form__radio {
  margin-right: 8px;
}

.pm-task-form__radio-text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #4A5568;
  padding: 4px 12px;
  border-radius: 16px;
  transition: all 0.2s;
}

.pm-task-form__radio:checked + .pm-task-form__radio-text {
  color: #FFFFFF;
  font-weight: 500;
}

.pm-task-form__radio:checked + .pm-task-form__radio-text--high {
  background-color: #E53E3E;
}

.pm-task-form__radio:checked + .pm-task-form__radio-text--medium {
  background-color: #F6AD55;
}

.pm-task-form__radio:checked + .pm-task-form__radio-text--low {
  background-color: #4299E1;
}

/* Tags */
.pm-task-form__tags {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pm-task-form__tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pm-task-form__tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #2D3748;
  background: #EDF2F7;
  border-radius: 16px;
}

.pm-task-form__tag-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  font-size: 16px;
  line-height: 1;
  color: #718096;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.pm-task-form__tag-remove:hover {
  color: #2D3748;
  background: #CBD5E0;
}

.pm-task-form__input--tags {
  margin-top: 4px;
}

/* File Upload */
.pm-task-form__file {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pm-task-form__file-input {
  display: none;
}

.pm-task-form__file-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #4A5568;
  background: #F7FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.pm-task-form__file-label:hover {
  background: #EDF2F7;
  border-color: #CBD5E0;
}

.pm-task-form__file-info {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #718096;
}

.pm-task-form__file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.pm-task-form__file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #F7FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
}

.pm-task-form__file-name {
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: #2D3748;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pm-task-form__file-size {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #718096;
}

.pm-task-form__file-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  font-size: 18px;
  line-height: 1;
  color: #718096;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.pm-task-form__file-remove:hover {
  color: #E53E3E;
  background: #FED7D7;
}
</style>
