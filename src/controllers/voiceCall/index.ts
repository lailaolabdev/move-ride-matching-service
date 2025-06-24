import { Request, Response } from 'express'
import { messages } from '../../config';
import { jwt, twiml } from 'twilio';
import axios from 'axios';

const AccessToken = jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

export const registerVoiceCallToken = async (req: Request, res: Response) => {
  try {
    const identity: string = req.query.identity as string;

    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWIML_APP_SID,
      incomingAllow: true
    });

    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_API_KEY!,
      process.env.TWILIO_API_SECRET!,
      { identity }
    );

    token.addGrant(voiceGrant);

    res.status(201).json({
      ...messages.CREATE_SUCCESSFUL,
      token: token.toJwt()
    });
  } catch (error) {
    console.log("Error: ", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

export const voiceCall = async (req: Request, res: Response) => {
  try {
    const newtwiml = new twiml.VoiceResponse();

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
      AccountSid
    } = req.body;

    if (To) {
      const caller = From.replace("client:", "")
      const receiver = To.replace("client:", "")

      const dial = newtwiml.dial();
      dial.client(receiver);

      console.log({
        "recipient": receiver.toString(),
        "title": "Incoming Call",
        "body": "Calling",
        "CallSid": CallSid.toString(),
        "From": caller.toString(),
        "To": receiver.toString()
      });

      if (CallStatus === 'ringing') {
        const noti = await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/v1/api/notifications/voice-call`, {
          "recipient": "68254ea9e2f2e47753d2e00b",
          "title": "Incoming Call",
          "body": "Call from",
          "CallSid": "CAb1ab806bfbcc95abafd793d9b9fc02d4",
          "From": "6853ba90575356cc7bb8def9",
          "To": "68254ea9e2f2e47753d2e00b"
        })

        console.log(noti.data);
      }
    } else {
      newtwiml.say("Thanks for calling!");
    }

    res.type("text/xml");
    res.send(newtwiml.toString());
  } catch (error) {
    console.log("Error: ", error);

    res.status(500).json({
      code: messages.INTERNAL_SERVER_ERROR.code,
      message: messages.INTERNAL_SERVER_ERROR.message,
      detail: (error as Error).message,
    });
  }
};

