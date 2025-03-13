import { Button, Card, Flex, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

function SettingsView() {
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

  return (
    <Stack>
      <Card w={500}>
        <Title>SIP Configuration</Title>
        <form
          onSubmit={form.onSubmit((values) => {
            localStorage.setItem("webrtc_config", JSON.stringify(values));
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
            <Button>Test</Button>
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
