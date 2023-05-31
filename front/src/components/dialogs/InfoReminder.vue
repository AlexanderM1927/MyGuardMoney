<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin barra">
        <div class="form">
            <div class="text-h6">Información del recordatorio<q-icon name="timelapse" /></div>
            <b>Nombre:</b> {{reminder.title}}<br>
            <b>Detalle:</b><br>
            {{reminder.description}}<br>
            <q-separator />
        </div>
        <q-card-actions align="right">
            <q-btn color="negative" label="Delete" @click="onDeleteClick" />
            <q-btn color="primary" label="OK" @click="onOKClick" />
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    // ...your custom props
    reminder: {}
  },
  created () {
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok', this.reminder)
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onDeleteClick () {
      // on Delete, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('cancel', this.reminder)
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>
<style scoped>
.form {
    padding: 10px;
}
.barra::-webkit-scrollbar {
    width: 8px;     /* Tamaño del scroll en vertical */
    height: 8px;    /* Tamaño del scroll en horizontal */
}
/* Ponemos un color de fondo y redondeamos las esquinas del thumb */
.barra::-webkit-scrollbar-thumb {
    background: #000;
    border-radius: 4px;
}
/* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
.barra::-webkit-scrollbar-thumb:hover {
    background: #000;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}
/* Cambiamos el fondo cuando esté en active */
.barra::-webkit-scrollbar-thumb:active {
    background-color: #000;
}
</style>
