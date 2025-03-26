import { createContext, useRef, useState } from "react";
import JsSIP from "jssip";
import { CallStage, SIPClientStatus } from "../types/sip";
import { RTCSession } from "jssip/lib/RTCSession";

const SIPContext = createContext<{
  sipPhoneRef: React.RefObject<JsSIP.UA | null>;
  sipClientStatus: SIPClientStatus;
  setSIPClientStatus: (status: SIPClientStatus) => void;
  sipCallStageRef: React.RefObject<string | null>;
  sipCallSessionRef: React.RefObject<RTCSession | null>;
}>({
  sipPhoneRef: { current: null },
  sipClientStatus: { isConnected: false },
  setSIPClientStatus: () => {},
  sipCallStageRef: { current: null },
  sipCallSessionRef: { current: null },
});

export function SIPContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sipPhoneRef = useRef(null);
  const sipCallSessionRef = useRef<RTCSession | null>(null);
  const sipCallStageRef = useRef(CallStage.IDLE);
  const [sipClientStatus, setSIPClientStatus] = useState<SIPClientStatus>({
    isConnected: false,
  });

  const value = {
    sipPhoneRef,
    sipClientStatus,
    setSIPClientStatus,
    sipCallStageRef,
    sipCallSessionRef,
  };

  return <SIPContext.Provider value={value}>{children}</SIPContext.Provider>;
}

export default SIPContext;
