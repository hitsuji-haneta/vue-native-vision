<template>
  <view class="container">
    <camera class="camera" :type="this.type"/>
  </view>
</template>

<script>
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default {
  data: function() {
    return {
      hasCameraPermission: false,
      type: Camera.Constants.Type.back,
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
  components: { Camera }
}
</script>

<style>
.container {
  background-color: white;
  justify-content: center;
  flex: 1;
}
.camera {
  flex: 1;
}
.text-color-primary {
  color: blue;
}
</style>
