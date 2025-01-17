import { config } from "@/lib/web-config";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import MobileConnect from "./components/MobileConnect";

import {
  Container,
  Content,
  SecondScreenGraph,
  TickText,
  Column,
  Title,
  Row,
} from "./components/StyledComponents";

export default function SecondScreenExperience() {
  return (
    <Container>
      <PageHeader selected={config.paths.secondScreen.path} />
      <Content>
        <Title>Instant Second Screen for Streaming Services</Title>
        <Row>
          <SecondScreenGraph />
          <Column>
            <TickText>
              Add second screen capabilities with JSON-based UI definitions.
            </TickText>
            <TickText>
              Enable mobile keyboard input for Smart TVs and streaming devices.
            </TickText>
            <TickText>
              Deploy without server-side changes or additional infrastructure.
            </TickText>
            <TickText>
              Support real-time content synchronization across devices
            </TickText>
            <TickText>
              Integrate in days - perfect for existing streaming applications
            </TickText>
            <TickText>
              Scale across platforms - Smart TVs, gaming consoles, set-top boxes
            </TickText>
          </Column>
        </Row>
        <MobileConnect />
      </Content>
      <PageFooter />
    </Container>
  );
}