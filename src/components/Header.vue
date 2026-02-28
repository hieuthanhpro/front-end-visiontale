<script setup lang="ts">
import { Setting, Notebook } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { Language } from '../locales'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

const { t, locale } = useI18n()

// Language switch, true for English, false for Chinese
const isEnglish = ref(locale.value === 'en-US')

const handleLanguageChange = (value: boolean) => {
  const lang = value ? 'en-US' : 'zh-CN'
  locale.value = lang as Language
  ElMessage.success(t('common.languageChanged'))
}
</script>

<template>
  <div class="header-content">
    <router-link to="/" style="text-decoration: none;">
      <div class="logo">{{ t('header.logo') }}</div>
    </router-link>
    <div class="right-section">
      <ThemeSwitcher />
      <div class="lang-switch">
        <span class="lang-label">Vietnamese</span>
        <el-switch
          v-model="isEnglish"
          @change="handleLanguageChange"
          inline-prompt
          style="--el-switch-on-color: #409EFF"
        />
        <span class="lang-label">English</span>
      </div>
      <router-link to="/prompt-styler" style="text-decoration: none;">
        <el-button type="primary" class="settings-btn">
          <el-icon class="el-icon--left"><Notebook /></el-icon>
          {{ t('promptStyler.title') }}
        </el-button>
      </router-link>
      <router-link to="/setting" style="text-decoration: none;">
        <el-button type="primary" class="settings-btn">
          <el-icon class="el-icon--left"><Setting /></el-icon>
          {{ t('common.settings') }}
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 72px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 8px var(--shadow);
  transition: all 0.3s ease;

  .logo {
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
    transition: all 0.3s ease;
  }

  .logo:hover {
    transform: scale(1.05);
  }

  .right-section {
    display: flex;
    align-items: center;
    gap: 16px;

    .lang-switch {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 24px;
      transition: all 0.3s ease;

      .lang-label {
        font-size: 13px;
        font-weight: 500;
        color: var(--subtext);
        transition: color 0.3s ease;
      }
    }

    .lang-switch:hover {
      border-color: var(--accent);
      box-shadow: 0 2px 8px color-mix(in srgb, var(--accent) 20%, transparent);
    }

    .settings-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 100px;
      background: var(--muted);
      border: 1px solid var(--border);
      color: var(--text);
      transition: all 0.3s ease;
    }

    .settings-btn:hover {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--bg);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent);
    }
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
    height: 64px;

    .logo {
      font-size: 20px;
    }

    .right-section {
      gap: 8px;

      .lang-switch .lang-label {
        display: none;
      }
    }
  }
}
</style>