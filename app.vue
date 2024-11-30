<template>
  <div
    v-if="isLoggedIn && isPageLoaded"
    class="npbg"
    :style="{
      backgroundImage: currentlyPlaying?.item?.album?.images[0]?.url
        ? 'url(' + currentlyPlaying.item.album.images[0].url + ')'
        : '#121212',
    }"
  >
    <div class="np"></div>
    <div>
      <mainview />
    </div>
  </div>
  <div v-else-if="!isLoggedIn && isPageLoaded">
    <loginmodal ref="loginmodal" @loggedIn="handleLogin" />
    <mainview />
  </div>
</template>

<script>
import Mainview from "./components/mainview.vue";
import Loginmodal from "./components/loginmodal.vue";
import { fetchCurrentPlayback, fetchUserData } from "./server/spotifyService";

export default {
  components: {
    Mainview,
    Loginmodal,
  },
  data() {
    return {
      currentlyPlaying: null,
      error: null,
      isPageLoaded: false,
      isLoggedIn: false,
      intervalId: null,
    };
  },
  async mounted() {
    this.isPageLoaded = true;
    try {
      const token = localStorage.getItem("spotify_access_token");
      if (token) {
        console.log("Token found, checking validity...");
        await this.checkTokenValidity(token);
      } else {
        console.log("No token found, showing login modal.");
        this.isLoggedIn = false;
      }
    } catch (error) {
      console.error("Error during mounted:", error);
      this.error = "Failed to load currently playing track";
      this.isLoggedIn = false;
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    async checkTokenValidity(token) {
      try {
        // Make a test request to check if the token is valid
        await fetchUserData(token);
        console.log("Token is valid.");
        this.isLoggedIn = true;
        await this.fetchCurrentlyPlaying();
        this.startPolling();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error, show login modal
          console.error("Unauthorized. Showing login modal.");
          this.isLoggedIn = false;
          this.$refs.loginmodal.show();
        } else {
          console.error("Error checking token validity:", error);
          this.error = "Failed to check token validity";
          this.$refs.loginmodal.show();
        }
      }
    },
    async fetchCurrentlyPlaying() {
      try {
        console.log("Fetching currently playing track...");
        this.currentlyPlaying = await fetchCurrentPlayback();
        console.log("Currently playing track:", this.currentlyPlaying);
      } catch (error) {
        console.error("Error fetching currently playing track:", error);
        this.error = "Failed to load currently playing track";
      }
    },
    async handleLogin() {
      console.log("User logged in.");
      this.isLoggedIn = true;
      await this.fetchCurrentlyPlaying();
      this.startPolling();
    },
    startPolling() {
      this.intervalId = setInterval(() => {
        if (this.isLoggedIn) {
          this.fetchCurrentlyPlaying();
        }
      }, 10000); // Poll every 10 seconds
    },
  },
  watch: {
    isPageLoaded(newVal) {
      if (newVal && this.isLoggedIn) {
        this.fetchCurrentlyPlaying();
        this.startPolling();
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
:root {
  font-family: "inter", sans-serif;
  background-color: #121212;
}
.npbg {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -2;
  background-color: #121212;
}
.np {
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
  backdrop-filter: blur(10px);
  background-color: #050505d0;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: white;
  overflow-y: hidden;
}

.main-content {
  display: flex;
  overflow-y: auto;
}

a {
  text-decoration: none;
  color: white;
}

.footer {
  position: absolute;
  background-color: #282828;
  color: white;
  padding: 1rem;
  width: 1000px;
  place-self: center;
  bottom: 10px;
  border-radius: 25px;
}

.now-playing {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.playinginfo {
  font-size: x-small;
  line-height: 10px;
}
.npimg {
  border-radius: 100%;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 100%;
  filter: blur(0.5rem);
}
</style>
