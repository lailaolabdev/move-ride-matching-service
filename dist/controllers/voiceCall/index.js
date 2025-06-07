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
Object.defineProperty(exports, "__esModule", { value: true });
exports.voiceCall = exports.registerVoiceCallToken = void 0;
const config_1 = require("../../config");
const twilio_1 = require("twilio");
const AccessToken = twilio_1.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
const registerVoiceCallToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const identity = req.query.identity;
        const voiceGrant = new VoiceGrant({
            outgoingApplicationSid: process.env.TWIML_APP_SID,
            incomingAllow: true
        });
        const token = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, { identity });
        token.addGrant(voiceGrant);
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
        const to = req.body.To;
        if (to) {
            const dial = newtwiml.dial();
            dial.client(to.replace("client:", ""));
        }
        else {
            newtwiml.say("Thanks for calling!");
        }
        res.type("text/xml");
        res.send(newtwiml.toString());
        res.status(201).json(Object.assign(Object.assign({}, config_1.messages.CREATE_SUCCESSFUL), { twiml: newtwiml.toString() }));
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
