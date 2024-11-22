<template>
  <div>
    <h1>Library</h1>
    <div v-if="user">
      <p>Welcome, {{ user.display_name }}</p>
    </div>
    <div v-if="playlists.length" class="items">
      <Playlistbox
        v-for="playlist in playlists"
        :key="playlist.id"
        :playlist="{
          title: playlist.name,
          description: playlist.description,
          image:
            playlist.images && playlist.images[0] ? playlist.images[0].url : '', // Ensure image URL is available
          id: playlist.id,
        }"
      />
    </div>
    <div v-else-if="!isLoggedIn && isPageLoaded">
      <p>You need to login, press the login button on the Navbar</p>
    </div>
    <div v-else>
      <p>Loading playlists...</p>
    </div>
  </div>
</template>

<script>
import Playlistbox from "~/components/playlistbox.vue";
import { fetchUserData, fetchPlaylists } from "../server/spotifyService";

export default {
  name: "Library",
  components: {
    Playlistbox,
  },
  data() {
    return {
      user: null,
      playlists: [],
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
        // Fetch playlists
        this.playlists = await fetchPlaylists();
        console.log("Playlists in component:", this.playlists); // Log the playlists
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

<style scoped>
.items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
