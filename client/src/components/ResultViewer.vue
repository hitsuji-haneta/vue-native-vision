<template>
  <view class="container">
    <text>{{ text }}</text>
  </view>
</template>

<script>
import { db } from "../plugins/db";

export default {
  data() {
    return {
      text: "hello"
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
        }
      });
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