import { _ as __nuxt_component_0 } from './featured-CQQWbonr.mjs';
import { _ as __nuxt_component_0$1 } from './playlistbox-CFkxnpMz.mjs';
import { _ as _export_sfc, b as fetchUserData, c as fetchFeatured } from './server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'axios';

const _sfc_main = {
  name: "Discover",
  components: {
    Playlistbox: __nuxt_component_0$1
  },
  data() {
    return {
      user: null,
      playlists: [],
      isLoggedIn: false,
      isPageLoaded: false
    };
  },
  async created() {
    if (this.isLoggedIn) {
      try {
        this.user = await fetchUserData();
        this.playlists = await fetchFeatured();
        console.log("Playlists in component:", this.playlists);
      } catch (error) {
        console.error("Error in component:", error);
      }
    }
  },
  mounted() {
    this.isPageLoaded = true;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Featured = __nuxt_component_0;
  const _component_Playlistbox = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "discover-container" }, _attrs))} data-v-3abeab9d><h1 data-v-3abeab9d>Discover</h1><div class="items" data-v-3abeab9d>`);
  if ($data.playlists.length) {
    _push(`<div class="items" data-v-3abeab9d>`);
    _push(ssrRenderComponent(_component_Featured, {
      title: "Featured Song",
      description: "Featured Artist",
      image: "https://avatars.githubusercontent.com/u/106713009?v=4"
    }, null, _parent));
    _push(`<!--[-->`);
    ssrRenderList($data.playlists, (playlist) => {
      _push(ssrRenderComponent(_component_Playlistbox, {
        key: playlist.id,
        playlist: {
          title: playlist.name,
          description: playlist.description,
          image: playlist.images && playlist.images[0] ? playlist.images[0].url : "",
          // Ensure image URL is available
          id: playlist.id
        }
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else if (!$data.isLoggedIn && $data.isPageLoaded) {
    _push(`<div data-v-3abeab9d><p data-v-3abeab9d>You need to login, press the login button on the Navbar</p></div>`);
  } else {
    _push(`<div data-v-3abeab9d><p data-v-3abeab9d>Loading playlists...</p></div>`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Discover.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Discover = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3abeab9d"]]);

export { Discover as default };
//# sourceMappingURL=Discover-DiOTo9kr.mjs.map
