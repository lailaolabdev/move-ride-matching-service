// import { Request, Response } from "express";
// import { messages } from "../../config";
// import { jwt, twiml } from "twilio";
// import axios from "axios";
// import { log } from "console";

// const AccessToken = jwt.AccessToken;
// const VoiceGrant = AccessToken.VoiceGrant;

// export const registerVoiceCallToken = async (req: Request, res: Response) => {
//   try {
//     const identity: string = req.query.identity as string;

//     const voiceGrant = new VoiceGrant({
//       outgoingApplicationSid: process.env.TWIML_APP_SID,
//       incomingAllow: true,
//     });

//     const token = new AccessToken(
//       process.env.TWILIO_ACCOUNT_SID!,
//       process.env.TWILIO_API_KEY!,
//       process.env.TWILIO_API_SECRET!,
//       { identity }
//     );

//     token.addGrant(voiceGrant);

//     console.log("Generated Token: ", token.toJwt());
//     console.log("Identity: ", identity);

//     res.status(201).json({
//       ...messages.CREATE_SUCCESSFUL,
//       token: token.toJwt(),
//     });
//   } catch (error) {
//     console.log("Error: ", error);

//     res.status(500).json({
//       code: messages.INTERNAL_SERVER_ERROR.code,
//       message: messages.INTERNAL_SERVER_ERROR.message,
//       detail: (error as Error).message,
//     });
//   }
// };

// export const voiceCall = async (req: Request, res: Response) => {
//   try {
//     const newtwiml = new twiml.VoiceResponse();

//     const { ApplicationSid, ApiVersion, Called, Caller, CallStatus, From, To, CallSid, Direction, AccountSid } =
//       req.body;

//     console.log("body: ", req.body);

//     if (To) {
//       const caller = From.toString().replace("client:", "");
//       const receiver = To.toString().replace("client:", "");

//       const dial = newtwiml.dial();
//       dial.client(receiver);

//       const body = {
//         recipient: receiver,
//         title: "Incoming Call",
//         body: `Call from ${caller}`,
//         CallSid,
//         From: caller,
//         To: receiver,
//       };

//       if (CallStatus === "ringing") {
//         try {
//           await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/v1/api/notifications/voice-call`, body);
//         } catch (error) {
//           console.log("Error sending notification: ", error);
//         }
//       }
//     } else {
//       newtwiml.say("Thanks for calling!");
//     }

//     res.type("text/xml");
//     res.send(newtwiml.toString());
//   } catch (error) {
//     console.log("Error: ", error);

//     res.status(500).json({
//       code: messages.INTERNAL_SERVER_ERROR.code,
//       message: messages.INTERNAL_SERVER_ERROR.message,
//       detail: (error as Error).message,
//     });
//   }
// };

// export const handleCallStatus = async (req: Request, res: Response) => {
//   try {
//     const { CallSid, CallStatus, From, To, CallDuration, RecordingUrl, Direction, AnsweredBy, Timestamp } = req.body;

//     console.log(`Call Status Update - CallSid: ${CallSid}, Status: ${CallStatus}`);

//     const caller = From ? From.toString().replace("client:", "") : "";
//     const receiver = To ? To.toString().replace("client:", "") : "";

//     // Handle different call statuses
//     switch (CallStatus) {
//       case "ringing":
//         await sendCallNotification({
//           recipient: receiver,
//           caller: caller,
//           callSid: CallSid,
//           status: "ringing",
//           type: "status_update",
//         });
//         break;

//       case "in-progress":
//         await sendCallNotification({
//           recipient: receiver,
//           caller: caller,
//           callSid: CallSid,
//           status: "answered",
//           type: "status_update",
//         });
//         console.log(`Call ${CallSid} is now in progress`);
//         break;

//       case "completed":
//         const duration = CallDuration ? parseInt(CallDuration) : 0;
//         await sendCallNotification({
//           recipient: receiver,
//           caller: caller,
//           callSid: CallSid,
//           status: "completed",
//           duration: duration,
//           type: "status_update",
//         });
//         break;

