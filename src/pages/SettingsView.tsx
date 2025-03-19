import { Button, Card, Flex, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useContext, useEffect } from "react";
import SIPContext from "../app/SipContext";
import JsSIP from "jssip";

function SettingsView() {
  const { sipPhoneRef } = useContext(SIPContext);

  const form = useForm({
    initialValues: {
      webrtcServer: "sip.example.com",
      username: "user",
      password: "password",
    },
    validate: {
      webrtcServer: (value) => {
        if (!value || value === "") {
          return "SIP Server is required";
        }
      },
    },
  });

  useEffect(() => {
    const webrtcConfig = localStorage.getItem("webrtc_config");
    if (webrtcConfig) {
      form.setValues(JSON.parse(webrtcConfig));
    }
  }, []);

  const attemptConnection = () => {
    const webrtcServer = form.values.webrtcServer;
    const username = form.values.username;
    const password = form.values.password;
    const socket = new JsSIP.WebSocketInterface(webrtcServer);
    const configURI = `sip:${username}`;
    const configuration = {
      sockets: [socket],
      uri: configURI,
      password: password,
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
  };

  return (
    <Stack>
      <Card w={500}>
        <Title>SIP Configuration</Title>
        <form
          onSubmit={form.onSubmit((values) => {
            localStorage.setItem("webrtc_config", JSON.stringify(values));
            notifications.show({
              title: "Settings Saved",
              message: "SIP settings have been saved",
            });
          })}
        >
          <TextInput
            label="WebRTC Server"
            {...form.getInputProps("webrtcServer")}
          />
          {/* TODO: Add nat servers */}
          <TextInput label="Username" {...form.getInputProps("username")} />
          <TextInput
            label="Password"
            type="password"
            {...form.getInputProps("password")}
          />
          <Flex gap={5} mt={"md"}>
            <Button onClick={() => attemptConnection()}>Test</Button>
            <Button variant="outline" type="submit">
              Save
            </Button>
          </Flex>
        </form>
      </Card>
    </Stack>
  );
}

export default SettingsView;
