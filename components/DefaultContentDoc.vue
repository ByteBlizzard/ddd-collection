<script setup lang="ts">
const route = useRoute()
onMounted(() => {
  if (route.hash) {
    const element = document.getElementById(route.hash.substring(1))
    if (element) {
      window.document.getElementsByClassName('ddd-doc')[0].scrollBy(0, element.offsetTop - 58)
    }
  }
})
</script>

<template>
  <main>
    <ContentDoc class="ddd-doc">
      <template #not-found>
        <p>
          资源未找到：<b>{{ $router.currentRoute.value.fullPath }}</b>
        </p>
        <p>请尝试使用搜索功能，而非修改url</p>
        <p>如果是从其他文档连接至本页面，请查看仓库中是否丢失了资源，或链接填写错误</p>
      </template>
      <template #empty>
        <p>文档为空</p>
      </template>
    </ContentDoc>
  </main>
</template>
