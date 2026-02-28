<template>
  <div class="project-container">
    <!-- Header Section -->
    <div class="project-header">
      <h1 class="project-title">{{ t('project.projects') }}</h1>
      <el-button 
        type="primary" 
        size="large"
        :icon="Plus"
        @click="showCreateDialog"
        class="create-button"
      >
        {{ t('project.create') }}
      </el-button>
    </div>

    <!-- Projects Grid -->
    <div v-if="isLoading" class="loading-state">
      <el-skeleton :rows="3" animated />
    </div>

    <el-empty 
      v-else-if="projects.length === 0" 
      :description="t('project.noProjects')"
      class="empty-state"
    >
      <el-button type="primary" :icon="Plus" @click="showCreateDialog">
        {{ t('project.createFirst') }}
      </el-button>
    </el-empty>

    <el-row v-else :gutter="24" class="projects-grid">
      <el-col 
        v-for="project in projects" 
        :key="project" 
        :xs="24" 
        :sm="12" 
        :md="8" 
        :lg="6" 
        :xl="4"
      >
        <el-card 
          class="project-card" 
          shadow="hover"
          @click="handleCardClick(project)"
        >
          <template #header>
            <div class="card-header">
              <el-icon class="project-icon"><Folder /></el-icon>
              <h3 class="project-name">{{ project }}</h3>
            </div>
          </template>
          
          <div class="card-actions">
            <el-button 
              type="primary" 
              link
              :icon="Edit"
              @click.stop="handleEdit(project)"
            >
              {{ t('project.edit') }}
            </el-button>
            <el-button 
              type="danger" 
              link
              :icon="Delete"
              @click.stop="handleDelete(project)"
            >
              {{ t('project.delete') }}
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Create Project Dialog -->
    <el-dialog
      v-model="createDialogVisible"
      :title="t('project.createTitle')"
      width="600px"
      :close-on-click-modal="false"
      @close="resetCreateForm"
      class="create-dialog"
    >
      <el-form 
        :model="createForm" 
        :rules="rules" 
        ref="createFormRef"
        label-position="top"
        class="create-form"
      >
        <el-form-item :label="t('project.name')" prop="projectName">
          <el-input 
            v-model="createForm.projectName" 
            :placeholder="t('project.namePlaceholder')"
            size="large"
            clearable
          />
        </el-form-item>

        <el-form-item label="Input Mode">
          <el-segmented 
            v-model="useVoiceMode" 
            :options="inputModeOptions"
            size="large"
            block
          />
        </el-form-item>

        <!-- Text Input Mode -->
        <template v-if="!useVoiceMode">
          <el-form-item :label="t('project.content')" prop="storyContent">
            <el-input
              v-model="createForm.storyContent"
              type="textarea"
              :rows="8"
              :placeholder="t('project.contentPlaceholder')"
              show-word-limit
              maxlength="5000"
            />
          </el-form-item>
        </template>

        <!-- Voice Input Mode -->
        <template v-else>
          <el-tabs v-model="voiceInputTab" class="voice-tabs">
            <el-tab-pane label="Upload Audio" name="upload">
              <div class="upload-section">
                <el-upload
                  ref="uploadRef"
                  :auto-upload="false"
                  :limit="1"
                  accept="audio/*"
                  :on-change="onVoiceFileChange"
                  drag
                  class="audio-upload"
                >
                  <el-icon class="upload-icon"><Upload /></el-icon>
                  <div class="upload-text">
                    Drop audio file here or <em>click to upload</em>
                  </div>
                  <template #tip>
                    <div class="upload-tip">mp3, wav, m4a (max 10MB)</div>
                  </template>
                </el-upload>
                
                <el-button 
                  v-if="selectedVoiceFile"
                  type="primary" 
                  size="large"
                  :loading="uploadingVoice" 
                  @click="transcribeUploadedVoice"
                  :icon="DocumentChecked"
                  block
                  class="transcribe-button"
                >
                  Transcribe Audio
                </el-button>
              </div>
            </el-tab-pane>

            <el-tab-pane label="Record Audio" name="record">
              <div class="record-section">
                <div class="record-controls">
                  <el-button 
                    v-if="!recording"
                    type="primary" 
                    size="large"
                    :icon="Microphone"
                    @click="startRecording"
                    circle
                    class="record-button"
                  />
                  <el-button 
                    v-else
                    type="danger" 
                    size="large"
                    :icon="CircleClose"
                    @click="stopRecording"
                    circle
                    class="record-button recording"
                  />
                  
                  <div class="record-info">
                    <span class="record-status">
                      {{ recording ? 'Recording...' : 'Ready to record' }}
                    </span>
                    <span class="record-timer">{{ recordSecondsDisplay }}</span>
                    <span class="record-limit">Max: 2:00</span>
                  </div>
                </div>

                <el-button 
                  v-if="recordBlob"
                  type="primary" 
                  size="large"
                  :loading="uploadingVoice" 
                  @click="transcribeRecordedVoice"
                  :icon="DocumentChecked"
                  block
                  class="transcribe-button"
                >
                  Transcribe Recording
                </el-button>
              </div>
            </el-tab-pane>
          </el-tabs>

          <el-form-item label="Transcript" v-if="createForm.storyContent">
            <el-input 
              v-model="createForm.storyContent" 
              type="textarea" 
              :rows="8" 
              placeholder="Transcribed text will appear here..."
              show-word-limit
            />
          </el-form-item>
        </template>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button 
            size="large"
            @click="createDialogVisible = false"
          >
            {{ t('common.cancel') }}
          </el-button>
          <el-button 
            type="primary" 
            size="large"
            @click="handleCreate" 
            :loading="creating"
            :disabled="!isCreateFormValid"
          >
            {{ t('common.confirm') }}
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Loading dialog -->
    <el-dialog
      v-model="loadingDialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="600px"
    >
      <div class="loading-content">
        <div class="progress-section">
          <el-progress :percentage="progressPercentageRounded" :status="progressPercentageRounded === 100 ? 'success' : undefined" />
        </div>
        <div class="logs-container">
          <div v-for="(log, index) in fakeLogs" :key="index" class="log-item">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- Edit project dialog -->
    <el-dialog
      v-model="editDialogVisible"
      :title="t('project.editTitle')"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form :model="createForm" :rules="rules" ref="createFormRef">
        <el-form-item :label="t('project.name')" prop="projectName">
          <el-input v-model="createForm.projectName" :placeholder="t('project.namePlaceholder')" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">{{ t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleEditSubmit" :loading="editing">
            {{ t('common.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Edit, 
  Delete, 
  Plus, 
  Loading,
  Folder,
  Upload,
  Microphone,
  CircleClose,
  DocumentChecked
} from '@element-plus/icons-vue'
import projectApi from '@/api/project_api'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { chapterApi } from '@/api/chapter_api'
import { entityApi } from '@/api/entity_api'
import mediaApi from '@/api/media_api'
import { useGeneration } from '@/composables/useGeneration'
import { videoApi } from '@/api/video_api'

const { t } = useI18n()
const router = useRouter()

// State
const projects = ref<string[]>([])
const isLoading = ref(false)
const createDialogVisible = ref(false)
const editDialogVisible = ref(false)
const creating = ref(false)
const editing = ref(false)

// Form data
const useVoiceMode = ref(false)
const voiceInputTab = ref('upload')
const createForm = ref({
  projectName: '',
  storyContent: '',
})
const editForm = ref({
  projectName: '',
  oldName: ''
})

// Loading dialog
const loadingDialogVisible = ref(false)
const progressPercentage = ref(0)
const progressPercentageRounded = computed(() => Math.round(progressPercentage.value))
const fakeLogs = ref<Array<{ time: string; message: string }>>([])
const freezePoint = ref(0)
let progressInterval: number | null = null
let logInterval: number | null = null

// Voice recording
const recording = ref(false)
const recordSeconds = ref(0)
const recordSecondsDisplay = computed(() => {
  const m = Math.floor(recordSeconds.value / 60).toString().padStart(2, '0')
  const s = Math.floor(recordSeconds.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})
let recordTimer: number | null = null
let mediaRecorder: MediaRecorder | null = null
let audioChunks: BlobPart[] = []
const recordBlob = ref<Blob | null>(null)
const selectedVoiceFile = ref<File | null>(null)
const uploadingVoice = ref(false)

const { isGenerating, generationProgress, start, stop } = useGeneration();
const { 
  isGenerating: isGeneratingAudio, 
  generationProgress: audioGenerationProgress, 
  start: startAudioGeneration, 
  stop: stopAudioGeneration 
} = useGeneration();

// Form rules
const rules = {
  projectName: [
    { required: true, message: t('project.nameRequired'), trigger: 'blur' },
    { min: 2, max: 50, message: t('project.nameLength'), trigger: 'blur' }
  ],
  storyContent: [
    { required: true, message: t('project.storyRequired'), trigger: 'blur' },
    { min: 10, max: 4000, message: t('project.storyLength'), trigger: 'blur' }
  ]
}

const createFormRef = ref<FormInstance>()
const editFormRef = ref<FormInstance>()

// Computed
const inputModeOptions = [
  { label: 'Text Input', value: false },
  { label: 'Voice Input', value: true }
]

const isCreateFormValid = computed(() => {
  return createForm.value.projectName.trim().length >= 2 && 
         createForm.value.storyContent.trim().length >= 10
})

// Fake logs messages
const logMessages = [
  'Initializing project workspace...',
  'Loading AI models...',
  'Parsing story content...',
  'Analyzing narrative structure...',
  'Extracting characters...',
  'Building character profiles...',
  'Generating character descriptions...',
  'Processing scene data...',
  'Creating scene layout...',
  'Optimizing image prompts...',
  'Preparing generation pipeline...',
  'Allocating resources...',
  'Connecting to AI service...',
  'Processing request queue...',
  'Generating visual assets...',
  'Rendering character images...',
  'Processing scene backgrounds...',
  'Applying style transformations...',
  'Finalizing assets...',
  'Preparing output...'
]

// Get current time string
const getCurrentTime = () => {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour12: false })
}

// Start fake progress and logs
const startFakeProgress = () => {
  // Reset state
  progressPercentage.value = 0
  fakeLogs.value = []
  
  // Random freeze point between 30-80%
  freezePoint.value = Math.floor(Math.random() * 51) + 30
  
  // Progress bar animation
  progressInterval = window.setInterval(() => {
    if (progressPercentage.value < freezePoint.value) {
      progressPercentage.value += Math.random() * 3 + 1 // Random increment 1-4%
      if (progressPercentage.value > freezePoint.value) {
        progressPercentage.value = freezePoint.value
      }
    }
  }, 200)
  
  // Fake logs generation
  let logIndex = 0
  logInterval = window.setInterval(() => {
    if (logIndex < logMessages.length) {
      fakeLogs.value.push({
        time: getCurrentTime(),
        message: logMessages[logIndex]
      })
      logIndex++
      
      // Auto scroll to bottom
      setTimeout(() => {
        const logsContainer = document.querySelector('.logs-container')
        if (logsContainer) {
          logsContainer.scrollTop = logsContainer.scrollHeight
        }
      }, 50)
    }
  }, Math.random() * 800 + 400) // Random interval 400-1200ms
}

// Complete progress to 100%
const completeProgress = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  if (logInterval) {
    clearInterval(logInterval)
    logInterval = null
  }
  
  // Add final log
  fakeLogs.value.push({
    time: getCurrentTime(),
    message: '✓ Project created successfully!'
  })
  
  // Animate to 100%
  const finalInterval = setInterval(() => {
    if (progressPercentage.value < 100) {
      progressPercentage.value += 5
      if (progressPercentage.value >= 100) {
        progressPercentage.value = 100
        clearInterval(finalInterval)
      }
    }
  }, 50)
  
  // Auto scroll to bottom
  setTimeout(() => {
    const logsContainer = document.querySelector('.logs-container')
    if (logsContainer) {
      logsContainer.scrollTop = logsContainer.scrollHeight
    }
  }, 100)
}

