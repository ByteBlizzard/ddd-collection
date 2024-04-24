<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb'
import Sidebar from 'primevue/sidebar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

//====================== 面包屑导航 ======================
const home = ref({
  icon: 'pi pi-home',
  route: '/',
})
const items = ref<any[]>([])
function updateRoute(r: RouteLocationNormalizedLoaded) {
  const breadItems: any[] = []
  let pre = ''
  let path = r.fullPath.replace(/^\//, '').replace(/\/$/, '')
  const paths = path.split('/')
  paths.forEach((item, index) => {
    if (item.includes('#')) {
      item = item.split('#')[0]
    }
    let route: string | undefined = pre + `/${item.replace(/\#.*/g, '')}`
    if (index === paths.length - 1) {
      route = undefined
    } else if (index === paths.length - 2) {
      route += '/'
    }
    breadItems.push({ label: item, route })
    pre = route!
  })
  items.value = breadItems
}
updateRoute(getRouter().currentRoute.value!)
watch(getRouter().currentRoute, (r) => {
  updateRoute(r)
})

//====================== 搜索 ======================
const searchVisible = ref(false)
const search = ref('')
const results = await searchContent(search)
</script>

<template>
  <div class="ddd-doc">
    <div class="header">
      <Sidebar v-model:visible="searchVisible" header="更多">
        <br />
        <FloatLabel>
          <InputText id="search-input" v-model="search" /><label for="search-input">空格分隔可更好的模糊匹配</label>
        </FloatLabel>
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
      </Sidebar>
      <Button icon="pi pi-search" @click="searchVisible = true" />
      <Breadcrumb :home="home" :model="items">
        <template #item="{ item, props }">
          <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </RouterLink>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-color">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.ddd-doc {
  -webkit-overflow-scrolling: touch;
}
.header {
  display: flex;
  height: 3rem;
  width: 100%;
  top: 0;
  position: relative;
}
.container {
  position: fixed;
  right: 0;
  padding: 0 64px 96px;
  width: 100%;
  /* padding-left: calc(100% - var(--vp-sidebar-width-small)); */
  max-height: calc(100vh - 3rem);
  overflow-y: scroll;
}
</style>
