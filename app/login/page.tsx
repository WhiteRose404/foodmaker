'use client'


import {
  Flex,
  Box,
  Input,
} from '@chakra-ui/react'

// System
import { useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'

//Media
import Logo from "@/public/theme-logo.png"

// components
import { Field } from "@/components/ui/field"
import { Button } from '@/components/ui/button';


export default function SimpleLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] : [boolean, any] = useState<boolean>(false);
  const [error, setError] = useState('');

  const router = useRouter();  // Initialize the router
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json()
      if (response.status === 200) {
        // Store the JWT token in localStorage or cookie (if using cookie, update accordingly)
        // localStorage.setItem('authToken', data.token);
        // Redirect to a protected page, e.g., /dashboard
        // window.location.href = '/admin';
        router.push('/admin');
      } else {
        setError(data.error || 'Something went wrong!');
      }
    } catch (error) {
      setError('Failed to sign in, please try again.');
      console.error("Error", error)
    } finally {
      setIsLoading(false);
    }
  };
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
            <Field gapY={0} label="Email" required >
                <Input border={"1px"} borderColor={"blackAlpha.800"} borderStyle={"solid"} px={2} placeholder="me@example.com" onChange={(event: any) => setEmail(event.target.value)}/>
            </Field>
            <Field gapY={0} label="Password" required >
                <Input border={"1px"} borderColor={"blackAlpha.800"} borderStyle={"solid"} px={2} type="password" placeholder="***********" onChange={(event: any) => setPassword(event.target.value)}/>
            </Field>
            <Flex flexDir={"column"}>
              <Button disabled cursor={"disabled"} color={'black'}_hover={{ color: 'blackAlpha.700' }} mr={'auto'} py={5}>Forgot password?</Button>
              <Button
                bg={'black'}
                color={'white'}
                _hover={{
                  bg: 'blackAlpha.700',
                }}
                onClick={handleSubmit}
                loading={isLoading}
                loadingText="Logining...">
                    Sign in
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}