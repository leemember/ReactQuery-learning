import { useState } from "react";
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // 구조분해 할당을 통해 데이터를 사용했다.
  // const { data } = useQuery("쿼리이름", 쿼리함수 = 쿼리 데이터를 가져오는 방법);
  const { data } = useQuery("posts", fetchPosts);

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
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
