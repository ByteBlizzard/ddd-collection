<script setup lang="ts">
import { usePrimeVue } from 'primevue/config'
const PrimeVue = usePrimeVue()

//====================== 主题 ======================
const colorMode = useColorMode()
function updatePrimeVueTheme(theme: 'dark' | 'light') {
  if (theme === 'dark') {
    PrimeVue.changeTheme('aura-light-green', 'aura-dark-green', 'theme-link', () => {})
  } else {
    PrimeVue.changeTheme('aura-dark-green', 'aura-light-green', 'theme-link', () => {})
  }
}
const existColorMode = window.localStorage.getItem('config.colorMode') || 'light'
colorMode.preference = existColorMode
updatePrimeVueTheme(existColorMode as 'dark' | 'light')
watch(
  () => colorMode.preference,
  (n, o) => {
    if (n === o) {
      return
    }
    window.localStorage.setItem('config.colorMode', n)
    updatePrimeVueTheme(n as 'dark' | 'light')
  }
)
//====================== 布局 ======================
const layoutNameState = useLayoutName()
function onresize(ev?: Event) {
  const width = window.innerWidth
  /* if (width < 1024) {
    layoutNameState.value = 'mobile'
  } else  */ if (width < 1280) {
    layoutNameState.value = 'pad'
  } else {
    layoutNameState.value = 'pc'
  }
}
window.onresize = onresize
onresize()
</script>

<template>
  <NuxtLayout :name="layoutNameState">
    <NuxtPage />
  </NuxtLayout>
</template>
