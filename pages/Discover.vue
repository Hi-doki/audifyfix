<template>
  <div class="discover-container">
    <h1>Discover</h1>
    <div class="items">
      <div v-if="playlists.length" class="items">
        <Featured
          title="Featured Song"
          description="Featured Artist"
          image="https://avatars.githubusercontent.com/u/106713009?v=4"
        />
        <Playlistbox
          v-for="playlist in playlists"
          :key="playlist.id"
          :playlist="{
            title: playlist.name,
            description: playlist.description,
            image:
              playlist.images && playlist.images[0]
                ? playlist.images[0].url
                : '', // Ensure image URL is available
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
  </div>
</template>

<script>
import Playlistbox from "~/components/playlistbox";
import Featured from "~/components/featured";
import { fetchUserData, fetchFeatured } from "~/server/spotifyService";

export default {
  name: "Discover",
  components: {
    Playlistbox,
  },
  data() {
    return {
      user: null,
      playlists: [],
      isLoggedIn: false,
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
        // Fetch playlists
        this.playlists = await fetchFeatured();
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
