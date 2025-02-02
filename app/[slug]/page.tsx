"use client"

import { Box, Flex, Heading, Text, Button, Spinner, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { DialogContent, DialogRoot } from "@/components/ui/dialog"
import { MdRestaurantMenu, MdOutlineEmail } from "react-icons/md";
import { RiArrowRightLine } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useAppContext } from "@/utils/appContext";
import themeLogo from "@/public/theme-logo.png";
import { Toaster, toaster } from "@/components/ui/toaster";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";

// Fetcher function for SWR
const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.error) throw new Error("Restaurant not found");
    return data;
};

// Custom hook for table number management
const useTableNumber = (resto: any) => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const TABLE = searchParams.get("table");

  useEffect(() => {
    if (!TABLE) {
      setOpen(true);
    }
    console.log("the table is ", !TABLE)
  }, [TABLE]);

  return { open, setOpen, tableNumber, setTableNumber, TABLE };
};

// TableDialog Component
const TableDialog = ({ open, onSubmit, restaurant, tableNumber, setTableNumber }: any) => (
  <DialogRoot open={open}>
    <DialogContent 
      as={motion.div}
      className="bg-gray-800 border border-white/20 rounded-2xl overflow-hidden max-w-sm lg:max-w-md w-full mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <Flex
            bg={restaurant?.brandColor || "gray.700"}
            p={8}
            direction="column"
            align="center"
            gap={6}
            className="relative overflow-hidden"
        >
            <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgGradient={`linear(to-b, ${restaurant?.brandColor || 'gray.700'}80, ${restaurant?.brandColor || 'gray.700'})`}
            filter="blur(20px)"
            transform="scale(1.2)"
            />
            <Box position="relative" zIndex={1}>
            <Image
                src={restaurant?.logo || themeLogo}
                alt="Restaurant Logo"
                width={100}
                height={100}
                style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
                }}
            />
            </Box>
            <Heading 
            fontSize="3xl" 
            color="white"
            fontWeight="bold"
            textAlign="center"
            position="relative"
            zIndex={1}
            >
            {restaurant?.name}
            </Heading>
        </Flex>
      </motion.div>
      <Box p={8} bg="gray.800">
        <Text 
          fontSize="lg" 
          mb={6} 
          color="whiteAlpha.900"
          textAlign="center"
          fontWeight="medium"
        >
          Please enter your table number to continue
        </Text>

        <Input
          placeholder="Table Number"
          px={2}
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          type="number"
          min="1"
          size="lg"
          bg="gray.700"
          borderColor="whiteAlpha.300"
          color="white"
          fontSize="lg"
          height="56px"
          _placeholder={{ color: "whiteAlpha.500" }}
          _hover={{ borderColor: "whiteAlpha.400" }}
          _focus={{ 
            borderColor: restaurant?.brandColor || "blue.400",
            boxShadow: `0 0 0 1px ${restaurant?.brandColor || "blue.400"}`
          }}
        />

        <Button
          mt={6}
          w="full"
          size="lg"
          bg={restaurant?.brandColor || "blue.500"}
          color="white"
          onClick={onSubmit}
          height="56px"
          fontSize="lg"
          _hover={{ 
            transform: "translateY(-2px)",
            filter: "brightness(110%)"
          }}
          _active={{ transform: "translateY(0)" }}
          transition="all 0.2s ease"
          disabled={!tableNumber}
        >
          Continue to Menu
          <RiArrowRightLine style={{ marginLeft: 8, fontSize: "1.2em" }} />
        </Button>
      </Box>
    </DialogContent>
  </DialogRoot>
);

// Background Animation Component
const AnimatedBackground = ({ color }: { color: string }) => (
  <motion.div
    animate={{
        rotate: [45, 47, 45],
        scale: [1, 1.02, 1],
    }}
    transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
    }}
  >
    <Box
        as={motion.div}
        position="absolute"
        top="50%"
        left="50%"
        w="200%"
        h="200%"
        bgGradient={`linear(to-br, ${color}10, ${color}30)`}
        zIndex={0}
    />
  </motion.div>
);

