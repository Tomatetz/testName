<template>
    <div class="notes-wrapper">
        <ul class="notes">
             <li class="note" v-for="(note, index) in notes" v-bind:key="note.id">
                <div class="note-menu">
                    <div class="menu-item" @click="actions(note, index)">
                        <icon name="times"></icon>
                    </div>
                </div>
                <div class="note-body">
                    <textarea v-model="note.value" @keyup="noteChange(note, $event)"></textarea>
                </div>
             </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'note',
  props: {
    notes: Array
  }, 
  data() {
    return {
    }
  },
  methods: {
    noteChange(note, event) {

        event.key.indexOf('Arrow') === -1 && this.$emit('change', note);
    },
    actions(note, index) {

        this.$emit('change', note);
        this.$delete(this.notes, index);
    }
  },
  computed: {
  },
  filters: {
  }
}
</script>

<style lang="scss" scoped>
    @import "./note.scss";
</style>
