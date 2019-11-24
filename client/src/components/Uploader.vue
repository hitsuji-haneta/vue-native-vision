<template>
  <view class="container">
    <touchable-opacity :on-press="()=>chooseImage('camera')" class="touchable">
      <font-awesome name="camera" :size="70" />
    </touchable-opacity>
    <touchable-opacity :on-press="()=>chooseImage('lib')" class="touchable">
      <font-awesome name="folder-open" :size="70" />
    </touchable-opacity>
  </view>
</template>

<script>
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { storage } from "../lib/db";

export default {
  data: function() {
    return {
      hasCameraPermission: false
    };
  },
  mounted: async function() {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      hasCameraPermission = status === "granted";
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    chooseImage: async function(type) {
      try {
        if (!hasCameraPermission) throw Error("カメラ利用の許可が必要です");
        const image =
          type === "camera"
            ? await ImagePicker.launchCameraAsync()
            : await ImagePicker.launchImageLibraryAsync();
        console.log(image);
        if (!image.cancelled) {
          const uri = image.uri;
          const response = await fetch(uri);
          const blob = await response.blob();
          const ref = storage.ref().child("test");
          await ref.put(blob);

          // Toast.show({
          //   text: "Success",
          //   buttonText: "OK",
          //   duration: 2000
          // });
          console.log("Took a pictuer! : ", uri);
          alert("success");
        }
      } catch (err) {
        console.log(err);
        alert(JSON.stringify(err));
        // throw Error(err);
        // Toast.show({
        //   text: JSON.stringify(err),
        //   buttonText: "OK",
        //   duration: 2000
        // });
      }
    }
  },
  components: {
    FontAwesome
  }
};
</script>

<style scoped>
.container {
  background-color: white;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.touchable {
  flex: 1;
  align-items: center;
  justify-content: center;
  align-self: center;
}
</style>
