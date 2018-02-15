# react-billboardjs CHANGELOG

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
