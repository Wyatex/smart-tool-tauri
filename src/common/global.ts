import { type } from '@tauri-apps/api/os'

export let os = 'Windows_NT' as 'Linux' | 'Darwin' | 'Windows_NT'

export async function setOS() {
  const osType = await type()
  os = osType
}
