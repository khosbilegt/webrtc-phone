const CallStage = Object.freeze({
  IDLE: "IDLE",
  INCOMING: "INCOMING",
  OUTGOING: "OUTGOING",
  IN_CALL: "IN_CALL",
  ENDED: "ENDED",
});

interface SIPClientStatus {
  isConnected: boolean;
}

export { CallStage };
export type { SIPClientStatus };
