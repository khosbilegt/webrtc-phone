import { Button, Flex, Grid, Stack } from "@mantine/core";
import { IconPhoneCall, IconVideoFilled } from "@tabler/icons-react";

const buttons = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "6",
    value: "6",
  },
  {
    label: "7",
    value: "7",
  },
  {
    label: "8",
    value: "8",
  },
  {
    label: "9",
    value: "9",
  },
  {
    label: "0",
    value: "0",
  },
  {
    label: "*",
    value: "*",
  },
  {
    label: "#",
    value: "#",
  },
];

function Keyboard({
  buttonClick = (value: string) => {
    console.log("Keyboard button clicked:", value);
  },
}: {
  buttonClick?: (value: string) => void;
}) {
  return (
    <Stack>
      <Grid>
        {buttons.map((button) => (
          <Grid.Col
            key={button.value}
            span={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              radius={"lg"}
              size="lg"
              onClick={() => {
                buttonClick(button.value);
              }}
            >
              {button.label}
            </Button>
          </Grid.Col>
        ))}
      </Grid>
      <Flex gap={"sm"} justify={"center"} mt={10}>
        <Button size={"lg"} radius={"lg"} color="green">
          <IconPhoneCall />
        </Button>
        <Button size={"lg"} radius={"lg"} disabled>
          <IconVideoFilled />
        </Button>
      </Flex>
    </Stack>
  );
}

export default Keyboard;
