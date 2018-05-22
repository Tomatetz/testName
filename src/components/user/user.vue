<template>
    <div class="user-item-body" v-bind:class="{ allowEdit: editable, newUserForm: newUserForm }">
        <div class="name">
            <label v-bind:class="{ empty: item.emptyName }">Name:</label>
            <span class="value">
                <span class="non-editable">{{item.personal.name}}</span>
                <input class="editable" type="text" v-model="item.personal.name" placeholder="input name" @change="handleChange(item)"/>
            </span>
        </div>
        <div class="phone">
            <label>Phone number:</label>
            <span class="value">
                <span class="non-editable">{{item.personal.phone}}</span>
                <input class="editable" type="text" v-model="item.personal.phone" placeholder="input phone" @change="handleChange(item)"/>
            </span>
        </div>
        <div class="status">
            <label>Status:</label>
            <span class="non-editable">{{item.status}}</span>
            <div class="select-wrapper editable">
            <select v-model="item.status" @change="handleChange(item)">
                <option v-for="status in statuses" v-bind:key="status">{{status}}</option>
            </select>
            </div>
        </div>
        <div class="date">
            <label>Creation date:</label><span class="value" model="item.timestamp">{{item.timestamp | parseDate}}</span>
        </div>
        <div class="notes-area">
            <label>Notes: <span @click="addNote"><icon name="plus" class="add-note"></icon></span></label>
            <Note v-bind:notes="item.notes" @change="handleChange(item)"/>
        </div>
    </div>
</template>

<script>
import myMixins from '../../mixins/mixins'
import Note from './note.vue'

export default {
  mixins: [myMixins],
  components: {
    Note
  },
  name: 'user',
  props: {
    editable: Boolean,
    newUserForm: Boolean,
    item: Object
  }, 
  data() {
    return {
      statuses: [
        'prospective',
        'current',
        'non-active'
      ]
    }
  },
  methods: {
    addNote() {
      this.item.notes.unshift({ value: '' });
    },
    handleChange(item) {
      item.changed = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./user.scss";
</style>
