import { createContext, useRef } from "react";
import JsSIP from "jssip";

const SIPContext = createContext<{
  sipPhoneRef: React.RefObject<JsSIP.UA | null>;
}>({
  sipPhoneRef: { current: null },
});

export function SIPContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sipPhoneRef = useRef(null);

  const value = {
    sipPhoneRef,
  };

  return <SIPContext.Provider value={value}>{children}</SIPContext.Provider>;
}

export default SIPContext;
