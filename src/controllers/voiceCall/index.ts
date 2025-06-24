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

      const body = {
        recipient: receiver,
        title: "Incoming Call",
        body: `Call from ${From}`,
        CallSid,
        From: caller,
        To: receiver
      };

      if (CallStatus === 'ringing') {
        const noti = await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/v1/api/notifications/voice-call`, body)

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

