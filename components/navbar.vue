<template>
  <div class="navbar-wrapper">
    <nav class="navbar">
      <div class="navbar-logo">
        <img
          src="https://avatars.githubusercontent.com/u/106713009?v=4"
          alt="Logo"
        />
      </div>
      <ul class="navbar-links">
        <input class="searchbox" placeholder="Search for songs, artists, albums">
          <li><a href="#"></a></li>
      </input>
      </ul>
      <div class="navbar-profile-container">
        <div class="navbar-profile">
          <img :src="userImage" alt="Profile" />
          <button
            v-if="!isLoggedIn && isPageLoaded"
            @click="authorizeWithSpotify"
            class="login_button"
          >
            Login with Spotify
          </button>
          <button v-else @click="logout" class="login_button">Logout</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { getAuthorizationUrl } from "../server/spotifyService";

export default {
  data() {
    return {
      user: null,
      isPageLoaded: false,
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
    authorizeWithSpotify() {
      window.location.href = getAuthorizationUrl();
    },
    logout() {
      localStorage.removeItem("spotify_access_token");
      localStorage.removeItem("spotify_user_data");
      this.user = null;
      window.location.reload();
    },
  },
  mounted() {
    this.isPageLoaded = true;
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("spotify_user_data");
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
  },
};
</script>

<style scoped>
.navbar-wrapper {
  display: flex;
  justify-content: space-between;
  background-color: #12121200;
  position: sticky;
  top: 0;
  width: 100vw;
  height: 60px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 20px;
}

.navbar-logo img {
  align-self: center;
  display: flex;
  height: 40px;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 20px;
  flex-grow: 1;
  justify-content: center;
}

.navbar-links a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.navbar-profile-container {
  width: 150px; /* Set a fixed width for the container */
  place-items: end;
}

.navbar-profile {
  display: flex;
  justify-content: end;
  gap: 10px;
  border-radius: 100000px;
  background: #00000050;
  padding: 5px 5px;
  transition: width 0.5s ease;
  transition-property: margin-right, width;
  overflow: hidden;
  width: 30px;
  position: relative;
}

.navbar-profile:hover {
  width: 110px;
}

.navbar-profile img {
  height: 30px;
  border-radius: 50%;
}

.navbar-profile span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.searchbox {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 20rem;
  padding: 10px 5px;
  background: #00000050;
  border-radius: 100000px;
  text-decoration: none;
  color: white;
  border: none;
}
.searchbox::placeholder {
  color: #505050;
}

.login_button {
  background-color: #00000050;
  color: white;
  text-align: center;
  items-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  border: none;
  border-radius: 10000px;
  position: absolute;
  height: 30px;
  width: 70px;
  right: 40px;
}
</style>