// Reset progress state
const resetProgress = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  if (logInterval) {
    clearInterval(logInterval)
    logInterval = null
  }
  progressPercentage.value = 0
  fakeLogs.value = []
}

// Fetch project list
const fetchProjects = async () => {
  try {
    isLoading.value = true
    const data = await projectApi.getProjectList()
    projects.value = data
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    ElMessage.error(t('project.fetchError'))
  } finally {
    isLoading.value = false
  }
}

// Reset create form
const resetCreateForm = () => {
  createForm.value.projectName = ''
  createForm.value.storyContent = ''
  useVoiceMode.value = false
  voiceInputTab.value = 'upload'
  selectedVoiceFile.value = null
  recordBlob.value = null
  recordSeconds.value = 0
  uploadingVoice.value = false
  recording.value = false
  createFormRef.value?.clearValidate()
}

// Handle character generation
const handleCharacterGeneration = async (projectName: string) => {
  // extract characters from chapter1
  await chapterApi.extractCharacters(projectName, "chapter1")
  // create all characters
  const characterData = await entityApi.getCharacterList(projectName)
  
  const characterPrompts = characterData.characters
    .filter(e => e.attributes.description)
    .map(e => ({ id: e.name, prompt: e.attributes.description || '' }));
  
  // Generate character images
  await start(characterPrompts, () => mediaApi.generateImages({
    project_name: projectName,
    chapter_name: "Character", 
    imageSettings: {
      width: 512,
      height: 768,
      style: 'sai-anime'
    },
    prompts: characterPrompts
  }))
}

