"use client"


import { Container, Box } from "@chakra-ui/react";
import Nav from "../../components/nav";
import Footer from "../../components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Box
            py={{
              base: 3
            }}
            borderBottom={{
              base: "1px solid #00000010"
            }}
            boxShadow={{
              base: "0 0 #0000, 0px 6px 32px 0px rgba(0, 0, 0, .04)",
            }}
        >
            <Nav />
        </Box>
        <Container
            maxW={{
                "2xl": "1200px"
            }}
        >
            {children}
        </Container>
        <Footer />
    </>
  );
}
