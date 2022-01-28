import { c as create_ssr_component, v as validate_component, e as escape, h as createEventDispatcher, f as add_attribute, m as missing_component, j as each, k as spread, l as escape_object, p as escape_attribute_value, q as globals, a as subscribe, b as set_store_value } from "../../../chunks/index-4390b0b8.js";
import { C as Card } from "../../../chunks/Card-0ad50115.js";
import { M as Modal, C as Controls } from "../../../chunks/Controls-6346f8a0.js";
import { I as Info } from "../../../chunks/Info-cceca9a5.js";
import { C as CurrentCampaign } from "../../../chunks/CurrentCampaign-9af84571.js";
import { p as page, a as session, s as shouldDisplayControls } from "../../../chunks/Logo-e158a041.js";
import { C as Checkmark, a as Checkbox } from "../../../chunks/MustLogInModal.svelte_svelte_type_style_lang-11f51de1.js";
import "../../../chunks/index-b462fd7a.js";
import "dayjs";
const Flare = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg height="${"24px"}" viewBox="${"0 0 24 24"}" width="${"24px"}"><path d="${"M0 0h24v24H0V0z"}" fill="${"none"}"></path><path d="${"M7 11H1v2h6v-2zm2.17-3.24L7.05 5.64 5.64 7.05l2.12 2.12 1.41-1.41zM13 1h-2v6h2V1zm5.36 6.05l-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12zM17 11v2h6v-2h-6zm-5-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm2.83 7.24l2.12 2.12 1.41-1.41-2.12-2.12-1.41 1.41zm-9.19.71l1.41 1.41 2.12-2.12-1.41-1.41-2.12 2.12zM11 23h2v-6h-2v6z"}"></path></svg>`;
});
const Weight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg height="${"24px"}" viewBox="${"0 0 24 24"}" width="${"24px"}"><path d="${"M0 0h24v24H0V0z"}" fill="${"none"}"></path><path d="${"M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"}"></path></svg>`;
});
var Tenet_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".tenet.svelte-lx1bkj{border-radius:var(--border-radius);padding:8px 16px 8px 32px;position:relative;margin-bottom:0;line-height:1.6em;letter-spacing:0.015em;font-weight:400;font-size:14px}.tenet.svelte-lx1bkj:last-of-type{margin-bottom:32px !important}.tenet.svelte-lx1bkj::before{content:'';position:absolute;top:8px;left:16px;border-radius:4px;height:calc(100% - 16px);width:4px;z-index:2;background-color:var(--interactive-color)}",
  map: null
};
const Tenet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$b);
  return `<p class="${"tenet svelte-lx1bkj"}">${slots.default ? slots.default({}) : ``}
</p>`;
});
var CampaignNotYetLiveModal_svelte_svelte_type_style_lang = "";
const css$a = {
  code: "h4.svelte-1ex3pjx{margin-top:32px}.pipelines.svelte-1ex3pjx{margin-bottom:4px}",
  map: null
};
const CampaignNotYetLiveModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isDisplayed } = $$props;
  if ($$props.isDisplayed === void 0 && $$bindings.isDisplayed && isDisplayed !== void 0)
    $$bindings.isDisplayed(isDisplayed);
  $$result.css.add(css$a);
  return `${validate_component(Modal, "Modal").$$render($$result, {
    shouldDisplayCloseButton: false,
    isDisplayed,
    maxWidth: 750,
    isAnimated: true
  }, {}, {
    actions: () => {
      return `<div slot="${"actions"}"><button class="${"primary"}">Got it!</button></div>`;
    },
    content: () => {
      return `<div slot="${"content"}"><h2>This campaign is not live... Yet!</h2>
    <p>While this campaign is likely to be in the spirit of what Late-Stage will do, this page is not
      completely functional and is intended to serve as an example of the capabilities of the
      platform as a springboard for discussion.
    </p>

    <h4 class="${"svelte-1ex3pjx"}">We need your insight!</h4>

    <p>We need passionate advocates and subject-matter experts like you to help craft the perfect
      first campaign! Whether your specialization is in economics, legal, sociology, marketing,
      content strategy, copy editing, project management, development or any other peripheral
      disciplines, we need your input to deliver the most widespread and impactful campaigns
      possible.
    </p>

    <h4 class="${"svelte-1ex3pjx"}">Submit your ideas</h4>
    <p>We&#39;ve opened the following pipelines for suggestions:</p>

    <p class="${"pipelines svelte-1ex3pjx"}">Campaign ideas: <a href="${"https://late-stage.com/campaign-rfcs#campaign-idea-template"}" target="${"_blank"}">late-stage.com/campaign-rfcs#campaign-idea-template</a></p>
    <p class="${"pipelines svelte-1ex3pjx"}">Checklist ideas: <a href="${"https://late-stage.com/checklist-rfcs#checklist-idea-template"}" target="${"_blank"}">late-stage.com/checklist-rfcs#checklist-idea-template</a></p>
    <p class="${"pipelines svelte-1ex3pjx"}">Audit the platform here: <a href="${"https://late-stage.com/audit#audit-report-template"}" target="${"_blank"}">late-stage.com/audit#audit-report-template</a></p></div>`;
    }
  })}`;
});
function isOutOfViewport(parent, container) {
  const parentBounding = parent.getBoundingClientRect();
  const boundingContainer = container.getBoundingClientRect();
  const out = {};
  out.top = parentBounding.top < 0;
  out.left = parentBounding.left < 0;
  out.bottom = parentBounding.bottom + boundingContainer.height > (window.innerHeight || document.documentElement.clientHeight);
  out.right = parentBounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;
  return out;
}
var Item_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: ".item.svelte-3e0qet{cursor:default;height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--itemPadding, 0 20px);color:var(--itemColor, inherit);text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.groupHeader.svelte-3e0qet{text-transform:var(--groupTitleTextTransform, uppercase)}.groupItem.svelte-3e0qet{padding-left:var(--groupItemPaddingLeft, 40px)}.item.svelte-3e0qet:active{background:var(--itemActiveBackground, #b9daff)}.item.active.svelte-3e0qet{background:var(--itemIsActiveBG, #007aff);color:var(--itemIsActiveColor, #fff)}.item.notSelectable.svelte-3e0qet{color:var(--itemIsNotSelectableColor, #999)}.item.first.svelte-3e0qet{border-radius:var(--itemFirstBorderRadius, 4px 4px 0 0)}.item.hover.svelte-3e0qet:not(.active){background:var(--itemHoverBG, #e7f2ff);color:var(--itemHoverColor, inherit)}",
  map: null
};
const Item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isActive = false } = $$props;
  let { isFirst = false } = $$props;
  let { isHover = false } = $$props;
  let { isSelectable = false } = $$props;
  let { getOptionLabel = void 0 } = $$props;
  let { item = void 0 } = $$props;
  let { filterText = "" } = $$props;
  let itemClasses = "";
  if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
    $$bindings.isActive(isActive);
  if ($$props.isFirst === void 0 && $$bindings.isFirst && isFirst !== void 0)
    $$bindings.isFirst(isFirst);
  if ($$props.isHover === void 0 && $$bindings.isHover && isHover !== void 0)
    $$bindings.isHover(isHover);
  if ($$props.isSelectable === void 0 && $$bindings.isSelectable && isSelectable !== void 0)
    $$bindings.isSelectable(isSelectable);
  if ($$props.getOptionLabel === void 0 && $$bindings.getOptionLabel && getOptionLabel !== void 0)
    $$bindings.getOptionLabel(getOptionLabel);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0)
    $$bindings.filterText(filterText);
  $$result.css.add(css$9);
  {
    {
      const classes = [];
      if (isActive) {
        classes.push("active");
      }
      if (isFirst) {
        classes.push("first");
      }
      if (isHover) {
        classes.push("hover");
      }
      if (item.isGroupHeader) {
        classes.push("groupHeader");
      }
      if (item.isGroupItem) {
        classes.push("groupItem");
      }
      if (!isSelectable) {
        classes.push("notSelectable");
      }
      itemClasses = classes.join(" ");
    }
  }
  return `<div class="${"item " + escape(itemClasses) + " svelte-3e0qet"}"><!-- HTML_TAG_START -->${getOptionLabel(item, filterText)}<!-- HTML_TAG_END --></div>`;
});
var List_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".listContainer.svelte-1uyqfml{box-shadow:var(--listShadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));border-radius:var(--listBorderRadius, 4px);max-height:var(--listMaxHeight, 250px);overflow-y:auto;background:var(--listBackground, #fff);border:var(--listBorder, none);position:var(--listPosition, absolute);z-index:var(--listZIndex, 2);width:100%;left:var(--listLeft, 0);right:var(--listRight, 0)}.virtualList.svelte-1uyqfml{height:var(--virtualListHeight, 200px)}.listGroupTitle.svelte-1uyqfml{color:var(--groupTitleColor, #8f8f8f);cursor:default;font-size:var(--groupTitleFontSize, 12px);font-weight:var(--groupTitleFontWeight, 600);height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--groupTitlePadding, 0 20px);text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:var(--groupTitleTextTransform, uppercase)}.empty.svelte-1uyqfml{text-align:var(--listEmptyTextAlign, center);padding:var(--listEmptyPadding, 20px 0);color:var(--listEmptyColor, #78848f)}",
  map: null
};
function isItemActive(item, value, optionIdentifier) {
  return value && value[optionIdentifier] === item[optionIdentifier];
}
function isItemFirst(itemIndex) {
  return itemIndex === 0;
}
function isItemHover(hoverItemIndex, item, itemIndex, items) {
  return isItemSelectable(item) && (hoverItemIndex === itemIndex || items.length === 1);
}
function isItemSelectable(item) {
  return item.isGroupHeader && item.isSelectable || item.selectable || !item.hasOwnProperty("selectable");
}
const List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { container = void 0 } = $$props;
  let { VirtualList: VirtualList2 = null } = $$props;
  let { Item: Item$1 = Item } = $$props;
  let { isVirtualList = false } = $$props;
  let { items = [] } = $$props;
  let { labelIdentifier = "label" } = $$props;
  let { getOptionLabel = (option, filterText2) => {
    if (option)
      return option.isCreator ? `Create "${filterText2}"` : option[labelIdentifier];
  } } = $$props;
  let { getGroupHeaderLabel = null } = $$props;
  let { itemHeight = 40 } = $$props;
  let { hoverItemIndex = 0 } = $$props;
  let { value = void 0 } = $$props;
  let { optionIdentifier = "value" } = $$props;
  let { hideEmptyState = false } = $$props;
  let { noOptionsMessage = "No options" } = $$props;
  let { isMulti = false } = $$props;
  let { activeItemIndex = 0 } = $$props;
  let { filterText = "" } = $$props;
  let { parent = null } = $$props;
  let { listPlacement = null } = $$props;
  let { listAutoWidth = null } = $$props;
  let { listOffset = 5 } = $$props;
  let listStyle;
  function computePlacement() {
    const { height, width } = parent.getBoundingClientRect();
    listStyle = "";
    listStyle += `min-width:${width}px;width:${listAutoWidth ? "auto" : "100%"};`;
    if (listPlacement === "top" || listPlacement === "auto" && isOutOfViewport(parent, container).bottom) {
      listStyle += `bottom:${height + listOffset}px;`;
    } else {
      listStyle += `top:${height + listOffset}px;`;
    }
  }
  if ($$props.container === void 0 && $$bindings.container && container !== void 0)
    $$bindings.container(container);
  if ($$props.VirtualList === void 0 && $$bindings.VirtualList && VirtualList2 !== void 0)
    $$bindings.VirtualList(VirtualList2);
  if ($$props.Item === void 0 && $$bindings.Item && Item$1 !== void 0)
    $$bindings.Item(Item$1);
  if ($$props.isVirtualList === void 0 && $$bindings.isVirtualList && isVirtualList !== void 0)
    $$bindings.isVirtualList(isVirtualList);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.labelIdentifier === void 0 && $$bindings.labelIdentifier && labelIdentifier !== void 0)
    $$bindings.labelIdentifier(labelIdentifier);
  if ($$props.getOptionLabel === void 0 && $$bindings.getOptionLabel && getOptionLabel !== void 0)
    $$bindings.getOptionLabel(getOptionLabel);
  if ($$props.getGroupHeaderLabel === void 0 && $$bindings.getGroupHeaderLabel && getGroupHeaderLabel !== void 0)
    $$bindings.getGroupHeaderLabel(getGroupHeaderLabel);
  if ($$props.itemHeight === void 0 && $$bindings.itemHeight && itemHeight !== void 0)
    $$bindings.itemHeight(itemHeight);
  if ($$props.hoverItemIndex === void 0 && $$bindings.hoverItemIndex && hoverItemIndex !== void 0)
    $$bindings.hoverItemIndex(hoverItemIndex);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.optionIdentifier === void 0 && $$bindings.optionIdentifier && optionIdentifier !== void 0)
    $$bindings.optionIdentifier(optionIdentifier);
  if ($$props.hideEmptyState === void 0 && $$bindings.hideEmptyState && hideEmptyState !== void 0)
    $$bindings.hideEmptyState(hideEmptyState);
  if ($$props.noOptionsMessage === void 0 && $$bindings.noOptionsMessage && noOptionsMessage !== void 0)
    $$bindings.noOptionsMessage(noOptionsMessage);
  if ($$props.isMulti === void 0 && $$bindings.isMulti && isMulti !== void 0)
    $$bindings.isMulti(isMulti);
  if ($$props.activeItemIndex === void 0 && $$bindings.activeItemIndex && activeItemIndex !== void 0)
    $$bindings.activeItemIndex(activeItemIndex);
  if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0)
    $$bindings.filterText(filterText);
  if ($$props.parent === void 0 && $$bindings.parent && parent !== void 0)
    $$bindings.parent(parent);
  if ($$props.listPlacement === void 0 && $$bindings.listPlacement && listPlacement !== void 0)
    $$bindings.listPlacement(listPlacement);
  if ($$props.listAutoWidth === void 0 && $$bindings.listAutoWidth && listAutoWidth !== void 0)
    $$bindings.listAutoWidth(listAutoWidth);
  if ($$props.listOffset === void 0 && $$bindings.listOffset && listOffset !== void 0)
    $$bindings.listOffset(listOffset);
  $$result.css.add(css$8);
  {
    {
      if (parent && container)
        computePlacement();
    }
  }
  return `

