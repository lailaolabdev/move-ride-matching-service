"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
//Import Routes
const swagger_1 = __importDefault(require("./docs/swagger"));
const taxiType_1 = __importDefault(require("./routes/taxiType"));
const taxiTypePricing_1 = __importDefault(require("./routes/taxiTypePricing"));
const database_1 = __importDefault(require("./config/database"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const taxi_1 = __importDefault(require("./routes/taxi"));
const vehicleDriver_1 = __importDefault(require("./routes/vehicleDriver"));
const calculation_1 = __importDefault(require("./routes/calculation"));
const callTaxi_1 = __importDefault(require("./routes/callTaxi"));
const polygon_1 = __importDefault(require("./routes/polygon"));
const drivingLicenseType_1 = __importDefault(require("./routes/drivingLicenseType"));
const loyalty_1 = __importDefault(require("./routes/loyalty"));
const driverLocation_1 = __importDefault(require("./routes/driverLocation"));
const nearByDriver_1 = __importDefault(require("./routes/nearByDriver"));
const loyaltyClaim_1 = __importDefault(require("./routes/loyaltyClaim"));
const festivalPromotion_1 = __importDefault(require("./routes/festivalPromotion"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8001;
// Connect to MongoDB
(0, database_1.default)();
// Swagger setup
const swaggerDocs = (0, swagger_jsdoc_1.default)(swagger_1.default);
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes
app.use("/health", (req, res) => {
    res.send("Server is running");
});
app.use("/api/v1/taxi-types", taxiType_1.default);
app.use("/api/v1/taxi-type-pricing", taxiTypePricing_1.default);
app.use("/api/v1/taxies", taxi_1.default);
app.use("/api/v1/vehicle-drivers", vehicleDriver_1.default);
app.use("/v1/api/calculate", calculation_1.default);
app.use("/v1/api/call-taxi", callTaxi_1.default);
app.use("/v1/api/polygon", polygon_1.default);
app.use("/v1/api/driving-license-type", drivingLicenseType_1.default);
app.use("/api/v1/loyalty", loyalty_1.default);
app.use("/api/v1/driver-location", driverLocation_1.default);
app.use("/api/v1/nearby-driver", nearByDriver_1.default);
app.use("/api/v1/loyalty-claim", loyaltyClaim_1.default);
app.use("/api/v1/festival-promotions", festivalPromotion_1.default);
app.use("/v1/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
