<template>
  <div class="fixed flex flex-col bottom-8 right-4">
    <n-tooltip placement="top-end" trigger="hover">
      <template #trigger>
        <n-button class="mb-2" circle size="large" @click="handleExport">
          <template #icon>
            <n-icon>
              <i-line-md-upload-outline-loop />
            </n-icon>
          </template>
        </n-button>
      </template>
      导出到文件
    </n-tooltip>
    <n-tooltip placement="top-end" trigger="hover">
      <template #trigger>
        <n-button class="mb-2" circle size="large" @click="handleImport">
          <template #icon>
            <n-icon>
              <i-line-md-download-outline-loop />
            </n-icon>
          </template>
        </n-button>
      </template>
      从文件导入
    </n-tooltip>
    <n-tooltip placement="top-end" trigger="hover">
      <template #trigger>
        <n-button class="mb-2" circle size="large" @click="clearAll">
          <template #icon>
            <n-icon>
              <i-carbon-clean />
            </n-icon>
          </template>
        </n-button>
      </template>
      清除所有数据
    </n-tooltip>
    <n-tooltip placement="top-end" trigger="hover">
      <template #trigger>
        <n-button class="mb-2" circle size="large" @click="handleAddCate">
          <template #icon>
            <n-icon>
              <i-carbon-category-new />
            </n-icon>
          </template>
        </n-button>
      </template>
      添加一个分类
    </n-tooltip>
    <n-tooltip placement="top-end" trigger="hover">
      <template #trigger>
        <n-button class="mb-2" circle size="large" @click="themeSwitch">
          <template #icon>
            <n-icon>
              <i-line-md-sunny-outline-loop v-if="!store.darkTheme" />
              <i-line-md-moon v-else />
            </n-icon>
          </template>
        </n-button>
      </template>
      {{ store.darkTheme ? '切换到浅色模式' : '切换到深色模式' }}
    </n-tooltip>
    <n-tooltip placement="top-end" trigger="hover">
      <template #trigger>
        <n-button
          class="mb-2"
          circle
          size="large"
          @click="store.screenLocked = true"
        >
          <template #icon>
            <n-icon>
              <i-material-symbols-lock-outline />
            </n-icon>
          </template>
        </n-button>
      </template>
      锁屏
    </n-tooltip>
    <n-tooltip placement="top-end" trigger="hover">
      <template #trigger>
        <n-button
          class="mb-2"
          circle
          size="large"
          @click="store.fullscreen = !store.fullscreen"
        >
          <template #icon>
            <n-icon>
              <i-material-symbols-fullscreen-rounded v-if="!store.fullscreen" />
              <i-material-symbols-fullscreen-exit-rounded v-else />
            </n-icon>
          </template>
        </n-button>
      </template>
      {{ store.fullscreen ? '退出全屏' : '全屏' }}
    </n-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '../store'
import { writeTextFile, readTextFile } from '@tauri-apps/api/fs'
import { open, save } from '@tauri-apps/api/dialog'

const handleExport = async (data: string) => {
  const selete = await save({
    filters: [
      {
        name: 'backup',
        extensions: ['json'],
      },
    ],
  })
  if (selete) {
    await writeTextFile(selete, data)
    window.$notification.success({
      title: '导出成功',
      duration: 3000,
    })
  } else {
    window.$notification.info({
      title: '取消导出',
      duration: 3000,
    })
  }
}
const handleImport = async () => {
  const selete = await open({
    filters: [
      {
        name: 'backup',
        extensions: ['json'],
      },
    ],
  })
  if (selete) {
    try {
      const data = await readTextFile(selete as string)
      store.data = JSON.parse(data)
      window.$notification.success({
        title: '导入成功',
        duration: 3000,
      })
    } catch (e) {
      window.$notification.error({
        title: '数据异常',
        content: '原因：' + e,
      })
    }
    return 
  } else {
    window.$notification.info({
      title: '取消导入',
      duration: 3000,
    })
  }
}

const store = useStore()
const handleAddCate = () => {
  store.cateModal.title = '添加分类'
  store.cateModal.label = ''
  store.cateModal.prevLabel = ''
  store.cateModal.isShow = true
}
const themeSwitch = () => {
  store.darkTheme = !store.darkTheme
  window.$loading.start()
  setTimeout(() => {
    window.$loading.finish()
  }, 100)
}
const clearAll = () => {
  window.$dialog.warning({
    title: '警告',
    content: '确定删除所有数据？建议先点击上方按钮导出备份',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      store.data = []
      window.$notification.success({
        title: '清空成功',
        duration: 3000,
      })
    },
  })
}
</script>
