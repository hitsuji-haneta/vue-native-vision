<template>
  <root>
    <view class="container">
      <camera class="camera" :type="this.type" ref="camera">
        <view class="wrapper">
          <touchable-opacity :on-press="takePicture" class="touchable">
            <material-icons
              name="camera"
              :size="70"
            />
          </touchable-opacity>
        </view>
      </camera>
    </view>
  </root>
</template>

<script>
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Root, Toast } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

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
      const pictureData = await this.$refs.camera.takePictureAsync();
      Toast.show({
        text: "Success",
        buttonText: "Okay",
        duration: 2000
      });
      console.log("Took a pictuer! : ", pictureData.uri);
    }
  },
  components: {
    Camera,
    MaterialIcons,
    Root
  }
};
</script>

<style>
.container {
  background-color: white;
  /* justify-content: center; */
  flex: 1;
}
.camera {
  flex: 1;
}
.wrapper {
  background-color: transparent;
  flex-direction: row;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
.touchable {
  flex: 1;
  align-items: center;
  align-self: flex-end;
  margin-bottom: 50;
}
.button {
  color: white;
  background-color: blue;
}
</style>
