'use client'

import {
  Flex,
  Box,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react'


// System
import Image from 'next/image'


//Media
import Logo from "../../../public/theme-logo.png"


// components
import { Field } from "../../../components/ui/field"


export default function SimpleCard() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'white'}>
      <Flex flexDir={'column'} mx={'auto'} maxW={'lg'} py={12} px={6} gap={5}>
        <Image src={Logo} alt="company logo" style={{ paddingLeft: "1rem", paddingRight: "1rem"}} />
        <Box
          rounded={'lg'}
          bg={'white'}
          boxShadow={'lg'}
          p={5}>
          <Flex flexDir={"column"} gap={3}>
            {/* <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl> */}
            <Field gapY={0} label="Email" required >
                <Input border={"1px"} borderColor={"blackAlpha.800"} borderStyle={"solid"} px={2} placeholder="me@example.com" />
            </Field>
            <Field gapY={0} label="Password" required >
                <Input border={"1px"} borderColor={"blackAlpha.800"} borderStyle={"solid"} px={2} type="password" placeholder="***********" />
            </Field>
            <Flex flexDir={"column"}>
              <Button color={'black'}_hover={{ color: 'blackAlpha.700' }} mr={'auto'} py={5}>Forgot password?</Button>
              <Button
                bg={'black'}
                color={'white'}
                _hover={{
                  bg: 'blackAlpha.700',
                }}>
                    Sign in
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}