// Handle scene generation
const handleSceneGeneration = async (projectName: string) => {
  // Split chapter after character generation is complete
  await chapterApi.splitChapter(projectName, "chapter1")
  const sceneData = await entityApi.getSceneList(projectName)

  const sceneList = Object.entries(sceneData.scenes).map(([name, prompt]) => ({
    name,
    attributes: { description: prompt as string },
  }));

  // Only start scene generation after character generation is done
  const scenePrompts = sceneList
    .filter(e => e.attributes.description)
    .map(e => ({ id: e.name, prompt: e.attributes.description || '' }));
  
  while(isGenerating.value) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
  }

  await start(scenePrompts, () => mediaApi.generateImages({
    project_name: projectName,
    chapter_name: "Scene",
    imageSettings: {
      width: 512,
      height: 768,
      style: 'sai-anime'
    },
    prompts: scenePrompts
  }))
}

// Handle scene translation
const handleSceneTranslation = async (projectName: string) => {
  const sceneWithPrompt = await chapterApi.getChapterSceneList(projectName, "chapter1")
  // Get all scene descriptions to convert
  const descriptions = sceneWithPrompt.map(row => "[" + row.base_scene + "]," + row.scene)

  // Batch convert
  const translatedPrompts = await chapterApi.translatePrompt(projectName, descriptions)
  console.log("Translated: ", translatedPrompts);
  const scenesToSave = sceneWithPrompt.map((row:any, index:number) => ({
    id: index + 1,
    base_scene: row.base_scene,
    scene: row.scene,
    prompt: translatedPrompts[index] || ''
  }))
  await chapterApi.saveScenes(projectName, "chapter1", scenesToSave)
}

