import { config } from "@/lib/web-config";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";
import MobileConnect from "./components/MobileConnect";

import {
  Container,
  Content,
  SignInGraph,
  MultiFactorGraph,
  TickText,
  Column,
  Title,
  Row,
  Row2,
} from "./components/StyledComponents";

export default function MobileAuthentication() {
  return (
    <Container>
      <PageHeader selected={config.paths.mobileAuthentication.path} />
      <Content>
        <Row2>
          <Column>
            <Title>Zero-Change Authentication for Existing Systems</Title>
            <TickText>Add mobile authentication with just a few lines of code integration</TickText>
            <TickText>Keep your existing authentication infrastructure untouched</TickText>
            <TickText>
              Deploy without modifying user databases or security policies
            </TickText>
            <TickText>Support both mobile and traditional authentication in parallel</TickText>
            <TickText>
              Customize authentication flows using simple JSON specifications
            </TickText>
            <TickText>
              Scale seamlessly across web, mobile, and IoT platforms
            </TickText>
          </Column>
          <SignInGraph />
        </Row2>
        <Row>
          <Column>
            <Title>Transform Authentication Experience</Title>
            <TickText>
              Eliminate password-related support costs while maintaining security compliance
            </TickText>
            <TickText>
              Provide consistent authentication experience across all your applications
            </TickText>
            <TickText>
              Enhance user satisfaction with quick, secure mobile authentication
            </TickText>
            <TickText>
              Reduce development overhead with standardized integration approach
            </TickText>
            <TickText>
              Perfect for streaming services where keyboard input is cumbersome
            </TickText>
            <TickText>
              Enable secure authentication on public displays without exposing credentials
            </TickText>
          </Column>
          <MultiFactorGraph />
        </Row>
        <MobileConnect />
      </Content>
      <PageFooter />
    </Container>
  );
}