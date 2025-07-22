export const filterDrivingLicenseTypeFields = (query: any) => {
    let filter = {};

    if (query.country) {
        filter = {
            ...filter,
            country: query.country,
        };
    }

    if (query.name) {
        filter = {
            ...filter,
            name: { $regex: query.name, $options: "i" }
        };
    }

    return filter;
};
