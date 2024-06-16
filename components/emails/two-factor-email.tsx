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
  
  interface TwoFactorTemplateProps {
    twoFactorToken: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
export const TwoFactorEmailTemplate = ({
  twoFactorToken,
}: TwoFactorTemplateProps) => (
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
                    You are receiving this email because you have enabled two-factor authentication on your account.
                </Text>
                <Section style={btnContainer}>
                    {twoFactorToken}
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
  
TwoFactorEmailTemplate.PreviewProps = {
  twoFactorToken: "Alan",
  } as TwoFactorTemplateProps;
  
  export default TwoFactorEmailTemplate;
  
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
  