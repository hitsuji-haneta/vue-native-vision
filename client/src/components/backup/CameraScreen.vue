<template>
  <view class="container">
    <camera class="camera" :type="this.type" ref="camera" />
    <view class="wrapper">
      <text class="text">hello, world!</text>
      <touchable-opacity :on-press="takePicture" class="touchable">
        <material-icons name="camera" :size="70" />
      </touchable-opacity>
    </view>
  </view>
</template>

<script>
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Toast } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as fetch from "node-fetch";
import { db, storage } from "../plugins/db";

export default {
  data: function() {
    return {
      hasCameraPermission: false,
      type: Camera.Constants.Type.back
    };
  },
  mounted: async function() {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      hasCameraPermission = status === "granted";
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    takePicture: async function() {
      try {
        const pictureData = await this.$refs.camera.takePictureAsync();
        if (!pictureData.cancelled) {
          const uri = pictureData.uri;
          const myRequest = new Request(uri);
          console.log('uri: ', uri);
          const response = await fetch(myRequest);
          console.log('check2');
          const blob = await response.blob();
          console.log('check3');
          const ref = storage.ref().child("test");
          console.log('check4');
          ref.put(blob);

          Toast.show({
            text: "Success",
            buttonText: "OK",
            duration: 2000
          });
          console.log("Took a pictuer! : ", uri);
        }
      } catch (err) {
        console.log(JSON.stringify(err));
        Toast.show({
          text: JSON.stringify(err),
          buttonText: "OK",
          duration: 2000
        });
      }
    }
  },
  components: {
    Camera,
    MaterialIcons
  }
};
</script>

<style scoped>
.container {
  background-color: white;
  flex: 1;
}
.camera {
  flex: 3;
  background-color: transparent;
}
.wrapper {
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: gainsboro;
}
.text {
  flex: 1;
  font-size: 40;
  margin: 10;
}
.touchable {
  flex: 1;
  align-items: center;
  align-self: center;
}
</style>
