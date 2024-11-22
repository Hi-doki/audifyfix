import { _ as _export_sfc, g as fetchOtherUserData } from './server.mjs';
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
      user: null,
      loading: true,
      error: null
    };
  },
  async mounted() {
    await this.fetchUserData();
  },
  watch: {
    "$route.params.id": "fetchUserData"
  },
  methods: {
    async fetchUserData() {
      this.loading = true;
      this.error = null;
      const userId = this.$route.params.id;
      try {
        this.user = await fetchOtherUserData(userId);
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
  var _a, _b, _c, _d, _e, _f;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  if (!$data.loading && !$data.error) {
    _push(`<h1>${ssrInterpolate((_a = $data.user) == null ? void 0 : _a.display_name)}</h1>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.error) {
    _push(`<p>${ssrInterpolate($data.error)}</p>`);
  } else {
    _push(`<!---->`);
  }
  if (!$data.loading && !$data.error) {
    _push(`<div><img${ssrRenderAttr("src", ((_d = (_c = (_b = $data.user) == null ? void 0 : _b.images) == null ? void 0 : _c[0]) == null ? void 0 : _d.url) || "https://via.placeholder.com/150")}${ssrRenderAttr("alt", ((_e = $data.user) == null ? void 0 : _e.display_name) || "User Image")} class="playlist-art" height="50px"><h1>${ssrInterpolate((_f = $data.user) == null ? void 0 : _f.display_name)}</h1></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/id/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CW1wDfc5.mjs.map