// Main Page Component
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { resto, setResto } = useAppContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ID = pathname.split("/")[1];
  useEffect(()=>{
    setResto({...resto, _id: ID});
  }, [])
  // Data fetching with SWR
  const { data: restaurant, error } = useSWR(
    ID ? `/api/get/restaurant?resto=${ID}` : null,
    fetcher,
    {
      onSuccess: setResto,
      onError: () => {
        toaster.create({
          title: "Error",
          description: "Failed to load restaurant data",
          type: "error",
          duration: 3000,
        });
      }
    }
  );

  // Table number management
  const { open, setOpen, tableNumber, setTableNumber, TABLE } = useTableNumber(resto);

  const handleTableSubmit = () => {
    if (tableNumber) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("table", tableNumber);
      router.push(currentUrl.pathname + currentUrl.search);
      setOpen(false);
    }
  };

  if (!restaurant && !error) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="black">
        <Spinner 
          size="xl" 
          color="white"
        //   speed="0.65s"
        //   emptyColor="gray.700"
        />
      </Flex>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      <Flex 
        as={motion.div}
        minH="100vh" 
        bg={restaurant?.brandColor || "black"} 
        direction="column" 
        align="center" 
        justify="center"
        px={4}
        py={8}
        position="relative"
        overflow="hidden"
      >
        <Toaster />
        
        <TableDialog 
          open={open}
          onSubmit={handleTableSubmit}
          restaurant={restaurant}
          tableNumber={tableNumber}
          setTableNumber={setTableNumber}
        />
        <AnimatedBackground color={restaurant?.brandColor || "#000"} />
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <Flex 
                direction="column" 
                align="center" 
                maxW="600px" 
                w="full" 
                zIndex={1}
                gap={12}
                >
                <Box
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="2xl"
                    position="relative"
                    w="full"
                    maxW="400px"
                    height="300px"
                    transition="all 0.3s ease"
                    _hover={{ transform: "scale(1.02)", boxShadow: "3xl" }}
                    bg="gray.800"
                >
                    <Image
                    src={restaurant?.logo || themeLogo}
                    alt={`${restaurant?.name || "Restaurant"} Logo`}
                    fill
                    style={{
                        objectFit: "contain",
                        padding: "2rem",
                    }}
                    />
                </Box>

                <Flex direction="column" align="center" gap={6} textAlign="center">
                    <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    >
                        <Heading 
                            fontSize={{ base: "4xl", md: "6xl" }}
                            color="white"
                            fontWeight="bold"
                            textShadow="2px 2px 4px rgba(0,0,0,0.3)"
                            letterSpacing="tight"
                        >
                        {restaurant?.name}
                        </Heading>
                    </motion.div>
                    {restaurant?.description && (
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Text 
                            fontSize="xl"
                            color="whiteAlpha.900"
                            maxW="500px"
                            lineHeight="tall"
                        >
                            {restaurant.description}
                        </Text>
                    </motion.p>
                    )}
                </Flex>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Flex 
                        direction="column" 
                        gap={4} 
                        w="full" 
                        maxW="300px"
                    >
                        <Button
                            color="white"
                            // onClick={() => router.push(`/${resto._id}/home${TABLE ? `?table=${TABLE}` : ''}`)}
                            onClick={() => router.push(`/677ef29fba30474383bf1128/home${TABLE ? `?table=${TABLE}` : ''}`)}
                            size="lg"
                            height="64px"
                            fontSize="xl"
                            borderRadius="xl"
                            bg="whiteAlpha.200"
                            backdropFilter="blur(10px)"
                            px={5}
                            _hover={{
                                bg: "whiteAlpha.300",
                                transform: "translateY(-2px)",
                            }}
                            _active={{ transform: "translateY(0)" }}
                            transition="all 0.2s ease"
                        >
                            <MdRestaurantMenu size={24} style={{ marginRight: '8px' }} /> View Menu
                        </Button>

                        <Button
                            color="white"
                            bg={`${restaurant?.brandColor || "blue.500"}40`}
                            backdropFilter="blur(10px)"
                            size="lg"
                            height="64px"
                            fontSize="xl"
                            borderRadius="xl"
                            px={5}
                            _hover={{
                                bg: `${restaurant?.brandColor || "blue.500"}60`,
                                transform: "translateY(-2px)",
                            }}
                            _active={{ transform: "translateY(0)" }}
                            transition="all 0.2s ease"
                        >
                            <BiSolidOffer size={24} style={{ marginRight: '8px' }} /> Daily Specials
                        </Button>

                        <Button
                            color="white"
                            bg="whiteAlpha.200"
                            backdropFilter="blur(10px)"
                            size="lg"
                            height="64px"
                            fontSize="xl"
                            borderRadius="xl"
                            px={5}
                            _hover={{
                                bg: "whiteAlpha.300",
                                transform: "translateY(-2px)",
                            }}
                            _active={{ transform: "translateY(0)" }}
                            transition="all 0.2s ease"
                        >
                            <FaRegCalendarAlt size={22} style={{ marginRight: '8px' }} /> Reservations
                        </Button>

                        <Button
                            color="white"
                            bg={`${restaurant?.brandColor || "blue.500"}40`}
                            backdropFilter="blur(10px)"
                            size="lg"
                            height="64px"
                            fontSize="xl"
                            borderRadius="xl"
                            px={5}
                            _hover={{
                                bg: `${restaurant?.brandColor || "blue.500"}60`,
                                transform: "translateY(-2px)",
                            }}
                            _active={{ transform: "translateY(0)" }}
                            transition="all 0.2s ease"
                        >
                            <IoFastFoodOutline size={24} style={{ marginRight: '8px' }} /> Order Takeaway
                        </Button>

                        <Flex gap={4} w="full">
                            <Button
                                flex={1}
                                variant="outline"
                                color="white"
                                borderColor="whiteAlpha.400"
                                borderWidth="2px"
                                size="lg"
                                height="64px"
                                fontSize="xl"
                                borderRadius="xl"
                                _hover={{
                                    bg: "whiteAlpha.100",
                                    borderColor: "whiteAlpha.600",
                                    transform: "translateY(-2px)",
                                }}
                                _active={{ transform: "translateY(0)" }}
                                transition="all 0.2s ease"
                            >
                                <FaMapMarkerAlt size={22} />
                            </Button>
                            <Button
                                flex={1}
                                variant="outline"
                                color="white"
                                borderColor="whiteAlpha.400"
                                borderWidth="2px"
                                size="lg"
                                height="64px"
                                fontSize="xl"
                                borderRadius="xl"
                                _hover={{
                                    bg: "whiteAlpha.100",
                                    borderColor: "whiteAlpha.600",
                                    transform: "translateY(-2px)",
                                }}
                                _active={{ transform: "translateY(0)" }}
                                transition="all 0.2s ease"
                            >
                                <MdOutlineEmail size={24} />
                            </Button>
                            <Button
                                flex={1}
                                variant="outline"
                                color="white"
                                borderColor="whiteAlpha.400"
                                borderWidth="2px"
                                size="lg"
                                height="64px"
                                fontSize="xl"
                                borderRadius="xl"
                                _hover={{
                                    bg: "whiteAlpha.100",
                                    borderColor: "whiteAlpha.600",
                                    transform: "translateY(-2px)",
                                }}
                                _active={{ transform: "translateY(0)" }}
                                transition="all 0.2s ease"
                            >
                                <FaInstagram size={24} />
                            </Button>
                        </Flex>
                    </Flex>
                </motion.div>
            </Flex>
        </motion.div>
      </Flex>
      </motion.div>
    </AnimatePresence>
  );
}