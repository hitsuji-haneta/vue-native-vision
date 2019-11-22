<template>
  <root>
    <camera-screen />
  </root>
</template>

<script>
import { Root } from "native-base";
import CameraScreen from "./src/components/CameraScreen";

export default {
  components: {
    CameraScreen,
    Root
  }
};
</script>