<div class="${["listContainer svelte-1uyqfml", isVirtualList ? "virtualList" : ""].join(" ").trim()}"${add_attribute("style", listStyle, 0)}${add_attribute("this", container, 0)}>${isVirtualList ? `${validate_component(VirtualList2 || missing_component, "svelte:component").$$render($$result, { items, itemHeight }, {}, {
    default: ({ item, i }) => {
      return `<div class="${"listItem"}">${validate_component(Item$1 || missing_component, "svelte:component").$$render($$result, {
        item,
        filterText,
        getOptionLabel,
        isFirst: isItemFirst(i),
        isActive: isItemActive(item, value, optionIdentifier),
        isHover: isItemHover(hoverItemIndex, item, i, items),
        isSelectable: isItemSelectable(item)
      }, {}, {})}</div>`;
    }
  })}` : `${items.length ? each(items, (item, i) => {
    return `${item.isGroupHeader && !item.isSelectable ? `<div class="${"listGroupTitle svelte-1uyqfml"}">${escape(getGroupHeaderLabel(item))}</div>` : `<div class="${"listItem"}" tabindex="${"-1"}">${validate_component(Item$1 || missing_component, "svelte:component").$$render($$result, {
      item,
      filterText,
      getOptionLabel,
      isFirst: isItemFirst(i),
      isActive: isItemActive(item, value, optionIdentifier),
      isHover: isItemHover(hoverItemIndex, item, i, items),
      isSelectable: isItemSelectable(item)
    }, {}, {})}
                </div>`}`;
  }) : `${!hideEmptyState ? `<div class="${"empty svelte-1uyqfml"}">${escape(noOptionsMessage)}</div>` : ``}`}`}</div>`;
});
var Selection_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".selection.svelte-pu1q1n{text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap}",
  map: null
};
const Selection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { getSelectionLabel = void 0 } = $$props;
  let { item = void 0 } = $$props;
  if ($$props.getSelectionLabel === void 0 && $$bindings.getSelectionLabel && getSelectionLabel !== void 0)
    $$bindings.getSelectionLabel(getSelectionLabel);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$7);
  return `<div class="${"selection svelte-pu1q1n"}"><!-- HTML_TAG_START -->${getSelectionLabel(item)}<!-- HTML_TAG_END --></div>`;
});
var MultiSelection_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".multiSelectItem.svelte-liu9pa.svelte-liu9pa{background:var(--multiItemBG, #ebedef);margin:var(--multiItemMargin, 5px 5px 0 0);border-radius:var(--multiItemBorderRadius, 16px);height:var(--multiItemHeight, 32px);line-height:var(--multiItemHeight, 32px);display:flex;cursor:default;padding:var(--multiItemPadding, 0 10px 0 15px);max-width:100%}.multiSelectItem_label.svelte-liu9pa.svelte-liu9pa{margin:var(--multiLabelMargin, 0 5px 0 0);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.multiSelectItem.svelte-liu9pa.svelte-liu9pa:hover,.multiSelectItem.active.svelte-liu9pa.svelte-liu9pa{background-color:var(--multiItemActiveBG, #006fff);color:var(--multiItemActiveColor, #fff)}.multiSelectItem.disabled.svelte-liu9pa.svelte-liu9pa:hover{background:var(--multiItemDisabledHoverBg, #ebedef);color:var(--multiItemDisabledHoverColor, #c1c6cc)}.multiSelectItem_clear.svelte-liu9pa.svelte-liu9pa{border-radius:var(--multiClearRadius, 50%);background:var(--multiClearBG, #52616f);min-width:var(--multiClearWidth, 16px);max-width:var(--multiClearWidth, 16px);height:var(--multiClearHeight, 16px);position:relative;top:var(--multiClearTop, 8px);text-align:var(--multiClearTextAlign, center);padding:var(--multiClearPadding, 1px)}.multiSelectItem_clear.svelte-liu9pa.svelte-liu9pa:hover,.active.svelte-liu9pa .multiSelectItem_clear.svelte-liu9pa{background:var(--multiClearHoverBG, #fff)}.multiSelectItem_clear.svelte-liu9pa:hover svg.svelte-liu9pa,.active.svelte-liu9pa .multiSelectItem_clear svg.svelte-liu9pa{fill:var(--multiClearHoverFill, #006fff)}.multiSelectItem_clear.svelte-liu9pa svg.svelte-liu9pa{fill:var(--multiClearFill, #ebedef);vertical-align:top}",
  map: null
};
const MultiSelection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { value = [] } = $$props;
  let { activeValue = void 0 } = $$props;
  let { isDisabled = false } = $$props;
  let { multiFullItemClearable = false } = $$props;
  let { getSelectionLabel = void 0 } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.activeValue === void 0 && $$bindings.activeValue && activeValue !== void 0)
    $$bindings.activeValue(activeValue);
  if ($$props.isDisabled === void 0 && $$bindings.isDisabled && isDisabled !== void 0)
    $$bindings.isDisabled(isDisabled);
  if ($$props.multiFullItemClearable === void 0 && $$bindings.multiFullItemClearable && multiFullItemClearable !== void 0)
    $$bindings.multiFullItemClearable(multiFullItemClearable);
  if ($$props.getSelectionLabel === void 0 && $$bindings.getSelectionLabel && getSelectionLabel !== void 0)
    $$bindings.getSelectionLabel(getSelectionLabel);
  $$result.css.add(css$6);
  return `${each(value, (item, i) => {
    return `<div class="${"multiSelectItem " + escape(activeValue === i ? "active" : "") + " " + escape(isDisabled ? "disabled" : "") + " svelte-liu9pa"}"><div class="${"multiSelectItem_label svelte-liu9pa"}"><!-- HTML_TAG_START -->${getSelectionLabel(item)}<!-- HTML_TAG_END --></div>
        ${!isDisabled && !multiFullItemClearable ? `<div class="${"multiSelectItem_clear svelte-liu9pa"}"><svg width="${"100%"}" height="${"100%"}" viewBox="${"-2 -2 50 50"}" focusable="${"false"}" aria-hidden="${"true"}" role="${"presentation"}" class="${"svelte-liu9pa"}"><path d="${"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"}"></path></svg>
            </div>` : ``}
    </div>`;
  })}`;
});
var VirtualList_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "svelte-virtual-list-viewport.svelte-g2cagw{position:relative;overflow-y:auto;-webkit-overflow-scrolling:touch;display:block}svelte-virtual-list-contents.svelte-g2cagw,svelte-virtual-list-row.svelte-g2cagw{display:block}svelte-virtual-list-row.svelte-g2cagw{overflow:hidden}",
  map: null
};
const VirtualList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = void 0 } = $$props;
  let { height = "100%" } = $$props;
  let { itemHeight = 40 } = $$props;
  let { hoverItemIndex = 0 } = $$props;
  let { start = 0 } = $$props;
  let { end = 0 } = $$props;
  let viewport;
  let contents;
  let visible;
  let top = 0;
  let bottom = 0;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  if ($$props.itemHeight === void 0 && $$bindings.itemHeight && itemHeight !== void 0)
    $$bindings.itemHeight(itemHeight);
  if ($$props.hoverItemIndex === void 0 && $$bindings.hoverItemIndex && hoverItemIndex !== void 0)
    $$bindings.hoverItemIndex(hoverItemIndex);
  if ($$props.start === void 0 && $$bindings.start && start !== void 0)
    $$bindings.start(start);
  if ($$props.end === void 0 && $$bindings.end && end !== void 0)
    $$bindings.end(end);
  $$result.css.add(css$5);
  visible = items.slice(start, end).map((data, i) => {
    return { index: i + start, data };
  });
  return `<svelte-virtual-list-viewport style="${"height: " + escape(height) + ";"}" class="${"svelte-g2cagw"}"${add_attribute("this", viewport, 0)}><svelte-virtual-list-contents style="${"padding-top: " + escape(top) + "px; padding-bottom: " + escape(bottom) + "px;"}" class="${"svelte-g2cagw"}"${add_attribute("this", contents, 0)}>${each(visible, (row) => {
    return `<svelte-virtual-list-row class="${"svelte-g2cagw"}">${slots.default ? slots.default({
      item: row.data,
      i: row.index,
      hoverItemIndex
    }) : `Missing template`}
            </svelte-virtual-list-row>`;
  })}</svelte-virtual-list-contents></svelte-virtual-list-viewport>`;
});
const ClearIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="${"100%"}" height="${"100%"}" viewBox="${"-2 -2 50 50"}" focusable="${"false"}" aria-hidden="${"true"}" role="${"presentation"}"><path fill="${"currentColor"}" d="${"M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124\n    l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"}"></path></svg>`;
});
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    let context = this;
    let args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow)
      func.apply(context, args);
  };
}
var Select_svelte_svelte_type_style_lang = "";
const { Object: Object_1 } = globals;
const css$4 = {
  code: ".selectContainer.svelte-17l1npl.svelte-17l1npl{--internalPadding:0 16px;border:var(--border, 1px solid #d8dbdf);border-radius:var(--borderRadius, 3px);box-sizing:border-box;height:var(--height, 42px);position:relative;display:flex;align-items:center;padding:var(--padding, var(--internalPadding));background:var(--background, #fff);margin:var(--margin, 0)}.selectContainer.svelte-17l1npl input.svelte-17l1npl{cursor:default;border:none;color:var(--inputColor, #3f4f5f);height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--inputPadding, var(--padding, var(--internalPadding)));width:100%;background:transparent;font-size:var(--inputFontSize, 14px);letter-spacing:var(--inputLetterSpacing, -0.08px);position:absolute;left:var(--inputLeft, 0);margin:var(--inputMargin, 0)}.selectContainer.svelte-17l1npl input.svelte-17l1npl::placeholder{color:var(--placeholderColor, #78848f);opacity:var(--placeholderOpacity, 1)}.selectContainer.svelte-17l1npl input.svelte-17l1npl:focus{outline:none}.selectContainer.svelte-17l1npl.svelte-17l1npl:hover{border-color:var(--borderHoverColor, #b2b8bf)}.selectContainer.focused.svelte-17l1npl.svelte-17l1npl{border-color:var(--borderFocusColor, #006fe8)}.selectContainer.disabled.svelte-17l1npl.svelte-17l1npl{background:var(--disabledBackground, #ebedef);border-color:var(--disabledBorderColor, #ebedef);color:var(--disabledColor, #c1c6cc)}.selectContainer.disabled.svelte-17l1npl input.svelte-17l1npl::placeholder{color:var(--disabledPlaceholderColor, #c1c6cc);opacity:var(--disabledPlaceholderOpacity, 1)}.selectedItem.svelte-17l1npl.svelte-17l1npl{line-height:var(--height, 42px);height:var(--height, 42px);overflow-x:hidden;padding:var(--selectedItemPadding, 0 20px 0 0)}.selectedItem.svelte-17l1npl.svelte-17l1npl:focus{outline:none}.clearSelect.svelte-17l1npl.svelte-17l1npl{position:absolute;right:var(--clearSelectRight, 10px);top:var(--clearSelectTop, 11px);bottom:var(--clearSelectBottom, 11px);width:var(--clearSelectWidth, 20px);color:var(--clearSelectColor, #c5cacf);flex:none !important}.clearSelect.svelte-17l1npl.svelte-17l1npl:hover{color:var(--clearSelectHoverColor, #2c3e50)}.selectContainer.focused.svelte-17l1npl .clearSelect.svelte-17l1npl{color:var(--clearSelectFocusColor, #3f4f5f)}.indicator.svelte-17l1npl.svelte-17l1npl{position:absolute;right:var(--indicatorRight, 10px);top:var(--indicatorTop, 11px);width:var(--indicatorWidth, 20px);height:var(--indicatorHeight, 20px);color:var(--indicatorColor, #c5cacf)}.indicator.svelte-17l1npl svg.svelte-17l1npl{display:inline-block;fill:var(--indicatorFill, currentcolor);line-height:1;stroke:var(--indicatorStroke, currentcolor);stroke-width:0}.spinner.svelte-17l1npl.svelte-17l1npl{position:absolute;right:var(--spinnerRight, 10px);top:var(--spinnerLeft, 11px);width:var(--spinnerWidth, 20px);height:var(--spinnerHeight, 20px);color:var(--spinnerColor, #51ce6c);animation:svelte-17l1npl-rotate 0.75s linear infinite}.spinner_icon.svelte-17l1npl.svelte-17l1npl{display:block;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;-webkit-transform:none}.spinner_path.svelte-17l1npl.svelte-17l1npl{stroke-dasharray:90;stroke-linecap:round}.multiSelect.svelte-17l1npl.svelte-17l1npl{display:flex;padding:var(--multiSelectPadding, 0 35px 0 16px);height:auto;flex-wrap:wrap;align-items:stretch}.multiSelect.svelte-17l1npl>.svelte-17l1npl{flex:1 1 50px}.selectContainer.multiSelect.svelte-17l1npl input.svelte-17l1npl{padding:var(--multiSelectInputPadding, 0);position:relative;margin:var(--multiSelectInputMargin, 0)}.hasError.svelte-17l1npl.svelte-17l1npl{border:var(--errorBorder, 1px solid #ff2d55);background:var(--errorBackground, #fff)}.a11yText.svelte-17l1npl.svelte-17l1npl{z-index:9999;border:0px;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0px;white-space:nowrap}@keyframes svelte-17l1npl-rotate{100%{transform:rotate(360deg)}}",
  map: null
};
function convertStringItemsToObjects(_items) {
  return _items.map((item, index) => {
    return { index, value: item, label: `${item}` };
  });
}
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredItems;
  let showSelectedItem;
  let showClearIcon;
  let placeholderText;
  let showMultiSelect;
  let listProps;
  let ariaSelection;
  let ariaContext;
  const dispatch = createEventDispatcher();
  let { id = null } = $$props;
  let { container = void 0 } = $$props;
  let { input = void 0 } = $$props;
  let { isMulti = false } = $$props;
  let { multiFullItemClearable = false } = $$props;
  let { isDisabled = false } = $$props;
  let { isCreatable = false } = $$props;
  let { isFocused = false } = $$props;
  let { value = null } = $$props;
  let { filterText = "" } = $$props;
  let { placeholder = "Select..." } = $$props;
  let { placeholderAlwaysShow = false } = $$props;
  let { items = null } = $$props;
  let { itemFilter = (label, filterText2, option) => `${label}`.toLowerCase().includes(filterText2.toLowerCase()) } = $$props;
  let { groupBy = void 0 } = $$props;
  let { groupFilter = (groups) => groups } = $$props;
  let { isGroupHeaderSelectable = false } = $$props;
  let { getGroupHeaderLabel = (option) => {
    return option[labelIdentifier] || option.id;
  } } = $$props;
  let { labelIdentifier = "label" } = $$props;
  let { getOptionLabel = (option, filterText2) => {
    return option.isCreator ? `Create "${filterText2}"` : option[labelIdentifier];
  } } = $$props;
  let { optionIdentifier = "value" } = $$props;
  let { loadOptions = void 0 } = $$props;
  let { hasError = false } = $$props;
  let { containerStyles = "" } = $$props;
  let { getSelectionLabel = (option) => {
    if (option)
      return option[labelIdentifier];
    else
      return null;
  } } = $$props;
  let { createGroupHeaderItem = (groupValue) => {
    return { value: groupValue, label: groupValue };
  } } = $$props;
  let { createItem = (filterText2) => {
    return { value: filterText2, label: filterText2 };
  } } = $$props;
  const getFilteredItems = () => {
    return filteredItems;
  };
  let { isSearchable = true } = $$props;
  let { inputStyles = "" } = $$props;
  let { isClearable = true } = $$props;
  let { isWaiting = false } = $$props;
  let { listPlacement = "auto" } = $$props;
  let { listOpen = false } = $$props;
  let { isVirtualList = false } = $$props;
  let { loadOptionsInterval = 300 } = $$props;
  let { noOptionsMessage = "No options" } = $$props;
  let { hideEmptyState = false } = $$props;
  let { inputAttributes = {} } = $$props;
  let { listAutoWidth = true } = $$props;
  let { itemHeight = 40 } = $$props;
  let { Icon = void 0 } = $$props;
  let { iconProps = {} } = $$props;
  let { showChevron = false } = $$props;
  let { showIndicator = false } = $$props;
  let { containerClasses = "" } = $$props;
  let { indicatorSvg = void 0 } = $$props;
  let { listOffset = 5 } = $$props;
  let { ClearIcon: ClearIcon$1 = ClearIcon } = $$props;
  let { Item: Item$1 = Item } = $$props;
  let { List: List$1 = List } = $$props;
  let { Selection: Selection$1 = Selection } = $$props;
  let { MultiSelection: MultiSelection$1 = MultiSelection } = $$props;
  let { VirtualList: VirtualList$1 = VirtualList } = $$props;
  function filterMethod(args) {
    if (args.loadOptions && args.filterText.length > 0)
      return;
    if (!args.items)
      return [];
    if (args.items && args.items.length > 0 && typeof args.items[0] !== "object") {
      args.items = convertStringItemsToObjects(args.items);
    }
    let filterResults = args.items.filter((item) => {
      let matchesFilter = itemFilter(getOptionLabel(item, args.filterText), args.filterText, item);
      if (matchesFilter && args.isMulti && args.value && Array.isArray(args.value)) {
        matchesFilter = !args.value.some((x) => {
          return x[args.optionIdentifier] === item[args.optionIdentifier];
        });
      }
      return matchesFilter;
    });
    if (args.groupBy) {
      filterResults = filterGroupedItems(filterResults);
    }
    if (args.isCreatable) {
      filterResults = addCreatableItem(filterResults, args.filterText);
    }
    return filterResults;
  }
  function addCreatableItem(_items, _filterText) {
    if (_filterText.length === 0)
      return _items;
    const itemToCreate = createItem(_filterText);
    if (_items[0] && _filterText === _items[0][labelIdentifier])
      return _items;
    itemToCreate.isCreator = true;
    return [..._items, itemToCreate];
  }
  let { selectedValue = null } = $$props;
  let activeValue;
  let prev_value;
  let prev_filterText;
  let prev_isFocused;
  let hoverItemIndex;
  const getItems = debounce(async () => {
    isWaiting = true;
    let res = await loadOptions(filterText).catch((err) => {
      console.warn("svelte-select loadOptions error :>> ", err);
      dispatch("error", { type: "loadOptions", details: err });
    });
    if (res && !res.cancelled) {
      if (res) {
        if (res && res.length > 0 && typeof res[0] !== "object") {
          res = convertStringItemsToObjects(res);
        }
        filteredItems = [...res];
        dispatch("loaded", { items: filteredItems });
      } else {
        filteredItems = [];
      }
      if (isCreatable) {
        filteredItems = addCreatableItem(filteredItems, filterText);
      }
      isWaiting = false;
      isFocused = true;
      listOpen = true;
    }
  }, loadOptionsInterval);
  function setValue() {
    if (typeof value === "string") {
      value = { [optionIdentifier]: value, label: value };
    } else if (isMulti && Array.isArray(value) && value.length > 0) {
      value = value.map((item) => typeof item === "string" ? { value: item, label: item } : item);
    }
  }
  let _inputAttributes;
  function assignInputAttributes() {
    _inputAttributes = Object.assign({
      autocapitalize: "none",
      autocomplete: "off",
      autocorrect: "off",
      spellcheck: false,
      tabindex: 0,
      type: "text",
      "aria-autocomplete": "list"
    }, inputAttributes);
    if (id) {
      _inputAttributes.id = id;
    }
    if (!isSearchable) {
      _inputAttributes.readonly = true;
    }
  }
  function filterGroupedItems(_items) {
    const groupValues = [];
    const groups = {};
    _items.forEach((item) => {
      const groupValue = groupBy(item);
      if (!groupValues.includes(groupValue)) {
        groupValues.push(groupValue);
        groups[groupValue] = [];
        if (groupValue) {
          groups[groupValue].push(Object.assign(createGroupHeaderItem(groupValue, item), {
            id: groupValue,
            isGroupHeader: true,
            isSelectable: isGroupHeaderSelectable
          }));
        }
      }
      groups[groupValue].push(Object.assign({ isGroupItem: !!groupValue }, item));
    });
    const sortedGroupedItems = [];
    groupFilter(groupValues).forEach((groupValue) => {
      sortedGroupedItems.push(...groups[groupValue]);
    });
    return sortedGroupedItems;
  }
  function dispatchSelectedItem() {
    if (isMulti) {
      if (JSON.stringify(value) !== JSON.stringify(prev_value)) {
        if (checkValueForDuplicates()) {
          dispatch("select", value);
        }
      }
      return;
    }
    {
      dispatch("select", value);
    }
  }
  function setupFocus() {
    if (isFocused || listOpen) {
      handleFocus();
    } else {
      if (input)
        input.blur();
    }
  }
  function setupMulti() {
    if (value) {
      if (Array.isArray(value)) {
        value = [...value];
      } else {
        value = [value];
      }
    }
  }
  function setupFilterText() {
    if (filterText.length === 0)
      return;
    isFocused = true;
    listOpen = true;
    if (loadOptions) {
      getItems();
    } else {
      listOpen = true;
      if (isMulti) {
        activeValue = void 0;
      }
    }
  }
  function checkValueForDuplicates() {
    let noDuplicates = true;
    if (value) {
      const ids = [];
      const uniqueValues = [];
      value.forEach((val) => {
        if (!ids.includes(val[optionIdentifier])) {
          ids.push(val[optionIdentifier]);
          uniqueValues.push(val);
        } else {
          noDuplicates = false;
        }
      });
      if (!noDuplicates)
        value = uniqueValues;
    }
    return noDuplicates;
  }
  function findItem(selection) {
    let matchTo = selection ? selection[optionIdentifier] : value[optionIdentifier];
    return items.find((item) => item[optionIdentifier] === matchTo);
  }
  function updateValueDisplay(items2) {
    if (!items2 || items2.length === 0 || items2.some((item) => typeof item !== "object"))
      return;
    if (!value || (isMulti ? value.some((selection) => !selection || !selection[optionIdentifier]) : !value[optionIdentifier]))
      return;
    if (Array.isArray(value)) {
      value = value.map((selection) => findItem(selection) || selection);
    } else {
      value = findItem() || value;
    }
  }
  function handleFocus() {
    isFocused = true;
    if (input)
      input.focus();
  }
  function handleClear() {
    value = void 0;
    listOpen = false;
    dispatch("clear", value);
    handleFocus();
  }
  let { ariaValues = (values) => {
    return `Option ${values}, selected.`;
  } } = $$props;
  let { ariaListOpen = (label, count) => {
    return `You are currently focused on option ${label}. There are ${count} results available.`;
  } } = $$props;
  let { ariaFocused = () => {
    return `Select is focused, type to refine list, press down to open the menu.`;
  } } = $$props;
  function handleAriaSelection() {
    let selected = void 0;
    if (isMulti && value.length > 0) {
      selected = value.map((v) => getSelectionLabel(v)).join(", ");
    } else {
      selected = getSelectionLabel(value);
    }
    return ariaValues(selected);
  }
  function handleAriaContent() {
    if (!isFocused || !filteredItems || filteredItems.length === 0)
      return "";
    let _item = filteredItems[hoverItemIndex];
    if (listOpen && _item) {
      let label = getSelectionLabel(_item);
      let count = filteredItems ? filteredItems.length : 0;
      return ariaListOpen(label, count);
    } else {
      return ariaFocused();
    }
  }
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.container === void 0 && $$bindings.container && container !== void 0)
    $$bindings.container(container);
  if ($$props.input === void 0 && $$bindings.input && input !== void 0)
    $$bindings.input(input);
  if ($$props.isMulti === void 0 && $$bindings.isMulti && isMulti !== void 0)
    $$bindings.isMulti(isMulti);
  if ($$props.multiFullItemClearable === void 0 && $$bindings.multiFullItemClearable && multiFullItemClearable !== void 0)
    $$bindings.multiFullItemClearable(multiFullItemClearable);
  if ($$props.isDisabled === void 0 && $$bindings.isDisabled && isDisabled !== void 0)
    $$bindings.isDisabled(isDisabled);
  if ($$props.isCreatable === void 0 && $$bindings.isCreatable && isCreatable !== void 0)
    $$bindings.isCreatable(isCreatable);
  if ($$props.isFocused === void 0 && $$bindings.isFocused && isFocused !== void 0)
    $$bindings.isFocused(isFocused);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.filterText === void 0 && $$bindings.filterText && filterText !== void 0)
    $$bindings.filterText(filterText);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.placeholderAlwaysShow === void 0 && $$bindings.placeholderAlwaysShow && placeholderAlwaysShow !== void 0)
    $$bindings.placeholderAlwaysShow(placeholderAlwaysShow);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.itemFilter === void 0 && $$bindings.itemFilter && itemFilter !== void 0)
    $$bindings.itemFilter(itemFilter);
  if ($$props.groupBy === void 0 && $$bindings.groupBy && groupBy !== void 0)
    $$bindings.groupBy(groupBy);
  if ($$props.groupFilter === void 0 && $$bindings.groupFilter && groupFilter !== void 0)
    $$bindings.groupFilter(groupFilter);
  if ($$props.isGroupHeaderSelectable === void 0 && $$bindings.isGroupHeaderSelectable && isGroupHeaderSelectable !== void 0)
    $$bindings.isGroupHeaderSelectable(isGroupHeaderSelectable);
  if ($$props.getGroupHeaderLabel === void 0 && $$bindings.getGroupHeaderLabel && getGroupHeaderLabel !== void 0)
    $$bindings.getGroupHeaderLabel(getGroupHeaderLabel);
  if ($$props.labelIdentifier === void 0 && $$bindings.labelIdentifier && labelIdentifier !== void 0)
    $$bindings.labelIdentifier(labelIdentifier);
  if ($$props.getOptionLabel === void 0 && $$bindings.getOptionLabel && getOptionLabel !== void 0)
    $$bindings.getOptionLabel(getOptionLabel);
  if ($$props.optionIdentifier === void 0 && $$bindings.optionIdentifier && optionIdentifier !== void 0)
    $$bindings.optionIdentifier(optionIdentifier);
  if ($$props.loadOptions === void 0 && $$bindings.loadOptions && loadOptions !== void 0)
    $$bindings.loadOptions(loadOptions);
  if ($$props.hasError === void 0 && $$bindings.hasError && hasError !== void 0)
    $$bindings.hasError(hasError);
  if ($$props.containerStyles === void 0 && $$bindings.containerStyles && containerStyles !== void 0)
    $$bindings.containerStyles(containerStyles);
  if ($$props.getSelectionLabel === void 0 && $$bindings.getSelectionLabel && getSelectionLabel !== void 0)
    $$bindings.getSelectionLabel(getSelectionLabel);
  if ($$props.createGroupHeaderItem === void 0 && $$bindings.createGroupHeaderItem && createGroupHeaderItem !== void 0)
    $$bindings.createGroupHeaderItem(createGroupHeaderItem);
  if ($$props.createItem === void 0 && $$bindings.createItem && createItem !== void 0)
    $$bindings.createItem(createItem);
  if ($$props.getFilteredItems === void 0 && $$bindings.getFilteredItems && getFilteredItems !== void 0)
    $$bindings.getFilteredItems(getFilteredItems);
  if ($$props.isSearchable === void 0 && $$bindings.isSearchable && isSearchable !== void 0)
    $$bindings.isSearchable(isSearchable);
  if ($$props.inputStyles === void 0 && $$bindings.inputStyles && inputStyles !== void 0)
    $$bindings.inputStyles(inputStyles);
  if ($$props.isClearable === void 0 && $$bindings.isClearable && isClearable !== void 0)
    $$bindings.isClearable(isClearable);
  if ($$props.isWaiting === void 0 && $$bindings.isWaiting && isWaiting !== void 0)
    $$bindings.isWaiting(isWaiting);
  if ($$props.listPlacement === void 0 && $$bindings.listPlacement && listPlacement !== void 0)
    $$bindings.listPlacement(listPlacement);
  if ($$props.listOpen === void 0 && $$bindings.listOpen && listOpen !== void 0)
    $$bindings.listOpen(listOpen);
  if ($$props.isVirtualList === void 0 && $$bindings.isVirtualList && isVirtualList !== void 0)
    $$bindings.isVirtualList(isVirtualList);
  if ($$props.loadOptionsInterval === void 0 && $$bindings.loadOptionsInterval && loadOptionsInterval !== void 0)
    $$bindings.loadOptionsInterval(loadOptionsInterval);
  if ($$props.noOptionsMessage === void 0 && $$bindings.noOptionsMessage && noOptionsMessage !== void 0)
    $$bindings.noOptionsMessage(noOptionsMessage);
  if ($$props.hideEmptyState === void 0 && $$bindings.hideEmptyState && hideEmptyState !== void 0)
    $$bindings.hideEmptyState(hideEmptyState);
  if ($$props.inputAttributes === void 0 && $$bindings.inputAttributes && inputAttributes !== void 0)
    $$bindings.inputAttributes(inputAttributes);
  if ($$props.listAutoWidth === void 0 && $$bindings.listAutoWidth && listAutoWidth !== void 0)
    $$bindings.listAutoWidth(listAutoWidth);
  if ($$props.itemHeight === void 0 && $$bindings.itemHeight && itemHeight !== void 0)
    $$bindings.itemHeight(itemHeight);
  if ($$props.Icon === void 0 && $$bindings.Icon && Icon !== void 0)
    $$bindings.Icon(Icon);
  if ($$props.iconProps === void 0 && $$bindings.iconProps && iconProps !== void 0)
    $$bindings.iconProps(iconProps);
  if ($$props.showChevron === void 0 && $$bindings.showChevron && showChevron !== void 0)
    $$bindings.showChevron(showChevron);
  if ($$props.showIndicator === void 0 && $$bindings.showIndicator && showIndicator !== void 0)
    $$bindings.showIndicator(showIndicator);
  if ($$props.containerClasses === void 0 && $$bindings.containerClasses && containerClasses !== void 0)
    $$bindings.containerClasses(containerClasses);
  if ($$props.indicatorSvg === void 0 && $$bindings.indicatorSvg && indicatorSvg !== void 0)
    $$bindings.indicatorSvg(indicatorSvg);
  if ($$props.listOffset === void 0 && $$bindings.listOffset && listOffset !== void 0)
    $$bindings.listOffset(listOffset);
  if ($$props.ClearIcon === void 0 && $$bindings.ClearIcon && ClearIcon$1 !== void 0)
    $$bindings.ClearIcon(ClearIcon$1);
  if ($$props.Item === void 0 && $$bindings.Item && Item$1 !== void 0)
    $$bindings.Item(Item$1);
  if ($$props.List === void 0 && $$bindings.List && List$1 !== void 0)
    $$bindings.List(List$1);
  if ($$props.Selection === void 0 && $$bindings.Selection && Selection$1 !== void 0)
    $$bindings.Selection(Selection$1);
  if ($$props.MultiSelection === void 0 && $$bindings.MultiSelection && MultiSelection$1 !== void 0)
    $$bindings.MultiSelection(MultiSelection$1);
  if ($$props.VirtualList === void 0 && $$bindings.VirtualList && VirtualList$1 !== void 0)
    $$bindings.VirtualList(VirtualList$1);
  if ($$props.selectedValue === void 0 && $$bindings.selectedValue && selectedValue !== void 0)
    $$bindings.selectedValue(selectedValue);
  if ($$props.handleClear === void 0 && $$bindings.handleClear && handleClear !== void 0)
    $$bindings.handleClear(handleClear);
  if ($$props.ariaValues === void 0 && $$bindings.ariaValues && ariaValues !== void 0)
    $$bindings.ariaValues(ariaValues);
  if ($$props.ariaListOpen === void 0 && $$bindings.ariaListOpen && ariaListOpen !== void 0)
    $$bindings.ariaListOpen(ariaListOpen);
  if ($$props.ariaFocused === void 0 && $$bindings.ariaFocused && ariaFocused !== void 0)
    $$bindings.ariaFocused(ariaFocused);
  $$result.css.add(css$4);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    filteredItems = filterMethod({
      loadOptions,
      filterText,
      items,
      value,
      isMulti,
      optionIdentifier,
      groupBy,
      isCreatable
    });
    {
      {
        if (selectedValue)
          console.warn("selectedValue is no longer used. Please use value instead.");
      }
    }
    {
      updateValueDisplay(items);
    }
    {
      {
        if (value)
          setValue();
      }
    }
    {
      {
        if (inputAttributes || !isSearchable)
          assignInputAttributes();
      }
    }
    {
      {
        if (isMulti) {
          setupMulti();
        }
      }
    }
    {
      {
        if (isMulti && value && value.length > 1) {
          checkValueForDuplicates();
        }
      }
    }
    {
      {
        if (value)
          dispatchSelectedItem();
      }
    }
    {
      {
        if (!value && isMulti && prev_value) {
          dispatch("select", value);
        }
      }
    }
    {
      {
        if (isFocused !== prev_isFocused) {
          setupFocus();
        }
      }
    }
    {
      {
        if (filterText !== prev_filterText) {
          setupFilterText();
        }
      }
    }
    showSelectedItem = value && filterText.length === 0;
    showClearIcon = showSelectedItem && isClearable && !isDisabled && !isWaiting;
    placeholderText = placeholderAlwaysShow && isMulti ? placeholder : value ? "" : placeholder;
    showMultiSelect = isMulti && value && value.length > 0;
    listProps = {
      Item: Item$1,
      filterText,
      optionIdentifier,
      noOptionsMessage,
      hideEmptyState,
      isVirtualList,
      VirtualList: VirtualList$1,
      value,
      isMulti,
      getGroupHeaderLabel,
      items: filteredItems,
      itemHeight,
      getOptionLabel,
      listPlacement,
      parent: container,
      listAutoWidth,
      listOffset
    };
    ariaSelection = value ? handleAriaSelection() : "";
    ariaContext = handleAriaContent();
    $$rendered = `

<div class="${[
      "selectContainer " + escape(containerClasses) + " svelte-17l1npl",
      (hasError ? "hasError" : "") + " " + (isMulti ? "multiSelect" : "") + " " + (isDisabled ? "disabled" : "") + " " + (isFocused ? "focused" : "")
    ].join(" ").trim()}"${add_attribute("style", containerStyles, 0)}${add_attribute("this", container, 0)}><span aria-live="${"polite"}" aria-atomic="${"false"}" aria-relevant="${"additions text"}" class="${"a11yText svelte-17l1npl"}">${isFocused ? `<span id="${"aria-selection"}">${escape(ariaSelection)}</span>
            <span id="${"aria-context"}">${escape(ariaContext)}</span>` : ``}</span>

    ${Icon ? `${validate_component(Icon || missing_component, "svelte:component").$$render($$result, Object_1.assign(iconProps), {}, {})}` : ``}

    ${showMultiSelect ? `${validate_component(MultiSelection$1 || missing_component, "svelte:component").$$render($$result, {
      value,
      getSelectionLabel,
      activeValue,
      isDisabled,
      multiFullItemClearable
    }, {}, {})}` : ``}

    <input${spread([
      { readonly: !isSearchable || null },
      escape_object(_inputAttributes),
      {
        placeholder: escape_attribute_value(placeholderText)
      },
      {
        style: escape_attribute_value(inputStyles)
      },
      { disabled: isDisabled || null }
    ], { classes: "svelte-17l1npl" })}${add_attribute("this", input, 0)}${add_attribute("value", filterText, 0)}>

    ${!isMulti && showSelectedItem ? `<div class="${"selectedItem svelte-17l1npl"}">${validate_component(Selection$1 || missing_component, "svelte:component").$$render($$result, { item: value, getSelectionLabel }, {}, {})}</div>` : ``}

    ${showClearIcon ? `<div class="${"clearSelect svelte-17l1npl"}" aria-hidden="${"true"}">${validate_component(ClearIcon$1 || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``}

    ${!showClearIcon && (showIndicator || showChevron && !value || !isSearchable && !isDisabled && !isWaiting && (showSelectedItem && !isClearable || !showSelectedItem)) ? `<div class="${"indicator svelte-17l1npl"}" aria-hidden="${"true"}">${indicatorSvg ? `<!-- HTML_TAG_START -->${indicatorSvg}<!-- HTML_TAG_END -->` : `<svg width="${"100%"}" height="${"100%"}" viewBox="${"0 0 20 20"}" focusable="${"false"}" aria-hidden="${"true"}" class="${"svelte-17l1npl"}"><path d="${"M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747\n          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0\n          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502\n          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0\n          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"}"></path></svg>`}</div>` : ``}

    ${isWaiting ? `<div class="${"spinner svelte-17l1npl"}"><svg class="${"spinner_icon svelte-17l1npl"}" viewBox="${"25 25 50 50"}"><circle class="${"spinner_path svelte-17l1npl"}" cx="${"50"}" cy="${"50"}" r="${"20"}" fill="${"none"}" stroke="${"currentColor"}" stroke-width="${"5"}" stroke-miterlimit="${"10"}"></circle></svg></div>` : ``}

    ${listOpen ? `${validate_component(List$1 || missing_component, "svelte:component").$$render($$result, Object_1.assign(listProps, { hoverItemIndex }), {
      hoverItemIndex: ($$value) => {
        hoverItemIndex = $$value;
        $$settled = false;
      }
    }, {})}` : ``}

    ${!isMulti || isMulti && !showMultiSelect ? `<input${add_attribute("name", inputAttributes.name, 0)} type="${"hidden"}"${add_attribute("value", value ? getSelectionLabel(value) : null, 0)} class="${"svelte-17l1npl"}">` : ``}

    ${isMulti && showMultiSelect ? `${each(value, (item) => {
      return `<input${add_attribute("name", inputAttributes.name, 0)} type="${"hidden"}"${add_attribute("value", item ? getSelectionLabel(item) : null, 0)} class="${"svelte-17l1npl"}">`;
    })}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
var UploadOptions;
(function(UploadOptions2) {
  UploadOptions2["BankCampaignWithdrawalReceipt"] = "BankCampaignWithdrawalReceipt";
})(UploadOptions || (UploadOptions = {}));
const Upload = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg height="${"24px"}" viewBox="${"0 0 24 24"}" width="${"24px"}"><path d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"}"></path></svg>`;
});
var BankCampaignSuccessModal_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".hover-effect-container .card{position:relative}.hover-effect.svelte-1a2i91j.svelte-1a2i91j{position:absolute;top:0;left:0;height:100%;width:100%;background-color:var(--interactive-color);opacity:0.9;border:0;border-radius:var(--border-radius)}.hover-effect.svelte-1a2i91j h1.svelte-1a2i91j{font-size:1.4rem;margin-bottom:0}.flex.svelte-1a2i91j.svelte-1a2i91j{display:flex;justify-content:center;width:100%}.bank-campaign-success-modal .flex svg{width:80px;height:80px;margin:0 auto 24px}.campaign-page .bank-campaign-success-modal .custom-checkbox svg{margin-right:0;margin-bottom:-4px;margin-top:0}h2.svelte-1a2i91j.svelte-1a2i91j{text-align:center}p.svelte-1a2i91j.svelte-1a2i91j:first-of-type{text-align:center;margin-bottom:32px}.bank-campaign-success-modal label{margin:0;color:var(--interactive-color)}.bank-campaign-success-modal .card{padding-top:16px;padding-bottom:8px;border:1px solid var(--interactive-color);background-color:var(--interactive-card-color)}@media screen and (max-width: 500px){.actions .bank-campaign-success-modal{flex-direction:column !important}}",
  map: null
};
const BankCampaignSuccessModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { isDisplayed = false } = $$props;
  if ($$props.isDisplayed === void 0 && $$bindings.isDisplayed && isDisplayed !== void 0)
    $$bindings.isDisplayed(isDisplayed);
  $$result.css.add(css$3);
  return `${validate_component(Modal, "Modal").$$render($$result, { isDisplayed, zIndex: 99 }, {}, {
    actions: () => {
      return `<div class="${"bank-campaign-success-modal"}" slot="${"actions"}"><button class="${"secondary"}">Repeat with new bank</button>
    <button class="${"primary"}">Go to Petition</button></div>`;
    },
    content: () => {
      return `<div class="${"bank-campaign-success-modal"}" slot="${"content"}"><div class="${"flex svelte-1a2i91j"}">${validate_component(Checkmark, "CheckmarkIcon").$$render($$result, {}, {}, {})}</div>

    <h2 class="${"svelte-1a2i91j"}">Success</h2>

    <p class="${"svelte-1a2i91j"}">Thank you for your solidarity!</p>

    <p class="${"svelte-1a2i91j"}">If you have other bank accounts you&#39;d like to withdraw from, feel free to submit this form
      again.
    </p>

    <p class="${"svelte-1a2i91j"}">We&#39;ve updated your checklist to reflect your participation. Unless you create an account, this
      is only saved on-device in this browser.
    </p>

    <div class="${"hover-effect-container"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
        default: () => {
          return `${``}

        ${validate_component(Checkbox, "Checkbox").$$render($$result, { checked: true }, {}, {
            default: () => {
              return `Remove your personal funds from the large, for-profit banks`;
            }
          })}`;
        }
      })}</div></div>`;
    }
  })}`;
});
const css$2 = {
  code: ".actions{border-bottom-left-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius)}",
  map: null
};
const MustLogInModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  createEventDispatcher();
  let { isDisplayed } = $$props;
  if ($$props.isDisplayed === void 0 && $$bindings.isDisplayed && isDisplayed !== void 0)
    $$bindings.isDisplayed(isDisplayed);
  $$result.css.add(css$2);
  $$unsubscribe_page();
  return `${validate_component(Modal, "Modal").$$render($$result, { isBlurDismissable: true, isDisplayed }, {}, {
    actions: () => {
      return `<div slot="${"actions"}"><a href="${"/log-in"}" sveltekit:prefetch><button class="${"secondary"}">Log In</button></a>
    <a href="${"/register"}" sveltekit:prefetch><button class="${"primary"}">Register</button></a></div>`;
    },
    content: () => {
      return `<div slot="${"content"}"><h2>You&#39;ll need to be logged in first</h2>

    <p>To perform this action, you&#39;ll need to create a free account or log in.</p>
    <p>Don&#39;t worry. We&#39;ve saved your place and we&#39;ll bring you right back when you&#39;re done.</p></div>`;
    }
  })}`;
});
var BankCampaignParticipationInput_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "h4.svelte-2i7dqz.svelte-2i7dqz:not(:first-of-type){margin-top:32px}input[type='file'].svelte-2i7dqz.svelte-2i7dqz{display:none}.preview-container.svelte-2i7dqz.svelte-2i7dqz{position:relative;height:100px;width:100px;margin:24px 0}.preview.svelte-2i7dqz.svelte-2i7dqz{height:100px;width:100px;border-radius:8px}.preview-container.svelte-2i7dqz:hover>.preview.svelte-2i7dqz{filter:brightness(0.25);transition:filter 0.2s}.delete-upload-button.svelte-2i7dqz.svelte-2i7dqz{position:absolute;top:4px;right:4px;background-color:transparent;filter:brightness(1);cursor:pointer;width:28px;height:28px;max-width:28px;max-height:28px;padding:0px;margin:0;min-width:20px;cursor:pointer;z-index:3;font-size:22px;vertical-align:super;line-height:0;border:1px solid var(--interactive-color);border-radius:50%;display:flex;justify-content:center;align-items:center}.delete-upload-button.svelte-2i7dqz div.svelte-2i7dqz{position:absolute;color:var(--interactive-color);text-align:center;left:7.5px;top:13.5px}.custom-file-upload.svelte-2i7dqz.svelte-2i7dqz{cursor:pointer;border:1px solid;margin:24px 0;display:flex;flex-direction:column;height:100px;width:100px;border:1px dashed var(--interactive-color);border-radius:8px;display:flex;justify-content:center;align-items:center;text-align:center;line-height:1.4em}.custom-file-upload svg{fill:var(--interactive-color);height:32px;width:32px;margin-bottom:4px !important;margin-right:0 !important;display:block}.bank-campaign .info-button svg{width:18px;height:18px}.info.svelte-2i7dqz.svelte-2i7dqz{background-color:var(--input-background);padding:16px;border-radius:var(--border-radius);position:relative;margin-bottom:16px}.info.svelte-2i7dqz p.svelte-2i7dqz,.info.svelte-2i7dqz h4.svelte-2i7dqz{color:var(--text-color-subdued);font-weight:400;font-size:0.8rem}.info.svelte-2i7dqz p.svelte-2i7dqz:last-of-type{margin-bottom:0}.flex.svelte-2i7dqz.svelte-2i7dqz{display:flex;justify-content:center;align-items:center;gap:16px}input[type='number'].svelte-2i7dqz.svelte-2i7dqz::-webkit-inner-spin-button{-webkit-appearance:none}.themed-select.svelte-2i7dqz.svelte-2i7dqz{--background:var(--input-background);--border:1px solid transparent;--borderRadius:var(--border-radius);--borderFocusColor:var(--interactive-color);--borderHoverColor:transparent;--placeholderColor:var(--text-color-subdued);--height:40px;--indicatorColor:var(--interactive-color);--indicatorFill:var(--interactive-color);--indicatorHeight:18px;--indicatorRight:16px;--indicatorStroke:var(--interactive-color);--indicatorTop:8px;--indicatorWidth:18px;--inputColor:var(--text-color);--itemIsActiveBG:var(--interactive-color);--itemIsActiveColor:var(--text-color);--itemHoverBG:var(--interactive-color);--itemHoverColor:var(--text-color);--itemColor:var(--text-color);--clearSelectColor:var(--interactive-color);--clearSelectFocusColor:var(--interactive-color);--clearSelectHoverColor:var(--interactive-color);--selectedItemColor:var(--text-color);--listShadow:none}.themed-select input{backdrop-filter:none;-webkit-backdrop-filter:none}.dark-theme .themed-select{--listBackground:#2a2a2a}.light-theme .themed-select{--listBackground:#fafafa}.listContainer{font-family:var(--font-sans)}.listItem .item{cursor:pointer}.clearSelect{cursor:pointer}.selection{color:var(--text-color);font-family:var(--font-sans)}button.primary.svelte-2i7dqz.svelte-2i7dqz{width:100%;margin-top:16px}",
  map: null
};
const BankCampaignParticipationInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_session;
  let $shouldDisplayControls, $$unsubscribe_shouldDisplayControls;
  $$unsubscribe_session = subscribe(session, (value) => value);
  $$unsubscribe_shouldDisplayControls = subscribe(shouldDisplayControls, (value) => $shouldDisplayControls = value);
  let withdrawalAmount = "";
  let institutionSelection = void 0;
  let institutionName = "";
  let isShowingMustLogInModal = false;
  let isShowingSuccessModal = false;
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    set_store_value(shouldDisplayControls, $shouldDisplayControls = !isShowingSuccessModal, $shouldDisplayControls);
    $$rendered = `${validate_component(MustLogInModal, "MustLogInModal").$$render($$result, { isDisplayed: isShowingMustLogInModal }, {}, {})}

