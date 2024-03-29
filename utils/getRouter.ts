import type { Router } from 'vue-router'

export default function (): Router {
  return getCurrentInstance()?.appContext.config.globalProperties!.$router!
}
