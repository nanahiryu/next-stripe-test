"use client";
import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { UserTabPanel } from "./_components/UserTabPanel";

export default function Home() {
  return (
    <Flex direction="column">
      <Text fontSize="3xl">Stripe test</Text>
      <Flex direction="column" px="6px" py="12px">
        <Tabs>
          <TabList>
            <Tab>user</Tab>
            <Tab>subscribe</Tab>
            <Tab>product</Tab>
          </TabList>
          <TabPanels>
            <UserTabPanel />
            <TabPanel>
              <Flex direction="column">
                <Box>
                  <Button px="6px" py="12px">
                    サブスク開始 or サブスク解約
                  </Button>
                </Box>
                <Box>
                  <Text>現在の契約状況</Text>
                  {/* 契約状況 */}
                  <div></div>
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex>product</Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
}
