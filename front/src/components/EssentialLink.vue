<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="goTo(link)"
    :class="`${view === link ? 'marked' : ''}`"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { functions } from '../functions'

export default {
  name: 'EssentialLink',
  mixins: [functions],
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    view: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.marked {
  background: white;
  color: black;
}
</style>
