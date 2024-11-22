<template>
  <div>
    <p>Logging in...</p>
  </div>
</template>

<script>
import { getAccessToken, fetchUserData } from "@/server/spotifyService";

export default {
  async mounted() {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          // Exchange authorization code for access token
          await getAccessToken(code);
          // Fetch user data
          const user = await fetchUserData();
          console.log("User Data:", user); // Log the user data
          // Redirect to the home page
          window.location.href = "/";
        } catch (error) {
          console.error("Error in callback:", error);
        }
      }
    }
  },
};
</script>

<style scoped>
/* OJL */
</style>
