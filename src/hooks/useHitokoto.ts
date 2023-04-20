import { ref, onMounted, onUnmounted } from 'vue'
import { fetch } from '@tauri-apps/api/http';

/**
 * @description 获取本地时间
 */
export function useHitokoto() {
  let timer: number
  const word = ref('')
  const from = ref('')
  const fromWho = ref('')

  // 更新时间
  const updateWord = async () => {
    const res = await fetch<{hitokoto:string, from: string, from_who:string}>('https://v1.hitokoto.cn/?encode=json')
    if (res.status === 200) {
      word.value = res.data.hitokoto
      from.value = res.data.from
      fromWho.value = res.data.from_who
    }
  }

  updateWord()

  onMounted(() => {
    clearInterval(timer)
    timer = setInterval(() => updateWord(), 7000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return {
    word,
    from,
    fromWho,
  }
}
