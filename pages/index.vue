<template class="uwu">
  <div class="uwu">
    <div v-if="!isLoggedIn && !isPageLoaded">
      <p>Checking Login Details</p>
    </div>
    <div v-else-if="!isLoggedIn && isPageLoaded">
      <p>You need to login, press the login button on the Navbar</p>
    </div>
    <div v-else-if="isLoggedIn && isPageLoaded">
      <h1 class="flex">
        <span>Welcome&nbsp;</span>
        <span class="usrgradient">{{ userinfo?.display_name }}.</span>
      </h1>
      <h2>Top Tracks - 4 Weeks</h2>
      <div class="items" v-if="topTracks.length">
        <Featured
          v-for="track in topTrack"
          :key="track.id"
          :title="track.name"
          :description="getTrackDescription(track)"
          :image="
            track.album.images[0]?.url ||
            'https://avatars.githubusercontent.com/u/106713009?v=4'
          "
        />
        <Playlistbox
          v-for="track in topTracks.slice(1)"
          :key="track.id"
          :playlist="{
            title: track.name,
            description: getTrackDescription(track),
            image:
              track.album.images && track.album.images[0]
                ? track.album.images[0].url
                : '',
          }"
        />
      </div>
      <div v-else>
        <p>Loading top tracks...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchTopTracks, fetchUserData } from "../server/spotifyService";
import Featured from "../components/Featured";
import Playlistbox from "../components/playlistbox.vue";

export default {
  name: "Home",
  components: {
    Featured,
  },
  data() {
    return {
      topTracks: [],
    };
  },
  methods: {
    getTrackDescription(track) {
      let desc = "";
      if (track.artists.length > 1) {
        let desc = "";
        for (let i = 0; i < track.artists.length; i++) {
          if (i === track.artists.length - 1) {
            desc += track.artists[i].name;
          } else {
            desc += track.artists[i].name + ", ";
          }
        }
        return desc;
      } else {
        return track.artists[0].name;
      }
    },
  },
  data() {
    return {
      topTracks: [],
      isPageLoaded: false,
    };
  },
  async created() {
    this.isPageLoaded = true;
    if (typeof window !== "undefined") {
      this.isLoggedIn = !!localStorage.getItem("spotify_access_token");
      if (this.isLoggedIn) {
        try {
          this.userinfo = await fetchUserData();
          this.topTrack = await fetchTopTracks("1", "short_term");
          this.topTracks = await fetchTopTracks("17", "short_term");
        } catch (error) {
          console.error("Error fetching top tracks:", error);
        }
      }
    }
  },
};
</script>

<style scoped>
.uwu {
}
.items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.flex {
  display: flex;
}
.usrgradient {
  background: linear-gradient(90deg, #ff5858, #f09819);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}
</style>
