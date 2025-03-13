import {
  AppShell,
  Burger,
  Flex,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPhoneCall, IconSettings } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

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
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <AppShell
      h={"100%"}
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
        <Stack>
          {navbarItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.1,
                color: theme.colors[theme.primaryColor][6],
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Stack
                onClick={() => {
                  navigate(item.href);
                }}
                align="center"
              >
                {item.icon}
                {item.label}
              </Stack>
            </motion.div>
          ))}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default MainLayout;
