<template>
  <div class="album-view">
    <div class="page-header">
      <h1>练习相册</h1>
      <button class="btn-primary-outline" @click="triggerUpload">
        <el-icon><Upload /></el-icon> 上传照片
      </button>
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        style="display: none"
        @change="handleFileChange"
      />
    </div>

    <div v-if="photos.length" class="photo-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-card">
        <img :src="photo.url" @click="previewImage(photo.url)" class="photo-img" />
        <div class="photo-footer">
          <span class="photo-date">{{ formatDate(photo.createdAt) }}</span>
          <el-button text :icon="Delete" type="danger" @click="confirmDelete(photo.id)" />
        </div>
      </div>
    </div>
    <el-empty v-else description="暂无照片，上传一些练习照片吧～" />

    <!-- 预览弹窗 -->
    <BaseModal v-model="previewVisible" width="600px" :show-close="true" @close="previewUrl = ''">
      <template #header>
        <!-- 不显示标题，只保留关闭按钮（showClose=true） -->
      </template>
      <div style="text-align: center">
        <img :src="previewUrl" class="preview-img" alt="预览" />
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Upload, Delete } from '@element-plus/icons-vue'
import { useAlbumStore } from '@/stores/albumStore'
import BaseModal from '@/components/common/BaseModal.vue'

const albumStore = useAlbumStore()
const photos = computed(() => albumStore.photos)

onMounted(() => {
  if (albumStore.photos.length === 0) {
    albumStore.initPhotos()
  }
})

const fileInput = ref<HTMLInputElement | null>(null)

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) return
  const file = input.files[0]
  if (!file.type.startsWith('image/')) {
    ElMessage.warning('请选择图片文件')
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    const base64 = e.target?.result as string
    albumStore.addPhoto(base64)
    ElMessage.success('上传成功')
  }
  reader.readAsDataURL(file)
  input.value = ''
}

const confirmDelete = async (id: string) => {
  await ElMessageBox.confirm('确定删除这张照片吗？', '提示', { type: 'warning' })
  albumStore.deletePhoto(id)
  ElMessage.success('删除成功')
}

const previewVisible = ref(false)
const previewUrl = ref('')
const previewImage = (url: string) => {
  previewUrl.value = url
  previewVisible.value = true
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}-${day}`
}
</script>

<style scoped>
.btn-primary-outline {
  background-color: transparent;
  border: 1px solid var(--primary-color, #2bc4ba);
  color: var(--primary-color, #2bc4ba);
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary-outline:hover {
  background-color: var(--primary-color, #2bc4ba);
  color: white;
}
.album-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.2rem;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #206f6d;
}
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}
.photo-card {
  background: var(--bg-surface, #fff);
  border-radius: 0.8rem;
  overflow: hidden;
  border: 1px solid var(--border-color, #e0f0ef);
  transition: transform 0.2s;
}
.photo-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.photo-img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  cursor: pointer;
}
.photo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.8rem;
  background-color: var(--bg-surface, #fff);
}
.photo-date {
  font-size: 0.75rem;
  color: var(--text-secondary, #5a7c7a);
}
.preview-img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 4px;
}
@media (max-width: 600px) {
  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
  .photo-date {
    font-size: 0.7rem;
  }
}
</style>
