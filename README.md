## 프로젝트 데모

하단의 링크를 누르면 채팅 서비스와 개발에 사용된 디자인 시스템 데모 페이지를 확인하실 수 있습니다. :)

- [🚀 채팅 서비스 데모](https://frontend-kavoom2-for-deploy.vercel.app/) 바로가기
- [📚 디자인 시스템](https://frontend-kavoom2-for-deploy-design-system.vercel.app/) 바로가기

## 실행 방법

### 1.1 개발 환경 설정하기

이 프로젝트는 Node.js "^14"를 기준으로 개발하였습니다. 따라서 다음 명령어를 입력하여 해당하는 버전을 설치 및 사용해 주세요.

```json
// package.json
// "engines" 필드로 사용할 수 있는 Node 버전을 명시하였습니다.
{
  "engines": {
    "node": "^14"
  }
}
```

```
nvm install v14
nvm use v14
```

### 설치 및 메인 서비스 실행하기

이제 패키지의 의존성을 설치하여 개발 환경을 실행할 수 있습니다.

```
yarn install
yarn start
```

### 디자인 시스템 실행하기

위의 단계를 먼저 진행하여 모든 의존성을 설치했다면, 다음 명령어를 입력하여 Storybook 기반 디자인 시스템 개발 서버를 실행할 수 있습니다.

```
yarn storybook
```

## 주요 기술 스택

서비스 및 개발환경 설정에서 중요하다고 생각하는 스택만 나열하였습니다.

#### Cores

- Create React App (react-scripts@4.0.3)
  - react@17.0.2
  - react-dom@17.0.2
- react-router-dom
- zustand
- @tanstack/react-query
- sass

#### Components

- react-textarea-autosize
- react-dropzone
- framer-motion

#### Utilities

- classnames
- date-fns

## 프로젝트 디렉토리 구조

```bash
📦 @frontend_kavoom2
├─ public/
├─ src/
│  ├─ index.ts
│  ├─ assets/ ## 아이콘, 이미지 등을 관리합니다.
│  ├─ components/ ## 공통 컴포넌트를 관리합니다.
│  ├─ layouts/ ## 레이아웃 요소를 관리합니다.
│  ├─ hooks/ ## 공통 훅을 관리합니다.
│  ├─ pages/ ## 페이지를 렌더링하는 컴포넌트를 관리합니다.
│  ├─ routes/ ## react-router-dom의 라우팅 요소를 관리합니다.
│  ├─ styles/ ## SASS 전역 스타일 및 공통 변수와 유틸 함수 등을 관리합니다.
│  ├─ utils/ ## 공통 유틸 함수를 관리합니다.
│  ├─ features ## 기능 단위로 모듈을 분리하여 하위 디렉토리로 관리합니다.
│  │  └─ {featureModuleName}
│  │     ├─ index.ts
│  │     ├─ components/
│  │     ├─ hooks/
│  │     ├─ stores/
│  │     └─ queries/
│  └─ mockers/ ## 채팅 API Mocker
├─ .storybook ## 디자인 시스템 Storybook의 설정 구성
├─ style-dictionary
├─ package.json
└─ yarn.lock
```

## 주요 기능

## 고려 사항

#### 1. Node 버전 제약에 따른 개발 환경 설정

초기 개발 환경 설정에서 react-scripts 5과 react/react-dom 18으로 구성하여 진행하고자 하였습니다. 다른 개발 관련 도구와 통합하는 과정에서 react-scripts 내부에서 사용하는 Webpack 5의 일부 기능들이 Node 14버전에서는 지원하지 않는 이슈가 있었습니다.

해당 기능에 대한 Polyfill 적용을 고려해보았으나, 정해진 기한 내에 개발해야 하는 요구사항과 더불어 추후에 발생할 수 있는 이슈를 최소화하고자 react-scripts와 react/react-dom을 각각 4.0.3과 17.0.2 버전으로 다운그레이드 하였습니다.

#### 2. 서비스의 확장성을 고려한 디렉토리 구조 설정

현업에서는 Component, Hooks 등의 모듈을 `페이지(pages)` 단위로 나누어 관리하였습니다. 이는 모듈이 페이지에 의존적이도록 만듭니다. 해당 Component와 Hooks이 다른 페이지에서 사용되는 빈도가 많이졌고, 기존의 방식이 개발자로 하여금 혼동을 줄 수 있다고 생각하였습니다.

따라서 이번 과제에서는 `페이지(pages)`가 아닌 `기능(features)` 단위로 모듈을 분리하고자 하였습니다. 프로젝트 규모가 커져감에 따라, 별도의 모듈로 분리해야 하는 상황에 유연하게 대응할 수 있도록 하였습니다. `@/features`의 하위 디렉토리 단위로 분리하는 것으로 가정하고 진행하였습니다.

예를 들면, 채팅 기능을 관리하는 `@/features/userChat`의 구조는 다음과 같습니다.

- @/features

  - userChat

    - index.ts
    - components/
    - hooks/
    - queries/
    - stores/

기능 단위의 폴더에서 해당 기능과 관련이 있는 컴포넌트, 쿼리 훅, 전역 상태 훅 등을 관리하게 됩니다.

그리고 index.ts에서 import/export 하는 과정을 거쳐 실제 개발자는 다음과 같이 사용하게 됩니다.

```ts
// @feature/userChat/index.ts
// 외부에서 사용할 모듈만 export합니다.

// Components
export { default as ChatImageMessageBox } from "./components/ChatImageMessageBox";
export { default as ChatTextMessageBox } from "./components/ChatTextMessageBox";

// Hooks
export { default as useClientSideChat } from "./hooks/useClientSideChat";
export { default as useGetChatRoomInfo } from "./hooks/useGetChatRoomInfo";

// Queries
export { default as getChatRoomInfoQuery } from "./queries/getChatRoomInfo";
```

```ts
// @pages/UserChatList.tsx
// 채팅 모듈을 다음과 같이 불러와 사용하게 됩니다.

import {
  ChatImageMessageBox,
  ChatTextMessageBox,
  useClientSideChat,
  useGetChatRoomInfo,
} from "@/features/userChat";

const MyPage = () => {
  // ...
};
```

그리고 `페이지(pages)`는 실질적으로 기능 단위의 모듈을 조립하여 해당 페이지 화면과 비즈니스 로직만을 구성하도록 구성하였습니다.

## 개선해야할 점
