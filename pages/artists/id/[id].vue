<template>
  <div>
    <h1 v-if="!loading && !error">{{ artist?.name }}'s Profile</h1>
    <p v-if="error">error</p>
    <div v-if="!loading && !error">
      <div class="stats-container">
        <img
          :src="artist?.images?.[0]?.url || 'https://via.placeholder.com/150'"
          :alt="artist?.display_name || 'User Image'"
          class="user-art"
          height="150px"
          width="150px"
        />
        <div class="main-stats">
          <h1>{{ artist?.name }}</h1>
          <h3>Genres: {{ artist?.genres.join(", ") }}</h3>
          <h3>Followers: {{ artist?.followers.total }}</h3>
          <h3>Popularity: {{ artist?.popularity }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchArtist } from "../../../server/spotifyService";

export default {
  data() {
    return {
      artist: null,
      loading: true,
      error: null,
    };
  },
  async mounted() {
    await this.fetchArtistData();
  },
  watch: {
    "$route.params.id": "fetchUserData",
  },
  methods: {
    async fetchArtistData() {
      this.loading = true;
      this.error = null;
      const userId = this.$route.params.id;
      try {
        this.artist = await fetchArtist(userId);
      } catch (error) {
        console.error("Error fetching user:", error);
        this.error = "Failed to load user";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.user-art {
  border-radius: 10000px;
}
.stats-container {
  display: flex;
  align-items: center;
}
.main-stats {
  margin-left: 20px;
}
</style>
