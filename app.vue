<script setup lang="ts">
//====================== 主题 ======================
const colorMode = useColorMode()
const existColorMode = window.localStorage.getItem('config.colorMode') || 'light'
colorMode.preference = existColorMode
watch(
  () => colorMode.preference,
  (n, o) => {
    if (n === o) {
      return
    }
    window.localStorage.setItem('config.colorMode', n)
  }
)
//====================== 布局 ======================
const layoutName = ref<'pc' | 'mobile'>()
function onresize(ev?: Event) {
  if (window.innerWidth < 1024) {
    layoutName.value = 'mobile'
  } else {
    layoutName.value = 'pc'
  }
}
window.onresize = onresize
onresize()
</script>

<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>
</template>