${validate_component(BankCampaignSuccessModal, "BankCampaignSuccessModal").$$render($$result, { isDisplayed: isShowingSuccessModal }, {}, {})}

<section class="${"bank-campaign"}"><h4 class="${"svelte-2i7dqz"}">Step 1: Shop for a better bank <button class="${"info-button"}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</button></h4>

  ${``}

  <h4 class="${"svelte-2i7dqz"}">Step 2: Withdraw <button class="${"info-button"}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</button></h4>

  ${``}

  <p>Withdraw as much money from your large, for-profit bank as you feel comfortable. Keep the
    receipt for the next step!
  </p>

  <h4 class="${"svelte-2i7dqz"}">Step 3: Upload your withdrawal receipt <button class="${"info-button"}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</button></h4>

  ${``}

  <p><strong>Redact any personal info</strong> from the receipt that you don&#39;t want on the Internet. The
    image need only contain the amount withdrawn, and the institution from which the amount was removed.
  </p>

  <form enctype="${"multipart/form-data"}"><div class="${"flex svelte-2i7dqz"}">${``}

      <label style="${"display: " + escape("flex") + ";"}" class="${"custom-file-upload svelte-2i7dqz"}"><input type="${"file"}" name="${"WithdrawalReceipt"}" class="${"svelte-2i7dqz"}">
        ${validate_component(Upload, "UploadIcon").$$render($$result, {}, {}, {})} Upload Image
      </label></div>

    <label for="${"withdrawal-amount"}">Withdrawal Amount</label>
    <input id="${"withdrawal-amount"}" type="${"number"}" class="${"svelte-2i7dqz"}"${add_attribute("value", withdrawalAmount, 0)}>

    <label for="${"institution"}">I removed money from:</label>
    <div class="${"themed-select svelte-2i7dqz"}">${validate_component(Select, "Select").$$render($$result, {
      showIndicator: true,
      placeholder: "Select an institution",
      items: ["Chase Bank", "Bank of America", "Wells Fargo", "Citi", "Other"],
      value: institutionSelection
    }, {
      value: ($$value) => {
        institutionSelection = $$value;
        $$settled = false;
      }
    }, {})}</div>

    ${institutionSelection?.value === "Other" ? `<div><label for="${"institution-name"}">Institution Name</label>
        <input type="${"text"}" id="${"institution-name"}"${add_attribute("value", institutionName, 0)}></div>` : ``}

    <button type="${"submit"}" class="${"primary svelte-2i7dqz"}">Tally My Withdrawal</button></form>

  <h4 class="${"svelte-2i7dqz"}">Step 4: Spread the word!</h4>

  <p>Show friends and family how much more in APY you&#39;re making by switching banks. Let&#39;s normalize
    lower profit margins for the financial institutions leveraging <em>your</em> money!
  </p>

  <p>Spread the word about Late-Stage, so that we can reach more people and tackle more campaigns in
    the future.
  </p>
