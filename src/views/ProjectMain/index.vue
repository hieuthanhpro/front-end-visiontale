<template>
  <div class="project-main">
    <el-container>
      <!-- Sidebar -->
      <el-aside width="210px">
        <el-menu :default-active="activeRoute" class="project-menu" router>
          <el-menu-item index="/project">
            <el-icon><Back /></el-icon>
            <span>{{ t('common.back') }}</span>
          </el-menu-item>
          <el-menu-item :index="`/project/${projectName}/text-creation`">
            <el-icon><EditPen /></el-icon>
            <span>{{ t('projectMain.textCreation') }}</span>
          </el-menu-item>
          <el-menu-item :index="`/project/${projectName}/library/character`">
            <el-icon><User /></el-icon>
            <span>{{ t('projectMain.characterLibrary') }}</span>
          </el-menu-item>
          <el-menu-item :index="`/project/${projectName}/library/scene`">
            <el-icon><OfficeBuilding /></el-icon>
            <span>{{ t('projectMain.sceneLibrary') }}</span>
          </el-menu-item>
          <el-menu-item :index="`/project/${projectName}/storyboard-process`">
            <el-icon><PictureFilled /></el-icon>
            <span>{{ t('projectMain.storyboardProcess') }}</span>
          </el-menu-item>
          <el-menu-item :index="`/project/${projectName}/video-output`">
            <el-icon><VideoPlay /></el-icon>
            <span>{{ t('projectMain.videoOutput') }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- Main content area -->
      <el-container>
        <el-main>
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          <el-loading :value="loading" />

          <router-view v-if="!loading && !error" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { EditPen, User, PictureFilled, VideoPlay, Back, OfficeBuilding } from '@element-plus/icons-vue'
import type { ProjectInfo } from '@/types/project'
import projectApi from '@/api/project_api'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const projectInfo = ref<ProjectInfo | null>(null)
const loading = ref(true)
const error = ref('')

const projectName = computed(() => route.params.name as string)
const activeRoute = computed(() => route.path)

const fetchProjectInfo = async () => {
  if (!projectName.value) {
    router.push('/404')
    return
  }

  try {
    loading.value = true
    error.value = ''
    projectInfo.value = await projectApi.getProjectInfo(projectName.value)
  } catch (e: any) {
    error.value = e.message || t('project.fetchError')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProjectInfo()
})
</script>

<style scoped>
.project-main {
  display: flex;
  min-height: 100vh;
  background: var(--bg);
}

.el-container {
  min-height: 100vh;
}

.el-aside {
  background: var(--surface);
  border-right: 1px solid var(--border);
  box-shadow: 2px 0 8px var(--shadow);
}

:deep(.el-menu) {
  background: var(--surface);
  border-right: none;
}

:deep(.el-menu-item) {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  border-radius: 8px;
  margin: 4px 8px;
  transition: all 0.3s ease;
}

:deep(.el-menu-item):hover {
  background: color-mix(in srgb, var(--surface) 90%, var(--accent));
  color: var(--accent);
}

:deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: var(--bg);
  font-weight: 600;
}

:deep(.el-menu-item .el-icon) {
  margin-right: 0;
}

.el-main {
  background: var(--bg);
  padding: 0;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 20px;
  padding: 16px;
  background: color-mix(in srgb, #e74c3c 10%, transparent);
  border-radius: 8px;
  border: 1px solid #e74c3c;
}

.operation-bar {
  padding: 12px 20px;
  border-top: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}
</style>