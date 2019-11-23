<template>
  <view class='container'>
    <result-viewer />
    <uploader />
  </view>
</template>

<script>
import ResultViewer from "./ResultViewer";
import Uploader from "./Uploader";

export default {
  components: {
    ResultViewer,
    Uploader
  }
};
</script>

<style scoped>
.container {
  background-color: red;
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>