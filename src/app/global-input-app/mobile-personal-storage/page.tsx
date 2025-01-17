import { config } from "@/lib/web-config";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import MobileConnect from "./components/MobileConnect";

import {
  Container,
  Content,
  MobileStorageGraphGraph,
  CustomerServiceGraphGraph,
  TickText,
  Column,
  Title,
  Row,
  Row2,
} from "./components/StyledComponents";

export default function MobilePersonalStorage() {
  return (
    <Container>
      <PageHeader selected={config.paths.mobilePersonalStorage.path} />
      <Content>
        <Row2>
          <Column>
            <Title>Zero-Storage GDPR Solution</Title>
            <TickText>
              Data stays well protected and is tranferred with encryption.
            </TickText>
            <TickText>Let users manage personal data on their devices.</TickText>
            <TickText>
              Minimise data storage compliance requirements.
            </TickText>
            <TickText>
              Request data on-demand during transactions.
            </TickText>
            <TickText>
              Enable user-controlled data sharing.
            </TickText>
            <TickText>
              Support secure form filling across platforms.
            </TickText>
            <TickText>
              Remove need for central personal data storage.
            </TickText>
          </Column>
          <MobileStorageGraphGraph />
        </Row2>
        <Row>
          <Column>
            <Title>Business Benefits</Title>
            <TickText>
              Deliver personalized services without storing personal data.
            </TickText>
            <TickText>
              Enable secure remote customer data collection.
            </TickText>
            <TickText>Support multi-device interactions without shared terminals.</TickText>
            <TickText>
              Reduce compliance documentation requirements.
            </TickText>
            <TickText>
              Lower data breach risks and associated costs.
            </TickText>
          </Column>
          <CustomerServiceGraphGraph />
        </Row>
        <MobileConnect />
      </Content>
      <PageFooter />
    </Container>
  );
}