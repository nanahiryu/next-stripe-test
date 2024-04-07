import { Button, Flex, Input, TabPanel, Text } from "@chakra-ui/react";
import { useState } from "react";
export const UserTabPanel = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [emailForSearch, setEmailForSearch] = useState("");

  const [registeredName, setRegisteredName] = useState("");
  const [registerdEmail, setRegisteredEmail] = useState("");
  const [registerdStripeID, setRegisteredStripeID] = useState("");

  const onClickCreateCustomer = async () => {
    const res = await fetch("/api/createCustomer", {
      method: "POST",
      body: JSON.stringify({ username, email }),
    });
    const data = await res.json();
    setRegisteredName(data.name);
    setRegisteredEmail(data.email);
    setRegisteredStripeID(data.stripeID);
  };

  const onClickSearchCustomer = async () => {
    const q = { email: emailForSearch };
    const qParams = new URLSearchParams(q);
    const res = await fetch(`/api/searchCustomer?${qParams}`, {
      method: "GET",
    });
    const data = await res.json();
    setRegisteredName(data.name);
    setRegisteredEmail(data.email);
    setRegisteredStripeID(data.stripeID);
  };

  return (
    <TabPanel>
      <Flex direction="column" gap="12px" maxW="480px">
        <Flex direction="column" gap="6px">
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={onClickCreateCustomer}>customer作成</Button>
        </Flex>
        <Flex direction="column" gap="12px">
          <Flex direction="column">
            <Text>username: {registeredName}</Text>
            <Text>email: {registerdEmail}</Text>
            <Text>stripeID: {registerdStripeID}</Text>
          </Flex>
          <Input
            placeholder="emailForSearch"
            value={emailForSearch}
            onChange={(e) => setEmailForSearch(e.target.value)}
          />
          <Button onClick={onClickSearchCustomer}>customer検索</Button>
        </Flex>
      </Flex>
    </TabPanel>
  );
};
