<template>
  <div v-if="!isLoggedIn && isPageLoaded" class="login">
    <div>
      <div class="login__container">
        <button @click="authorizeWithSpotify" class="login_button">
          <img
            class="login__logo"
            src="../public/Spotify_Logo.svg"
            alt="Spotify
        Logo"
            height="50px"
          />
          Login with Spotify
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
.login_button {
  background-color: #252525;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 99px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background-color 1s;
}

.login_button:hover {
  background-color: #1ed76050;
  box-shadow: 0 0 50px #1ed76010;
}

.login__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px;
  background-color: #121212;
  border-radius: 10px;
  border: 2px solid #282828;
  box-shadow: 0 0 100px #1ed76050;
}
</style>

<script>
import { getAuthorizationUrl, fetchUserData } from "../server/spotifyService";

export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.user !== null;
    },
    userImage() {
      return this.isLoggedIn
        ? this.user.images[0]?.url
        : "https://avatars.githubusercontent.com/u/106713009?v=4";
    },
    username() {
      return this.isLoggedIn ? this.user.display_name : "Signed Out";
    },
  },
  methods: {
    async checkTokenValidity() {
      try {
        // Make a test request to check if the token is valid
        await fetchUserData();
        this.isLoggedIn = true;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error, show login modal
          console.error("Unauthorized. Showing login modal.");
          this.isLoggedIn = false;
        } else {
          console.error("Error checking token validity:", error);
          this.error = "Failed to check token validity";
          this.isLoggedIn = false;
        }
      }
    },
    authorizeWithSpotify() {
      window.location.href = getAuthorizationUrl();
      this.$emit("loggedIn");
    },
    logout() {
      localStorage.removeItem("spotify_access_token");
      localStorage.removeItem("spotify_user_data");
      this.user = null;
    },
  },
  data() {
    return {
      user: null,
      isPageLoaded: false,
    };
  },
  mounted() {
    this.isPageLoaded = true;
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("spotify_user_data");
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
    try {
      const token = localStorage.getItem("spotify_access_token");
      if (token !== null) {
        this.checkTokenValidity();
      } else {
        this.isLoggedIn = false;
      }
    } catch (error) {
      console.error("Error during mounted:", error);
      this.error = "Failed to load currently playing track";
      this.isLoggedIn = false;
    }
  },
};
</script>
