<script setup>
const slot = useSlots()
const el = ref(null)
const rendered = ref(false)
const mermaidState = useMermaid()

async function render() {
  if (!el.value) {
    return
  }
  if (el.value.querySelector('svg')) {
    // Already rendered
    return
  }

  // Iterate children to remove comments
  for (const child of el.value.childNodes) {
    if (child.nodeType === Node.COMMENT_NODE) {
      el.value.removeChild(child)
    }
  }

  el.value.classList.add('mermaid')
  rendered.value = true
  mermaidState.run(el.value)
}

onMounted(() => {
  render()
})
</script>

<template>
  <pre ref="el" :style="{ display: rendered ? 'block' : 'none' }">
    <slot></slot>
  </pre>
</template>

<style>
/* .mermaid rect {
  stroke: #6195ff !important;
  fill: #fff !important;
}

.mermaid .current-doc.node .label {
  color: #fff !important;
}

.mermaid line {
  stroke: #6195ff !important;
}

[data-theme='dark'] .mermaid .flowchart-link {
  stroke: #fff !important;
}

[data-theme='dark'] .mermaid .messageText {
  fill: #fff !important;
}

[data-theme='dark'] .mermaid marker {
  fill: #fff !important;
  color: #fff !important;
}

[data-theme='dark'] .mermaid line {
  stroke: #fff !important;
} */
</style>
