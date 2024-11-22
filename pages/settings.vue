<template>
  <div>
    <h1>Settings</h1>
    <h3>Account Information</h3>
    <div v-if="!isLoggedIn && isPageLoaded">
      <p>You are not logged in.</p>
    </div>
    <div v-if="!isLoggedIn && !isPageLoaded">
      <p>Loading</p>
    </div>
    <div v-else-if="isLoggedIn && isPageLoaded">
      <div class="info-card">
        <div class="card-content">
          <img
            :src="user.images[0]?.url || 'https://via.placeholder.com/150'"
            alt="User profile"
            width="150"
            height="150"
            style="border-radius: 50%"
          />
        </div>
        <div>
          <p>Display Name: {{ user.display_name }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Country: {{ user.country }}</p>
          <p>Followers: {{ user.followers.total }}</p>
          <p>Spotify ID: {{ user.id }}</p>
          <p>Spotify URI: {{ user.uri }}</p>
          <p>Product: {{ user.product }}</p>
          <p>Birthdate: {{ user.birthdate }}</p>
          <p>
            External URLs: <a :href="user.external_urls.spotify">Spotify</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUserData } from "../server/spotifyService";
export default {
  data() {
    return {
      user: null,
      isPageLoaded: false,
    };
  },
  async created() {
    if (typeof window !== "undefined") {
      this.isLoggedIn = !!localStorage.getItem("spotify_access_token");
    }
    if (this.isLoggedIn) {
      try {
        // Fetch user data
        this.user = await fetchUserData();
      } catch (error) {
        console.error("Error in component:", error);
      }
    }
  },
  mounted() {
    this.isPageLoaded = true;
  },
};
</script>

<style>
.card-content {
  display: flex;
  justify-content: center;
}
.info-card {
  display: flex;
  flex-direction: column;
  border: 2px dashed #ccc;
  padding: 10px;
  border-radius: 10px;
  font-family: monospace;
  width: max-content;
}
.NuxtLink {
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(90deg, #f2b3ff, #ffa1d2);
  font-weight: bold;
}
</style>
