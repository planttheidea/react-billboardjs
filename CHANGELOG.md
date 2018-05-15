# react-billboardjs CHANGELOG

## 1.4.3

**BUGFIXES**

* Include `inner-middle` and `outer-middle` as possible `position` values in the `label` shape (thanks [@AlexKott](https://github.com/AlexKott))

## 1.4.2

**BUGFIXES**

* Fix incomplete proptypes for `bar.width` to include `Object` type (#14)

## 1.4.1

**BUGFIXES**

* Add more runtime safety (ensure `chart` exists before executing functions on it, for edge cases where `chart` is `null`)

## 1.4.0

**NEW FEATURES**

* Add [`domProps`](README.md#domprops) prop for passing additional properties to the DOM element
* Add propTypes for `bar.padding`
* Add propTypes for `tooltip.linked`

**BUGFIXES**

* Include empty string as valid value for `tooltip.order`

## 1.3.0

**NEW FEATURES**

* Add support for area-range and area-line-range
* Add propTypes for `pie.padding`
* Add propTypes for `pie.innerRadius`
* Add propTypes for `legend.usePoint`
* Add propTypes for `axis.x.tick.tooltip`
* Add [`getInstances`](README.md#getinstances) static method on `BillboardChart` to access the chart objects for all charts rendered

**BUGFIXES**

* Prevent `unloadBeforeLoad` from being passed when false, [due to upstream bug](https://github.com/naver/billboard.js/issues/321)

## 1.2.0

**NEW FEATURES**

* Add support for bubble chart
* Add propTypes for `color.tile`
* Add propTypes for `point.type` and `point.pattern`
* Add [`exportChart`](README.md#exportchart) method on `BillboardChart` instance

**BUGFIXES**

* Fix `updateChart` to use `unload` prop on `load` instead of manually calling `unload` ([#3](https://github.com/planttheidea/react-billboardjs/pull/3))

## 1.1.1

* Remove inclusion of `prop-types` package in `dist` builds

## 1.1.0

* `PropTypes` now have explicit shapes for all possible props
* Support `react` 16

## 1.0.0

* Initial release
