// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $auth: any;
    $form: any;
    listeners: any[];
    form: any;
    change: any;
  }
}

declare global {
  interface Window {
    Smallchat: any;
  }
}
