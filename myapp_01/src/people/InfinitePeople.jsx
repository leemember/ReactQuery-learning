import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
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
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    // 다음 페이지를 가져오기 위한 옵션
    // lastPage 또는 allPages를 사용한다.
    // API에서 반환된 데이터 양식에 따라 골라 쓰면 된다.
    // pageParam은 hasNextPage 값을 제어한다.
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  console.log("data--->", data);

  if (isLoading) return <div className="loading">로딩중...</div>;
  if (isError)
    return <div className="loading">Error !! {error.toString()}...</div>;

  return (
    <>
      {isFetching && <div className="loading">로딩중...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
                key={person.name}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
