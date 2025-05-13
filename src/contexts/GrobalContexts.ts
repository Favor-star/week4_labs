import { createContext } from "react";

export const ActiveTab = createContext<
  | {
      activeTab: string;
      setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

export const SearchContext = createContext<{
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);
