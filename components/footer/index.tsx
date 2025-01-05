"use client"

import {
  Box,
  Link,
  Container,
  Flex,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { ReactNode } from 'react'

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <Link
      bg={'blackAlpha.100'}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: 'blackAlpha.200',
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Link>
  )
}

export default function SmallWithSocial() {
  return (
    <Box
      mt={"auto"}
      bg={'gray.50'}
      color={'gray.700'}>
      <Container
        as={Flex}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        justifyContent={{ base: 'center' }}
        alignItems={{ base: 'center', md: 'center' }}>
        <Text>Yoedd</Text>
        <Stack direction={'row'} ml={"auto"}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}