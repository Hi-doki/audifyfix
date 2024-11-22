<template>
  <div class="idk">
    <navbar />
    <div class="main idk">
      <div>
        <sidebar />
      </div>
      <div class="invertborder">
        <Content class="thingy" />
      </div>
      <div>
        <nowplaying />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Content from "./contents.vue";
import Navbar from "./navbar.vue";
import Sidebar from "./sidebar.vue";
</script>

<style>
.main {
  display: flex;
  width: 100vw;
}
.invertborder {
  border-top-left-radius: 10px;
  background-color: #aaaaaa10;
  overflow: auto;
  height: calc(100vh - 60px);
  padding: 10px;
  width: fill-available;
}
.idk {
  height: calc(100vh - 60px);
}
</style>
