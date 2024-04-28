<script setup lang="ts">
import ScrollPanel from 'primevue/scrollpanel'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Dialog from 'primevue/dialog'

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

//====================== 搜索 ======================
const searchVisible = ref(false)
const search = ref('')
const results = await searchContent(search)
</script>

<template>
  <div class="root">
    <div class="header">
      <Dialog v-model:visible="searchVisible" modal dismissableMask :style="{ top: '4rem', width: '35rem' }">
        <template #header>
          <FloatLabel>
            <InputText id="search-input" v-model="search" /><label for="search-input">空格分隔可更好的模糊匹配</label>
          </FloatLabel>
        </template>

        <p>搜索结果:</p>
        <Button
          v-if="results.length"
          v-for="item in results"
          :key="item.id"
          @click="
            () => {
              searchVisible = false
              $router.push(item.id)
            }
          "
        >
          {{ item.titles.join('->') }}->{{ item.title }}
        </Button>
        <p v-else>无</p>
        <p>源数据:</p>
        <pre>{{ results }} </pre>
      </Dialog>
      <Button icon="pi pi-search" label="搜索" @click="searchVisible = true"></Button>
      <ToggleButton v-model="lightTheme" onLabel="light" offLabel="dark"></ToggleButton>
    </div>
    <div class="container">
      <aside class="sider">
        <ContentNavigation></ContentNavigation>
      </aside>
      <ScrollPanel
        style="
          position: absolute;
          right: 0;
          width: calc(100% - var(--vp-sidebar-width-small));
          height: calc(100vh - 3rem);
        "
        :pt="{
          wrapper: {
            style: { 'border-right': '10px solid var(    --gray-300)' },
          },
          bary: 'hover:bg-primary-400 bg-primary-300 opacity-100',
        }"
      >
        <div class="ddd-doc">
          <slot></slot>
        </div>
      </ScrollPanel>
    </div>
  </div>
</template>

<style lang="scss">
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
</style>
<style scoped lang="scss">
.ddd-doc {
  -webkit-overflow-scrolling: touch;
}
.header {
  border-bottom: 1px solid var(--vt-c-divider-light);
  display: flex;
  height: 3rem;
  width: 100%;
  top: 0;
  position: relative;
}
.sider {
  border-right: 1px solid var(--vt-c-divider-light);
  position: fixed;
  top: calc(var(--vt-nav-height) + var(--vt-banner-height, 0px));
  z-index: 1;
  width: var(--vp-sidebar-width-small);
  height: calc(100vh - 3rem);
  max-width: 100%;
  opacity: 1;
  visibility: visible;
  box-shadow: none;
  transform: translate(0);
  transition:
    border-color 0.25s,
    background-color 0.25s;
  overflow-y: auto;
}
.ddd-doc {
  padding: 64px 64px 96px;
}
</style>
