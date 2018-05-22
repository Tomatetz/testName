<template>
  <div>
    <User :item="item" :editable="true" />
    <Popup v-if="showPopup" :type="popupType" v-on:popup-cancel="showPopup=false" v-on:popup-approve="approvePopup" :statuses="statuses"/>
    <div class="user-actions">
        <div class="nav-back" @click="$router.push({name: 'core'})">Back</div>
        <div class="save-user" @click="updateUser">Save</div>
        <div class="delete-user" @click="removeUser">Delete</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import myMixins from '../mixins/mixins';

import User from './user/user.vue';
import Note from './user/note.vue';
import Popup from './popup/popup.vue';
export default {
  name: 'singleUser',
  mixins: [myMixins],
  components: {
    User,
    Note,
    Popup
  },
  methods: {
    prepareToSave(item, generateId) {
      var output = Object.assign({}, item);
      output.isExpanded = false;
      output.emptyName = false;
      output.changed = false;
      output.editable = false;
      if (generateId) { output.id = this.items.length && (this.items[this.items.length - 1].id + 1) || 1}
      return output;
    },
    removeUser() {
      this.showPopup = true;
    },
    updateUser() {
      axios.put('http://localhost:8081/' + this.item.id, this.prepareToSave(this.item));
    },
    approvePopup() {
        axios.delete('http://localhost:8081/' + this.item.id)
            .then(() => {
              this.showPopup = false;
                this.$router.push({name: 'core'});
            })
            .catch(function (error) {
              console.log(error);
            });
        this.showPopup = false;
    }
  },
  created: function(){
    axios.get('http://localhost:8081/' + this.$route.params.id)
    .then(function (response) {
      this.item = response.data[0];
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  },
  data() {
    return {
      item: {
          personal: {
              name: '',
              phone: ''
          }
      },
      popupType: 'confirm',
      showPopup: false,
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
    @import "./singleUser.scss";
</style>
