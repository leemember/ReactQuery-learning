# 👩🏻‍💻 ReactQuery-learning

시작일 : 2023.03.09 목요일

---

현재는 ReactQuery 버전 4가 릴리스 되었다. 버전 4에서는 ReactQuery -> **TanStack Query** 라고 부른다.

### 📍 설치

```
// 3버전을 사용할 경우
npm install react-query@^3
```

### 😶 3버전과 4버전의 차이

- v4에서 설치 및 가져오기 수행하려면 `@tanstack/react-query` 로 권장
- 쿼리키는 배열이어야 한다. 과정에서 쿼리 키 배열 대신 문자열을 사용하는 경우 배열로 묶어야 한다.
- 개발자 도구를 별도로 설치하고 `@tanstack/react-query-devtools`에서 가져와야 한다.
- `setLogger` (테스트 섹션에서 사용)가 제거되었다. 대신 `QueryClient` 옵션으로 로거를 추가해야 한다.

### 📚 react-query 기능 알아보기

- 가장 기본적인 데이터 페칭
- 로딩 및 오류 상태 관리 (데이터가 로딩되었을 때와 오류 발생시 사용자에게 알려준다)
- 리액트 쿼리 개발자 도구를 통해 쿼리에 무슨 일이 일어났는지 추적이 가능하다.
- 블로그 게시물에 Pagination 기능을 써서 리액트 쿼리에서 어떻게 작업하는 지 알 수 있다
- Pagination 에 프리패칭(Prefetching)을 수행할 수 있다. `프리패칭(Prefetching)`이란 ? 다음 페이지를 미리 가져오면 사용자가 다음 페이지를 클릭 할 때 데이터를 즉시 가져오기 때문에 매끄럽게 처리되도록 할 수 있다.

서버 데이터를 변경하는 변이에 대해서도 알아보자면, 이 변이가 서버 데이터에 어떤 영향을 미치는지 볼수는 없지만 변이가 리액트 쿼리와 작동하는 원리는 알 수 있다.

### 프로젝트에 리액트 쿼리 추가하는법

1. 라이브러리 추가 `npm install react-query`
2. 쿼리 클라이언트 생성하기 - 쿼리와 서비의 데이터 캐시를 관리하는 클라이언트
3. 자녀 컴포넌트에 캐시와 클라이언트 구성을 제공할 querProvider 적용
4. 서버에서 데이터를 가져오기 위해 useQuery 훅을 실행해야 한다. (서버에서 데이터를 가져오는 훅)

### ✅ 초기세팅

```
import "./App.css";
import { Posts } from "./Posts";
import { QueryClient, QueryClientProvider } from "react-query";

const QueryClient = new QueryClient();

/**
 * QueryClient와 QueryClientProvider 로 감싸진
 * 컴포넌트들은 React Query 훅을 사용할 수 있다.
 * @returns
 */
function App() {
  return (
    <QueryClientProvider client={QueryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
```

### 쿼리 사용 인터페이스

```
const { data } = useQuery("쿼리이름", 쿼리함수 = 데이터를 가져오는 함수);
```
