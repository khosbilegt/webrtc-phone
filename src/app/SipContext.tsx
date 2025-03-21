import { createContext, useRef, useState } from "react";
import JsSIP from "jssip";

interface SIPClientStatus {
  isConnected: boolean;
}

const SIPContext = createContext<{
  sipPhoneRef: React.RefObject<JsSIP.UA | null>;
  sipClientStatus: SIPClientStatus;
  setSIPClientStatus: (status: SIPClientStatus) => void;
}>({
  sipPhoneRef: { current: null },
  sipClientStatus: { isConnected: false },
  setSIPClientStatus: () => {},
});

export function SIPContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sipPhoneRef = useRef(null);
  const [sipClientStatus, setSIPClientStatus] = useState<SIPClientStatus>({
    isConnected: false,
  });

  const value = {
    sipPhoneRef,
    sipClientStatus,
    setSIPClientStatus,
  };

  return <SIPContext.Provider value={value}>{children}</SIPContext.Provider>;
}

export default SIPContext;
