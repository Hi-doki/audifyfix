<template>
  <div class="mainthing">
    <div class="now-playing" v-if="isLoggedIn && isPageLoaded">
      <div v-if="currentlyPlaying">
        <div class="track-info">
          <img
            :src="currentlyPlaying.item.album.images[0].url"
            alt="Album Art"
            class="album-art"
          />
          <div class="track-details">
            <h3>{{ currentlyPlaying.item.name }}</h3>
            <p>{{ currentlyPlaying.item.artists[0].name }}</p>
            <p>{{ currentlyPlaying.item.album.name }}</p>
          </div>
        </div>
        <div class="seek-bar">
          <div class="time-info">
            <span>{{ formatTime(progressMs) }}</span>
            <input
              type="range"
              min="0"
              :max="currentlyPlaying.item.duration_ms"
              :value="progressMs"
              @input="seek"
            />
            <span>{{ formatTime(currentlyPlaying.item.duration_ms) }}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No track is currently playing</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCurrentPlayback, seekPlayback } from "../server/spotifyService";

export default {
  name: "NowPlaying",
  data() {
    return {
      currentlyPlaying: null,
      progressMs: 0,
      intervalId: null,
      isPageLoaded: false,
      isLoggedIn: false,
    };
  },
  async created() {
    this.isPageLoaded = true;
    if (typeof window !== "undefined") {
      this.isLoggedIn = !!localStorage.getItem("spotify_access_token");
      if (this.isLoggedIn) {
        try {
          await this.fetchCurrentlyPlaying();
          this.startProgressUpdater();
          this.startPolling();
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    async fetchCurrentlyPlaying() {
      try {
        this.currentlyPlaying = await fetchCurrentPlayback();
        if (this.currentlyPlaying) {
          this.progressMs = this.currentlyPlaying.progress_ms;
        }
      } catch (error) {
        console.error("Error fetching currently playing track:", error);
      }
    },
    startProgressUpdater() {
      this.intervalId = setInterval(() => {
        if (this.currentlyPlaying && !this.currentlyPlaying.is_playing) {
          clearInterval(this.intervalId);
        } else if (this.currentlyPlaying) {
          this.progressMs += 1000;
        }
      }, 1000);
    },
    startPolling() {
      this.intervalId = setInterval(() => {
        this.fetchCurrentlyPlaying();
      }, 3000); // Poll every 3 seconds
    },
    async seek(event) {
      const newPosition = event.target.value;
      this.progressMs = newPosition;
      try {
        await seekPlayback(newPosition);
      } catch (error) {
        console.error("Error seeking playback:", error);
      }
    },
    formatTime(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
};
</script>

<style scoped>
.mainthing {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  bottom: 10px;
  left: 0px;
  position: fixed;
}
.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.now-playing {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: min-content;
  bottom: 10px;
  left: 0px;
  background: #12121280;
  padding: 10px;
  border-radius: 10px;
}
p {
  margin: 0;
  font-size: 0.8rem;
}
h3 {
  margin: 0 0 5px 0;
  font-size: 1.25rem;
}

.track-info {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 600px;
}

.album-art {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}

.track-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.seek-bar {
  width: 100%;
  margin-top: 20px;
}

.seek-bar input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #303030;
  width: 100%;
  height: 3px;
}
.seek-bar input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #1ed760;
  cursor: pointer;
}
.seek-bar input[type="range"]::-moz-range-thumb {
  -moz-appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #1ed760;
  cursor: pointer;
}
.seek-bar input[type="range"]::-moz-range-progress {
  background: #1ed76050;
}

.time-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  margin-top: 5px;
}
</style>
