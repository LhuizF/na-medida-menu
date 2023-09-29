"use client";
import { QueryClientProvider, QueryClient } from "react-query";
import { CartProvider } from "@/contexts/cart";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/styles";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
