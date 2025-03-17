import { Request } from "express";
import { ICallTaxi, CallTaxi, STATUS } from "../models/callTaxi";
import axios from 'axios'

export const createCallTaxiService = async (req: Request): Promise<ICallTaxi | null> => {
    try {
        // const passengerId = (req as any).user.id;
        const passengerId = "testId";

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

export const callTaxiTotalPriceReportService = async (pipeline:any) => {
    try {
        // Execute the aggregation pipeline
        const result = await CallTaxi.aggregate(pipeline);

        // Return the total price or 0 if no results are found
        if (result.length) {
            return result[0].totalPrice;
        } else {
            return 0;
        }
    } catch (error) {
        console.log("Error creating Record: ", error);
        throw error;
    }
};

export const updateStarAndCommentService = async (id:String, rating:Number, comment:String): Promise<any> => {
    try {
        const date = {
            rating:rating,
            comment:comment,
        }
        const starDate = await CallTaxi.findOneAndUpdate({_id:id},
            date,
            { new: true }
        )
      
        return starDate
    } catch (error) {
        console.log("Error creating Record: ", error);
        return null;
        
    }
}
export const updateChatCallTaxiService = async (id:String, chat: Object[]): Promise<any> => {
    try {

        const starDate = await CallTaxi.findOneAndUpdate({_id:id},
           {$addToSet: { chat: chat }} ,
            { new: true }
        )
        return starDate
    } catch (error) {
        console.log("Error creating Record: ", error);
        return null;
    }
}