// Handle scene images generation
const handleSceneImagesGeneration = async (projectName: string) => {
  const input = await chapterApi.getChapterSceneList(projectName, "chapter1")
  const output = {
    project_name: projectName,
    chapter_name: "chapter1",
    imageSettings: {
      width: 512,
      height: 768,
      style: "sai-anime",
    },
    prompts: [],
    reference_image_infos: [],
  };

  // Helper function để lấy tên nhân vật từ scene
  function extractCharacters(scene) {
    const regex = /{(.*?)}/g;
    const matches = [...scene.matchAll(regex)].map((m) => m[1]);
    return matches;
  }

  // Tạo prompts và reference_image_infos
  input.forEach((item) => {
    // Thêm vào prompts
    output.prompts.push({
      id: item.id,
      prompt: item.prompt,
    });

    // Lấy nhân vật từ scene
    const characters = extractCharacters(item.scene);

    output.reference_image_infos.push({
      character1: characters[0] || "",
      character2: characters[1] || "",
      scene: item.base_scene,
    });
  });
  while(isGenerating.value) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
  }
  start(output.prompts, () => mediaApi.generateImages({
    project_name: projectName,
    chapter_name: "chapter1",
    imageSettings: {
      width: 512,
      height: 768,
      style: 'sai-anime'
    },
    prompts: output.prompts,
    reference_image_infos: output.reference_image_infos
  }))
  // Generate audio for each scene
  const audioPrompts = input.map(p => ({ id: p.id, prompt: p.content || '' }));
  startAudioGeneration(audioPrompts, () => mediaApi.generateAudio({
    project_name: projectName,
    chapter_name: "chapter1",
    prompts: audioPrompts,
    audioSettings: {
      rate: "+0%",
      voice: "vi-VN-HoaiMyNeural"
    }
  }))
}
// Create project
const handleCreate = async () => {
  if (!createFormRef.value) return
  
  await createFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        creating.value = true
        loadingDialogVisible.value = true // Hiển thị loading dialog
        startFakeProgress() // Bắt đầu fake progress và logs
        
        // Split story into chapters
        await projectApi.createProjectFullStory(createForm.value.projectName, createForm.value.storyContent)
        
        // Generate characters first
        await handleCharacterGeneration(createForm.value.projectName)

        // Then generate scenes
        await handleSceneGeneration(createForm.value.projectName)

        // Generate scene descriptions 
        await handleSceneTranslation(createForm.value.projectName)

        // Start generating scene images & audio in background (don't await)
        handleSceneImagesGeneration(createForm.value.projectName)
        
        // Complete progress bar và logs immediately
        completeProgress()
        
        // Đợi một chút để user thấy 100%
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        ElMessage.success(t('project.createSuccess') + ' - Images and audio are being generated in the background.')
        resetCreateForm()
        createDialogVisible.value = false
        await fetchProjects()
      } catch (error) {
        console.log(error)
        resetProgress() // Reset progress khi có lỗi
        ElMessage.error(t('project.createError'))
      } finally {
        creating.value = false
        loadingDialogVisible.value = false // Ẩn loading dialog
      }
    }
  })
}

