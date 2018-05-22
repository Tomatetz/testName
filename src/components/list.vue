<template>
  <div class="hello">
    <ul class="users">
      <li class="sort-list">
        <div class="add-user" @click="addUser">
          <icon class="add-user-icon" name="plus-square"></icon>
          <div class="add-user-btn-mobile">Add new</div>
        </div>
        <div class="filter-name"><input type="text" v-model="search" placeholder="filter by name"/></div>
        <div class="by-name" @click="sortByName">name
          <icon class="sort-arrows" name="sort-alpha-down" v-if="sortName"></icon>
          <icon class="sort-arrows" name="sort-alpha-up" v-if="!sortName"></icon>
        </div>
        <div class="by-date"  @click="sortByTime">creation time
          <icon class="sort-arrows" name="sort-numeric-down" v-if="sortTime"></icon>
          <icon class="sort-arrows" name="sort-numeric-up" v-if="!sortTime"></icon>
        </div>
      </li>
      <li class="user" v-bind:class="{ expanded: item.isExpanded, changed: item.changed }"
      v-for="(item, index) in filteredItems" v-bind:key="item.uid" @click.self="item.isExpanded = !item.isExpanded">
        <div class="personal-name" @click.self="item.isExpanded = !item.isExpanded">{{ item.personal.name }}</div>
        <span @click="updateUser(item)" class="save"><icon name="save"></icon></span>
        <span class="show-user-details" @click="details(item)"><icon name="eye"></icon></span>
        <span class="edit-user" @click="item.editable = !item.editable, item.isExpanded = true"><icon name="edit"></icon></span>
        <span class="remove-user" @click="removeUser(item, index)"><icon name="trash-alt"></icon></span>
        <div class="info">
          <div class="info-wrapper">
            <div class="main-info">
              <User :editable="item.editable" :item="item" />
            </div> 
          </div>
        </div>
      </li>
    </ul>
    <Popup v-if="showPopup" :type="popupType" v-on:popup-cancel="showPopup=false" v-on:popup-approve="approvePopup" :statuses="statuses"/>
  </div>
</template>

<script>
import axios from 'axios';
import myMixins from '../mixins/mixins';

import User from './user/user.vue';
import Note from './user/note.vue';
import Popup from './popup/popup.vue';
export default {
  name: 'list',
  mixins: [myMixins],
  components: {
    User,
    Note,
    Popup
  },
  methods: {
    details (user) {
      this.$router.push({
        name: 'user',
        params: { id: user.id }
      })
    },
    prepareToSave(item, generateId) {
      var output = Object.assign({}, item);
      output.isExpanded = false;
      output.emptyName = false;
      output.changed = false;
      output.editable = false;
      if (generateId) { output.id = this.items.length && (this.items[this.items.length - 1].id + 1) || 1}
      return output;
    },
    removeUser(item, index) {
      this.popupType = 'confirm';
      this.popupItem = index;
      this.itemToRemove = item;
      this.showPopup = true;
    },
    updateUser(item) {
      item.changed = false;
      item.editable = false;
      axios.put('http://localhost:8081/' + item.id, this.prepareToSave(item));
    },
    approvePopup(type, item) {
      if (type === 'confirm') {
        axios.delete('http://localhost:8081/' + this.itemToRemove.id)
            .then(() => {
              this.$delete(this.items, this.popupItem);
              this.showPopup = false;
            })
            .catch(function (error) {
              console.log(error);
            });
        this.showPopup = false;
      } else if (type === 'addNew') {
        if (item.personal.name) {
          axios.post('http://localhost:8081/', this.prepareToSave(item, true))
            .then(function (response) {
              response.data.isExpanded = true;
              this.items.unshift(response.data);
              this.showPopup = false;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        } else {
          item.emptyName = true;
        }
      }
    },
    sortByName() {
      this.sortName = !this.sortName;
      return this.sortName ? this.items.sort((a, b) => a.personal.name > b.personal.name ) : this.items.sort((a, b) => a.personal.name < b.personal.name );
    },
    sortByTime() {
      this.sortTime = !this.sortTime;
      return this.sortTime ? this.items.sort((a, b) => a.timestamp > b.timestamp ) : this.items.sort((a, b) => a.timestamp < b.timestamp );
    },
    addUser() {
      this.popupType = 'addNew';
      this.showPopup = true;
    }
  },
  computed: {
    filteredItems() {
      return this.items && this.items.filter((item) => {return item.personal.name.toLowerCase().match(this.search.toLowerCase())});
    }
  },
  created: function(){
    axios.get('http://localhost:8081/list')
    .then(function (response) {
      this.items = response.data;
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  },
  data() {
    return {
      sortName: false,
      sortTime: false,
      popupType: 'confirm',
      showPopup: false,
      popupItem: false,
      itemToRemove: {},
      search: '',
      items: [],
      statuses: [
        'prospective',
        'current',
        'non-active'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./list.scss";
</style>
