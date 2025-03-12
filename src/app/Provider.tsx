import { MantineProvider } from "@mantine/core";
import Router from "./Router";
import "@mantine/core/styles.css";

function Provider() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Router />
    </MantineProvider>
  );
}

export default Provider;
