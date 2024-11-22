<template>
  <div>
    <h1 v-if="!loading && !error">{{ user?.display_name }}</h1>
    <p v-if="error">{{ error }}</p>
    <div v-if="!loading && !error">
      <img
        :src="user?.images?.[0]?.url || 'https://via.placeholder.com/150'"
        :alt="user?.display_name || 'User Image'"
        class="playlist-art"
        height="50px"
      />
      <h1>{{ user?.display_name }}</h1>
    </div>
  </div>
</template>

<script>
import { fetchOtherUserData } from "../../../server/spotifyService";

export default {
  data() {
    return {
      user: null,
      loading: true,
      error: null,
    };
  },
  async mounted() {
    await this.fetchUserData();
  },
  watch: {
    "$route.params.id": "fetchUserData",
  },
  methods: {
    async fetchUserData() {
      this.loading = true;
      this.error = null;
      const userId = this.$route.params.id;
      try {
        this.user = await fetchOtherUserData(userId);
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
