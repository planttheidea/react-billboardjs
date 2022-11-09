# react-billboardjs CHANGELOG

## 3.0.3

- [#81](https://github.com/planttheidea/react-billboardjs/pull/81) - Loosen peer dependency of React to support v18+

## 3.0.2

- [#72](https://github.com/planttheidea/react-billboardjs/pull/72) - Allow for an object of functions for `labels.format`

## 3.0.1

- [#66](https://github.com/planttheidea/react-billboardjs/pull/66) - Fix `PropTypes` for `data.color` and `data.colors` (thanks [@ImADrafter](https://github.com/ImADrafter))

## 3.0.0

**Breaking changes**

- Only version 3 of `billboard.js` is supported
- `onmouseout` renamed to `onout`
- `onmouseover` renamed to `onover`
- `title.position` now only `center`, `right`, or `left`

**Enhancements**

- Added `bubble`, `candlestick`, and `scatter` definitions in `PropTypes`
- Updated `PropTypes` definitions with new options defined in `billboard.js` documentation

## 2.0.0

**Breaking changes**

- Only version 2 of `billboard.js` is supported
- CSS files are no longer re-exported through this package
  - Please import from the `billboard.js` package itself, as shown in the README
- `BillboardChart.prototype.config` has been renamed to `updateConfig`

**Enhancements**

- No longer requires `requestAnimationFrame` (speed)
- Uses bound prototype methods instead of newly-generated methods per-instance (memory)
- Excludes `propTypes` if applied with [production usage](./README.md#production-usage) (smaller size)
- `billboard.js` is the sole dependency (smaller size)
  - Other than `react` of course ;)

## 1.5.6

- Fix [#44](https://github.com/planttheidea/react-billboardjs/issues/44), where React was giving warnings due to improper use of `getSnapshotBeforeUpdate`

## 1.5.5

- Fix [#40](https://github.com/planttheidea/react-billboardjs/pull/40), where the version validator for legacy lifecycle warning worked incorrectly for version 17

## 1.5.4

- Avoid legacy lifecycle warning

## 1.5.3

- Fix [#28](https://github.com/planttheidea/react-billboardjs/pull/28), where `cullingMax` was declared instead of `culling.max`

## 1.5.2

- Update PropTypes to support dates ([#26](https://github.com/planttheidea/react-billboardjs/pull/26))
- Update to Babel 7 for build

## 1.5.1

- Fix support for `axis.x.tick.format` ([#22](https://github.com/planttheidea/react-billboardjs/pull/22))

## 1.5.0

**NEW FEATURES**

- Add support for `radar` chart type
- Add support for [`chart.config`](https://naver.github.io/billboard.js/release/latest/doc/Chart.html#config) method (available since 1.6.0)
- Add propTypes for `axis.tick.text`
- Add propTypes for `axis.x.clipPath`
- Add propTypes for `bar.radius`
- Add propTypes for `line.connectNull`
- Add propTypes for `line.point`
- Add propTypes for `line.step`
- Add propTypes for `point.focus`
- Add proptypes for `point.r`
- Add propTypes for `point.select`
- Add propTypes for `point.show`
- Add propTypes for `radar`
- Add propTypes for `region.style`
- Add propTypes for `tooltip.linked.name`
- Add propTypes for `zoom.enabled.type`
- Add propTypes for `zoom.resetButton`
- Add propTypes for `zoom.x`

**BUGFIXES**

- Include `fbjs` as proper dependency
- Fix declarations for `region.end` and `region.start` ([#19](https://github.com/planttheidea/react-billboardjs/pull/19))

## 1.4.3

**BUGFIXES**

- Include `inner-middle` and `outer-middle` as possible `position` values in the `label` shape (thanks [@AlexKott](https://github.com/AlexKott))

## 1.4.2

**BUGFIXES**

- Fix incomplete proptypes for `bar.width` to include `Object` type (#14)

## 1.4.1

**BUGFIXES**

- Add more runtime safety (ensure `chart` exists before executing functions on it, for edge cases where `chart` is `null`)

## 1.4.0

**NEW FEATURES**

- Add [`domProps`](README.md#domprops) prop for passing additional properties to the DOM element
- Add propTypes for `bar.padding`
- Add propTypes for `tooltip.linked`

**BUGFIXES**

- Include empty string as valid value for `tooltip.order`

## 1.3.0

**NEW FEATURES**

- Add support for area-range and area-line-range
- Add propTypes for `pie.padding`
- Add propTypes for `pie.innerRadius`
- Add propTypes for `legend.usePoint`
- Add propTypes for `axis.x.tick.tooltip`
- Add [`getInstances`](README.md#getinstances) static method on `BillboardChart` to access the chart objects for all charts rendered

**BUGFIXES**

- Prevent `unloadBeforeLoad` from being passed when false, [due to upstream bug](https://github.com/naver/billboard.js/issues/321)

## 1.2.0

**NEW FEATURES**

- Add support for bubble chart
- Add propTypes for `color.tile`
- Add propTypes for `point.type` and `point.pattern`
- Add [`exportChart`](README.md#exportchart) method on `BillboardChart` instance

**BUGFIXES**

- Fix `updateChart` to use `unload` prop on `load` instead of manually calling `unload` ([#3](https://github.com/planttheidea/react-billboardjs/pull/3))

## 1.1.1

- Remove inclusion of `prop-types` package in `dist` builds

## 1.1.0

- `PropTypes` now have explicit shapes for all possible props
- Support `react` 16

## 1.0.0

- Initial release
