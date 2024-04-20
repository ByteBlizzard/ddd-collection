const { default: mermaid } = await import('mermaid')
const running = ref(false)
const queue = reactive<HTMLElement[]>([])
watch([running, queue], (v) => {
  if (v[0] || v[1].length === 0) {
    return
  }
  const el: HTMLElement = v[1].shift()!
  if (running.value) {
    return
  }
  running.value = true
  mermaid.run({ nodes: [el] }).then(() => {
    running.value = false
  })
})

function run(el: HTMLElement) {
  queue.push(el)
}

export default function useMermaid() {
  return {
    run,
  }
}
