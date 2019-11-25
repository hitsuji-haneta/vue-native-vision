<template>
  <view class="container">
    <text v-if="isAnalyzing" class="text">解析中です</text>
    <text v-if="!isAnalyzing" class="text">{{ result }}</text>
    <image
      v-if="imageUrl && !isAnalyzing"
      :style="{width: 200, height: 200}"
      :source="{uri: imageUrl}"
    />
  </view>
</template>

<script>
import { db, storage } from "../lib/db";
import store from "../store";

export default {
  data() {
    return {
      result: "写真をあげてね",
      imageUrl: null
    };
  },
  computed: {
    userId() {
      return store.state.userId;
    },
    isAnalyzing() {
      return store.state.isAnalyzing;
    }
  },
  mounted() {
    this.getLabels();
  },
  methods: {
    getLabels: function() {
      try {
        const doc = db.collection("labels").doc(this.userId);
        doc.onSnapshot(async snapshot => {
          const data = snapshot.data();
          if (data) {
            this.setResult(data);
            await this.setImage();
            store.commit("setAnalysisStatus", false);
          }
        });
      } catch (err) {
        console.error(err);
      }
    },
    setImage: async function() {
      const ref = storage.ref().child(this.userId);
      const url = await ref.getDownloadURL();
      this.imageUrl = url;
    },
    setResult: function(data) {
      const labels = data.labels;
      const descriptions = labels.map(label => label.description);
      const scores = labels.map(label => Math.round(label.score * 100));

      this.result = `${descriptions[0]} ${scores[0]}点
${descriptions[1]} ${scores[1]}点
${descriptions[2]} ${scores[2]}点`;
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
.text {
  font-size: 30;
}
</style>