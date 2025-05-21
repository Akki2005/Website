"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

// Add TypeScript declarations for Google Translate
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: any;
      };
    };
  }
}

// Language data always displayed in native script, regardless of page translation
const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "kn", name: "ಕನ್ನಡ" },
]

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isTranslateScriptLoaded, setIsTranslateScriptLoaded] = useState(false)

  useEffect(() => {
    // Add CSS to prevent Google Translate from affecting our language switcher
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-banner-frame { display: none !important; }
      body { top: 0 !important; }
      .notranslate { white-space: nowrap !important; }
    `;
    document.head.appendChild(style);
    
    // Check if Google Translate script is already loaded
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      // Create a hidden div for Google Translate
      const translateDiv = document.createElement('div');
      translateDiv.id = 'google_translate_element';
      translateDiv.style.display = 'none';
      document.body.appendChild(translateDiv);
      
      // Define the initialization function
      window.googleTranslateElementInit = function() {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,kn',
          autoDisplay: false
        }, 'google_translate_element');
        
        setIsTranslateScriptLoaded(true);
      };
      
      // Load Google Translate script
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    } else {
      setIsTranslateScriptLoaded(true);
    }
    
    // Load stored language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Protect language names from translation
  useEffect(() => {
    // Check if Google Translate has affected our elements and fix them
    const observer = new MutationObserver(() => {
      // Fix language names in dropdown
      document.querySelectorAll('[data-lang-name]').forEach(element => {
        const langCode = element.getAttribute('data-lang-name');
        const lang = languages.find(l => l.code === langCode);
        if (lang && element.textContent !== lang.name) {
          element.textContent = lang.name;
        }
      });
      
      // Fix current language name in button
      const currentLangButton = document.querySelector('[data-current-lang]');
      if (currentLangButton) {
        const lang = languages.find(l => l.code === currentLanguage);
        if (lang && !currentLangButton.textContent?.includes(lang.name)) {
          currentLangButton.innerHTML = `<svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>${lang.name}`;
        }
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [currentLanguage]);

  const handleLanguageChange = (langCode: string) => {
    // Save selected language
    localStorage.setItem('selectedLanguage', langCode);
    setCurrentLanguage(langCode);
    
    // Use cookies method (simpler and more reliable)
    if (langCode === "en") {
      // Clear translation cookies
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
    } else {
      // Set translation cookies
      document.cookie = `googtrans=/en/${langCode}`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname}`;
    }
    
    // Reload page to apply translation
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#FFF3E0] text-[#B22222] border-2 border-[#B22222] hover:bg-[#FFE0B2] hover:text-[#8B0000] notranslate"
          data-current-lang
        >
          <Globe className="mr-2 h-4 w-4" />
          {languages.find((lang) => lang.code === currentLanguage)?.name || "Language"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#FFF3E0] border-2 border-[#B22222]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="text-[#B22222] hover:bg-[#FFE0B2] hover:text-[#8B0000] cursor-pointer notranslate"
            data-lang-name={lang.code}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}