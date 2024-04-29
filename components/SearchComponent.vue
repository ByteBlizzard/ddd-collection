<script setup lang="ts">
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  mobile: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits({
  close: () => {},
})

const searchVisible = ref(props.show)
watch(searchVisible, (v) => {
  if (!v) {
    emits('close')
  }
})
watch(
  () => props.show,
  (v) => {
    searchVisible.value = v
  }
)

type SearchResult = {
  id: string
  score: number
  terms: string[]
  queryTerms: string[]
  match: {
    [key: string]: 'content' | 'title'[]
  }
  title: string
  content: string
  titles: string[]
}
type DisplayResults = {
  id: string
  title: string
  content: string
  children?: DisplayResults
}[]
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
function getFolderTitle(path: string): string {
  path = path.replace(/#.*$/, '')
  for (const item of navigation.value!) {
    if (/^\/[^\/]+\/.+$/.test(path) && path.startsWith(item._path + '/')) {
      return item.title
    } else if (path === item._path) {
      return item.title
    }
  }
  return ''
}
function put(container: DisplayResults, item: SearchResult) {
  const title = getFolderTitle(item.id)
  for (const exist of container) {
    if (exist.title === title) {
      if (!exist.children) {
        exist.children = []
      }
      exist.children.push({
        id: item.id,
        title,
        content: item.content,
      })
      return
    }
  }
  container.push({
    id: title,
    title,
    content: item.content,
    children: [
      {
        id: item.id,
        title: item.title,
        content: item.content,
      },
    ],
  })
}
const search = ref('')
const results: SearchResult[] = await searchContent(search)
const displayResults = ref<DisplayResults>([])
watch(results, (v) => {
  const t: DisplayResults = []
  v.forEach((item) => {
    put(t, item)
  })
  displayResults.value = t
})
</script>

<template>
  <Dialog
    id="search-dialog"
    v-model:visible="searchVisible"
    modal
    :show-header="mobile"
    dismissableMask
    :class="`doc-search ${mobile ? 'mobile' : ''}`"
    :style="{
      width: mobile ? '100vw' : '35rem',
      height: mobile ? '100vh' : 'auto',
      borderRadius: mobile ? '0' : '1rem',
    }"
  >
    <template #header>
      <FloatLabel style="width: 100%">
        <InputText id="search-input" style="width: 100%" v-model="search" /><label for="search-input"
          >空格分隔可更好地进行模糊匹配</label
        >
      </FloatLabel>
    </template>
    <br />
    <FloatLabel v-if="!mobile" style="width: 100%">
      <InputText id="search-input" style="width: 100%" v-model="search" /><label for="search-input"
        >空格分隔可更好地进行模糊匹配</label
      >
    </FloatLabel>
    <div v-if="displayResults.length">
      <div v-for="lvl1 in displayResults" :key="lvl1.title">
        <div class="doc-search-hit-source">{{ lvl1.title }}</div>
        <Button
          v-if="lvl1.children"
          v-for="lvl2 in lvl1.children"
          class="doc-search-item"
          severity="secondary"
          :key="lvl2.id"
          raised
          @click="
            () => {
              searchVisible = false
              $router.push(lvl2.id)
            }
          "
        >
          <div class="doc-search-item-block">
            <div v-if="lvl2.content" class="doc-search-item-content">{{ lvl2.content }}</div>
            <div class="doc-search-item-title">{{ lvl2.title }}</div>
          </div>
        </Button>
      </div>
    </div>
    <div class="doc-search-empty" v-else><p>没有搜索结果</p></div>
  </Dialog>
</template>

<style lang="scss">
#search-dialog .p-dialog-content {
  border-radius: 12px;
}
#search-dialog.mobile .p-dialog-content {
  margin-top: -44px;
}
.doc-search {
  top: 4rem;
  width: 35rem;
}
</style>
<style scoped lang="scss">
.doc-search {
  .doc-search-hit-source {
    color: var(--docsearch-highlight-color);
    font-size: 0.85em;
    font-weight: 600;
    line-height: 32px;
    margin: 0 -4px;
    padding: 8px 4px 0;
    position: sticky;
    top: 0;
    // z-index: 10;
  }
  .doc-search-item {
    width: 100%;
    margin-bottom: 4px;
    height: var(--docsearch-hit-height);
    .doc-search-item-block {
      width: 100%;
      text-align: left;
      color: var(--docsearch-hit-color);
    }
    .doc-search-item-title {
      font-size: 0.75em;
    }
    .doc-search-item-content {
      font-size: 0.9em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .doc-search-empty {
    margin: 0 auto;
    padding: 36px 0;
    color: var(--docsearch-muted-color);
    p {
      font-size: 0.9em;
      text-align: center;
    }
  }
}
</style>
