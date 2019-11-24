<template>
  <view class="container">
    <text>{{ userId }}</text>
    <text>{{ text }}</text>
    <image v-if="imageUrl" :style="{width: 200, height: 200}" :source="{uri: imageUrl}" />
  </view>
</template>

<script>
import { db, storage } from "../lib/db";
import store from '../store';

export default {
  data() {
    return {
      text: "hello",
      userId: store.state.userId,
      imageUrl: null
    };
  },
  mounted() {
    this.getLabels();
  },
  methods: {
    getLabels: async function() {
      const doc = db.collection("labels").doc("test");
      const observer = doc.onSnapshot(snapshot => {
        const data = snapshot.data();
        if (data) {
          const labels = data.labels;
          const descriptions = labels.map(label => label.description);
          const scores = labels.map(label => Math.round(label.score * 100));

          this.text = `${descriptions[0]} ${scores[0]}点
${descriptions[1]} ${scores[1]}点
${descriptions[2]} ${scores[2]}点`;

          this.getImages();
        }
      });
    },
    getImages: async function() {
      const ref = storage.ref().child("test");
      const url = await ref.getDownloadURL();
      this.imageUrl = url;
    }
  }
};
</script>
<style scoped>
.container {
  background-color: white;
  flex: 2;
  align-items: center;
  justify-content: center;
}
</style>