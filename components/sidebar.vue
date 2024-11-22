<template @load="created">
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <!-- Sidebar -->
    <div>
      <div class="sidebar-header">
        <button @click="toggleSidebar" class="toggle-btn">
          {{ isCollapsed ? ">" : "<" }}
        </button>
      </div>
      <ul class="lists">
        <li v-for="item in menuItems" :key="item.label">
          <NuxtLink :to="item.link" class="menu-item">
            <div
              :style="{ backgroundImage: 'url(' + item.icon + ')' }"
              class="item-img"
            ></div>
            <span v-if="!isCollapsed" class="label">{{ item.label }}</span>
          </NuxtLink>
        </li>
        <li v-for="playlist in playlists" :key="playlist.id">
          <NuxtLink :to="'/playlist/' + playlist.id" class="menu-item">
            <div
              :style="{
                backgroundImage: 'url(' + playlist.images[0].url + ')',
              }"
              class="item-img"
            ></div>
            <span v-if="!isCollapsed" class="label">{{ playlist.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchPlaylists } from "../server/spotifyService";

export default {
  data() {
    return {
      isCollapsed: false,
      menuItems: [
        {
          icon: "https://avatars.githubusercontent.com/u/106713009?v=4",
          label: "Home",
          link: "/",
        },
        { icon: "🔥", label: "Discover", link: "/discover" },
        { icon: "🎧", label: "Radio", link: "/radio" },
        { icon: "📱", label: "Your Library", link: "/library" },
        { icon: "⚙️", label: "Settings", link: "/settings" },
      ],
      playlists: [],
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    async created() {
      try {
        this.playlists = await fetchPlaylists();
      } catch (error) {
        console.error("Error in component:", error);
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #12121200;
  color: white;
  width: 240px;
  padding: 10px;
  transition: width 250ms ease;
  position: sticky;
  height: 100vh;
}

.sidebar.collapsed {
  width: 50px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 1rem 0;
}

.item-img {
  border-radius: 5px;
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
}

.menu-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
}

.menu-item .label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toggle-btn {
  background: none;
  border: none;
  color: #505050;
  font-size: 1.5rem;
  cursor: pointer;
  text-align: center;
  width: 100%;
}
</style>
