# shop


### 프로젝트 실행방법
- git clone https://github.com/happyKale/shop.git 명령어를 통해서 해당 레포지토리의 소스를 가져온다.
- npm start 명령어를 통해서 실행시킨다.
<br/>


### 페이지 구성
- 화면은 메인화면 하나로 구성되어 있다.
- 필터로는 카테고리, 브랜드, 색상을 선택할 수 있다.

1. 메인화면
<img width="700" alt="Pasted Graphic 1" src="https://user-images.githubusercontent.com/43086867/169846903-692ad7c1-f2b1-4b2b-a3ad-41ec6d871523.png">
2. 필터
<img width="184" alt="CATEGORIES" src="https://user-images.githubusercontent.com/43086867/169847431-8030db6e-3098-457e-8090-92942229bd7c.png">
<img width="185" alt="furniture" src="https://user-images.githubusercontent.com/43086867/169847471-e9a98320-e95a-42f7-81f0-67c162db97ae.png">
<img width="188" alt="furniture" src="https://user-images.githubusercontent.com/43086867/169847509-a57c4fe4-4765-4546-874e-b7108e5742ee.png">



<br/>

### 기능
1. 필터
- 필터를 선택하지 않은 경우 필터링 되지 않은 제품들이 보여진다.
- 필터링을 하면 해당 필터가 적용된 제품들이 보여진다.
- 선택한 필터들을 보여준다.
- 선택한 필터 옆에 있는 삭제 버튼을 누르면 해당 필터의 적용이 해제된다.
- 카테고리 필터
  - 카테고리 필터는 아코디언 메뉴로 보여진다.

<br/>

### 기능 우선 순위 기준
- 일단은 제품 목록을 보여줘야 하기 때문에 api 요청을 보내는 기능을 먼저 구현하였습니다. <br/>
- axios를 통해서 api 요청을 구현했습니다. <br/>
- 페이지 네이션은 해보지 않은 기능이여서 다른 기능을 먼저 완성한 후 도전하려고 하였습니다. <br/>
- 가격 필터는 다른 필터와 달리 단순한 리스트가 아니였기에 다른 필터를 먼저 구현하고 도전하기로 하였습니다. <br/>
- 페이지 네이션 기능과 가격 필터를 제외한 카테고리, 색상, 브랜드 필터를 구현하고 해당 필터를 통해서 제품을 가져왔습니다.

<br/>

### 아직 구현하지 못한 기능
1. 페이지네이션
  
2. 가격 필터
html input 태그의 type="range" 속성을 사용해서 구현할 수 있을 것 같습니다.




