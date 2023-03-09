# 👩🏻‍💻 ReactQuery-learning
 
 시작일 : 2023.03.09 목요일


----------------------------------------

현재는 ReactQuery 버전 4가 릴리스 되었다. 버전 4에서는 ReactQuery -> TanStack Query 라고 부른다.

### 설치

```
// 3버전을 사용할 경우
npm install react-query@^3
```


### 3버전과 4버전의 차이

- v4에서 설치 및 가져오기 수행하려면 `@tanstack/react-query` 로 권장
- 쿼리키는 배열이어야 한다. 과정에서 쿼리 키 배열 대신 문자열을 사용하는 경우 배열로 묶어야 한다.
- 개발자 도구를 별도로 설치하고 `@tanstack/react-query-devtools`에서 가져와야 한다.
- `setLogger` (테스트 섹션에서 사용)가 제거되었다. 대신 `QueryClient` 옵션으로 로거를 추가해야 한다.
