import { MantineProvider } from "@mantine/core";
import Router from "./Router";
import { SIPContextProvider } from "./SipContext";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import ErrorBoundary from "./ErrorBoundary";

function Provider() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <SIPContextProvider>
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </SIPContextProvider>
    </MantineProvider>
  );
}

export default Provider;
