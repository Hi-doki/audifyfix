<template>
  <div class="playlist-box" :style="{ backgroundColor: playlist.primarycolor }">
    <NuxtLink :to="`./playlist/id/${playlist.id}`">
      <div
        alt="Playlist Cover"
        class="playlist-image"
        :style="{ backgroundImage: 'url(' + playlist.image + ')' }"
      />
      <div class="playlist-info">
        <h3 class="playlist-title">{{ playlist.title }}</h3>
        <p class="playlist-description">{{ playlist.description }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "PlaylistBox",
  props: {
    playlist: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.playlist-box {
  display: flex;
  flex-direction: column;
  width: 130px;
  height: 200px;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  background: #151515aa;
  border-radius: 10px;
  text-overflow: ellipsis;
}

.playlist-box:hover {
  transform: scale(1.05);
}

.playlist-image {
  width: 130px;
  height: 130px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
}

.playlist-info {
  text-align: left;
  margin-top: 10px;
  width: 130px;
  height: 60px;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
}

.playlist-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.playlist-description {
  font-size: 14px;
  color: #666;
  margin: 5px 0 0;
  text-overflow: ellipsis;
  width: 130px;
  height: 60px;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
}
</style>
