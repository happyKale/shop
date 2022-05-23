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
3. 페이지네이션
<img width="393" alt="image" src="https://user-images.githubusercontent.com/43086867/169880938-94963e36-ad40-4de6-aa84-3ebe2550edad.png">



<br/>

### 기능
1. 필터
- 필터를 선택하지 않은 경우 필터링 되지 않은 제품들이 보여진다.
- 필터링을 하면 해당 필터가 적용된 제품들이 보여진다.
- 선택한 필터들을 보여준다. <br/>
  (아직 카테고리를 제대로 보여주지 못한다.) <br/>
  <img width="371" alt="image" src="https://user-images.githubusercontent.com/43086867/169883267-c1dd1a2a-4f60-461c-a494-bd4152233c8f.png">

- 선택한 필터 옆에 있는 삭제 버튼을 누르면 해당 필터의 적용이 해제된다.
- 카테고리 필터
  - 카테고리 필터는 아코디언 메뉴로 보여진다.
2. 페이지네이션
- 페이지 버튼을 클릭하면 페이지에 해당하는 제품들을 보여준다.
- 화살표 버튼을 누르면 페이지 버튼의 숫자가 5씩 이동한다.
- 맨처음, 맨마지막 버튼을 누르면 첫 페이지와 마지막 페이지로 이동한다.

<br/>

### 기능 우선 순위 기준
- 일단은 제품 목록을 보여줘야 하기 때문에 api 요청을 보내는 기능을 먼저 구현하였습니다. <br/>
- axios를 통해서 api 요청을 구현했습니다. <br/>
- 페이지 네이션은 해보지 않은 기능이여서 다른 기능을 먼저 완성한 후 도전하려고 하였습니다. <br/>
- 가격 필터는 다른 필터와 달리 단순한 리스트가 아니였기에 다른 필터를 먼저 구현하고 도전하기로 하였습니다. <br/>
- 페이지 네이션 기능과 가격 필터를 제외한 카테고리, 색상, 브랜드 필터를 구현하고 해당 필터를 통해서 제품을 가져왔습니다.

<br/>

### 아직 구현하지 못한 기능
#### 어떻게하면 구현할 수 있을까?
1. 페이지네이션 <br/>
- 현재 코드에서 필터링된 제품의 개수를 product state의 size로 가지고 있습니다. <br/>
  이 size 데이터를 사용해서 한 번에 보여지는 페이지 버튼은 5개로 정하고 처음과 맨 끝 페이지로 갈 수 있는 화살표 버튼도 5개의 페이지 버튼 옆에 추가합니다. <br/>
- 페이지가 5개 이상이라면 다음 페이지(1부터 5까지 보여줬다면 이 다음은 6부터 10까지 보여줄 수 있도록)로 넘기기 위해서 그 다음 페이지 목록으로 넘어가는 버튼도 있어야 할 것 같습니다.<br/>
  다음 페이지 목록으로 넘어가면 보여지는 페이지 숫자가 변해야 하기 때문에 setState()를 사용해서 state를 만들어서 현재 보여지는 페이지를 담아야할 것 같습니다.<br/>
- 페이지 버튼을 누를 때 마다 api 요청을 다시 보내야 하기 때문에 현재 사용하고 있는 <br/>
  선택한 필터를 제어하는 handleClickFilter 핸들러를 수정해서 사용해야 하지 않을까 싶습니다. <br/><br/>
=> 현재 구현하였지만, 아직 수정할 부분이 있습니다! <br/>
  <img width="540" alt="image" src="https://user-images.githubusercontent.com/43086867/169882733-947f79d8-2c5a-4699-9f6b-af9851ff04ce.png">

  
2. 가격 필터 <br/>
html input 태그의 type="range" 속성을 사용해서 구현할 수 있을 것 같습니다.

<br/>

### +) 수정해야하는 부분
- TypeScript를 사용할 때 any 타입은 쓰지 말아햐하는데 지금 쓰인 곳이 있음. 타입 제대로 지정하기


