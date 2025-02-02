import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Icon
} from '@chakra-ui/react';
import { FaChevronDown } from "react-icons/fa";
import { FaGlobeAmericas, FaGlobeAfrica, FaGlobeEurope } from "react-icons/fa";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"


const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState('EN');
  
  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'FR', label: 'Français' },
    { code: 'AR', label: 'العربية' }
  ];

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    // Add your language change logic here
  };

  return (
    <MenuRoot>
      <MenuTrigger
        as={Button}
            // variant="ghost"
            color="white"
            fontSize="sm"
            fontWeight="normal"
            _hover={{ bg: 'whiteAlpha.100' }}
            _active={{ bg: 'whiteAlpha.200' }}
            px={5}
            rounded={"md"}
            gap={3}
            display={"flex"}
        >
            {currentLang === "EN" ? <FaGlobeAmericas size={16} /> : null }
            {currentLang === "AR" ? <FaGlobeAfrica size={16} /> : null }
            {currentLang === "FR" ? <FaGlobeEurope size={16} /> : null }
            <p>{currentLang}</p>
            <p><FaChevronDown size={16} /></p>
        {/* </Button> */}
      </MenuTrigger>
      <MenuContent
        bg="gray.900"
        color={"white"}
        borderColor="whiteAlpha.200"
        boxShadow="lg"
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            bg="transparent"
            color="white"
            _hover={{ bg: 'whiteAlpha.100' }}
            _focus={{ bg: 'whiteAlpha.100' }}
            value={lang.label}
          >
            {lang.label}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default LanguageSwitcher;