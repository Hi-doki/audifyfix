import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  name: "FeaturedBox",
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "featured-box",
    style: { backgroundImage: "url(" + $props.image + ")" }
  }, _attrs))} data-v-b63986b1><div class="info-box" data-v-b63986b1><img${ssrRenderAttr("src", $props.image)} alt="Featured Image" class="featured-image" data-v-b63986b1><div class="featured-content" data-v-b63986b1><h2 data-v-b63986b1>${ssrInterpolate($props.title)}</h2><p data-v-b63986b1>${ssrInterpolate($props.description)}</p></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/featured.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b63986b1"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=featured-CQQWbonr.mjs.map
