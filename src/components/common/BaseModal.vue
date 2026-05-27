<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="modal-overlay" @click.self="handleClose">
        <div class="modal-container" :style="{ width: width }">
          <div class="modal-header">
            <slot name="header">
              <span class="modal-title">{{ title }}</span>
            </slot>
            <button v-if="showClose" class="modal-close-btn" @click="handleClose">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    width?: string
    showClose?: boolean
  }>(),
  {
    title: '',
    width: '500px',
    showClose: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-container {
  background-color: var(--bg-surface, #fff);
  border-radius: 16px;
  border: 1px solid var(--primary-color, #2bc4ba);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  transition: all 0.2s ease;
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color, #e0f0ef);
  background-color: var(--primary-color-light, #e6f7f5);
  border-radius: 16px 16px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  color: var(--primary-color, #2bc4ba);
  font-weight: 600;
  font-size: 1.1rem;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  background: rgba(43, 196, 186, 0.1);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color, #2bc4ba);
  transition: all 0.2s;
}

.modal-close-btn:hover {
  background: var(--primary-color, #2bc4ba);
  color: white;
}

.modal-body {
  padding: 24px 20px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 12px 20px 20px;
  border-top: 1px solid var(--border-color, #e0f0ef);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.2s ease;
}

.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.95);
}
</style>
