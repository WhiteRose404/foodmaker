"use client";

import { Text, Box, Flex, CardRoot, CardBody, CardDescription, Grid, Icon, Textarea, Button, Image } from "@chakra-ui/react";

import { useState } from "react";

// Media
import Steak from "@/public/steak_sandwich-cover.png"
import { IoIosInformationCircle } from "react-icons/io";
import { GiShuttlecock } from "react-icons/gi";
import { LuChefHat } from "react-icons/lu";


// components
import FoodButton from "@/components/ui/food-button";
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


export default function ({ side=true, price='0.01', description, active=false, action, name, specialAdd=false,specialAdminAdd=false, image=Steak.src } : { specialAdd?: boolean, description?: string, side?: boolean, image?: any, specialAdminAdd?: boolean, name: string, action?: any, active?: boolean, price?: string | number }){
    const [open, setOpen] = useState(false)
    return (
        <CardRoot overflow="hidden" flexDirection={side ? "row" : "column"} className="border border-[#eff0f6] rounded-2xl w-fit"
            _hover={{
                boxShadow: "0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1)",
            }}
        >
            {specialAdminAdd ? (
                <Icon
                    className={`h-auto ${side ? "w-1/3" : "w-full"}`}
                >
                    <LuChefHat />
                </Icon>
            ) : (
                <Image
                    src={image}
                    alt="Item"
                    style={{
                        objectFit: "cover"
                    }}
                    className={`h-auto ${side ? "w-1/3" : "w-full"}`}
                />
            )}
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
                    <CardHeader name={name} description={description}/>
                    <Text
                        fontWeight={"light"}
                        fontSize={"0.75rem"}
                    >
                        {description}
                    </Text>
                    <Flex
                        flexDir={'row'}
                        justifyContent={"space-between"}
                        // mb={1}
                    >
                        <Text
                            fontSize={{
                                base: "1.125rem"
                            }}
                            fontWeight="semibold"
                        >
                            {specialAdminAdd ? "NEW" : `$${price}`}
                        </Text>
                        <FoodButton onClick={action} CustomIcon={specialAdminAdd ? GiShuttlecock : undefined}>
                            {specialAdminAdd || specialAdd ? "Modify" : "Add"}
                        </FoodButton>
                        {/* <DialogRoot size={"lg"} placement={"center"} open={open} onOpenChange={(e) => setOpen(e.open)}>
                            <DialogTrigger asChild>
                                <FoodButton onClick={() => setOpen(true)}>
                                    Add
                                </FoodButton>
                            </DialogTrigger>
                            <DialogContent>
                            <DialogHeader>
                                <DialogTitle
                                    as={Grid}
                                    gridTemplateColumns={{
                                        base: "120px 1fr"
                                    }}
                                    gap={2}
                                >
                                    <Image
                                        src={image}
                                        alt="Green double couch with wooden legs"
                                        style={{
                                            objectFit: "cover"
                                        }}
                                        className={`h-auto rounded-lg w-full`}
                                    />
                                    <Box>
                                        <CardHeader />
                                        <Text
                                            fontWeight={"light"}
                                            fontSize={"0.75rem"}
                                        >
                                            With a side of fried rice or supreme soy noodles, and steamed chi..
                                        </Text>
                                        <Text
                                            fontSize={{
                                                base: "1rem"
                                            }}
                                            fontWeight="semibold"
                                        >
                                            $2.50
                                        </Text>
                                    </Box>
                                 </DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <Box>
                                    <Text fontWeight={"semibold"}>Quantity</Text>
                                    <Box
                                        as={Flex}
                                        flexDir={"column"}
                                        gap={1}
                                    >
                                        <Text fontSize={"0.95rem"} fontWeight={"semibold"}>Special Instructions</Text>
                                        <Textarea placeholder="Add Notes..." p={1} autoresize />
                                    </Box>
                                </Box>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    onClick={() => setOpen(false)}
                                    fontWeight={"bold"}
                                    px={{
                                        base: 3
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() =>{
                                        setOpen(false)
                                    }}
                                    bg={"#FF006B"}
                                    color={"white"}
                                    fontWeight={"bold"}
                                    px={{
                                        base: 3
                                    }}
                                >
                                    Add to Cart - {"$2.00"}
                                </Button>
                            </DialogFooter>
                            <DialogCloseTrigger />
                            </DialogContent>
                        </DialogRoot> */}
                    </Flex>
                </CardDescription>
            </CardBody>
        </CardRoot>
    );
}

function CardHeader({description="No description available", name} : {description?: string, name: string}){
    return (
        <Flex
            justifyContent={"start"}
            flexDir={"row"}
            alignItems={"center"}
        >
            <Text mr={{base: 2}}fontWeight={700} textWrap={"nowrap"} textOverflow={"ellipsis"}>{name}</Text>
            <DialogRoot size={{ base: "sm"}} placement={"center"}>
                <DialogTrigger asChild>
                <Icon
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
                        <FoodHeader>{name}</FoodHeader>
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Box
                        as={Flex}
                        flexDir={"column"}
                        gap={2}
                    >
                        <Text fontSize={"md"} fontWeight={"semibold"}>Description</Text>
                        <Text ml={1}>{description}</Text>
                    </Box>
                </DialogBody>
                <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </Flex>
    )
}