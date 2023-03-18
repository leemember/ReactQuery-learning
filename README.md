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

- `isLoading`, `isError` 이 둘은 데이터가 로딩중인지 데이터를 가져올 때 오류가 있는지 여부를 알려준다.

```
const { data, isError, isLoading } = useQuery("posts", fetchPosts)

if(isLoading) return <h3>로딩중...</h3>
```

> https://tanstack.com/query/v4/docs/react/reference/useQuery

구조 분해해서 한다. 여기서 로딩중인지 확인해보려면 개발자도구에서 `네트워크 -> 캐시 사용 중지 -> 느린 3G` 로 변경하면 확인할 수 있다.
isLoading 외에도 isFetching 도 적용이 가능하다.

1. isFetching

- 비동기 쿼리가 해결되지 않았음을 의미한다.

2. isLoading

- 가져오는 상태에 있음을 의미한다. 캐시 된 데이터도 없다. 데이터를 가져오는 중이라는 뜻이다.
  나중에 Pagination을 진행할 때 캐시된 데이터가 있을 때와 없을 때를 구분해야 한다는 사실을 알게 될 것이다.

### React Query Dev Tools 개발자 도구

> https://react-query-v3.tanstack.com/devtools

- 앱에 추가할 수 있는 컴포넌트로 개발중인 모든 쿼리의 상태를 표시해준다.
- 쿼리 키로 쿼리를 표시ㅐ훈다. 활성, 비활성, 만료 등 모든 쿼리의 상태를 알려준다.
- 마지막으로 업데이트된 타임스탬프도 알려준다.
- 데이터 탐색기도 있다.
- 쿼리를 볼 수 있는 쿼리 탐색기도 있다.

### 개발자 도구 세팅하는 법

- App.js 파일에가서

```
// 상단
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools /> // 👉 이런식으로 추가해주기
    </QueryClientProvider>
  );
}

```

그럼 웹페이지에서 이제 꽃모양이 보이면 세팅 성공.
그럼 이제 데이터 패칭할 때 쓸 isError 나 isLoading 같은것을 확인할 때
개발자도구에서 네트워크에 속도 제한을 안둬도 된다.

![](https://velog.velcdn.com/images/leemember/post/ff06aea5-3740-4487-8c57-6515ee06a979/image.png)

여기서 데이터를 확인할 수 있다. fetching에서 stale(만료)로 상태가 변경된 것을 확인 했다.
데이터 리페칭은 만료된 데이터에서만 실행된다. 데이터 리페칭 실행에는 만료된 데이터 외에도 여러 트리거가 있다.

staleTime은 데이터를 허용하는 '최대치'라고 할 수 있다.

### staleTime 적용하기

```
const { data, isError, isLoading } = useQuery("posts", fetchPosts, {staleTime: 2000} 👈 세 번째 인수는 옵션이다.) 이는 2초마다 만료되도록 설정하는 것이다.

if(isLoading) return <h3>로딩중...</h3>
```

이렇게 옵션을 줌으로써 2초동안 fresh였다가 stale로 변한것을 볼 수 있다.
데이터가 만료되지 않으면 리페칭은 실행되지 않는다. 데이터가 만료된 경우에만 실행된다. staleTime의 기본값은 왜 0ms이냐면, 데이터는 항상 만료 상태이므로 서버에서 다시 가져와야 한다고 가정한다는 뜻이다.

### cacheTime ?

- 캐시는 나중에 다시 필요할 수도 있는 데이터용이다.
  특정 쿼리에 대한 활성 `useQuery`가 없는 경우, 해당 데이터는 콜드 스토리지로 이동한다. 구성된 `cacheTime`이 지나면 캐시의 데이터가 만료되며 유효 시간의 기본값은 5분이다.
  캐시가 만료되면 가비지 컬렉션이 실행되고 클라이언트는 데이터를 사용할 수 없다.
  데이터가 캐시에 있는 동안에는 페칭할 때 사용될 수 있다. 서버의 최신 데이터로 새로 고침이 가능하다.

👉 트리거란? 데이터베이스가 미리 정해놓은 조건을 만족하거나 어떤 동작이 수행되면 자동적으로 수행되는 동작이다.

### 쿼리키

- 어떠한 트리거가 있어야만 데이터를 다시 가져오게 된다.
- 컴포넌트를 다시 마운트하거나 윈도우를 다시 포커스할 때
- `useQuery`에서 반환되어 수동으로 리페칭을 실행할 때
- 지정된 간격으로 리페칭을 자동 실행할 때
- 변이를 생성한 뒤 쿼리를 무효화 할 때
- 클라이언트의 데이터가 서버의 데이터와 불일치할 때 리페칭이 트리거 된다.
- 쿼리는 게시물 아이디를 포함하기 때문에 쿼리별로 캐시를 남길 수 있다.
- 각 쿼리에 해당하는 캐시를 가지게 된다.
- 각 게시물에 대한 쿼리에 라벨을 설정해주면 된다. 바로 쿼리 키에 문자열 대신 배열을 전달하면 가능하다.

```
['comments', post.id]
```

이처럼 의존성 배열로 취급해서 사용하면 된다.
즉 post.id가 업데이트 되면 리액트쿼리가 새 쿼리를 만들고
staleTime과 cacheTime을 갖게 된다.

```
 const { data, isLoading, isError, error } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );
```

이런식으로 사용을 한다. comments를 쿼리키로 지정한 것이다.

### pagination

- 페이지 매김이라고 한다.
- 현재 페이지를 파악하는..!
- 이것도 쿼리키가 필요하다.
- 쿼리키를 배열로 업데이트해서 가져오는 페이지 번호를 포함하도록 하자.
- 사용자가 다음 혹은 이전 페이지로 넘어가는 버튼을 클릭시 업데이트가 일어나도록 하자.
- 그럼 리액트쿼리가 바뀐 쿼리키를 감지하고 새로운 쿼리를 실행해서 새 페이지가 표시된다.
