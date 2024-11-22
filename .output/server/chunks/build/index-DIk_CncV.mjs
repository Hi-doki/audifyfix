import { _ as __nuxt_component_0 } from './featured-CQQWbonr.mjs';
import { _ as __nuxt_component_0$1 } from './playlistbox-CFkxnpMz.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
  name: "Home",
  components: {
    Featured: __nuxt_component_0
  },
  data() {
    return {
      topTracks: []
    };
  },
  methods: {
    getTrackDescription(track) {
      if (track.artists.length > 1) {
        let desc2 = "";
        for (let i = 0; i < track.artists.length; i++) {
          if (i === track.artists.length - 1) {
            desc2 += track.artists[i].name;
          } else {
            desc2 += track.artists[i].name + ", ";
          }
        }
        return desc2;
      } else {
        return track.artists[0].name;
      }
    }
  },
  data() {
    return {
      topTracks: [],
      isPageLoaded: false
    };
  },
  async created() {
    this.isPageLoaded = true;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  const _component_Featured = __nuxt_component_0;
  const _component_Playlistbox = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "uwu" }, _attrs))} data-v-bbc3ee24>`);
  if (!_ctx.isLoggedIn && !$data.isPageLoaded) {
    _push(`<div data-v-bbc3ee24><p data-v-bbc3ee24>Checking Login Details</p></div>`);
  } else if (!_ctx.isLoggedIn && $data.isPageLoaded) {
    _push(`<div data-v-bbc3ee24><p data-v-bbc3ee24>You need to login, press the login button on the Navbar</p></div>`);
  } else if (_ctx.isLoggedIn && $data.isPageLoaded) {
    _push(`<div data-v-bbc3ee24><h1 class="flex" data-v-bbc3ee24><span data-v-bbc3ee24>Welcome\xA0</span><span class="usrgradient" data-v-bbc3ee24>${ssrInterpolate((_a = _ctx.userinfo) == null ? void 0 : _a.display_name)}.</span></h1><h2 data-v-bbc3ee24>Top Tracks - 4 Weeks</h2>`);
    if ($data.topTracks.length) {
      _push(`<div class="items" data-v-bbc3ee24><!--[-->`);
      ssrRenderList(_ctx.topTrack, (track) => {
        var _a2;
        _push(ssrRenderComponent(_component_Featured, {
          key: track.id,
          title: track.name,
          description: $options.getTrackDescription(track),
          image: ((_a2 = track.album.images[0]) == null ? void 0 : _a2.url) || "https://avatars.githubusercontent.com/u/106713009?v=4"
        }, null, _parent));
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList($data.topTracks.slice(1), (track) => {
        _push(ssrRenderComponent(_component_Playlistbox, {
          key: track.id,
          playlist: {
            title: track.name,
            description: $options.getTrackDescription(track),
            image: track.album.images && track.album.images[0] ? track.album.images[0].url : ""
          }
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<div data-v-bbc3ee24><p data-v-bbc3ee24>Loading top tracks...</p></div>`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-bbc3ee24"]]);

export { index as default };
//# sourceMappingURL=index-DIk_CncV.mjs.map
