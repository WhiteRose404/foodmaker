"use client";

import { Button, Link } from "@chakra-ui/react";

export default function({ children }: { text?: string, children?: any}){
    return (
        <Button
            as={Link}
            fontWeight={"semibold"}
            color={"#FF006B"}
            bg={"#ffedf4"}
            rounded={{
                base: "3xl"
            }}
            fontSize={{
                base: "0.85rem"
            }}
            px={{
                base: 3
            }}
            maxH={{
                base: "2rem"
            }}
            mt={{
                base: "auto"
            }}
        >
            {children}
        </Button>
    )
}