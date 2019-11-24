<template>
  <view class="container">
    <app-loading v-if="!isAppReady"></app-loading>
    <app v-if="isAppReady"></app>
  </view>
</template>

<script>
import Vue from "vue-native-core";
import { AsyncStorage } from "react-native";
import { VueNativeBase } from "native-base";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import uuid from "uuid/v4";
import { firestorePlugin } from "vuefire";
import App from "./App.vue";
import store from "./store";

Vue.use(VueNativeBase);
Vue.use(firestorePlugin);

export default {
  components: { App, AppLoading },
  data() {
    return {
      isAppReady: false
    };
  },
  created() {
    try {
      this.isAppReady = false;
      // this.loadFonts();
      this.getUserId();
      this.isAppReady = true;
    } catch (err) {
      console.error(error);
      this.isAppReady = true;
    }
  },
  methods: {
    // async loadFonts() {
    //   await Font.loadAsync({
    //     Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
    //     Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
    //     Ionicons: require("../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf")
    //   });
    // },
    async getUserId() {
      let userId = await AsyncStorage.getItem("vueNativeVisionId");
      if (!userId) {
        userId = uuid();
        console.log("Make new userId:", userId);
        await AsyncStorage.setItem("vueNativeVisionId", userId);
      }
      store.commit("setUserId", userId);
      console.log(userId);
    }
  }
};
</script>

<style>
.container {
  flex: 1;
}
</style>