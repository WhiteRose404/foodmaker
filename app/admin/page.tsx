"use client";

import { Box, Grid, Flex, Icon, Fieldset, Input, FileUploadFileAcceptDetails } from "@chakra-ui/react";
import { HStack, parseColor } from "@chakra-ui/react";

// nextjs
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// Media
import { MdAddBusiness } from "react-icons/md";
import { HiUpload } from "react-icons/hi"

// component
import FoodHeader from "@/components/ui/food-header";
import { Field } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import RestoBox from "@/components/ui/resto-box";
import { NumberInputField, NumberInputRoot, NumberInputProps } from "@/components/ui/number-input"
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
import { Toaster, toaster } from "@/components/ui/toaster"

// utils
import isValidInternationalPhone from "@/utils/check/phoneNumber";




export default function (){
    const [restoList, setRestoList] = useState<any[]>([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetch("/api/list/restaurant");
            const data = await res.json();
            console.log("data we have is", data);
            return data;
        }
        fetchData().then((resolve: any[])=>{setRestoList(resolve)}).catch((reason: any)=>{ console.log("") })
    }, [])

    const [open, setOpen] = useState<boolean>(false);
    const route = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [brandColor, setBrandColor] = useState("#000000"); // Default to black
    const [imagePath, setImagePath] = useState("");
    const [numberOfTables, setNumberOfTables] = useState<number>(0);

    useEffect(()=>{
        if(error == "") return;
        toaster.create({
            title: `Error: ${error}`,
            type: "error",
        })
    }, [error])

    const sendData = async () =>{
        let body = {
            name, phone: phoneNumber, address, brandColor, logo: imagePath, tables: numberOfTables
        }
        try{
            if(!name) {
                throw Error("Name is required");
            }
            if(!phoneNumber || !isValidInternationalPhone(phoneNumber)) {
                throw Error("Phone Number isn't defined correctly");
            }
            if(numberOfTables<=0){
                throw Error("Phone Number isn't defined correctly");
            }
        }catch(error: any){
            console.log(error.message);
            setError(error.message);
        }
        const replay = await fetch("/api/add/restaurants",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        console.log("server responded with", replay)
    }
    return (
        <Box
            mt={{
                base: "3rem"
            }}
        >
            <Toaster />
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
                {restoList?.map((resto: any)=>(
                    <RestoBox
                        key={resto.name}
                        action={() => route.push(`/admin/restaurants?rest=${resto._id}`)}
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
                                            <Input px={2} border={"1px solid #000000A0"} name="name" value={name} onChange={({ target: { value }}: {target: { value: string }})=>{
                                                setName(value)
                                            }} />
                                        </Field>
                                        <Field gap={0} label="Phone Number">
                                            <Input px={2} border={"1px solid #000000A0"} name="phone" type="text" value={phoneNumber} onChange={({ target: { value }}: {target: { value: string }})=>{
                                                setPhoneNumber(value)
                                            }}/>
                                        </Field>
                                    </Grid>
                                    <Field gap={0} label="Address">
                                        <Input px={2} border={"1px solid #000000A0"} name="Address" type="text" value={address} onChange={({ target: { value }}: {target: { value: string }})=>{
                                                setAddress(value)
                                            }}/>
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
                                        <FileUploader fileName={`${name}_logo`} setUrl={(url: string)=> { setImagePath(url) }} RaiseError={(error: string)=> setError(error)} />
                                    </Grid>
                                    <Field gap={0} label="Number of Tables" w={"full"}>
                                        <NumberInputRoot
                                            w={"full"}
                                            defaultValue="4"
                                            border={"1px solid #000000A0"}
                                            value={numberOfTables.toString() || '0'}
                                            onValueChange={(details: NumberInputProps)=> { setNumberOfTables(Number(details.value)) }}>
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
                                <Button
                                    border={"1px solid black"}
                                    px={{ base: 5 }}
                                    fontWeight={"semibold"}
                                    color={"white"}
                                    bg={"black"}
                                    loading={loading}
                                    loadingText={"Submiting"}
                                    onClick={async () => {
                                        setLoading(true);
                                        try{
                                            await sendData();
                                            setOpen(false);
                                            route.push("/admin")
                                        }catch(error: any){
                                            console.log("APP:", error);
                                            setError(error.message)
                                        }finally{
                                            setLoading(false);
                                        }
                                    }}
                                >Submiting</Button>
                        </DrawerFooter>
                        <DrawerCloseTrigger />
                    </DrawerContent>
                </DrawerRoot>
            </Flex>
        </Box>
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
// type FileDetails = FileUploadFileAcceptDetails & { file: File }

function FileUploader({ fileName, setUrl, RaiseError } : { fileName: string, setUrl: any, RaiseError: any }) {
    const [isUploading, setIsUploading] = useState(false)
    async function handleUpload(details: FileUploadFileAcceptDetails) {
        setIsUploading(true)
        const formData = new FormData();
        try {
            formData.append(fileName, details.files[0])
            const res = await fetch(`/api/add/image?file=${fileName}`, {
                method: 'POST',
                body: formData
            })
            console.log("res", res);
            const { url } = await res.json();
            if(!url) throw Error("No URL was generated");
            console.log("url", url)
            setUrl(url);
            // Handle successful upload - pass URL to parent etc.
        } catch (error) {
            console.log('Upload failed:', error);
            RaiseError(error);
            // Handle error - show toast etc.
        } finally {
            setIsUploading(false)
        }
    }
 
    return (
        <FileUploadRoot 
            allowDrop
            directory={false}
            onFileAccept={handleUpload}
        >
            <FileUploadTrigger asChild>
                <Flex
                    h="full" w="full"
                    justifyContent="center" 
                    p={{base: 2}} 
                    alignItems="center"
                >
                    <Button 
                        variant="outline"
                        border="1px solid #000000A0"
                        justifyContent="center"
                        p={10}
                        alignItems="center"
                        loading={isUploading}
                    >
                        <HiUpload /> Upload Logo
                    </Button>
                </Flex>
            </FileUploadTrigger>
            <FileUploadList />
        </FileUploadRoot>
    )
 }