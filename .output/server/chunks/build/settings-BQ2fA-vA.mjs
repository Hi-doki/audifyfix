import { _ as _export_sfc, b as fetchUserData } from './server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
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
      user: null,
      isPageLoaded: false
    };
  },
  async created() {
    if (this.isLoggedIn) {
      try {
        this.user = await fetchUserData();
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
  var _a;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Settings</h1><h3>Account Information</h3>`);
  if (!_ctx.isLoggedIn && $data.isPageLoaded) {
    _push(`<div><p>You are not logged in.</p></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!_ctx.isLoggedIn && !$data.isPageLoaded) {
    _push(`<div><p>Loading</p></div>`);
  } else if (_ctx.isLoggedIn && $data.isPageLoaded) {
    _push(`<div><div class="info-card"><div class="card-content"><img${ssrRenderAttr("src", ((_a = $data.user.images[0]) == null ? void 0 : _a.url) || "https://via.placeholder.com/150")} alt="User profile" width="150" height="150" style="${ssrRenderStyle({ "border-radius": "50%" })}"></div><div><p>Display Name: ${ssrInterpolate($data.user.display_name)}</p><p>Email: ${ssrInterpolate($data.user.email)}</p><p>Country: ${ssrInterpolate($data.user.country)}</p><p>Followers: ${ssrInterpolate($data.user.followers.total)}</p><p>Spotify ID: ${ssrInterpolate($data.user.id)}</p><p>Spotify URI: ${ssrInterpolate($data.user.uri)}</p><p>Product: ${ssrInterpolate($data.user.product)}</p><p>Birthdate: ${ssrInterpolate($data.user.birthdate)}</p><p> External URLs: <a${ssrRenderAttr("href", $data.user.external_urls.spotify)}>Spotify</a></p></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const settings = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { settings as default };
//# sourceMappingURL=settings-BQ2fA-vA.mjs.map