//       case "busy":
//         await sendCallNotification({
//           recipient: caller,
//           caller: receiver,
//           callSid: CallSid,
//           status: "busy",
//           type: "status_update",
//         });
//         break;

//       case "no-answer":
//         await sendCallNotification({
//           recipient: caller,
//           caller: receiver,
//           callSid: CallSid,
//           status: "missed",
//           type: "status_update",
//         });
//         break;

//       case "failed":
//         console.error(`Call ${CallSid} failed`);
//         await sendCallNotification({
//           recipient: caller,
//           caller: receiver,
//           callSid: CallSid,
//           status: "failed",
//           type: "status_update",
//         });
//         break;

//       case "canceled":
//         await sendCallNotification({
//           recipient: receiver,
//           caller: caller,
//           callSid: CallSid,
//           status: "canceled",
//           type: "status_update",
//         });
//         break;

//       default:
//         console.log(`Unhandled call status: ${CallStatus} for CallSid: ${CallSid}`);
//     }

//     res.status(200).send("OK");
//   } catch (error) {
//     console.error("Call status handling error:", error);
//     res.status(500).json({
//       error: "Failed to process call status",
//       detail: (error as Error).message,
//     });
//   }
// };

// // Helper function to send notifications
// const sendCallNotification = async (data: {
//   recipient: string;
//   caller: string;
//   callSid: string;
//   status: string;
//   duration?: number;
//   type: string;
// }) => {
//   try {
//     const notificationBody = {
//       recipient: data.recipient,
//       title: getNotificationTitle(data.status, data.caller),
//       body: getNotificationBody(data.status, data.caller, data.duration),
//       callSid: data.callSid,
//       from: data.caller,
//       to: data.recipient,
//       status: data.status,
//       type: data.type,
//       timestamp: new Date().toISOString(),
//     };

//     const response = await axios.post(
//       `${process.env.NOTIFICATION_SERVICE_URL}/v1/api/notifications/voice-call`,
//       notificationBody
//     );

//     console.log("Notification sent:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Notification error:", error);
//     // Don't throw error to avoid breaking the call flow
//   }
// };

// // Helper functions for notification text
// const getNotificationTitle = (status: string, caller: string): string => {
//   switch (status) {
//     case "ringing":
//       return "Incoming Call";
//     case "answered":
//       return "Call Connected";
//     case "completed":
//       return "Call Ended";
//     case "missed":
//       return "Missed Call";
//     case "busy":
//       return "Line Busy";
//     case "failed":
//       return "Call Failed";
//     case "canceled":
//       return "Call Canceled";
//     default:
//       return "Call Update";
//   }
// };

// const getNotificationBody = (status: string, caller: string, duration?: number): string => {
//   switch (status) {
//     case "ringing":
//       return `Incoming call from ${caller}`;
//     case "answered":
//       return `Call with ${caller} connected`;
//     case "completed":
//       return `Call with ${caller} ended${
//         duration ? ` (${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")})` : ""
//       }`;
//     case "missed":
//       return `Missed call from ${caller}`;
//     case "busy":
//       return `${caller} is busy`;
//     case "failed":
//       return `Failed to connect with ${caller}`;
//     case "canceled":
//       return `Call from ${caller} was canceled`;
//     default:
//       return `Call update from ${caller}`;
//   }
// };

import { Request, Response } from "express";
import { messages } from "../../config";
import { jwt, twiml } from "twilio";
import axios from "axios";

const AccessToken = jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

