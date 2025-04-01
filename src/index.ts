import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

//Import Routes
import swaggerOptions from "./docs/swagger";
import taxiTypeRoute from "./routes/taxiType";
import connectDB from "./config/database";
import swaggerJSDoc from "swagger-jsdoc";
import taxiRoute from "./routes/taxi";
import vehicleDriverRoute from "./routes/vehicleDriver";
import calculationRoute from "./routes/calculation";
import callTaxiRoute from "./routes/callTaxi";
import polygonRoute from "./routes/polygon";
import DrivingLicenseTypeRoute from "./routes/drivingLicenseType";
import loyaltyRoute from "./routes/loyalty";

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

// Connect to MongoDB
connectDB();

// Swagger setup
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/health", (req, res) => {
    res.send("Server is running");
});
app.use("/api/v1/taxi-types", taxiTypeRoute);
app.use("/api/v1/taxies", taxiRoute);
app.use("/api/v1/vehicle-drivers", vehicleDriverRoute);
app.use("/v1/api/calculate", calculationRoute);
app.use("/v1/api/call-taxi", callTaxiRoute);
app.use("/v1/api/polygon", polygonRoute);
app.use("/v1/api/driving-license-type", DrivingLicenseTypeRoute);
app.use("/api/v1/loyalty", loyaltyRoute);
app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
