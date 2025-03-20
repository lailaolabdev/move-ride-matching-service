import { Request } from "express";
import { ICallTaxi, CallTaxi, STATUS } from "../models/callTaxi";
import axios from 'axios'

export const createCallTaxiService = async (req: Request): Promise<ICallTaxi | null> => {
    try {
        const passengerId = (req as any).user.id;

        const {
            carTypeId,
            driverId,
            origin,
            destination,
            requestType,
            distanceInPolygon,
            durationInPolygon,
            normalDuration,
            delayDuration,
            delayDistance,
            totalDuration,
            totalDistance,
            totalPrice
        } = req.body

        const created = await CallTaxi.create({
            passengerId,
            carTypeId,
            driverId,
            origin,
            destination,
            requestType,
            distanceInPolygon,
            durationInPolygon,
            normalDuration,
            delayDuration,
            delayDistance,
            totalDuration,
            totalDistance,
            totalPrice
        })

        return created
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const getCallTaxisService = async (req: Request): Promise<ICallTaxi | null> => {
    try {
        const passengerId = (req as any).user.id;

        const callTaxi = await CallTaxi.findOne({
            passengerId,
            status: { $in: ["Requesting", "Accepted", "Driver_Arrived", "departure", "Success"] }
        })

        return callTaxi ? callTaxi : null
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const getUserCallTaxisService = async (req: Request): Promise<ICallTaxi[] | null> => {
    try {
        const passengerId = (req as any).user.id;

        const callTaxis = await CallTaxi.find({ passengerId })

        return callTaxis
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const getDriverCallTaxisService = async (req: Request): Promise<ICallTaxi[] | null> => {
    try {
        const driverId = (req as any).user.id;

        const callTaxis = await CallTaxi.find({ driverId })

        return callTaxis
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const updateCallTaxiService = async (req: Request): Promise<ICallTaxi | null> => {
    try {
        const { id } = req.params

        const { type, status } = req.body

        const updated = await CallTaxi.findOneAndUpdate(
            { id },
            { type, status }
        )

        return updated
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};

export const driverUpdateStatusService = async (req: Request, status: String) => {
    try {
        const { id } = req.params
        const driverId = (req as any).user.id;

        const confirmed = await CallTaxi.findByIdAndUpdate(id, { driverId, status }, { new: true })

        return confirmed
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
}

export const calculateDriverDistanceAndDurationService = async (origin: string, destination: string) => {
    try {
        const apiKey = process.env.API_KEY || 'AIzaSyDdxCKVSzSf5K_ys6fM7mB9eOwKTcYr_Sk'; // ใส่ API Key ของคุณ

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
            totalTrafficDelayMin: parseFloat(totalTrafficDelayMin.toFixed(2)),
            totalTrafficDurationMin: parseFloat(totalTrafficDurationMin.toFixed(2)),
        }

    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
}

// get total ride serivce
export const getTotalRideService = async (req: Request): Promise<any[] | null> => {
    try {
        const passengerId = req.params.id

        const totalRide = await CallTaxi.aggregate([
            { $match: { passengerId: passengerId, status: "Paid" } },
            {
                $group: {
                    _id: "$passengerId",
                    totalRides: { $sum: 1 },

                }
            }
        ]);
        return totalRide ? totalRide : null
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};


// get Total Distance Service
export const getTotalDistanceService = async (req: Request): Promise<any[] | null> => {
    try {
        const passengerId = req.params.id

        const totalRide = await CallTaxi.aggregate([
            { $match: { passengerId: passengerId, status: "Paid" } },
            {
                $group: {
                    _id: "$passengerId",

                    totalDistance: { $sum: "$totalDistance" }
                }
            }
        ]);
        return totalRide ? totalRide : null
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

// thes last ride
export const getTheLastRideService = async (req: Request): Promise<any | null> => {
    try {
        const passengerId = req.params.id

        const latestPaidRide = await CallTaxi.findOne({
            passengerId,
            status: "Paid"  // Add condition to filter for "PAID" status
        })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
            .limit(1)
            .exec();

        return latestPaidRide ? latestPaidRide : null;

    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};



export const getHistoryRideService = async (req: Request): Promise<any | null> => {
    try {

        const passengerId = req.params.id
console.log(passengerId)
        let total = await CallTaxi.countDocuments({ passengerId: passengerId })
        const travelHistory = await CallTaxi.find({ passengerId, status: "Paid" })
            .sort({ createdAt: -1 }); // Sort by latest rides first

        if (travelHistory.length > 0) {
            const History = travelHistory.map(ride => {
                const createdAt = new Date(ride.createdAt); // Extract createdAt for each ride
                return {
                    origin: ride.origin,
                    destination: ride.destination,
                    totalDistance: ride.totalDistance,
                    totalPrice: ride.totalPrice,
                    date: `${createdAt.getDate().toString().padStart(2, '0')}/${(createdAt.getMonth() + 1).toString().padStart(2, '0')
                        }/${createdAt.getFullYear()} ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')
                        }`
                };
            });


            return { total, History }
        } else {
            console.log("No history found for this user.");
        }
    } catch (error) {
        console.log("Error creating Record: ", error);

        throw error;
    }
};