// Show create dialog
const showCreateDialog = () => {
  createDialogVisible.value = true
}

// Voice upload handlers
const onVoiceFileChange = (file: any) => {
  // el-upload on-change callback receives file object
  if (file && file.raw) {
    selectedVoiceFile.value = file.raw
  }
}

const transcribeUploadedVoice = async () => {
  if (!selectedVoiceFile.value) return
  try {
    uploadingVoice.value = true
    // Step 1: Transcribe with Whisper
    const res = await (projectApi as any).transcribeVoice(selectedVoiceFile.value)
    const rawText = (res?.text) ?? res?.data?.text ?? ''
    
    // Step 2: Clean with LLM
    const cleanRes = await (projectApi as any).cleanTranscript(rawText)
    const cleanedText = (cleanRes?.text) ?? cleanRes?.data?.text ?? rawText
    
    // Show cleaned text
    createForm.value.storyContent = cleanedText
    ElMessage.success('Transcribed and cleaned successfully')
  } catch (e) {
    console.error(e)
    ElMessage.error(`Transcription failed: ${e.message || e}`)
  } finally {
    uploadingVoice.value = false
  }
}

// Mic recording (max 2 minutes)
const startRecording = async () => {
  if (recording.value) return
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)
    audioChunks = []
    mediaRecorder.ondataavailable = (ev) => {
      if (ev.data.size > 0) audioChunks.push(ev.data)
    }
    mediaRecorder.onstop = () => {
      recordBlob.value = new Blob(audioChunks, { type: 'audio/webm' })
      stream.getTracks().forEach(t => t.stop())
    }
    mediaRecorder.start()
    recording.value = true
    recordSeconds.value = 0
    recordTimer = window.setInterval(() => {
      recordSeconds.value += 1
      if (recordSeconds.value >= 120) {
        stopRecording()
      }
    }, 1000)
  } catch (e) {
    ElMessage.error('Cannot access microphone')
  }
}

const stopRecording = () => {
  if (!recording.value) return
  recording.value = false
  if (recordTimer) {
    clearInterval(recordTimer)
    recordTimer = null
  }
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
  }
}

const transcribeRecordedVoice = async () => {
  if (!recordBlob.value) return
  try {
    uploadingVoice.value = true
    const file = new File([recordBlob.value], 'record.webm', { type: 'audio/webm' })
    const res = await (projectApi as any).transcribeVoice(file)
    const text = (res?.text) ?? res?.data?.text ?? ''
    const cleanRes = await (projectApi as any).cleanTranscript(text)
    createForm.value.storyContent = (cleanRes?.text) ?? cleanRes?.data?.text ?? text
    ElMessage.success('Transcribed successfully')
  } catch (e) {
    ElMessage.error('Transcription failed')
  } finally {
    uploadingVoice.value = false
  }
}

// Edit project
const handleEdit = (projectName: string) => {
  editForm.value.projectName = projectName
  editForm.value.oldName = projectName
  editDialogVisible.value = true
}

