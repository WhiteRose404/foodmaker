"use client";

import { Text, Box, Flex, CardRoot, CardBody, CardDescription, Grid, Icon, IconButton, Button } from "@chakra-ui/react";

import { useState } from "react";
import Image from "next/image";

// Media
import Steak from "../../public/steak_sandwich-cover.png"
import { IoIosInformationCircle } from "react-icons/io";


// components
import FoodButton from "../../components/ui/food-button";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog"
import FoodHeader from "./food-header";
export default function ({ side=true } : { side: boolean }){
    const [open, setOpen] = useState(false)
    return (
        <CardRoot overflow="hidden" flexDirection={side ? "row" : "column"} className="border border-[#eff0f6] rounded-2xl w-fit"
            _hover={{
                boxShadow: "0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1)",
            }}
        >
            <Image
                src={Steak}
                alt="Green double couch with wooden legs"
                style={{
                    objectFit: "cover"
                }}
                className={`h-auto ${side ? "w-1/3" : "w-full"}`}
            />
            <CardBody
                gap="2"
                px={{ base: 2 }}
                py={{ base: 4 }}
                >
                <CardDescription
                    as={Flex}
                    flexDir={"column"}
                    gap={{
                        base: 2
                    }}
                >
                    <Grid
                        templateColumns={"10fr 1fr"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Text w={"100%"} fontWeight={700} textWrap={"nowrap"} textOverflow={"ellipsis"}>BBQ Pulled Pored</Text>
                        <DialogRoot size={{ base: "sm"}} placement={"center"}>
                            <DialogTrigger asChild>
                            <Icon
                                ml={"auto"}
                                cursor={"pointer"}
                                _hover={{
                                    color: "#FF006B"
                                }}
                            >
                                <IoIosInformationCircle />
                            </Icon>
                            </DialogTrigger>
                            <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    <FoodHeader>BBQ Pulled Pored</FoodHeader>
                                </DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <Box
                                    as={Flex}
                                    flexDir={"column"}
                                    gap={2}
                                >
                                    <Text fontSize={"md"} fontWeight={"semibold"}>Main ingredients</Text>
                                    <Text ml={1}>LMIV - Allergen</Text>
                                </Box>
                            </DialogBody>
                            <DialogCloseTrigger />
                            </DialogContent>
                        </DialogRoot>
                    </Grid>
                    <Text
                        fontWeight={"light"}
                        fontSize={"0.75rem"}
                    >
                        With a side of fried rice or supreme soy noodles, and steamed chi..
                    </Text>
                    <Flex
                        flexDir={'row'}
                        justifyContent={"space-between"}
                    >
                        <Text
                            fontSize={{
                                base: "1.125rem"
                            }}
                            fontWeight="semibold"
                        >
                            $2.50
                        </Text>
                        <DialogRoot size={"lg"} placement={"center"} open={open} onOpenChange={(e) => setOpen(e.open)}>
                            <DialogTrigger asChild>
                                <FoodButton onClick={() => setOpen(true)}>
                                    Add
                                </FoodButton>
                            </DialogTrigger>
                            <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    <FoodHeader>BBQ Pulled Pored</FoodHeader>
                                </DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <Box>
                                    <Text fontWeight={"bold"}>Main ingredients</Text>
                                    <Text>LMIV - Allergen</Text>
                                </Box>
                            </DialogBody>
                            <DialogCloseTrigger />
                            </DialogContent>
                        </DialogRoot>
                    </Flex>
                </CardDescription>
            </CardBody>
        </CardRoot>
    );
}