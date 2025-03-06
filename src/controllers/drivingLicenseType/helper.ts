export const filterDrivingLicenseTypeFields = (query: any) => {
    let filter = {};

    if (query.country) {
        filter = {
            ...filter,
            country: query.country,
        };
    }

    return filter;
};
