<template>
  <q-input v-model="fecha" @keyup.enter="enterEventEmit()" color="green" label="Fecha y hora" required :rules="[val => !!val || 'Tienes que llenar este campo']" @input="handleInput">
    <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="fecha"  @input="handleInput" mask="YYYY-MM-DD HH:mm" />
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="fecha"  @input="handleInput" mask="YYYY-MM-DD HH:mm" format24h />
          </q-popup-proxy>
        </q-icon>
    </template>
  </q-input>
</template>

<script>

export default {
  name: 'DateComponent',
  props: ['value', 'enterEventParams'],
  data () {
    return {
      fecha: this.value
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', this.fecha)
    },
    enterEventEmit () {
      if (this.enterEventParams) {
        this.$emit('enterEvent', this.enterEventParams.scope, this.enterEventParams.row, this.enterEventParams.field)
      }
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
