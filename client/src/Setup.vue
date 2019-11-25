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
import { AppLoading, Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as Font from "expo-font";
import uuid from "uuid/v4";
import { firestorePlugin } from "vuefire";
import App from "./App.vue";
import store from "./store";
import { db } from "./lib/db";

Vue.use(VueNativeBase);
Vue.use(firestorePlugin);

export default {
  components: { App, AppLoading },
  data: function() {
    return {
      isAppReady: false
    };
  },
  created: function() {
    try {
      this.isAppReady = false;
      this.loadFonts();
      this.getUserId();
      this.isAppReady = true;
    } catch (err) {
      console.error(error);
      this.isAppReady = true;
    }
  },
  methods: {
    async loadFonts() {
      await Font.loadAsync({
        Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf")
      });
    },
    getUserId: async function() {
      let userId = await AsyncStorage.getItem("vueNativeVisionId");
      if (!userId) {
        userId = uuid();
        console.log("Make new userId:", userId);
        await AsyncStorage.setItem("vueNativeVisionId", userId);
        await this.registerForPushNotifications(userId);
      }
      store.commit("setUserId", userId);
      console.log(userId);
    },
    registerForPushNotifications: async function(userId) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      if (finalStatus === "granted") {
        const token = await Notifications.getExpoPushTokenAsync();
        await db
          .collection("pushToken")
          .doc(userId)
          .set({ userId, token });
        console.log("pushToken saved: ", token);
      }
    }
  }
};
</script>

<style>
.container {
  flex: 1;
}
</style>