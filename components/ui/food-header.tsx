"use client";

import { Text } from "@chakra-ui/react";

export default function({ customColor, children, center}: { center?: boolean, customColor?: string, children?: any}){
    return (
        <Text
            fontWeight={"bold"}
            fontSize={{
                base: "1.5rem"
            }}
            color={`${customColor || "inherit"}`}
            textAlign={`${center || "inherit"}`}
        >
            {children}
        </Text>
    )
}