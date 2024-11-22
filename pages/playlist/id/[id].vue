<template>
  <div>
    <h1 v-if="!loading && !error">{{ playlist.name }}</h1>
    <p v-if="loading">Loading playlist...</p>
    <p v-if="error">{{ error }}</p>
    <ul v-if="!loading && !error">
      <div
        class="track-div"
        v-for="track in playlist.tracks.items"
        :key="track.track.id"
      >
        <img
          :src="track.track.album.images[0].url"
          :alt="track.track.album.name"
          class="album-art"
          height="50px"
        />
        {{ track.track.name }} -
        <NuxtLink :to="`/artists/id/${track.track.artists[0].id}`">{{
          track.track.artists[0].name
        }}</NuxtLink>
      </div>
    </ul>
  </div>
</template>

<script>
import { fetchPlaylist } from "../../../server/spotifyService";

export default {
  data() {
    return {
      playlist: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchPlaylistData();
  },
  watch: {
    "$route.params.id": "fetchPlaylistData",
  },
  methods: {
    async fetchPlaylistData() {
      this.loading = true;
      this.error = null;
      const playlistId = this.$route.params.id;
      try {
        this.playlist = await fetchPlaylist(playlistId);
      } catch (error) {
        console.error("Error fetching playlist:", error);
        this.error = "Failed to load playlist";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
.track-div {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}
.album-art {
  border-radius: 5px;
}
</style>
