# 👩🏻‍💻 ReactQuery-learning

시작일 : 2023.03.09 목요일

---

### repo

```
🗂 myapp --> 기초단계 (useQuery 사용법, prefetching, pagination)
🗂 myapp_01 --> 무한 스크롤 (infinite-swapi)
```

현재는 ReactQuery 버전 4가 릴리스 되었다. 버전 4에서는 ReactQuery -> **TanStack Query** 라고 부른다.

### 📍 설치

- 3버전을 사용할 경우

```
npm install react-query@^3
```

### 😶 3버전과 4버전의 차이

- v4에서 설치 및 가져오기 수행하려면 `@tanstack/react-query` 로 권장
- 쿼리키는 **배열**이어야 한다. 과정에서 쿼리 키 배열 대신 문자열을 사용하는 경우 배열로 묶어야 한다.
- 개발자 도구를 별도로 설치하고 `@tanstack/react-query-devtools`에서 가져와야 한다.
- `setLogger` (테스트 섹션에서 사용)가 제거되었다. 대신 `QueryClient` 옵션으로 로거를 추가해야 한다.

### 📚 react-query 기능 알아보기

- 가장 기본적인 데이터 페칭
- 로딩 및 오류 상태 관리 (데이터가 로딩되었을 때와 오류 발생시 사용자에게 알려준다)
- 리액트 쿼리 개발자 도구를 통해 쿼리에 무슨 일이 일어났는지 추적이 가능하다.
- 블로그 게시물에 Pagination 기능을 써서 리액트 쿼리에서 어떻게 작업하는 지 알 수 있다
- Pagination 에 프리패칭(Prefetching)을 수행할 수 있다. `프리패칭(Prefetching)`이란 ? 다음 페이지를 미리 가져오면 사용자가 다음 페이지를 클릭 할 때 데이터를 즉시 가져오기 때문에 매끄럽게 처리되도록 할 수 있다.
- 서버 데이터를 변경하는 변이에 대해서도 알아보자면, 이 변이(Mutation)가 서버 데이터에 어떤 영향을 미치는지 볼수는 없지만 변이가 리액트 쿼리와 작동하는 원리는 알 수 있다.

### 🌼 프로젝트에 리액트 쿼리 추가하는법

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

### 🌼 쿼리 사용 인터페이스

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
- isFetching의 경우 async 쿼리 함수가 해결되지 않았을 때 참에 해당한다. (아직 데이터를 가져오고 있다는 중이라는 뜻)

2. isLoading

- 가져오는 상태에 있음을 의미한다. 캐시 된 데이터도 없다. **데이터를 가져오는 중**이라는 뜻이다.
  나중에 Pagination을 진행할 때 캐시된 데이터가 있을 때와 없을 때를 구분해야 한다는 사실을 알게 될 것이다.

### 🌸 React Query Dev Tools 개발자 도구

> https://react-query-v3.tanstack.com/devtools

- 앱에 추가할 수 있는 컴포넌트로 개발중인 모든 쿼리의 상태를 표시해준다.
- 쿼리 키로 쿼리를 표시해준다. `활성`, `비활성`, `만료(stale)` 등 모든 쿼리의 상태를 알려준다.
- 마지막으로 업데이트 된 타임스탬프도 알려준다.
- 데이터 탐색기도 있다.
- 쿼리를 볼 수 있는 쿼리 탐색기도 있다.

### 🌸 react-query dev tools 세팅하는 법

- App.js 파일에가서

```
// 상단
👉 import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      👉 <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

```

그럼 웹페이지에서 이제 꽃모양이 보이면 세팅 성공.
그럼 이제 데이터 패칭할 때 쓸 `isError` 나 `isLoading` 같은 것을 확인할 때
개발자도구에서 네트워크에 속도 제한을 안둬도 손쉽게 확인할 수 있다.

