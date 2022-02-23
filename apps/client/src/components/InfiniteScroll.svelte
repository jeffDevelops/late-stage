<script lang="ts">
  import { onDestroy, createEventDispatcher } from 'svelte'

  export let threshold = 0
  export let horizontal = false
  export let hasMore = true

  const dispatch = createEventDispatcher()
  let isLoadMore = false
  let scrollDetectionNode

  $: {
    if (scrollDetectionNode) {
      const element = scrollDetectionNode.parentNode

      element.addEventListener('scroll', onScroll)
      element.addEventListener('resize', onScroll)
    }
  }

  const onScroll = (e) => {
    const element = e.target

    const offset = horizontal
      ? element.scrollWidth - element.clientWidth - element.scrollLeft
      : element.scrollHeight - element.clientHeight - element.scrollTop

    if (offset <= threshold) {
      if (!isLoadMore && !hasMore) {
        dispatch('loadMore')
      }
      isLoadMore = true
    } else {
      isLoadMore = false
    }
  }

  onDestroy(() => {
    if (scrollDetectionNode) {
      const element = scrollDetectionNode.parentNode

      element.removeEventListener('scroll', null)
      element.removeEventListener('resize', null)
    }
  })
</script>

<div id="infinite-scroll" bind:this={scrollDetectionNode} style="width:0px" />