</section>`;
  } while (!$$settled);
  $$unsubscribe_session();
  $$unsubscribe_shouldDisplayControls();
  return $$rendered;
});
var _id__svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-3d9wbu{margin:0 auto 0 auto;padding:32px 0 24px 0;width:100%;max-width:1250px}.campaign-page .current-campaign .card:first-of-type{padding:24px 32px}.campaign-page .current-campaign .deadline-card .card{padding:16px 32px 16px}.campaign-page svg{fill:var(--interactive-color);margin-bottom:-2px;margin-right:4px}.campaign-page .how .card:first-of-type:first-child{border:1px solid var(--interactive-color)}.campaign-page .what .card, .campaign-page .how .card{height:100%}.campaign-page .outcomes .tenet:last-of-type{margin-bottom:0 !important}.grid.svelte-3d9wbu{display:grid;margin-top:16px;gap:16px;grid-template-columns:2fr 3fr;grid-template-rows:auto auto auto;grid-template-areas:'how outcomes'\n      'how what'\n      'how why'}@media screen and (max-width: 900px){.grid.svelte-3d9wbu{grid-template-columns:1fr;grid-template-rows:auto auto auto;grid-template-areas:'what'\n        'how'\n        'outcomes'\n        'why'}}@media screen and (max-width: 600px){main.svelte-3d9wbu{padding-top:72px}h1.svelte-3d9wbu{font-size:1.6rem}.campaign-page h1 svg{height:18px;width:18px}}",
  map: null
};
const U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let shouldDisplayExampleCampaignModal = true;
  const componentOptions = { banks: BankCampaignParticipationInput };
  const campaign = {
    id: "1",
    createdBy: {
      id: "Jeff ID",
      email: "jeff@jeff.com",
      emailIsVerified: true,
      isAdmin: true
    },
    updatedBy: {
      id: "Jeff ID",
      email: "jeff@jeff.com",
      emailIsVerified: true,
      isAdmin: true
    },
    createdAt: "created at date",
    updatedAt: "created at date",
    description: "Mass removal of personal funds from the for-profit banking system",
    what: [
      "We're calling on the community to remove personal funds from the large for-profit banks.",
      "We aren't asking for your money! All of the funds reflected here stay in your pocket."
    ],
    why: [
      "Banks create leveraged positions for themselves with your money by lending your funds to other people and corporations.",
      "You don't get to choose which types of businesses the bank invests in, and you don't have a say in stopping the banks from preying on young people and people with poor credit histories (disproportionately, people of color) with high-interest loans.",
      "In addition to historically denying home- and business loans to disadvantaged people and people of color, banks charge service fees to people that don't meet arbitrary standards for the amount of money held in accounts; they've even been known to create unauthorized accounts in your name to conjure new fee revenue streams out of thin air with your money.",
      'Rather than simply declining overdrafting transactions, they manufacture overdrafts as a means to prey on the poorest, and "overdraft protection" as a service to charge additional fees to the only slightly less disadvantaged.',
      "Banks routinely invest in student loan asset-backed securities (SLABS). They package the student loans you work ceaselessly to pay off into investments for banks that are virtually risk-free because of current student loan discharge policies.",
      "Worst of all, they take trillions of your dollars made from these machines and invest them into fossil fuels without your consent. They smother the financial freedoms of millions of people to line their pockets with the returns made from destroying the planet."
    ],
    outcomes: [
      "Disable the use of our dollars in coal, oil, and gas",
      "Disable the use of our dollars in Student Loan Asset-Backed Securities (SLABS)",
      "You are likely to make more money from interest by moving your money from for-profit banking",
      "Encourage healthy competition for smaller financial institutions, and encourage large institutions to rethink their policies",
      "Late-Stage will create a digital mosaic mural of all of the community's withdrawal receipts from the major for-profit financial institutions as a collective receipt of our mass dissent of their policies."
    ],
    goal: 12e7,
    goalUnit: "dollars",
    goalVerb: "transferred",
    goalStartDate: "2022-01-01T12:00:00-06:00",
    goalDeadline: "2022-05-01T12:00:00-06:00",
    realizedValue: 6e7,
    shortName: "banks"
  };
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Late-Stage: Campaign</title>`, ""}`, ""}

${validate_component(Controls, "Controls").$$render($$result, {}, {}, {})}

${validate_component(CampaignNotYetLiveModal, "CampaignNotYetLiveModal").$$render($$result, {
    isDisplayed: shouldDisplayExampleCampaignModal
  }, {}, {})}

<main class="${"campaign-page svelte-3d9wbu"}"><h1 class="${"svelte-3d9wbu"}">Campaign [EXAMPLE <button class="${"info-button"}">${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})}</button> ]
  </h1>

  ${validate_component(CurrentCampaign, "CurrentCampaign").$$render($$result, { campaign }, {}, {})}

  <div class="${"grid svelte-3d9wbu"}"><div class="${"outcomes"}" style="${"grid-area: outcomes;"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h4>${validate_component(Flare, "FlareIcon").$$render($$result, {}, {}, {})} Outcomes and Impact</h4>
        ${each(campaign.outcomes, (outcome) => {
        return `${validate_component(Tenet, "Tenet").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(outcome)}`;
          }
        })}`;
      })}`;
    }
  })}</div>

    <div class="${"what"}" style="${"grid-area: what;"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h2>${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})} What</h2>
        ${each(campaign.what, (paragraph) => {
        return `<p>${escape(paragraph)}</p>`;
      })}`;
    }
  })}</div>

    <div class="${"why"}" style="${"grid-area: why;"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h2>${validate_component(Info, "InfoIcon").$$render($$result, {}, {}, {})} Why?</h2>
        ${each(campaign.why, (paragraph) => {
        return `<p>${escape(paragraph)}</p>`;
      })}`;
    }
  })}</div>

    <div class="${"how"}" style="${"grid-area: how;"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `<h2>${validate_component(Weight, "WeightIcon").$$render($$result, {}, {}, {})} How?</h2>

        ${validate_component(componentOptions[campaign.shortName] || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`;
    }
  })}</div></div>
</main>`;
});
export { U5Bidu5D as default };
