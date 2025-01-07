"use client";

import { Box, Grid, Flex, Icon, Stack, Fieldset, Input } from "@chakra-ui/react";
import { HStack, parseColor } from "@chakra-ui/react"

// nextjs
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// Media
import offer_1 from "@/public/burger_king.png"
import offer_2 from "@/public/pizza_hut_ori.png"
import { MdAddBusiness } from "react-icons/md";
import { HiUpload } from "react-icons/hi"

// component
import FoodHeader from "@/components/ui/food-header";
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import {
    NativeSelectField,
    NativeSelectRoot,
} from "@/components/ui/native-select"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerTrigger,
} from "@/components/ui/color-picker"
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "@/components/ui/file-upload"


const resto = [{
    name: "Burger King",
    logo: offer_1,
    id: "bajedj54d"
}, {
    name: "PizzaHut",
    logo: offer_2,
    id: "krknge87fezf"
}]




export default function (){
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetch("https://api.example.com/data");
            const data = await res.json();
            return data;
        }
        fetchData().then((resolve: any)=>{console.log("got data", resolve.value)})
    })

    const [open, setOpen] = useState<boolean>(false);
    const route = useRouter();
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [brandColor, setBrandColor] = useState("#000000"); // Default to black
    const [imagePath, setImagePath] = useState("");
    const [numberOfTables, setNumberOfTables] = useState(0);
    return (
        <Box
            mt={{
                base: "3rem"
            }}
        >
            <FoodHeader customColor="black">
                All restaurants
            </FoodHeader>
            <Flex
                mt={{
                    base: 5
                }}
                gapX={{
                    base: 2
                }}
                gapY={{
                    base: 3
                }}
                mx={{
                    base: 2
                }}
                flexDir={"row"}
                flexWrap={"wrap"}
            >
                {resto.map((resto: any)=>(
                    <RestoBox
                        key={resto.name}
                        action={() => route.push(`/admin/restaurants?rest=${resto.id}`)}
                        image={resto.logo}
                    />
                ))}
                <DrawerRoot size={"lg"} open={open}>
                    <DrawerBackdrop />
                    <DrawerTrigger asChild>
                    <RestoBox
                        action={() => setOpen(true)}
                        add
                    />
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>
                                <FoodHeader>
                                    Add Restaurants
                                </FoodHeader>
                            </DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody>
                            <Fieldset.Root mt={{ base: 10}}>
                                <Fieldset.Content>
                                    <Grid
                                        gridTemplateColumns={{ base: '1fr 1fr' }}
                                        gap={{
                                            base: 5
                                        }}
                                        justifyContent={"space-around"}
                                        w={"full"}
                                    >
                                        <Field gap={0} label="Name">
                                            <Input px={2} border={"1px solid #000000A0"} name="name" />
                                        </Field>
                                        <Field gap={0} label="Phone Number">
                                            <Input px={2} border={"1px solid #000000A0"} name="phone" type="text" />
                                        </Field>
                                    </Grid>
                                    <Field gap={0} label="Address">
                                        <Input px={2} border={"1px solid #000000A0"} name="Address" type="text" />
                                    </Field>
                                    <Grid
                                        gridTemplateColumns={{ base: '1fr 1fr' }}
                                        gap={{
                                            base: 5
                                        }}
                                        justifyContent={"space-around"}
                                        w={"full"}
                                        alignContent={"center"}
                                        alignItems={"center"}
                                    >
                                        <ColorPicker />
                                        <FileUploader />
                                    </Grid>
                                    <Field gap={0} label="Number of Tables" w={"full"}>
                                        <NumberInputRoot
                                            w={"full"}
                                            defaultValue="4"
                                            border={"1px solid #000000A0"}
                                        >
                                            <NumberInputField px={2}/>
                                        </NumberInputRoot>
                                    </Field>
                                </Fieldset.Content>
                            </Fieldset.Root>
                        </DrawerBody>
                        <DrawerFooter>
                            <DrawerActionTrigger asChild>
                                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            </DrawerActionTrigger>
                                <Button onClick={() => setOpen(false)}>Save</Button>
                        </DrawerFooter>
                        <DrawerCloseTrigger />
                    </DrawerContent>
                </DrawerRoot>
            </Flex>
        </Box>
    )
}


function RestoBox({ image, action, add=false }: { action: any, image?: any, add?: boolean}){
    return (
        <Button
            aspectRatio={16/11}
            onClick={action}
            height={{ base: "13vh", md: "20vh"}}
            border={"1px solid black"}
            bg={"gray.50"}
            _hover={{
                bg: "gray.900",
                color: "whiteAlpha.900"
            }}
            className="rounded-2xl overflow-hidden"
        >
            {
                add ? <Icon minW={"100%"}><MdAddBusiness width={"100%"} /></Icon> : (
                    <Image src={image} alt={"brand name"} />
                )
            }
        </Button>
    )
}


function ColorPicker(){
  return (
    <ColorPickerRoot defaultValue={parseColor("#eb5e41")}>
      <ColorPickerLabel>Brand Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerInput />
        <ColorPickerTrigger />
      </ColorPickerControl>
      <ColorPickerContent>
        <ColorPickerArea />
        <HStack gap={0}>
          <ColorPickerEyeDropper />
          <ColorPickerSliders />
        </HStack>
      </ColorPickerContent>
    </ColorPickerRoot>
  )
}

function FileUploader(){
    return (
        <FileUploadRoot>
            <FileUploadTrigger asChild>
                <Flex
                    h="full" w="full"
                    justifyContent={"center"} p={{base: 2}} alignItems={"center"}
                >
                    <Button variant="outline" border={"1px solid #000000A0"} justifyContent={"center"} p={10} alignItems={"center"}>
                        <HiUpload /> Upload Logo
                    </Button>
                </Flex>
            </FileUploadTrigger>
            <FileUploadList />
        </FileUploadRoot>
    )
  }