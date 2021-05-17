# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.2] - 2021-05-17

### Fixed

* missing export of `Subscription`

## [1.2.1] - 2021-05-17

### Fixed

* typing of subscription method

## [1.2.0] - 2021-05-05

### Added

* Introduced alias `new Obs()` to short `new Observable()`
* Added `Subscription` return value for `subscribe()` which can be removed directly

## [1.1.2] - 2021-05-05

### Changed

* Removed `lodash-es`

## [1.1.2] - 2021-05-05

### Fixed

* time boxing bug which notified the subscription before the value was change

## [1.1.1] - 2021-05-05

### Fixed

* `get()` has to return a copy of the stored value, otherwise it's not immutable

## [1.1.0] - 2021-05-03

### Added

* partial update and partial subscribe

## [1.0.1] - 2021-05-03

### Added

* Sonar-Scanner

## [1.0.0] - 2021-05-03

### Added

* `Readme.md`
* `Changelog.md`

## [0.0.1] - 2021-05-03

### Added

* Initial release
