"use client";

import { Box, AspectRatio, Text, Grid, Flex, Fieldset, Input, FileUploadFileAcceptDetails, Textarea, createListCollection } from "@chakra-ui/react";

// nextjs
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// Media
import { HiUpload } from "react-icons/hi"

// component
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
} from "@/components/ui/drawer";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogDescription,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
  
import {
    NativeSelectField,
    NativeSelectRoot,
} from "@/components/ui/native-select"
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import FoodCard from "@/components/ui/food-card";
import FoodHeader from "@/components/ui/food-header";
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Toaster, toaster } from "@/components/ui/toaster";

// utils

export default function Items(){
    // const [restoList, setRestoList] = useState<any[]>([]);
    const pathname = useSearchParams();
    const route = useRouter();
    const ID = pathname.get('rest');

    
    const [sizesWindow, setSizesWindow] = useState(false);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [selected, setSelected] = useState("");
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [addons, setAddons] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [ingredians, setIngredians] = useState("");
    const [imagePath, setImagePath] = useState("");
    
    const addCategorie = async () =>{
        let body = {
            name, description, logo: imagePath
        }
        try{
            if(!name) {
                throw Error("Name is required");
            }
            if(!imagePath){
                throw Error("Image is not defiend")
            }
        }catch(error: any){
            console.log(error.message);
            setError(error.message);
        }
        const replay = await fetch(`/api/add/categorie?resto=${ID}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        console.log("server responded with", replay)
    }
    const updateCategorie = async () =>{
        let body = {
            name, description, logo: imagePath
        }
        console.log("body has", body)
        try{
            if(!name) {
                throw Error("Name is required");
            }
            if(!imagePath){
                throw Error("Image is not defiend")
            }
            console.log("new image will be", imagePath);
        }catch(error: any){
            console.log(error.message);
            setError(error.message);
        }
        const replay = await fetch(`/api/update/categorie?resto=${ID}&categoryId=${selected}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        console.log("server responded with", replay)
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            if(!ID) throw Error("undefined resto")
            const res = await fetch(`/api/get/item?resto=${ID}`);
            const data = await res.json();
            console.log("data we have is", data);
            return data;
        }
        const fetchCategory = async ()=>{
            if(!ID) throw Error("undefined resto");
            const res = await fetch(`/api/get/categorie?resto=${ID}`)
            const data = await res.json();
            console.log("we got ctegory list", data.categories);
            return data.categories;
        }
        fetchCategory().then((resolve: any)=>{
            const filter = resolve.map((item: any)=>{
                return (
                    {
                        _id  : item._id,
                        name : item.name
                    }
                )
            });
            setCategories(filter);
            console.log("We got data and it's the following", filter)
        })
        fetchData().then((resolve: any)=>{
            console.log("We got", resolve);
        }).catch((reason: any)=>{ console.log("error",reason) })
    }, [])
    useEffect(()=>{
        if(error == "") return;
        toaster.create({
            title: `Error: ${error}`,
            type: "error",
        })
    }, [error]);

    return (
        <Flex
            flexDir={"row"}
            flexWrap={"wrap"}
            minW={"100%"}
            gap={3}
            className="scrollbar-hidden"
        >
            <Toaster />
            <Grid templateColumns={{lg: "repeat(3, 1fr)", md: "repeat(2, 1fr)" , base:"repeat(1, 1fr)"}} gapX="6" gapY="3">
                {items.map((value: any)=>{
                    return (
                        <FoodCard
                            key={value._id}
                            action={()=>{
                                setOpen(true);
                                setSelected(value._id);
                                setName(value.name);
                                setImagePath(value.logo);
                                setDescription(value.decription);
                                setUpdate(true);
                            }}
                            active={value._id === selected}
                            image={value.logo}
                            name={value.name}
                    />)
                })}
                <DrawerRoot size={"lg"} open={open}>
                    <DrawerBackdrop />
                    <DrawerTrigger asChild>
                    <FoodCard
                        action={() => { 
                            setOpen(true);
                            setName("");
                            setImagePath("");
                            setUpdate(false);
                        }}
                        name="New Item"
                        description="This card for adding new items"
                        specialAdminAdd
                    />
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>
                                <FoodHeader>
                                    Add Item
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
                                        alignContent={"center"}
                                        alignItems={"center"}
                                    >
                                        <Field gap={0} label="Name">
                                            <Input px={2} border={"1px solid #000000A0"} name="name" value={name} onChange={({ target: { value }}: {target: { value: string }})=>{ setName(value) }} />
                                        </Field>
                                        <Field gap={0} label="Price">
                                            <Input type="number" px={2} border={"1px solid #000000A0"} name="price" value={price} onChange={({ target: { value }}: {target: { value: string }})=>{ setPrice(value) }} />
                                        </Field>
                                    </Grid>
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
                                        <FileUploader update={update} fileName={update ? imagePath : `${name}_logo`} setUrl={(url: string)=> {setImagePath(url)}} RaiseError={(error: string)=>setError(error)} />
                                        <Field gap={0} label="Description">
                                            <Textarea px={2} border={"1px solid #000000A0"} name="name" value={description} onChange={({ target: { value }}: {target: { value: string }})=> { setDescription(value) } } />
                                        </Field>
                                    </Grid>
                                    <Field gap={0} label="Ingredians">
                                        <Textarea px={2} border={"1px solid #000000A0"} name="name" value={ingredians} onChange={({ target: { value }}: {target: { value: string }})=> { setIngredians(value) } } />
                                    </Field>
                                    <NativeSelectRoot>
                                        <NativeSelectField placeholder="Select Category">
                                            {categories.map((categorie: any)=>{
                                                console.log("items", categorie);
                                                return (
                                                    <option key={categorie._id} value={categorie._id}>{categorie.name}</option>
                                                )
                                            })}
                                        </NativeSelectField>
                                    </NativeSelectRoot>
                                    <Flex
                                        flexDir={"column"}
                                        gap="2"
                                    >
                                        <FoodHeader>
                                            Size's
                                        </FoodHeader>
                                        <Flex>
                                            {
                                                sizes.map((size: any)=>{
                                                    return (
                                                        <Flex 
                                                            bg={"gray.400"}
                                                            flexDir={"column"}
                                                            px={{
                                                                base: 3
                                                            }}
                                                            py={{
                                                                base: 3
                                                            }}
                                                            rounded={"2xl"}
                                                            color={"white"}
                                                            minW={'5rem'}
                                                            justifyContent={"center"}
                                                            alignItems={"center"}
                                                        >
                                                            <Text ml={"auto"}>{size.name}</Text>
                                                            <Text mr={"auto"}>+${size.price}</Text>
                                                        </Flex>
                                                    )
                                                })
                                            }
                                            <DialogRoot placement="center">
                                                <DialogTrigger asChild>
                                                    <Flex
                                                        as={Button}
                                                        bg={"gray.400"}
                                                        flexDir={"column"}
                                                        px={{
                                                            base: 3
                                                        }}
                                                        py={{
                                                            base: 3
                                                        }}
                                                        rounded={"2xl"}
                                                        color={"white"}
                                                        minW={'5rem'}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        _hover={{
                                                            bg: "gray.600",
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={()=>setSizesWindow(true)}
                                                    >
                                                        <Text>+</Text>
                                                    </Flex>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogBody pt="4">
                                                        <FoodHeader>Add Sizes</FoodHeader>
                                                        <DialogDescription mt="4">
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
                                                                <Field gap={0} label="Size Name">
                                                                    <Input placeholder={"XL, XXL..."} px={2} border={"1px solid #000000A0"} name="name" value={name} onChange={({ target: { value }}: {target: { value: string }})=>{ setName(value) }} />
                                                                </Field>
                                                                <Field gap={0} label="Price Added">
                                                                    <Input type="number" px={2} border={"1px solid #000000A0"} name="price" value={price} onChange={({ target: { value }}: {target: { value: string }})=>{ setPrice(value) }} />
                                                                </Field>
                                                            </Grid>
                                                        </DialogDescription>
                                                    </DialogBody>
                                                    <DialogCloseTrigger top="0" insetEnd="-12" bg="bg" />
                                                </DialogContent>
                                                </DialogRoot>
                                        </Flex>
                                    </Flex>
                                    <Flex
                                        flexDir={"column"}
                                        gap="2"
                                    >
                                        <FoodHeader>
                                            Add on's
                                        </FoodHeader>
                                        <Flex>
                                            {addons.map((size: any)=>{
                                                return (
                                                    <Flex 
                                                        bg={"gray.400"}
                                                        flexDir={"column"}
                                                        px={{
                                                            base: 3
                                                        }}
                                                        py={{
                                                            base: 3
                                                        }}
                                                        rounded={"2xl"}
                                                        color={"white"}
                                                        minW={'5rem'}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                    >
                                                        <Text ml={"auto"}>{size.name}</Text>
                                                        <Text mr={"auto"}>+${size.price}</Text>
                                                    </Flex>
                                                )
                                            })}
                                            <DialogRoot placement="center">
                                                <DialogTrigger asChild>
                                                    <Flex
                                                        as={Button}
                                                        bg={"gray.400"}
                                                        flexDir={"column"}
                                                        px={{
                                                            base: 3
                                                        }}
                                                        py={{
                                                            base: 3
                                                        }}
                                                        rounded={"2xl"}
                                                        color={"white"}
                                                        minW={'5rem'}
                                                        justifyContent={"center"}
                                                        alignItems={"center"}
                                                        _hover={{
                                                            bg: "gray.600",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        <Text>+</Text>
                                                    </Flex>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogBody pt="4">
                                                        <FoodHeader>Add On's</FoodHeader>
                                                        <DialogDescription mt="4">
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
                                                                <Field gap={0} label="Size Name">
                                                                    <Input placeholder={"Soda, Extra cheese..."} px={2} border={"1px solid #000000A0"} name="name" value={name} onChange={({ target: { value }}: {target: { value: string }})=>{ setName(value) }} />
                                                                </Field>
                                                                <Field gap={0} label="Price Added">
                                                                    <Input type="number" px={2} border={"1px solid #000000A0"} name="price" value={price} onChange={({ target: { value }}: {target: { value: string }})=>{ setPrice(value) }} />
                                                                </Field>
                                                            </Grid>
                                                        </DialogDescription>
                                                    </DialogBody>
                                                    <DialogCloseTrigger top="0" insetEnd="-12" bg="bg" />
                                                    <DialogFooter>
                                                        <DialogCloseTrigger top="0" insetEnd="12" bg="bg"></DialogCloseTrigger>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </DialogRoot>
                                        </Flex>
                                    </Flex>
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
                                            if(update)
                                                await updateCategorie();
                                            else await addCategorie();
                                            setOpen(false);
                                            // route.push("/admin");
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
            </Grid>
            
        </Flex>
    )
}



function FileUploader({ fileName, setUrl, RaiseError, update } : { fileName: string, setUrl: any, RaiseError: any, update: boolean }) {
    const [isUploading, setIsUploading] = useState(false)
    async function handleUpload(details: FileUploadFileAcceptDetails) {
        setIsUploading(true);
        console.log("filename",fileName, update)
        const formData = new FormData();
        const nameFile = update ? (new URL(fileName)).pathname.slice(1) : fileName;
        try {
            formData.append(nameFile, details.files[0])
            const res = await fetch(`/api/add/image?file=${nameFile}&update=${update}`, {
                method: 'POST',
                body: formData
            })
            console.log("res", res);
            const { url } = await res.json();
            if(!url) throw Error("No URL was generated");
            console.log("new url", url)
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
