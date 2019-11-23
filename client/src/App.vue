<template>
  <root>
    <!-- <camera-screen /> -->
    <home/>
  </root>
</template>

<script>
import { Root } from "native-base";
// import CameraScreen from "./components/CameraScreen";
import Home from "./components/Home";

export default {
  components: {
    // CameraScreen,
    Home,
    Root
  }
};
</script>