import { ActionIcon, Card, Flex, Input, Stack, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import JsSIP from "jssip";
import SIPContext from "../app/SipContext";
import Keyboard from "../components/Keyboard";
import { IconRefresh } from "@tabler/icons-react";

function CallView() {
  const [target, setTarget] = useState("");
  const { sipPhoneRef } = useContext(SIPContext);

  const attemptConnection = (webrtcConfig: any) => {
    console.log(webrtcConfig);
    try {
      const webrtcServer = webrtcConfig?.webrtcServer;
      const username = webrtcConfig?.username;
      const password = webrtcConfig?.password;
      const socket = new JsSIP.WebSocketInterface(webrtcServer, [
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImd0eSI6WyJhdXRob3JpemF0aW9uX2NvZGUiXSwia2lkIjoiTFl1Uk02WlpOMWt1M1F1T29iWi15T242bUZFIn0.eyJhdWQiOlsiM2VkZTYxMWItNTE2NS00OThmLWE1ZGItM2I1ZjdiZWE4NjlhIiwiMGJmYjM3NmEtMDRmZi00MGNhLWE5YTgtNjJhZTNlZGU5NjRiIl0sImV4cCI6MTc0MjUyNzUyNCwiaWF0IjoxNzQyNTIzOTI0LCJpc3MiOiJmdXNpb25hdXRoLnVuaXRlbC5tbjo5MDEwIiwic3ViIjoiNmU4MGQ1NjctMGIzYy0zNGM3LWEzYmEtYzQxYWZiOTFkYjBmIiwianRpIjoiOTRlMGVmMWEtNzQxYi00ZTc2LWFhNDgtMTNjZGQwNGI3ZDViIiwiYXV0aGVudGljYXRpb25UeXBlIjoiUEFTU1dPUkQiLCJzY29wZSI6ImFkZHJlc3MgZW1haWwgb2ZmbGluZV9hY2Nlc3Mgb3BlbmlkIHBob25lIHByb2ZpbGUiLCJzaWQiOiIzYmMzNTIzNC01NGFhLTQ5MmMtYWZjNy02MTE0NDM4YjU2MWUiLCJhdXRoX3RpbWUiOjE3NDI1MjM5MjQsInRpZCI6IjU5NmUyNzAxLWViZTYtNDkwYy05YjMyLTg1OWViODgxYjAwMyIsInByZWZlcnJlZF91c2VybmFtZSI6Imtob3NiaWxlZ3QuYiIsIml2ci5hdXRvX2Fuc3dlciI6InRydWUiLCJpdnIucGFzc3dvcmQiOiJaNnYxNjJENEFHIiwiaXZyLm91dGJvdW5kIjoidHJ1ZSJ9.RweQYgweJPCgu6XuZAhFGUN_uQnBV-jtUuyZxncyEBMbew06w8vR1ZA1h01fzOUJsOlunhkD6Z3zW6aM6kDLeDiW3Fu46wW1PjsEjJ0a7k-le1zdVNAUiUrvmJeqamu_2h0QnRh6Nw-EFAiRknc7YWbQAu9pPGgPAa4-9_8XRti0L0NzkGOMj1O21ohNIAdiFHbCglZ34wjcbuqRq1zttCAFg3dZLBw9E1zUqKDHDBxp7uBenmoV5wGQgMgXiW8eAMYnlIQFZUcokAXG4i7u_-IQc-JTII-zv4I5aBU4_TtLt6vNw5vvebx_PIHEnubEfso0rnMbZgq6NLD-EZEV1w",
      ]);
      const configURI = `sip:${username}`;
      const configuration = {
        sockets: [socket],
        uri: configURI,
        password: password,
        connection_recovery_min_interval: 10000,
      };
      const phone = new JsSIP.UA(configuration);

      phone.on("registered", () => {
        notifications.show({
          title: "Connection Successful",
          message: "SIP connection successful",
        });
      });

      phone.start();
      sipPhoneRef.current = phone;
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Connection Error",
        message: "Error connecting to SIP server",
        color: "red",
      });
    }
  };

  useEffect(() => {
    const webrtcConfig = localStorage.getItem("webrtc_config");
    if (webrtcConfig) {
      attemptConnection(JSON.parse(webrtcConfig));
    }
  }, []);

  return (
    <Card maw={400}>
      <Stack align="center">
        <Flex gap={10}>
          <Text>Connection Status: NOT_CONNECTED </Text>
          <ActionIcon
            onClick={() =>
              attemptConnection(localStorage.getItem("webrtc_config"))
            }
          >
            <IconRefresh />
          </ActionIcon>
        </Flex>
        <Input
          size="xl"
          placeholder="Enter call destination"
          value={target}
          onChange={(e) => {
            setTarget(e.currentTarget.value);
          }}
        />
        <Keyboard
          buttonClick={(value: string) => {
            setTarget((prevTarget) => {
              return prevTarget + value;
            });
          }}
        />
      </Stack>
    </Card>
  );
}

export default CallView;
