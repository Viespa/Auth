import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface ConfirmEmailTemplateProps {
    confirmLink: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
export const ConfirmEmailTemplate = ({
    confirmLink,
}: ConfirmEmailTemplateProps) => (
    <Html>
        <Head />
        <Preview>
            The sales intelligence platform that helps you uncover qualified leads.
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`${baseUrl}/static/koala-logo.png`}
                    width="170"
                    height="50"
                    alt="Koala"
                    style={logo}
                />
                <Text style={paragraph}>Hi</Text>
                <Text style={paragraph}>
                    We have detected a login if it is you confirm your email address 
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href={confirmLink}>
                        Confirm Email
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Best,
                    <br />
                    The Home app team
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    
                </Text>
            </Container>
        </Body>
    </Html>
);
  
  ConfirmEmailTemplate.PreviewProps = {
    confirmLink: "Alan",
  } as ConfirmEmailTemplateProps;
  
  export default ConfirmEmailTemplate;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#a3e635",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };
  