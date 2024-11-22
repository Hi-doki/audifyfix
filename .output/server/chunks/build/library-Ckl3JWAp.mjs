import { _ as __nuxt_component_0 } from './playlistbox-CFkxnpMz.mjs';
import { _ as _export_sfc, b as fetchUserData, d as fetchPlaylists } from './server.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
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
  name: "Library",
  components: {
    Playlistbox: __nuxt_component_0
  },
  data() {
    return {
      user: null,
      playlists: []
    };
  },
  async created() {
    if (this.isLoggedIn) {
      try {
        this.user = await fetchUserData();
        this.playlists = await fetchPlaylists();
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
  const _component_Playlistbox = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-d340772b><h1 data-v-d340772b>Library</h1>`);
  if ($data.user) {
    _push(`<div data-v-d340772b><p data-v-d340772b>Welcome, ${ssrInterpolate($data.user.display_name)}</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.playlists.length) {
    _push(`<div class="items" data-v-d340772b><!--[-->`);
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
  } else if (!_ctx.isLoggedIn && _ctx.isPageLoaded) {
    _push(`<div data-v-d340772b><p data-v-d340772b>You need to login, press the login button on the Navbar</p></div>`);
  } else {
    _push(`<div data-v-d340772b><p data-v-d340772b>Loading playlists...</p></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/library.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const library = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d340772b"]]);

export { library as default };
//# sourceMappingURL=library-Ckl3JWAp.mjs.map
