import { _ as _export_sfc, a as __nuxt_component_0, e as fetchPlaylist } from './server.mjs';
import { withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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
      playlist: null,
      loading: true,
      error: null
    };
  },
  async created() {
    await this.fetchPlaylistData();
  },
  watch: {
    "$route.params.id": "fetchPlaylistData"
  },
  methods: {
    async fetchPlaylistData() {
      this.loading = true;
      this.error = null;
      const playlistId = this.$route.params.id;
      try {
        this.playlist = await fetchPlaylist(playlistId);
      } catch (error) {
        console.error("Error fetching playlist:", error);
        this.error = "Failed to load playlist";
      } finally {
        this.loading = false;
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-cb2df3af>`);
  if (!$data.loading && !$data.error) {
    _push(`<h1 data-v-cb2df3af>${ssrInterpolate($data.playlist.name)}</h1>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.loading) {
    _push(`<p data-v-cb2df3af>Loading playlist...</p>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.error) {
    _push(`<p data-v-cb2df3af>${ssrInterpolate($data.error)}</p>`);
  } else {
    _push(`<!---->`);
  }
  if (!$data.loading && !$data.error) {
    _push(`<ul data-v-cb2df3af><!--[-->`);
    ssrRenderList($data.playlist.tracks.items, (track) => {
      _push(`<div class="track-div" data-v-cb2df3af><img${ssrRenderAttr("src", track.track.album.images[0].url)}${ssrRenderAttr("alt", track.track.album.name)} class="album-art" height="50px" data-v-cb2df3af> ${ssrInterpolate(track.track.name)} - `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/artists/id/${track.track.artists[0].id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(track.track.artists[0].name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(track.track.artists[0].name), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div>`);
    });
    _push(`<!--]--></ul>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/playlist/id/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-cb2df3af"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-63odA4Tv.mjs.map
