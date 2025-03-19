"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDriverDistanceAndDurationService = exports.calculateUserDistanceAndDurationService = void 0;
const axios_1 = __importDefault(require("axios"));
const turf_1 = require("@turf/turf");
const polygon_1 = __importDefault(require("../models/polygon"));
const apiKey = process.env.API_KEY || 'AIzaSyDdxCKVSzSf5K_ys6fM7mB9eOwKTcYr_Sk'; // ใส่ API Key ของคุณ
const calculateUserDistanceAndDurationService = (origin, destination) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const res = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&traffic_model=best_guess&key=${apiKey}`);
        const leg = res.data.routes[0].legs[0]; // ข้อมูลเส้นทางหลัก (leg)
        const totalDistance = ((_a = leg === null || leg === void 0 ? void 0 : leg.distance) === null || _a === void 0 ? void 0 : _a.value) / 1000; // ระยะทางทั้งหมด (กิโลเมตร)
        const duration = leg.duration.value | 0;
        const durationInTraffic = leg.duration_in_traffic.value | 0; // ระยะเวลาการจราจรติดขัดทั้งหมด
        // แปลงเวลาจากวินาทีเป็นนาที
        const totalNormalDurationMin = duration / 60;
        const totalTrafficDurationMin = durationInTraffic / 60;
        const totalTrafficDelayMin = (durationInTraffic - duration) / 60; // ระยะเวลาการจราจรติดขัดทั้งหมด
        // ค้นหา Polygon ทั้งหมดจาก MongoDB (ข้อมูล Polygon แบบตัวอย่าง)
        let distanceInPolygon = 0;
        let durationInPolygon = 0;
        let trafficDistance = 0;
        const polygons = yield polygon_1.default.find();
        if (polygons.length) {
            // คำนวณว่ามีการเดินทางผ่าน Polygon ใดบ้าง และเดินทางผ่านระยะทางเท่าไร
            let polygonResults = [];
            polygons.forEach((polygon) => {
                const polyCoords = polygon.coordinates.map((coord) => [
                    coord.lng,
                    coord.lat,
                ]);
                // ตรวจสอบว่าจุดแรกและจุดสุดท้ายตรงกันหรือไม่
                if (polyCoords[0][0] !== polyCoords[polyCoords.length - 1][0] ||
                    polyCoords[0][1] !== polyCoords[polyCoords.length - 1][1]) {
                    polyCoords.push(polyCoords[0]);
                }
                const resPolygon = (0, turf_1.polygon)([polyCoords]);
                // ใช้ booleanPointInPolygon เพื่อดูว่ามีจุดใดบ้างที่อยู่ใน Polygon
                leg.steps.forEach((step) => {
                    const startPoint = (0, turf_1.point)([
                        step.start_location.lng,
                        step.start_location.lat,
                    ]);
                    const endPoint = (0, turf_1.point)([
                        step.end_location.lng,
                        step.end_location.lat,
                    ]);
                    // ถ้าจุดเริ่มต้นหรือจุดสิ้นสุดอยู่ใน Polygon ให้คำนวณระยะทางผ่าน Polygon
                    if ((0, turf_1.booleanPointInPolygon)(startPoint, resPolygon) ||
                        (0, turf_1.booleanPointInPolygon)(endPoint, resPolygon)) {
                        const distanceKm = step.distance.value / 1000; // แปลงระยะทางจากเมตรเป็นกิโลเมตร
                        polygonResults.push({
                            polygonName: polygon.name,
                            distanceThroughPolygon: distanceKm,
                            durationThroughPolygon: step.duration.value, // เวลาเดินทางของ step นั้น
                        });
                    }
                });
            });
            // รวมผลลัพธ์ที่ชื่อ Polygon เดียวกัน
            const aggregatedResults = polygonResults.reduce((acc, curr) => {
                if (!acc[curr.polygonName]) {
                    acc[curr.polygonName] = {
                        distanceThroughPolygon: 0,
                        durationThroughPolygon: 0,
                    };
                }
                acc[curr.polygonName].distanceThroughPolygon +=
                    curr.distanceThroughPolygon;
                acc[curr.polygonName].durationThroughPolygon +=
                    curr.durationThroughPolygon;
                return acc;
            }, {});
            // แสดงผลรวม
            // console.log("\nสรุปข้อมูลการเดินทางผ่าน polygons:");
            Object.keys(aggregatedResults).forEach((polygonName) => {
                const result = aggregatedResults[polygonName];
                const durationInMinutes = result.durationThroughPolygon / 60;
                distanceInPolygon = parseFloat(result.distanceThroughPolygon.toFixed(2));
                durationInPolygon = parseFloat(durationInMinutes.toFixed(2));
            });
            trafficDistance = totalDistance * (totalTrafficDelayMin / totalNormalDurationMin);
        }
        return {
            distanceInPolygon,
            durationInPolygon,
            normalDuration: parseFloat(totalNormalDurationMin.toFixed(2)),
            delayDuration: parseFloat(totalTrafficDelayMin.toFixed(2)) > 0 ? parseFloat(totalTrafficDelayMin.toFixed(2)) : 0,
            delayDistance: parseFloat(trafficDistance.toFixed(2)) > 0 ? parseFloat(trafficDistance.toFixed(2)) : 0,
            totalDuration: parseFloat(totalTrafficDurationMin.toFixed(2)),
            totalDistance: parseFloat(totalDistance.toFixed(2)),
        };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.calculateUserDistanceAndDurationService = calculateUserDistanceAndDurationService;
const calculateDriverDistanceAndDurationService = (origin, destination) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const res = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&traffic_model=best_guess&key=${apiKey}`);
        const leg = res.data.routes[0].legs[0]; // ข้อมูลเส้นทางหลัก (leg)
        const totalDistance = ((_a = leg === null || leg === void 0 ? void 0 : leg.distance) === null || _a === void 0 ? void 0 : _a.value) / 1000; // ระยะทางทั้งหมด (กิโลเมตร)
        const duration = leg.duration.value | 0;
        const durationInTraffic = leg.duration_in_traffic.value | 0; // ระยะเวลาการจราจรติดขัดทั้งหมด
        // แปลงเวลาจากวินาทีเป็นนาที
        const totalNormalDurationMin = duration / 60;
        const totalTrafficDurationMin = durationInTraffic / 60;
        const totalTrafficDelayMin = (durationInTraffic - duration) / 60; // ระยะเวลาการจราจรติดขัดทั้งหมด
        return {
            totalDistance: parseFloat(totalDistance.toFixed(2)),
            totalNormalDurationMin: parseFloat(totalNormalDurationMin.toFixed(2)),
            totalTrafficDelayMin: parseFloat(totalTrafficDelayMin.toFixed(2)) > 0 ? parseFloat(totalTrafficDelayMin.toFixed(2)) : 0,
            totalTrafficDurationMin: parseFloat(totalTrafficDurationMin.toFixed(2)),
        };
    }
    catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
});
exports.calculateDriverDistanceAndDurationService = calculateDriverDistanceAndDurationService;
