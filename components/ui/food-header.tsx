"use client";

import { Text } from "@chakra-ui/react";

export default function({ children }: { text?: string, children?: any}){
    return (
        <Text
            fontWeight={"bold"}
            fontSize={{
                base: "1.5rem"
            }}
        >
            {children}
        </Text>
    )
}