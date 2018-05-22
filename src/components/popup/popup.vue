<template>
    <div class="popup">
        <div class="popup-wrapper">
        </div>
        <div class="popup-body">
            <div class="popup-text"> {{getParams.text}} </div>
            <div v-if="type === 'addNew'" class="add-new-body">
                <User :editable="true" :item="item" :newUserForm="true" />
            </div>
            <div class="footer">
                <div class="cancel-btn" @click="$emit('popup-cancel')">{{getParams.cancelBtn}}</div>
                <div class="confirm-btn" @click="$emit('popup-approve', type, item)">{{getParams.confirmBtn}}</div>
            </div>
        </div>
    </div>
</template>

<script>

import myMixins from '../../mixins/mixins'
import User from '../user/user.vue'

export default {
  mixins: [myMixins],
  components: {
     User
  },
  name: 'popup',
  props: {
      type: String,
      statuses: Array
  }, 
  data() {
    return {
        text: '',
        confirmBtn: '',
        cancelBtn: '',
        item: { 
          emptyName: false,
          editable: false,
          isExpanded: false,
          status: 'non-active',
          timestamp: Date.now(),
          changed: false,
          personal: {
            name: '',
            phone: ''
          },
          notes: []
        }
    }
  },
  methods: {
  },
  computed: {
    getParams() {
        if(this.type === 'confirm') {
            return {
                text: 'Are you sure?',
                confirmBtn: 'Yes',
                cancelBtn: 'Cancel'
            };
        } else if(this.type === 'addNew') {
            return {
                text: 'Register new user',
                confirmBtn: 'Add',
                cancelBtn: 'Cancel'
            };
        }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./popup.scss";
</style>
