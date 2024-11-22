<template>
  <div class="featured-box" :style="{ backgroundImage: 'url(' + image + ')' }">
    <div class="info-box">
      <img :src="image" alt="Featured Image" class="featured-image" />
      <div class="featured-content">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeaturedBox",
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.featured-box {
  display: flex;
  align-items: center;
  border-radius: 10px;
  width: 630px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 220px;
  overflow: hidden;
  transition: transform 0.2s;
  backdrop-filter: blur(0px);
}
.featured-box:hover {
  transform: scale(1.02);
}
.info-box {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  width: 630px;
  height: 220px;
  padding: 10px;
}

.featured-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.featured-content {
  padding: 20px;
  color: white;
}

.featured-content h2 {
  margin: 0;
  font-size: 24px;
}

.featured-content p {
  margin: 10px 0 0;
  font-size: 16px;
}
</style>
