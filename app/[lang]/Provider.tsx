"use client"


import { useEffect } from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme('light'); //set your theme here after component mounts
  }, []);
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange forcedTheme={"white"}>
        <ChakraProvider value={defaultSystem}>
            {props.children}
        </ChakraProvider>
    </ThemeProvider>

  )
}