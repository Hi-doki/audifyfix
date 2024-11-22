import { _ as _export_sfc, f as fetchArtist } from './server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
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
  data() {
    return {
      artist: null,
      loading: true,
      error: null
    };
  },
  async mounted() {
    await this.fetchArtistData();
  },
  watch: {
    "$route.params.id": "fetchUserData"
  },
  methods: {
    async fetchArtistData() {
      this.loading = true;
      this.error = null;
      const userId = this.$route.params.id;
      try {
        this.artist = await fetchArtist(userId);
      } catch (error) {
        console.error("Error fetching user:", error);
        this.error = "Failed to load user";
      } finally {
        this.loading = false;
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  if (!$data.loading && !$data.error) {
    _push(`<h1>${ssrInterpolate((_a = $data.artist) == null ? void 0 : _a.name)}&#39;s Profile</h1>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.error) {
    _push(`<p>error</p>`);
  } else {
    _push(`<!---->`);
  }
  if (!$data.loading && !$data.error) {
    _push(`<div><div class="stats-container"><img${ssrRenderAttr("src", ((_d = (_c = (_b = $data.artist) == null ? void 0 : _b.images) == null ? void 0 : _c[0]) == null ? void 0 : _d.url) || "https://via.placeholder.com/150")}${ssrRenderAttr("alt", ((_e = $data.artist) == null ? void 0 : _e.display_name) || "User Image")} class="user-art" height="150px" width="150px"><div class="main-stats"><h1>${ssrInterpolate((_f = $data.artist) == null ? void 0 : _f.name)}</h1><h3>Genres: ${ssrInterpolate((_g = $data.artist) == null ? void 0 : _g.genres.join(", "))}</h3><h3>Followers: ${ssrInterpolate((_h = $data.artist) == null ? void 0 : _h.followers.total)}</h3><h3>Popularity: ${ssrInterpolate((_i = $data.artist) == null ? void 0 : _i.popularity)}</h3></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/artists/id/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _id_ as default };
//# sourceMappingURL=_id_-OK8kHtOt.mjs.map
