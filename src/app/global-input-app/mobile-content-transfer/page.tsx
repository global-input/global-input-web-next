import { config } from "@/lib/web-config";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import MobileConnect from "./components/MobileConnect";

import {
  Container,
  Content,
  MobileContentTransferGraphGraph,
  TickText,
  Column,
  Title,
  Row2,
} from "./components/layout";

export default function MobileContentTransfer() {
  return (
    <Container>
      <PageHeader selected={config.paths.mobileContentTransfer.path} />
      <Content>
        <Row2>
          <Column>
            <Title>Secure Device-to-Device Transfer</Title>
            <TickText>
              Enable direct encrypted transfers between devices.
            </TickText>
            <TickText>
              Support transfers without user accounts or cloud storage.
            </TickText>
            <TickText>
              Allow secure sharing on public devices.
            </TickText>
            <TickText>
              Enable cross-platform content.
            </TickText>
            <TickText>
              Perfect for streaming and IoT integrations.
            </TickText>
            <TickText>
              Integrate content sharing into business applications.
            </TickText>
          </Column>
          <MobileContentTransferGraphGraph />
        </Row2>
        <MobileConnect />
      </Content>
      <PageFooter />
    </Container>
  );
}