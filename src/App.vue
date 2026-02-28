<script setup lang="ts">
import Header from './components/Header.vue'
import ThemeOnboarding from './components/ThemeOnboarding.vue'
import SeradielAssistant from './components/Seradiel/SeradielAssistant.vue'
</script>

<template>
  <ThemeOnboarding />
  <SeradielAssistant />
  <el-container class="app-container">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style>
.app-container {
  min-height: 100vh;
  background: var(--bg);
  transition: background 0.5s ease;
}

.el-header {
  padding: 0;
  height: 72px;
  background: var(--surface);
  box-shadow: 0 2px 12px var(--shadow);
  border-bottom: 1px solid var(--border);
  transition: all 0.3s ease;
}

.el-main {
  min-height: calc(100vh - 72px);
  width: 100%;
  padding: 0;
  background: var(--bg);
}
</style>
