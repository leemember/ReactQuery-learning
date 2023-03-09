import "./App.css";
import { Posts } from "./Posts";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

/**
 * QueryClient와 QueryClientProvider 로 감싸진
 * 컴포넌트들은 React Query 훅을 사용할 수 있다.
 * @returns
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
