import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = {
  locale: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  {
    locale: "en-US",
    name: "English",
    flag: "🇺🇸",
  },
  {
    locale: "pt-BR",
    name: "Português",
    flag: "🇧🇷",
  },
];

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const { i18n } = useTranslation();

  const switchLanguage = (language: Language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language.locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline-block">{currentLanguage.name}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.locale}
            onClick={() => switchLanguage(language)}
            className="cursor-pointer"
          >
            <span className="mr-2 text-lg">{language.flag}</span>
            <span>{language.name}</span>
            {currentLanguage.locale === language.locale && (
              <Check className="ml-auto h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
