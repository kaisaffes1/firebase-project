import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./Routes/Routes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}
