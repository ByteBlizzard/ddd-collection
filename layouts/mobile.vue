<script setup lang="ts">
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import Sidebar from 'primevue/sidebar'

//====================== 主题 ======================
const colorMode = useColorMode()
const lightTheme = ref(colorMode.value === 'light')
watch(lightTheme, (v) => {
  if (v) {
    colorMode.preference = 'light'
  } else {
    colorMode.preference = 'dark'
  }
})

//====================== 导航 ======================
const navVisible = ref(false)

//====================== 搜索 ======================
const searchVisible = ref(false)

//====================== toc ======================
const tocVisible = useTocVisible()
</script>

<template>
  <div class="root">
    <div class="header">
      <SearchComponent mobile :show="searchVisible" @close="searchVisible = false"></SearchComponent>
      <Button
        icon="pi pi-align-center"
        style="height: 3rem"
        severity="secondary"
        label="菜单"
        @click="navVisible = true"
      ></Button>
      <Button icon="pi pi-search" style="height: 3rem" @click="searchVisible = true"></Button>
      <ToggleButton style="height: 3rem" v-model="lightTheme" onLabel="light" offLabel="dark"></ToggleButton>
      <Button
        icon="pi pi-align-center"
        style="height: 3rem; float: right"
        severity="secondary"
        label="本页目录"
        @click="tocVisible = true"
      ></Button>
    </div>
    <div class="container">
      <Sidebar v-model:visible="navVisible">
        <aside class="sider">
          <ContentNavigation @click="navVisible = false"></ContentNavigation>
        </aside>
      </Sidebar>
      <div class="ddd-doc">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ddd-doc pre.shiki {
  margin: 14px -24px;
  border-radius: unset;
}
.ddd-doc {
  -webkit-overflow-scrolling: touch;
}
.header {
  height: 3rem;
  width: 100%;
  top: 0;
  position: relative;
}
.sider {
  li a {
    line-height: 20px;
    font-size: 13px;
    color: var(--vt-c-text-2);
    transition: color 0.25s;
    text-decoration: none;
  }
  ul {
    font-weight: bold;
    padding-left: 1rem;
    list-style-type: none;
  }
  ul[data-level] {
    font-weight: normal;
    padding-left: 2rem;
    list-style-type: decimal;
  }
  ul[data-level] :hover {
    color: var(--vt-c-text-1);
  }
  li {
    padding: 4px 0;
  }
}
.container {
  position: fixed;
  right: 0;
  padding: 32px 24px 96px;
  width: 100%;
  /* padding-left: calc(100% - var(--vp-sidebar-width-small)); */
  max-height: calc(100vh - 3rem);
  overflow-y: scroll;
}
</style>
<style scoped lang="scss">
.sider {
  top: calc(var(--vt-nav-height) + var(--vt-banner-height, 0px));
  z-index: 1;
  height: 100%;
  opacity: 1;
  visibility: visible;
  box-shadow: none;
  transform: translate(0);
  transition:
    border-color 0.25s,
    background-color 0.25s;
  overflow-y: auto;
}
</style>
