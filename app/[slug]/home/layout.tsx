"use client"


import { Container, Box } from "@chakra-ui/react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { useAppContext } from "@/utils/appContext";

type LinkType = {value: string, link: string};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { resto } = useAppContext()
  const links:LinkType[] = [
    { value: "Home", link: `/${resto._id}/home`},
    { value: "Menu", link: `/${resto._id}/home/menu`},
    { value: "Offers", link: `/${resto._id}/home/offers`},
  ]
  return (
    <>
      <Box
          py={{
            base: 3
          }}
          borderBottom={{
            base: "1px solid #00000010"
          }}
          bg={"white"}
          boxShadow={{
            base: "0 0 #0000, 0px 6px 32px 0px rgba(0, 0, 0, .04)",
          }}
          position={"sticky"}
          top={"0px"}
          zIndex={100}
        >
            <Nav links={links} />
      </Box>
      <Container
          position={"relative"}
          zIndex={10}
          maxW={{
              "2xl": "1200px"
          }}
          css={{
            "& *": {
              transitionProperty: "all",
              transitionDuration: "0.3s",
              transitionTimingFunction: "linear"
            }
          }}
        >
            {children}
      </Container>
      <Footer />
    </>
  );
}
