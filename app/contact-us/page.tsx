"use client";


import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Input,
  Textarea,
  Button,
  VStack,
  Grid,
  GridItem,
  Field,
  Separator,
  Flex
} from '@chakra-ui/react';
import LanguageSwitcher from '@/components/ui/language';


const ContactPage = () => {
  return (
    <Flex 
      justifyContent={"center"}
      alignItems={"center"}
      minH="100vh" 
      bg="linear-gradient(135deg, #1a1a1a 0%, #2d1f2d 100%)"
      color="white"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03,
        backgroundImage: 
          'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), ' +
          'linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), ' +
          'linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%), ' +
          'linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      }}
    >
      <Box position="absolute" top={4} right={4} zIndex={2}>
        <LanguageSwitcher />
      </Box>
      <Container maxW="7xl" py={20}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1px 1fr' }} gap={16}>
          {/* Left Section */}
          <GridItem>
            <VStack align="flex-start" gap={8}>
              <Box>
                <Heading 
                  fontSize={{ base: "4xl", lg: "5xl" }} 
                  fontWeight="light" 
                  letterSpacing="wider"
                  mb={4}
                >
                  DISH.MA
                </Heading>
                <Text 
                  fontSize="lg" 
                  color="whiteAlpha.800"
                  letterSpacing="wide"
                  maxW="400px"
                >
                  Transform your dining experience into a seamless journey of digital elegance
                </Text>
              </Box>

              <VStack align="flex-start" gap={6} pt={8}>
                <Box>
                  <Text fontSize="sm" color="whiteAlpha.600" mb={1}>Our Location</Text>
                  <Text fontSize="md" letterSpacing="wide">Rabat, Morocco</Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="whiteAlpha.600" mb={1}>Email</Text>
                  <Text fontSize="md" letterSpacing="wide">contact@dish.ma</Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="whiteAlpha.600" mb={1}>Phone Number</Text>
                  <Text fontSize="md" letterSpacing="wide">+212 (691) 829265</Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="whiteAlpha.600" mb={1}>Hours</Text>
                  <Text fontSize="md" letterSpacing="wide">Monday - Friday: 9:00 - 18:00</Text>
                </Box>
              </VStack>
            </VStack>
          </GridItem>

          {/* Divider */}
          <GridItem display={{ base: 'none', lg: 'block' }}>
            <Separator orientation="vertical" borderColor="whiteAlpha.200" />
          </GridItem>

          {/* Right Section - Contact Form */}
          <GridItem>
            <VStack gap={8} align="stretch">
              <Heading 
                fontSize="2xl" 
                fontWeight="light" 
                letterSpacing="wider"
              >
                Connect With Us
              </Heading>

              <VStack as="form" gap={6}>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} width="100%">
                  <Field.Root>
                    <Field.Label fontSize="sm" color="whiteAlpha.700">First Name</Field.Label>
                    <Input 
                      variant="flushed" 
                      borderColor="whiteAlpha.200"
                      _hover={{ borderColor: 'whiteAlpha.400' }}
                      _focus={{ borderColor: 'white' }}
                      placeholder="Ahmed"
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label fontSize="sm" color="whiteAlpha.700">Last Name</Field.Label>
                    <Input 
                      variant="flushed" 
                      borderColor="whiteAlpha.200"
                      _hover={{ borderColor: 'whiteAlpha.400' }}
                      _focus={{ borderColor: 'white' }}
                      placeholder="Tahari"
                    />
                  </Field.Root>
                </Grid>

                <Field.Root>
                  <Field.Label fontSize="sm" color="whiteAlpha.700">Restaurant / Hotel Name</Field.Label>
                  <Input 
                    variant="flushed" 
                    borderColor="whiteAlpha.200"
                    _hover={{ borderColor: 'whiteAlpha.400' }}
                    _focus={{ borderColor: 'white' }}
                    placeholder="Le Gourmet"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm" color="whiteAlpha.700">Email</Field.Label>
                  <Input 
                    variant="flushed" 
                    borderColor="whiteAlpha.200"
                    _hover={{ borderColor: 'whiteAlpha.400' }}
                    _focus={{ borderColor: 'white' }}
                    placeholder="tahiri@example.com"
                    type="email"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm" color="whiteAlpha.700">Message</Field.Label>
                  <Textarea 
                    variant="flushed" 
                    borderColor="whiteAlpha.200"
                    _hover={{ borderColor: 'whiteAlpha.400' }}
                    _focus={{ borderColor: 'white' }}
                    placeholder="Tell us about your establishment..."
                    rows={4}
                  />
                </Field.Root>

                <Button
                  width="100%"
                  bg="white"
                  color="gray.900"
                  _hover={{ bg: 'whiteAlpha.900' }}
                  size="lg"
                  mt={4}
                  letterSpacing="wide"
                >
                  Send Message
                </Button>
              </VStack>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      <Box 
        position="absolute" 
        bottom={4} 
        left={0} 
        right={0} 
        textAlign="center"
        color="whiteAlpha.600"
        fontSize="sm"
      >
        © 2025 Dish Premium. All rights reserved.
      </Box>
    </Flex>
  );
};

export default ContactPage;