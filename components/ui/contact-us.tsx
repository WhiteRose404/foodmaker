"use client";

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Input,
  Textarea,
  VStack,
  Grid,
  GridItem,
  Field,
  Separator,
  Flex
} from '@chakra-ui/react';
import LanguageSwitcher from '@/components/ui/language';
import { toaster, Toaster } from '@/components/ui/toaster';
import { Button } from './button';

type FormData = {
  firstname: string;
  lastname: string;
  business: string;
  email: string;
  message: string;
}

type FormErrors = {
  firstname?: string;
  lastname?: string;
  business?: string;
  email?: string;
  message?: string;
}

const ContactPage = ({ dict, lang } : any) => {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    business: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate first name
    if (!formData.firstname.trim()) {
      newErrors.firstname = dict.validation?.required || "This field is required";
      isValid = false;
    }

    // Validate last name
    if (!formData.lastname.trim()) {
      newErrors.lastname = dict.validation?.required || "This field is required";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = dict.validation?.required || "This field is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = dict.validation?.invalidEmail || "Invalid email address";
      isValid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = dict.validation?.required || "This field is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = dict.validation?.messageTooShort || "Message is too short";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Success
        toaster.create({
          title: dict.messages?.success?.title || "Message sent!",
          description: dict.messages?.success?.description || "We'll get back to you soon."
        });
        
        // Reset form
        setFormData({
          firstname: '',
          lastname: '',
          business: '',
          email: '',
          message: ''
        });
      } else {
        // Error
        throw new Error("Server error");
      }
    } catch (error) {
      toaster.create({
        title: dict.messages?.error?.title || "Error",
        description: dict.messages?.error?.description || "Something went wrong. Please try again.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
      dir={lang.toLowerCase() === "ar" ? "rtl" : "ltr"}
    >
      <Toaster />
      <Box position="absolute" top={4} right={4} zIndex={2}>
        <LanguageSwitcher lang={lang}/>
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
                  {dict.brand}
                </Heading>
                <Text 
                  fontSize="lg" 
                  color="whiteAlpha.800"
                  letterSpacing="wide"
                  maxW="400px"
                >{dict.description}</Text>
              </Box>

              <VStack align="flex-start" gap={6} pt={8}>
                <Box>
                  <Text fontSize="sm" color="whiteAlpha.600" mb={1}>{dict.cordination.location.label}</Text>
                  <Text fontSize="md" letterSpacing="wide">{dict.cordination.location.value}</Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="whiteAlpha.600" mb={1}>{dict.cordination.email.label}</Text>
                  <Text fontSize="md" letterSpacing="wide">{dict.cordination.email.value}</Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="whiteAlpha.600" mb={1}>{dict.cordination.phone.label}</Text>
                  <Text fontSize="md" letterSpacing="wide" dir='ltr'>{dict.cordination.phone.value}</Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="whiteAlpha.600" mb={1}>{dict.cordination.hours.label}</Text>
                  <Text fontSize="md" letterSpacing="wide">{dict.cordination.hours.value}</Text>
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
              >{dict.title}</Heading>

              <VStack as="form" gap={6} onSubmit={handleSubmit}>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} width="100%">
                  <Field.Root>
                    <Field.Label fontSize="sm" color="whiteAlpha.700">{dict.form.labels.firstname}</Field.Label>
                    <Input 
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      variant="flushed" 
                      borderColor={errors.firstname ? "red.500" : "whiteAlpha.200"}
                      _hover={{ borderColor: errors.firstname ? "red.300" : 'whiteAlpha.400' }}
                      _focus={{ borderColor: errors.firstname ? "red.300" : 'white' }}
                      placeholder={dict.form.placeholders.firstname}
                    />
                    {errors.firstname && (
                      <Text color="red.400" fontSize="xs" mt={-1}>{errors.firstname}</Text>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label fontSize="sm" color="whiteAlpha.700">{dict.form.labels.lastname}</Field.Label>
                    <Input 
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      variant="flushed" 
                      borderColor={errors.lastname ? "red.500" : "whiteAlpha.200"}
                      _hover={{ borderColor: errors.lastname ? "red.300" : 'whiteAlpha.400' }}
                      _focus={{ borderColor: errors.lastname ? "red.300" : 'white' }}
                      placeholder={dict.form.placeholders.lastname}
                    />
                    {errors.lastname && (
                      <Text color="red.400" fontSize="xs" mt={-1}>{errors.lastname}</Text>
                    )}
                  </Field.Root>
                </Grid>

                <Field.Root>
                  <Field.Label fontSize="sm" color="whiteAlpha.700">{dict.form.labels.business}</Field.Label>
                  <Input 
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    variant="flushed" 
                    borderColor={errors.business ? "red.500" : "whiteAlpha.200"}
                    _hover={{ borderColor: errors.business ? "red.300" : 'whiteAlpha.400' }}
                    _focus={{ borderColor: errors.business ? "red.300" : 'white' }}
                    placeholder={dict.form.placeholders.business}
                  />
                  {errors.business && (
                    <Text color="red.400" fontSize="xs" mt={-1}>{errors.business}</Text>
                  )}
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm" color="whiteAlpha.700">{dict.form.labels.email}</Field.Label>
                  <Input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="flushed" 
                    borderColor={errors.email ? "red.500" : "whiteAlpha.200"}
                    _hover={{ borderColor: errors.email ? "red.300" : 'whiteAlpha.400' }}
                    _focus={{ borderColor: errors.email ? "red.300" : '' }}
                    placeholder={dict.form.placeholders.email}
                    type="email"
                  />
                  {errors.email && (
                    <Text color="red.400" fontSize="xs" mt={-1}>{errors.email}</Text>
                  )}
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm" color="whiteAlpha.700">{dict.form.labels.message}</Field.Label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    variant="flushed" 
                    borderColor={errors.message ? "red.500" : "whiteAlpha.200"}
                    _hover={{ borderColor: errors.message ? "red.300" : 'whiteAlpha.400' }}
                    _focus={{ borderColor: errors.message ? "red.300" : 'white' }}
                    placeholder={dict.form.placeholders.message}
                    rows={4}
                  />
                  {errors.message && (
                    <Text color="red.400" fontSize="xs" mt={-1}>{errors.message}</Text>
                  )}
                </Field.Root>

                <Button
                  type="submit"
                  width="100%"
                  bg="white"
                  color="gray.900"
                  _hover={{ bg: 'whiteAlpha.900' }}
                  size="lg"
                  mt={4}
                  letterSpacing="wide"
                  loading={isSubmitting}
                  loadingText={dict.submitting || "Sending..."}
                  transition="all 0.2s"
                  _active={{
                    transform: 'scale(0.98)',
                    bg: 'whiteAlpha.800'
                  }}
                >
                  {dict.button}
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
        {dict.rights}
      </Box>
    </Flex>
  );
};

export default ContactPage;