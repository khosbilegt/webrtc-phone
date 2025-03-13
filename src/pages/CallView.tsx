import { Card, Flex, Input, Stack, Text } from "@mantine/core";
import Keyboard from "../components/Keyboard";
import { useState } from "react";

function CallView() {
  const [target, setTarget] = useState("");

  return (
    <Card maw={400}>
      <Stack align="center">
        <Flex>
          <Text>Connection Status: NOT_CONNECTED </Text>
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
