import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    // 10페이지에 있다면 미리 데이터를 가져온 필요가 없다.
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;

      queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPosts(nextPage)
      );
    }
  }, [currentPage, queryClient]);

  // 구조분해 할당을 통해 데이터를 사용했다.
  // const { data } = useQuery("쿼리이름", 쿼리함수 = 쿼리 데이터를 가져오는 방법);
  const { data, isError, isLoading, error } = useQuery(
    // 배열에 담긴 첫 번째 요소를 쿼리키라고 한다.
    ["posts", currentPage],
    // 이 배열이 바뀌면 함수도 바뀌기 때문에 데이터가 바뀔 수밖에 없다.
    () => fetchPosts(currentPage), // -> 함수의 파라미터값을 currentPage로 함
    {
      staleTime: 2000,
      // 쿼리키가 바껴도 지난 데이터를 유지해서 이전 페이지로 돌아갔ㅇㄹ 때 캐시에 해당 데이터가 있도록
      keepPreviousData: true,
    }
  );
  if (isLoading) return <h3>로딩중</h3>;
  if (isError) return <h3>잘못된 데이터 입니다. {error.toString()}</h3>;

  /**
   * fetchPosts가 해결될 때까지 데이터는 거짓이다.
   * 하지만 fetchPosts가 해결되면 데이터에 배열이 포함되고
   * 컴포넌트가 다시 렌더링되어 매핑할 수 있게 된다.
   * 데이터에 배열이 포함된 경우 더이상 조기 반환을 수행하지 않고
   * 데이터를 매핑하게 된다.
   */
  if (!data) return <div />;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disable={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