// Submit edit
const handleEditSubmit = async () => {
  if (!editFormRef.value) return

  await editFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        editing.value = true
        await projectApi.updateProject(editForm.value.oldName, editForm.value.projectName)
        ElMessage.success(t('project.editSuccess'))
        editDialogVisible.value = false
        await fetchProjects()
      } catch (error) {
        ElMessage.error(t('project.editError'))
      } finally {
        editing.value = false
      }
    }
  })
}

// Handle card click
const handleCardClick = (projectName: string) => {
  router.push(`/project/${projectName}`)
}

// Delete project
const handleDelete = (projectName: string) => {
  ElMessageBox.confirm(
    t('project.deleteConfirm'),
    t('common.warning'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning',
    }
  ).then(async () => {
    try {
      await projectApi.deleteProject(projectName)
      ElMessage.success(t('project.deleteSuccess'))
      await fetchProjects()
    } catch (error) {
      ElMessage.error(t('project.deleteError'))
    }
  })
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
/* Container */
.project-container {
  min-height: 100vh;
  padding: 32px;
  background: var(--bg);
  position: relative;
}

.project-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, color-mix(in srgb, var(--accent) 5%, transparent) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, color-mix(in srgb, var(--accent-2) 5%, transparent) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.project-container > * {
  position: relative;
  z-index: 1;
}

/* Header */
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.project-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.create-button {
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border: none;
  color: var(--bg);
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent);
  transition: all 0.3s ease;
}

.create-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px color-mix(in srgb, var(--accent) 50%, transparent);
}

/* Loading & Empty States */
.loading-state {
  padding: 48px;
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 16px var(--shadow);
}

.empty-state {
  background: var(--surface);
  border-radius: 16px;
  padding: 48px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 16px var(--shadow);
}

/* Projects Grid */
.projects-grid {
  margin: 0 -12px;
}

.project-card {
  margin-bottom: 24px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: 0 4px 12px var(--shadow);
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--shadow);
  border-color: var(--accent);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--surface) 98%, var(--accent)),
    var(--surface)
  );
}

.project-icon {
  font-size: 24px;
  color: var(--accent);
}

.project-name {
  flex: 1;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

/* Dialog */
.create-dialog :deep(.el-dialog) {
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.create-form {
  padding: 8px 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Voice Input */
.voice-tabs {
  margin: 16px 0;
}

.upload-section,
.record-section {
  padding: 24px;
  background: #f5f7fa;
  border-radius: 12px;
  min-height: 200px;
}

.audio-upload {
  margin-bottom: 16px;
}

.upload-icon {
  font-size: 64px;
  color: var(--el-color-primary);
  margin-bottom: 16px;
}

.upload-text {
  font-size: 16px;
  color: #606266;
  margin-bottom: 8px;
}

.upload-text em {
  color: var(--el-color-primary);
  font-style: normal;
}

.upload-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

.transcribe-button {
  margin-top: 16px;
  font-size: 16px;
  padding: 12px 24px;
}

.record-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px 0;
}

.record-button {
  width: 80px;
  height: 80px;
  font-size: 32px;
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.3);
  transition: all 0.3s ease;
}

.record-button:hover {
  transform: scale(1.1);
}

.record-button.recording {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 16px rgba(245, 108, 108, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 24px rgba(245, 108, 108, 0.6);
  }
}

.record-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.record-status {
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.record-timer {
  font-size: 32px;
  font-weight: 600;
  color: var(--el-color-primary);
  font-family: 'Courier New', monospace;
}

.record-limit {
  font-size: 14px;
  color: #909399;
}

.loading-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.progress-section {
  width: 100%;
}

.logs-container {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: #1e1e1e;
  border-radius: 4px;
  padding: 15px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
}

.log-item {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  line-height: 1.6;
}

.log-time {
  color: #6c757d;
  flex-shrink: 0;
  font-weight: 500;
}

.log-message {
  color: #00d084;
  flex: 1;
}

/* Custom scrollbar for logs */
.logs-container::-webkit-scrollbar {
  width: 8px;
}

.logs-container::-webkit-scrollbar-track {
  background: #2d2d2d;
  border-radius: 4px;
}

.logs-container::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

.logs-container::-webkit-scrollbar-thumb:hover {
  background: #777;
}

.loading-icon {
  font-size: 48px;
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .project-container {
    padding: 16px;
  }

  .project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .project-title {
    font-size: 24px;
  }

  .create-button {
    width: 100%;
  }
}
</style>