export const registerVoiceCallToken = async (req: Request, res: Response) => {
  try {
    const identity: string = req.query.identity as string;

    if (!identity) {
      return res.status(400).json({
        code: "MISSING_IDENTITY",
        message: "Identity parameter is required",
      });
    }

    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWIML_APP_SID,
      incomingAllow: true,
    });

    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_API_KEY!,
      process.env.TWILIO_API_SECRET!,
      { identity, ttl: 3600 } // 1 hour expiry
    );

    token.addGrant(voiceGrant);

    console.log("Generated Token for identity:", identity);

    res.status(201).json({
      ...messages.CREATE_SUCCESSFUL,
      token: token.toJwt(),
    });
  } catch (error) {
    console.error("Token generation error:", error);
    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const voiceCall = async (req: Request, res: Response) => {
  try {
    const twimlResponse = new twiml.VoiceResponse();

    const {
      ApplicationSid,
      ApiVersion,
      Called,
      Caller,
      CallStatus,
      From,
      To,
      CallSid,
      Direction,
      AccountSid,
      CallDuration,
      RecordingUrl,
    } = req.body;

    console.log("Voice Webhook - Incoming call data:", req.body);

    // Handle client-to-client calls (both inbound and outbound-api)
    if (To && (Direction === "outbound-api" || Direction === "inbound")) {
      const caller = From.toString().replace("client:", "");
      const receiver = To.toString().replace("client:", "");

      console.log(`Voice Webhook - Connecting call from ${caller} to ${receiver}, Direction: ${Direction}`);

      // const dial = twimlResponse.dial({
      //   callerId: caller,
      //   timeout: 30, // Ring for 30 seconds
      //   action: `https://45x8kscv6e.execute-api.ap-southeast-1.amazonaws.com/notification-service/api/v1/voice-call/status`, // Called when dial completes
      //   method: "POST",
      // });

      // dial.client(receiver);

      switch (CallStatus) {
        case "initiated":
          console.log(`Call ${CallSid} initiated from ${caller} to ${receiver}`);
          // Don't send notification yet, wait for ringing
          break;

        case "ringing":
          console.log(`Call ${CallSid} is ringing`);
          await sendCallNotification({
            recipient: receiver,
            caller: caller,
            callSid: CallSid,
            status: "ringing",
            type: "incoming_call",
          });
          break;
      }

      // Only send initial notification, status updates will be handled by status webhook
      console.log(`Voice Webhook - Initiating call to ${receiver}`);
    } else if (!To) {
      // Handle calls to the main number (no specific client target)
      twimlResponse.say("Welcome to our voice service. Please hold while we connect you.");

      const gather = twimlResponse.gather({
        numDigits: 1,
        timeout: 10,
        action: `https://45x8kscv6e.execute-api.ap-southeast-1.amazonaws.com/notification-service/api/v1/voice-call/menu`,
        method: "POST",
      });

      gather.say("Press 1 to continue, or hang up to end the call.");
    } else {
      // Fallback for unexpected scenarios
      console.log("Voice Webhook - Unexpected call scenario:", req.body);
      twimlResponse.say("Sorry, we cannot process this call at the moment.");
    }

    res.type("text/xml");
    res.send(twimlResponse.toString());
  } catch (error) {
    console.error("Voice webhook error:", error);

    const errorResponse = new twiml.VoiceResponse();
    errorResponse.say("Sorry, we encountered an error. Please try again later.");

    res.type("text/xml");
    res.send(errorResponse.toString());
  }
};

export const handleCallStatus = async (req: Request, res: Response) => {
  try {
    const {
      CallSid,
      CallStatus,
      From,
      To,
      CallDuration,
      RecordingUrl,
      Direction,
      AnsweredBy,
      Timestamp,
      DialCallStatus, // Status of the dial attempt
      DialCallSid, // SID of the dialed call leg
    } = req.body;

    console.log(`Status Webhook - CallSid: ${CallSid}, Status: ${CallStatus}, Direction: ${Direction}`);
    console.log("Status Webhook - Full body:", req.body);

    const caller = From ? From.toString().replace("client:", "") : "";
    const receiver = To ? To.toString().replace("client:", "") : "";

    // Handle different call statuses with proper logic
    switch (CallStatus) {
      case "initiated":
        console.log(`Call ${CallSid} initiated from ${caller} to ${receiver}`);
        // Don't send notification yet, wait for ringing
        break;

      case "ringing":
        console.log(`Call ${CallSid} is ringing`);
        await sendCallNotification({
          recipient: receiver,
          caller: caller,
          callSid: CallSid,
          status: "ringing",
          type: "incoming_call",
        });
        break;

      case "in-progress":
        console.log(`Call ${CallSid} answered and in progress`);
        await sendCallNotification({
          recipient: receiver,
          caller: caller,
          callSid: CallSid,
          status: "answered",
          type: "call_answered",
        });
        break;

      case "completed":
        const duration = CallDuration ? parseInt(CallDuration) : 0;
        console.log(`Call ${CallSid} completed with duration: ${duration}s`);

        // Determine if it was answered or missed based on duration
        const wasAnswered = duration > 0;
        const finalStatus = wasAnswered ? "completed" : "missed";

        await sendCallNotification({
          recipient: wasAnswered ? receiver : caller, // Notify missed call to caller
          caller: caller,
          callSid: CallSid,
          status: finalStatus,
          duration: duration,
          type: "call_ended",
        });
        break;

      case "busy":
        console.log(`Call ${CallSid} - line busy`);
        await sendCallNotification({
          recipient: caller,
          caller: receiver,
          callSid: CallSid,
          status: "busy",
          type: "call_failed",
        });
        break;

      case "no-answer":
        console.log(`Call ${CallSid} - no answer (missed call)`);
        await sendCallNotification({
          recipient: caller,
          caller: receiver,
          callSid: CallSid,
          status: "missed",
          type: "call_missed",
        });
        break;

      case "failed":
        console.error(`Call ${CallSid} failed`);
        await sendCallNotification({
          recipient: caller,
          caller: receiver,
          callSid: CallSid,
          status: "failed",
          type: "call_failed",
        });
        break;

      case "canceled":
        console.log(`Call ${CallSid} was canceled`);
        await sendCallNotification({
          recipient: receiver,
          caller: caller,
          callSid: CallSid,
          status: "canceled",
          type: "call_canceled",
        });
        break;

        // default:
        console.log(`Status Webhook - Unhandled status: ${CallStatus} for CallSid: ${CallSid}`);
    }

    // Also handle DialCallStatus if present (for dial verb status)
    if (DialCallStatus && DialCallStatus !== CallStatus) {
      console.log(`Dial Status: ${DialCallStatus} for dial attempt`);

      switch (DialCallStatus) {
        case "no-answer":
          console.log("Dial attempt: no answer");
          break;
        case "busy":
          console.log("Dial attempt: busy");
          break;
        case "failed":
          console.log("Dial attempt: failed");
          break;
        case "completed":
          console.log("Dial attempt: completed successfully");
          break;
      }
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Status webhook error:", error);
    res.status(500).json({
      error: "Failed to process call status",
      detail: (error as Error).message,
    });
  }
};

// Helper function to send notifications
const sendCallNotification = async (data: {
  recipient: string;
  caller: string;
  callSid: string;
  status: string;
  duration?: number;
  type: string;
}) => {
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

    console.log("Sending notification:", notificationBody);

    const response = await axios.post(
      `${process.env.NOTIFICATION_SERVICE_URL}/v1/api/notifications/voice-call`,
      notificationBody
    );

    console.log("Notification sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Notification error:", error);
    // Don't throw error to avoid breaking the call flow
  }
};

// Helper functions for notification text
const getNotificationTitle = (status: string, caller: string): string => {
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

const getNotificationBody = (status: string, caller: string, duration?: number): string => {
  switch (status) {
    case "ringing":
      return `Incoming call from ${caller}`;
    case "answered":
      return `Call with ${caller} connected`;
    case "completed":
      return `Call with ${caller} ended${
        duration ? ` (${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")})` : ""
      }`;
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
