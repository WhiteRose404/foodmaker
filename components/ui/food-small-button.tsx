"use client";

import { Button, Link, Icon } from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";


export default function({ children, onClick }: { onClick?: any, text?: string, children?: any}){
    return (
        <Button
            onClick={onClick}
            as={Link}
            fontWeight={"semibold"}
            color={"#FF006B"}
            bg={"white"}
            shadow={"0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -2px rgba(0, 0, 0, .1)"}
            rounded={{
                base: "3xl"
            }}
            fontSize={{
                base: "0.75rem"
            }}
            px={{
                base: 2
            }}
            maxH={{
                base: "1.55rem"
            }}
            mt={{
                base: "auto"
            }}
            _hover={{
                bg: "#FF006B",
                color: "white"
            }}
            transitionDuration="0.1s"
        >
            <Icon>
                <FaShoppingBag />
            </Icon>
            {children}
        </Button>
    )
}