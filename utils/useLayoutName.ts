const layoutName = ref<'pc' | 'pad' | 'mobile'>()

export default function useLayoutName() {
  return layoutName
}