![](https://velog.velcdn.com/images/leemember/post/ff06aea5-3740-4487-8c57-6515ee06a979/image.png)

여기서 데이터를 확인할 수 있다. `fetching`에서 `stale(만료)`로 상태가 변경된 것을 확인 했다.
데이터 리페칭은 만료된 데이터에서만 실행된다. 데이터 리페칭 실행에는 만료된 데이터 외에도 여러 트리거가 있다.

`staleTime`은 데이터를 허용하는 '최대치'라고 할 수 있다.

### 🌼 staleTime 적용하기

```
const { data, isError, isLoading } = useQuery("posts", fetchPosts, {staleTime: 2000} 👈 세 번째 인수는 옵션이다.) 이는 2초마다 만료되도록 설정하는 것이다.

if(isLoading) return <h3>로딩중...</h3>
```

이렇게 옵션을 줌으로써 2초동안 `fresh`였다가 `stale`로 변한 것을 볼 수 있다.
데이터가 만료되지 않으면 리페칭은 실행되지 않는다. 데이터가 만료된 경우에만 실행된다.
staleTime의 기본값은 왜 `0ms`이냐면, 데이터는 항상 만료 상태이므로 서버에서 다시 가져와야 한다고 가정한다는 뜻이다.
`staleTime` 윈도우가 다시 포커스될 때 같은 특정 트리거에서 쿼리 데이터를 다시 가져올지 결정한다.
서버로 돌아가 데이터가 여전히 정확한지 확인해야되는 시점까지 데이터가 사용 가능한 상태로 유지되는 시간이다.

### 🔥 cacheTime ?

- 캐시는 나중에 다시 필요할 수도 있는 데이터용이다.
- `cacheTime`은 데이터가 비활성화된 이후 남아 있는 시간을 말한다.
  특정 쿼리에 대한 활성 `useQuery`가 없는 경우, 해당 데이터는 `콜드 스토리지`로 이동한다. ---> (콜드 스토리지란 남겨진 데이터를 말함)
  구성된 `cacheTime`이 지나면 캐시의 데이터가 만료되며 유효 시간의 기본값은 5분이다.
  캐시가 만료되면 가비지 컬렉션이 실행되고 클라이언트는 데이터를 사용할 수 없다.
  데이터가 캐시에 있는 동안에는 페칭할 때 사용될 수 있다. 서버의 최신 데이터로 새로 고침이 가능하다.

#### 👉 트리거란? 데이터베이스가 미리 정해놓은 조건을 만족하거나 어떤 동작이 수행되면 자동적으로 수행되는 동작이다.

### 🌼 쿼리키

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

### 🌸 pagination

- 페이지 매김이라고 한다.
- 현재 페이지를 파악하는..!
- 이것도 쿼리키가 필요하다.
- 쿼리키를 배열로 업데이트해서 가져오는 페이지 번호를 포함하도록 하자.
- 사용자가 다음 혹은 이전 페이지로 넘어가는 버튼을 클릭시 업데이트가 일어나도록 하자. 그럼 리액트쿼리가 바뀐 쿼리키를 감지하고 새로운 쿼리를 실행해서 새 페이지가 표시된다.

### 🌼 Prefetch

- 데이터를 미리 가져와 캐시에 넣는다.
- 기본값으로 만료 (stale) 상태를 나타낸다.
- `useQueryClient` 를 사용한다.

```
import { useQuery, 🌟useQueryClient } from "react-query";

  🌟const queryClient = useQueryClient();

  useEffect(() => {
    // 10페이지에 있다면 미리 데이터를 가져온 필요가 없다.
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;

      🌟queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPosts(nextPage)
      );
    }
  }, [currentPage, 🌟queryClient]);

    const { data, isError, isLoading, error } = useQuery(
    // 배열에 담긴 첫 번째 요소를 쿼리키라고 한다.
    ["posts", currentPage],
    // 이 배열이 바뀌면 함수도 바뀌기 때문에 데이터가 바뀔 수밖에 없다.
    () => fetchPosts(currentPage), // -> 함수의 파라미터값을 currentPage로 함
    {
      staleTime: 2000,
      // 쿼리키가 바껴도 지난 데이터를 유지해서 이전 페이지로 돌아갔ㅇㄹ 때 캐시에 해당 데이터가 있도록
      🌟 keepPreviousData: true,
    }
  );
```

### Prefetching을 위한 설계

![](https://velog.velcdn.com/images/leemember/post/0a8de4ae-cc39-4999-aba2-a70b2404a9a8/image.png)

Dev tools를 확인해보면 미리 데이터를 fetch 된 것을 확인할 수 있다.

### 🌼 Mutations 변이

- 변이는 서버에 **데이터를 업데이트 하도록 서버에 네트워크 호출을 실시**한다.
- 데이터를 추가, 삭제, 제목 변경에 해당된다.
- 서버를 실제로 업데이트 하지는 않는다 ! 변이를 생성하는 서버 호출을 전송하게 된다.
- 값이 false일 경우 롤백 진행
- 업데이트 된 해당 데이터로 **리액트쿼리 캐시를 업데이트**하는 것이다.
- 관련 쿼리를 무효화할 수 있다. -> 서버에서 리페치를 개시하여 클라이언트에 있는 데이터를 **서버의 데이터와 최신 상태로 유지**한다.

### 과정

- `useMutation` 훅을 사용한다.

```
 import { useQuery, 👉 useMutation, useQueryClient } from "react-query";

 const deleteMutation = useMutation((postId) => deletePost(postId));
 const updateMutation = useMutation((postId) => updatePost(postId));

 <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
 <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
```

---

## Infinite SWAPI

### infinite scroll

- 사용자가 스크롤 할 때마다 새로운 데이터를 가져온다. (모든 데이터를 한 번에 가져오는 것보다 훨씬 효율적)
- ex) 인스타그램, 페이스북, 트위터같은 플랫폼을 예시로 들 수 있다.
- `useInfiniteQuery` 라는 훅을 사용한다.
- 업데이트된 상태가 쿼리 키를 업데이트하고 쿼리 키가 데이터를 업데이트 한다.

### useInfiniteQuery

- 객체는 두 개의 프로퍼티를 가지고 있다.
- (1) 하나는 배열인 페이지, 페이지에 있는 각 요소가 하나의 useQuery에서 받는 데이터에 해당된다.
- (2) `pageParams` 가 있는데 이것은 각 페이지의 매개변수가 기록되어 있다.
- 모든 쿼리는 페이지 배열에 고유한 요소를 가지고 있고 그 요소는 해당 쿼리에 대한 데이터에 해당한다.
- pageParams는 검색된 쿼리의 키를 추적한다.
- PageParam은 쿼리 함수에 전달되는 매개변수이다.

```
useInfiniteQuery('peple', ({ pageParam = defaultUrl}) => fetchUrl(pageParam))
```

- 👉 'peple' : 이 부분이 쿼리키
- 매개변수, 객체를 구조 분해한 pageParam 를 사용한다.
- 첫 번째 Url로 정의한 Url을 기본값으로 설정!
  따라서 함수는 이 defaultUrl을 기본값으로 하는 pageParam을 사용해서 해당 pageParam에서 fetchUrl을 실행한다.
- `getNextPageParam` 옵션 -> 다음 체이지로 가는 방식을 정의하는 함수이다.
- `getNextPageParam(lastPage, allPages);` 여기서 lastPage는 다음 페이지의 URL이 무엇인지 알려준다.
  allPages는 데이터의 모든 페이지를 사용할 수 있다.
- 기존 useQuery랑은 다른 프로퍼티들이 존재한다.

### Properties

- fetchNextPage : 사용자가 더 많은 데이터를 요청할 때 호출하는 함수이다.
- hasNextPage : `getNextPageParam` 함수의 반환 값을 기반으로 한다.
  이 프로퍼티를 useInfiniteQuery에 전달해서 마지막 쿼리의 데이터를 어떻게 사용할지 지시한다.
  - undefined : 더이상 데이터가 없음
- isFetchingNextPage : useQuery에는 없는 것인데,
  useInfiniteQuery는 다음 페이지를 가져오는지 아니면 일반적인 페칭인지 구별할 수 있다.
- 무한 스크롤 컴포넌트에는 두 개의 프로퍼티가 있다.

1. loadMore : 데이터가 더 필요할 때 불러와 useInfiniteQuery에 나온 fetchNextPage 함수값을 이용
2. hasMore : useInfiniteQuery에서 나온 객체를 해체한 값을 이용한다.

무한 스크롤 컴포넌트는 스스로 페이지의 끝에 도달했음을 인식하고 fetchNextPage를 불러오는 기능이다.
그러면 데이터 프로퍼티에서 데이터에 접근할 수 있는데 useInfiniteQuery 컴포넌트에서 나온 객체를 이용한다.

```
npm install react-infinite-scroller
```

> https://www.npmjs.com/package/react-infinite-scroller

### 정리

- 리액트 쿼리는 무한 스크롤을 할 때 많은 기능을 제공해준다.
- pagination을 하거나 components에서 페이지를 처리한다.
- 이 쿼리에서 pageParam은 가져와야 할 다음 페이지를 나타내는데 `getNextPageParam` 옵션을 통해 관리한다.
- fetchNextPage : 컴포넌트 영향을 받는다.
- hasNextPage : pageParam은 hasNextPage 값을 제어한다.
- getNextPageParam

```
/**
   * fetchNextPage -> 더 많은 데이터가 필요할 때, 어느 함수를 실행할지는 infiniteScroll에 지시하는 역할을 한다.
   * hasNextPage -> 수집할 데이터가 더 있는지를 결정하는 불리언이다.
   * pageParam -> fetchNextPage이 어떻게 보일지 결정하고 다음 페이지가 있는지 결정한다.
   * pageParam은 기본값을 주면된다.
   */
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery(
    "sw-peple",
   👉 ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    // 다음 페이지를 가져오기 위한 옵션
    // lastPage 또는 allPages를 사용한다.
    // API에서 반환된 데이터 양식에 따라 골라 쓰면 된다.
    // pageParam은 hasNextPage 값을 제어한다.
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
```
