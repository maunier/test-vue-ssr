<template>
  <div>
    <p>i am c1</p>
    <c2></c2>
  </div>
</template>

<script>
import { fn } from '@@/utils/fn'

const c2 = () => import('@/pages/c2.vue')

export default {
  layout: false,
  components: {
    c2
  },
  created () {
    console.log('i am c1')
  }
}
</script>
