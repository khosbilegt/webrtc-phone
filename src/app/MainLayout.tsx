import {
  AppShell,
  Burger,
  Button,
  Flex,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPhoneCall, IconSettings } from "@tabler/icons-react";

const navbarItems = [
  {
    label: "Keypad",
    icon: <IconPhoneCall />,
    href: "/",
  },
  {
    label: "Settings",
    icon: <IconSettings />,
    href: "/settings",
  },
];

function MainLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      h={"100%"}
      w={"100vw"}
      header={{ height: 60 }}
      padding={"md"}
      navbar={{ width: 100, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <AppShell.Header p={"md"}>
        <Flex align={"center"} h={"100%"} gap={"md"}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>Configurable SIP Phone</Title>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p={"md"}>
        <Group>
          {navbarItems.map((item, index) => (
            <Stack key={index} align="center">
              {item.icon}
              {item.label}
            </Stack>
          ))}
        </Group>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default MainLayout;
