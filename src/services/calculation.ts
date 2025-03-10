import axios from 'axios'
import { booleanPointInPolygon, point, polygon as turfPolygon } from '@turf/turf'
import polygonModel from '../models/polygon';

const apiKey = process.env.API_KEY || 'AIzaSyDdxCKVSzSf5K_ys6fM7mB9eOwKTcYr_Sk'; // ใส่ API Key ของคุณ

export const calculateUserDistanceAndDurationService = async (origin: string, destination: string) => {
    try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&traffic_model=best_guess&key=${apiKey}`)

        const leg = res.data.routes[0].legs[0]; // ข้อมูลเส้นทางหลัก (leg)

        const totalDistance: number = leg?.distance?.value / 1000; // ระยะทางทั้งหมด (กิโลเมตร)

        const duration: number = leg.duration.value | 0
        const durationInTraffic: number = leg.duration_in_traffic.value | 0 // ระยะเวลาการจราจรติดขัดทั้งหมด

        // แปลงเวลาจากวินาทีเป็นนาที
        const totalNormalDurationMin: number = duration / 60;
        const totalTrafficDurationMin: number = durationInTraffic / 60;
        const totalTrafficDelayMin: number = (durationInTraffic - duration) / 60;// ระยะเวลาการจราจรติดขัดทั้งหมด

        // ค้นหา Polygon ทั้งหมดจาก MongoDB (ข้อมูล Polygon แบบตัวอย่าง)
        let distanceInPolygon: number = 0
        let durationInPolygon: number = 0
        let trafficDistance: number = 0

        const polygons = await polygonModel.find()

        if (polygons.length) {
            // คำนวณว่ามีการเดินทางผ่าน Polygon ใดบ้าง และเดินทางผ่านระยะทางเท่าไร
            let polygonResults: any[] = [];

            polygons.forEach((polygon) => {
                const polyCoords = polygon.coordinates[0].map((coord) => [
                    coord.lng,
                    coord.lat,
                ]);

                // ตรวจสอบว่าจุดแรกและจุดสุดท้ายตรงกันหรือไม่
                if (
                    polyCoords[0][0] !== polyCoords[polyCoords.length - 1][0] ||
                    polyCoords[0][1] !== polyCoords[polyCoords.length - 1][1]
                ) {
                    polyCoords.push(polyCoords[0]);
                }

                const resPolygon = turfPolygon([polyCoords]);

                // ใช้ booleanPointInPolygon เพื่อดูว่ามีจุดใดบ้างที่อยู่ใน Polygon
                leg.steps.forEach((step: any) => {
                    const startPoint = point([
                        step.start_location.lng,
                        step.start_location.lat,
                    ]);

                    const endPoint = point([
                        step.end_location.lng,
                        step.end_location.lat,
                    ]);

                    // ถ้าจุดเริ่มต้นหรือจุดสิ้นสุดอยู่ใน Polygon ให้คำนวณระยะทางผ่าน Polygon
                    if (
                        booleanPointInPolygon(startPoint, resPolygon) ||
                        booleanPointInPolygon(endPoint, resPolygon)
                    ) {
                        const distanceKm = step.distance.value / 1000; // แปลงระยะทางจากเมตรเป็นกิโลเมตร

                        polygonResults.push({
                            polygonName: polygon.name,
                            distanceThroughPolygon: distanceKm,
                            durationThroughPolygon: step.duration.value, // เวลาเดินทางของ step นั้น
                        });
                    }
                });
            })

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

                distanceInPolygon = parseFloat(result.distanceThroughPolygon.toFixed(2))
                durationInPolygon = parseFloat(durationInMinutes.toFixed(2))
            });

            trafficDistance = totalDistance * (totalTrafficDelayMin / totalNormalDurationMin);
        }

        return {
            distanceInPolygon,
            durationInPolygon,
            normalDuration: parseFloat(totalNormalDurationMin.toFixed(2)),
            delayDuration: parseFloat(totalTrafficDelayMin.toFixed(2)) > 0 ? parseFloat(totalTrafficDelayMin.toFixed(2)) : 0,
            delayDistance: parseFloat(trafficDistance.toFixed(2)),
            totalDuration: parseFloat(totalTrafficDurationMin.toFixed(2)),
            totalDistance: parseFloat(totalDistance.toFixed(2)),
        }

    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
}

export const calculateDriverDistanceAndDurationService = async (origin: string, destination: string) => {
    try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&traffic_model=best_guess&key=${apiKey}`)

        const leg = res.data.routes[0].legs[0]; // ข้อมูลเส้นทางหลัก (leg)

        const totalDistance: number = leg?.distance?.value / 1000; // ระยะทางทั้งหมด (กิโลเมตร)

        const duration: number = leg.duration.value | 0
        const durationInTraffic: number = leg.duration_in_traffic.value | 0 // ระยะเวลาการจราจรติดขัดทั้งหมด

        // แปลงเวลาจากวินาทีเป็นนาที
        const totalNormalDurationMin: number = duration / 60;
        const totalTrafficDurationMin: number = durationInTraffic / 60;
        const totalTrafficDelayMin: number = (durationInTraffic - duration) / 60;// ระยะเวลาการจราจรติดขัดทั้งหมด

        return {
            totalDistance: parseFloat(totalDistance.toFixed(2)),
            totalNormalDurationMin: parseFloat(totalNormalDurationMin.toFixed(2)),
            totalTrafficDelayMin: parseFloat(totalTrafficDelayMin.toFixed(2)) > 0 ? parseFloat(totalTrafficDelayMin.toFixed(2)) : 0,
            totalTrafficDurationMin: parseFloat(totalTrafficDurationMin.toFixed(2)),
        }

    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
}