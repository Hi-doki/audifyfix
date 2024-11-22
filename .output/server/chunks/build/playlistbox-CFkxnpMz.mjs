import { _ as _export_sfc, a as __nuxt_component_0$1 } from './server.mjs';
import { mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  name: "PlaylistBox",
  props: {
    playlist: {
      type: Object,
      required: true
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "playlist-box",
    style: { backgroundColor: $props.playlist.primarycolor }
  }, _attrs))} data-v-3725d97b>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: `./playlist/id/${$props.playlist.id}`
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div alt="Playlist Cover" class="playlist-image" style="${ssrRenderStyle({ backgroundImage: "url(" + $props.playlist.image + ")" })}" data-v-3725d97b${_scopeId}></div><div class="playlist-info" data-v-3725d97b${_scopeId}><h3 class="playlist-title" data-v-3725d97b${_scopeId}>${ssrInterpolate($props.playlist.title)}</h3><p class="playlist-description" data-v-3725d97b${_scopeId}>${ssrInterpolate($props.playlist.description)}</p></div>`);
      } else {
        return [
          createVNode("div", {
            alt: "Playlist Cover",
            class: "playlist-image",
            style: { backgroundImage: "url(" + $props.playlist.image + ")" }
          }, null, 4),
          createVNode("div", { class: "playlist-info" }, [
            createVNode("h3", { class: "playlist-title" }, toDisplayString($props.playlist.title), 1),
            createVNode("p", { class: "playlist-description" }, toDisplayString($props.playlist.description), 1)
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/playlistbox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3725d97b"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=playlistbox-CFkxnpMz.mjs.map
