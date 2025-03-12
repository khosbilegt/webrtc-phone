import { MantineProvider } from "@mantine/core";
import App from "./App";

function Provider() {
  return (
    <MantineProvider defaultColorScheme="light">
      <App />
    </MantineProvider>
  );
}

export default Provider;
