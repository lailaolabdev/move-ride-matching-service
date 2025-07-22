"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDrivingLicenseTypeFields = void 0;
const filterDrivingLicenseTypeFields = (query) => {
    let filter = {};
    if (query.country) {
        filter = Object.assign(Object.assign({}, filter), { country: query.country });
    }
    if (query.name) {
        filter = Object.assign(Object.assign({}, filter), { name: { $regex: query.name, $options: "i" } });
    }
    return filter;
};
exports.filterDrivingLicenseTypeFields = filterDrivingLicenseTypeFields;
