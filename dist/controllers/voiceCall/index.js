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
exports.handleCallStatus = exports.voiceCall = exports.registerVoiceCallToken = void 0;
const config_1 = require("../../config");
const twilio_1 = require("twilio");
const axios_1 = __importDefault(require("axios"));
const AccessToken = twilio_1.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
const registerVoiceCallToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identity = req.query.identity;
        const voiceGrant = new VoiceGrant({
            outgoingApplicationSid: process.env.TWIML_APP_SID,
            incomingAllow: true,
        });
        const token = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, { identity });
        token.addGrant(voiceGrant);
        console.log("Generated Token: ", token.toJwt());
        console.log("Identity: ", identity);
        res.status(201).json(Object.assign(Object.assign({}, config_1.messages.CREATE_SUCCESSFUL), { token: token.toJwt() }));
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.registerVoiceCallToken = registerVoiceCallToken;
const voiceCall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newtwiml = new twilio_1.twiml.VoiceResponse();
        const { ApplicationSid, ApiVersion, Called, Caller, CallStatus, From, To, CallSid, Direction, AccountSid } = req.body;
        console.log("body: ", req.body);
        if (To) {
            const caller = From.toString().replace("client:", "");
            const receiver = To.toString().replace("client:", "");
            const dial = newtwiml.dial();
            dial.client(receiver);
            const body = {
                recipient: receiver,
                title: "Incoming Call",
                body: `Call from ${caller}`,
                CallSid,
                From: caller,
                To: receiver,
            };
            if (CallStatus === "ringing") {
                try {
                    yield axios_1.default.post(`${process.env.NOTIFICATION_SERVICE_URL}/v1/api/notifications/voice-call`, body);
                }
                catch (error) {
                    console.log("Error sending notification: ", error);
                }
            }
        }
        else {
            newtwiml.say("Thanks for calling!");
        }
        res.type("text/xml");
        res.send(newtwiml.toString());
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.voiceCall = voiceCall;
const handleCallStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { CallSid, CallStatus, From, To, CallDuration, RecordingUrl, Direction, AnsweredBy, Timestamp } = req.body;
        console.log(`Call Status Update - CallSid: ${CallSid}, Status: ${CallStatus}`);
        const caller = From ? From.toString().replace("client:", "") : "";
        const receiver = To ? To.toString().replace("client:", "") : "";
        // // Handle different call statuses
        // switch (CallStatus) {
        //   case "ringing":
        //     await sendCallNotification({
        //       recipient: receiver,
        //       caller: caller,
        //       callSid: CallSid,
        //       status: "ringing",
        //       type: "status_update",
        //     });
        //     break;
        //   case "in-progress":
        //     await sendCallNotification({
        //       recipient: receiver,
        //       caller: caller,
        //       callSid: CallSid,
        //       status: "answered",
        //       type: "status_update",
        //     });
        //     console.log(`Call ${CallSid} is now in progress`);
        //     break;
        //   case "completed":
        //     const duration = CallDuration ? parseInt(CallDuration) : 0;
        //     await sendCallNotification({
        //       recipient: receiver,
        //       caller: caller,
        //       callSid: CallSid,
        //       status: "completed",
        //       duration: duration,
        //       type: "status_update",
        //     });
        //     break;
        //   case "busy":
        //     await sendCallNotification({
        //       recipient: caller,
        //       caller: receiver,
        //       callSid: CallSid,
        //       status: "busy",
        //       type: "status_update",
        //     });
        //     break;
        //   case "no-answer":
        //     await sendCallNotification({
        //       recipient: caller,
        //       caller: receiver,
        //       callSid: CallSid,
        //       status: "missed",
        //       type: "status_update",
        //     });
        //     break;
        //   case "failed":
        //     console.error(`Call ${CallSid} failed`);
        //     await sendCallNotification({
        //       recipient: caller,
        //       caller: receiver,
        //       callSid: CallSid,
        //       status: "failed",
        //       type: "status_update",
        //     });
        //     break;
        //   case "canceled":
        //     await sendCallNotification({
        //       recipient: receiver,
        //       caller: caller,
        //       callSid: CallSid,
        //       status: "canceled",
        //       type: "status_update",
        //     });
        //     break;
        //   default:
        //     console.log(`Unhandled call status: ${CallStatus} for CallSid: ${CallSid}`);
        // }
        res.status(200).send("OK");
    }
    catch (error) {
        console.error("Call status handling error:", error);
        res.status(500).json({
            error: "Failed to process call status",
            detail: error.message,
        });
    }
});
exports.handleCallStatus = handleCallStatus;
// Helper function to send notifications
const sendCallNotification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notificationBody = {
            recipient: data.recipient,
            title: getNotificationTitle(data.status, data.caller),
            body: getNotificationBody(data.status, data.caller, data.duration),
            callSid: data.callSid,
            from: data.caller,
            to: data.recipient,
            status: data.status,
            type: data.type,
            timestamp: new Date().toISOString(),
        };
        const response = yield axios_1.default.post(`${process.env.NOTIFICATION_SERVICE_URL}/v1/api/notifications/voice-call`, notificationBody);
        console.log("Notification sent:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Notification error:", error);
        // Don't throw error to avoid breaking the call flow
    }
});
// Helper functions for notification text
const getNotificationTitle = (status, caller) => {
    switch (status) {
        case "ringing":
            return "Incoming Call";
        case "answered":
            return "Call Connected";
        case "completed":
            return "Call Ended";
        case "missed":
            return "Missed Call";
        case "busy":
            return "Line Busy";
        case "failed":
            return "Call Failed";
        case "canceled":
            return "Call Canceled";
        default:
            return "Call Update";
    }
};
const getNotificationBody = (status, caller, duration) => {
    switch (status) {
        case "ringing":
            return `Incoming call from ${caller}`;
        case "answered":
            return `Call with ${caller} connected`;
        case "completed":
            return `Call with ${caller} ended${duration ? ` (${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")})` : ""}`;
        case "missed":
            return `Missed call from ${caller}`;
        case "busy":
            return `${caller} is busy`;
        case "failed":
            return `Failed to connect with ${caller}`;
        case "canceled":
            return `Call from ${caller} was canceled`;
        default:
            return `Call update from ${caller}`;
    }
};
