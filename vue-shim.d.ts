import Vue from 'vue'

  declare module '*.vue' {
    export default Vue
  }

  /* This file simply imports the needed types from firebase and forwards them */
  declare module 'vue/types/vue' {
    interface Vue {
      $L: any
    }
  }
