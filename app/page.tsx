"use client";

import React from 'react';
import { Box, Container, Heading, Text, Button, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import LanguageSwitcher from '@/components/ui/language';
import Link from 'next/link';


const LuxuryLanding = () => {
  return (
    <Flex 
      minH="100vh" 
      bg="linear-gradient(135deg, #1a1a1a 0%, #2d1f2d 100%)"
      color="white"
      position="relative"
      overflow="hidden"
      justify={"center"}
      alignItems={"center"}
    >
      <Box position="absolute" top={4} right={4} zIndex={30}>
        <LanguageSwitcher />
      </Box>
      {/* Subtle animated background pattern */}
      <Box 
        minH="100vh"
        minW="100vw" 
        bg="linear-gradient(135deg, #1a1a1a 0%, #2d1f2d 100%)"
        position="absolute"
        color="white"
        overflow="hidden"
        zIndex={10}
        opacity={0.5}
      />
      <Box 
        minH="100vh"
        minW="100vw" 
        position="absolute"
        overflow="hidden"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.1}
        backgroundImage={ 
          'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), ' +
          'linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), ' +
          'linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%), ' +
          'linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%)'}
        backgroundSize='20px 20px'
        backgroundPosition='0 0, 0 10px, 10px -10px, -10px 0px'
        zIndex={10}
      />
      <Box 
        minH="100vh"
        minW="100vw" 
        bg="linear-gradient(135deg, #1a1a1a 0%, #2d1f2d 100%)"
        position="absolute"
        overflow="hidden"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.5}
        zIndex={10}
      />

      <Container position={"relative"} maxW="7xl" py={20} zIndex={10}>
        <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between" gap={10}>
          <Box flex="1">
            <Heading 
              as="h1" 
              fontSize={{ base: "4xl", lg: "6xl" }} 
              fontWeight="light" 
              letterSpacing="wider"
              mb={6}
            >
              DISH.MA
            </Heading>
            
            <Text 
              fontSize={{ base: "xl", lg: "2xl" }} 
              fontWeight="light" 
              letterSpacing="wide" 
              mb={8}
              maxW="600px"
              lineHeight="tall"
            >
              Elevating the art of fine dining through seamless digital experiences
            </Text>
            
            <Text 
              fontSize={{ base: "md", lg: "lg" }} 
              color="whiteAlpha.800"
              mb={12}
              maxW="500px"
            >
              Curated digital menu solutions for distinguished establishments that define culinary excellence
            </Text>

            <Flex gapX={6} gapY={3} flexWrap="wrap">
              <Button
                bg="transparent"
                border="1px solid"
                borderColor="whiteAlpha.300"
                _hover={{ bg: 'whiteAlpha.100' }}
                size="lg"
                px={8}
                letterSpacing="wide"
              >
                Experience Demo
              </Button>
              
              <Button
                bg="white"
                color="gray.900"
                _hover={{ bg: 'whiteAlpha.900' }}
                size="lg"
                letterSpacing="wide"
              >
                <Link className="px-8" href={"/contact-us"} >Connect With Us</Link>
              </Button>
            </Flex>
          </Box>

          <Box 
            flex="1" 
            position="relative"
            transform={{ base: 'scale(0.9)', lg: 'scale(1)' }}
          >
            <Box
              position="absolute"
              top="-20px"
              right="-20px"
              bottom="-20px"
              left="-20px"
              bg="whiteAlpha.100"
              borderRadius="2xl"
              filter="blur(40px)"
            />
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Image 
                src="/premiumInterface.png" 
                alt="Premium Interface"
                borderRadius="2xl"
                boxShadow="2xl"
              />
            </motion.div>
          </Box>
        </Flex>
      </Container>

      <Box 
        position="absolute" 
        bottom={4} 
        left={0} 
        right={0} 
        textAlign="center"
        color="whiteAlpha.600"
        fontSize="sm"
        zIndex={50}
      >
        © 2025 Dish Premium. All rights reserved.
      </Box>
    </Flex>
  );
};

export default LuxuryLanding;