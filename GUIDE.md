# Sass 커스텀 믹스인/함수 활용 가이드

Netflix 웹사이트 스타일링 구조는 다음과 같습니다.

```sh
src/scss/
├── modules/     # 모듈(믹스인, 함수)
├── common/      # 공통 스타일 모듈
├── pages/       # 페이지 스타일 (home, login, ...)
├── _config.scss # 앱 스타일 변수
└── common.scss  # 공통 스타일
```

## 🧰 공통 스타일 모듈

웹사이트의 모든 페이지에서 사용되는 공통 스타일은 다음과 같이 구성합니다.

```sh
src/scss/common/
├── _normalize.scss   # 브라우저 기본 스타일 일반화
├── _base.scss        # 사용자 정의 기본 스타일
├── _layout.scss      # 레이아웃 스타일
├── components/       # 컴포넌트 스타일 모듈
│    └── _Button.scss # 버튼 컴포너트
└── _components.scss  # 컴포넌트 스타일
```

## 📑 페이지 스타일 모듈

웹사이트의 각 페이지 별 사용될 독립적은 스타일은 다음과 같이 구성합니다.

```sh
src/scss/pages/
├── home/
│   └── home.scss
└── login/
    └── login.scss
```

## 🗄 모듈 (믹스인/함수)

웹사이트의 공통, 페이지 스타일에서 재사용되는 믹스인, 함수 모듈은 다음과 같이 구성됩니다.

```sh
src/scss/modules/
│
│   # 함수
├── _functions.scss
├── functions/
│   ├── _deunit.scss          # 단위 제거 함수
│   ├── _is-valid-length.scss # 단위 값이 유효한지 검사하는 함수
│   ├── _em.scss              # em() 함수
│   └── _rem.scss             # rem() 함수
│
│   # 믹스인
├── _mixins.scss
└── mixins/
    ├── _resetElements.scss        # 요소 초기화 믹스인 모음
    ├── _a11yHidden.scss           # 접근성을 준수한 화면 감춤 믹스인
    ├── _baseDisplayScrollbar.scss # 브라우저 스크롤바 표시 믹스인
    ├── _baseFocusVisible.scss     # 포커스 비저블 스타일링 믹스인
    ├── _baseFontSize.scss         # 기본 글자 크기 설정 믹스인
    ├── _baseSelection.scss        # 기본 선택영역 스타일링 믹스인
    ├── _boxSizing.scss            # 기본 박스 크기 설정 믹스인
    ├── _margin.scss               # margin() 믹스인
    ├── _padding.scss              # padding() 믹스인
    ├── _position.scss             # position() 믹스인
    └── _size.scss                 # size() 믹스인
```

<br/>

## ⚒ 함수 사용법

사용자 정의 함수 사용 방법을 안내합니다.

<br/>

### em() 함수

`px` 값을 전달하면 `em` 단위로 변경합니다.

<details>
  <summary>상세 사용법</summary>

  #### 전달인자

  ```scss
  em($pixel, $base-size)
  ```

  인자 | 설명 | 기본 값
  --- | --- | ---
  `$pixel` | px 값 | |
  `$base-size` | 기준 값 | `16px` |

  #### 사용 예시

  *SCSS*

  ```scss
  .demo {
    padding: em(12px) em(20px);
  }
  ```

  *CSS 출력 결과*

  ```css
  .demo {
    padding: 0.75em 1.25em;
  }
  ```
</details>

<br/>

### rem() 함수

`px` 값을 전달하면 `rem` 단위로 변경합니다. 

<details>
  <summary>상세 사용법</summary>

  #### 전달인자

  ```scss
  rem($pixel...)
  ```

  인자 | 설명 | 기본 값
  --- | --- | ---
  `$pixel` | px 값 | `null` |

  > `src/scss/_config.scss` 파일에 작성된 `$rem-base-value` 변수 값을 기준으로 사용

  #### 사용 예시

  *SCSS*

  ```scss
  .demo {
    font-size: rem(24px);
  }
  ```

  *CSS 출력 결과*

  ```css
  .demo {
    font-size: 2.4rem; /* rem 기준이 10px인 경우 */
  }
  ```
</details>

<br/>

## ⚙️ 믹스인 사용법

사용자 정의 믹스인을 사용하는 방법을 안내합니다.

<br/>

### reset*() 믹스인

리스트, 이미지, 버튼, 링크(a) 등 요소를 초기화 하는 믹스인입니다.

<details>
  <summary>상세 사용법</summary>
  <br/>

  ```scss
  .demo {
    ul, ol {
      @include resetList();
    }
    
    img {
      @include resetImage();
    }
    
    button {
      @include resetButton();
    }
    
    a {
      @include resetLinkA();
    }
  }
  ```
</details>

<br/>

### a11yHidden() 믹스인

화면에는 표시되지 않지만, 스크린리더는 콘텐츠를 읽을 수 있도록 설정하는 믹스인입니다.

<details>
  <summary>상세 사용법</summary>
  <!-- <br/> -->

  #### 사용 예시

  *SCSS*

  ```scss
  .demo {
    @include a11yHidden();
  }
  ```

  *CSS 출력 결과*

  ```css
  .demo {
    overflow: hidden;
    position: absolute;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    white-space: nowrap;
  }
  ```
</details>

<br/>

### baseDisplayScrollbar() 믹스인

세로 스크롤바가 표시되지 않는 페이지의 스크롤바 표시 설정하는 믹스인입니다.

<details>
  <summary>상세 사용법</summary>

  #### 전달인자

  ```scss
  @include baseDisplayScrollbar($isScrollable: false)
  ```

  인자 | 설명 | 기본 값
  --- | --- | ---
  `$isScrollable` | 기본 스크롤바 표시 설정 | `false` |

  #### 사용 예시

  *SCSS*

  ```scss
  @include baseDisplayScrollbar(true);
  ```
  
  ```scss
  @include baseDisplayScrollbar();
  ```

  *CSS 출력 결과*

  ```css
  :root {
    overflow: visible;
    min-height: 100.5vh;
  }
  ```
  
  ```css
  :root {
    overflow: auto;
    min-height: 100vh;
  }
  ```
</details>

<br/>

### baseFocusVisible() 믹스인

포커스 비저블 표시를 설정하는 믹스인입니다.

<details>
  <summary>상세 사용법</summary>

  #### 전달인자

  ```scss
  @include baseFocusVisible($focus-visible-style, $radius)
  ```

  인자 | 설명 | 기본 값
  --- | --- | ---
  `$focus-visible-style` | 박스 그림자 설정 | `0 0 0 rem(4px) $netflix-focus-visible` |
  `$radius` | 둥근 테두리 설정 | `rem(2px)` |

  #### 사용 예시

  *SCSS*

  ```scss
  @include baseFocusVisible();
  ```

  *CSS 출력 결과*

  ```css
  :focus {
    outline: none;
    box-shadow: 0 0 0 0.4rem #37ffab;
    border-radius: 0.2rem;
  }
  :focus:not(:focus-visible) {
    box-shadow: none;
  }

  :focus-visible {
    box-shadow: 0 0 0 0.4rem #37ffab;
    border-radius: 0.2rem;
  }
  ```
</details>

<br/>

### baseFontSize() 믹스인

기본 글자 크기를 설정하는 믹스인입니다.

<details>
  <summary>상세 사용법</summary>

  #### 전달인자

  ```scss
  @include baseFontSize($font-size, $font-face)
  ```

  인자 | 설명 | 기본 값
  --- | --- | ---
  `$font-size` | rem 기준 글자 크기 | `$rem-base-value` |
  `$font-face` | 글꼴 | `SpoqaHanSans` |

  #### 사용 예시

  *SCSS*

  ```scss
  @include baseFontSize();
  ```

  *CSS 출력 결과*

  ```css
  :root {
    font-size: 10px;
  }

  body {
    font: 1.6rem/1.5 SpoqaHanSans, Helvetica, Arial, sans-serif;
  }
  ```
</details>

<br/>

### baseSelection() 믹스인

기본 선택 영역 스타일을 설정하는 믹스인입니다.

<details>
  <summary>상세 사용법</summary>

  #### 전달인자

  ```scss
  @include baseSelection($background, $color)
  ```

  인자 | 설명 | 기본 값
  --- | --- | ---
  `$background` | 배경 색상 | `#000` |
  `$color` | 전경 색상 | `#fff` |

  #### 사용 예시

  *SCSS*

  ```scss
  @include baseSelection();
  ```

  *CSS 출력 결과*

  ```css
  ::selection {
    background: #000;
    color: #fff;
  }

  img::selection {
    background: transparent;
  }
  ```
</details>

<br/>

### baseBoxSizing() 믹스인

기본 박스 크기 기준을 설정하는 믹스인입니다.

<details>
  <summary>상세 사용법</summary>

  #### 전달인자

  ```scss
  @include baseBoxSizing($box-type)
  ```

  인자 | 설명 | 기본 값
  --- | --- | ---
  `$box-type` | 박스 크기 기준 | `border-box` |

  #### 사용 예시

  *SCSS*

  ```scss
  @include baseBoxSizing();
  ```

  *CSS 출력 결과*

  ```css
  body {
    box-sizing: border-box;
  }

  body::before, body::after {
    box-sizing: inherit;
  }
  
  body * {
    box-sizing: border-box;
  }
  
  body *::before, body *::after {
    box-sizing: inherit;
  }
  ```
</details>

<br/>

### size() 믹스인

너비(`width`), 높이(`height`)를 손쉽게 설정하는 믹스인입니다.

<details>
  <summary>상세 사용법</summary>

  #### 전달인자

  ```scss
  @include size($dimension)
  ```

  인자 | 설명 | 기본 값
  --- | --- | ---
  `$dimension` | 너비, 높이 리스트 | `null null` |

  #### 사용 예시

  *SCSS*

  ```scss
  .demo1 {
    @include size(1000px, auto);
  }
  
  .demo2 {
    @include size(100px);
  }
  ```

  *CSS 출력 결과*

  ```css
  .demo1 {
    width: 1000px;
    height: auto;
  }
  
  .demo2 {
    width: 100px;
    height: 100px;
  }
  ```
</details>

<br/>

### margin() 믹스인

마진(`margin`)을 손쉽게 설정하는 믹스인입니다.

<details>
  <summary>상세 사용법</summary>
  <br/>

  *SCSS*

  ```scss
  .demo1 {
    @include margin(top 30px bottom 20px left 0);
  }

  .demo2 {
    @include marginTB(10px);
  }
  
  .demo3 {
    @include marginLR(24px);
  }
  ```

  *CSS 출력 결과*

  ```css
  .demo1 {
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: 0;
  }

  .demo2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .demo3 {
    margin-left: 24px;
    margin-right: 24px;
  }
  ```
</details>

<br/>

### padding() 믹스인

패딩(`padding`)을 손쉽게 설정하는 믹스인입니다.

<details>
  <summary>상세 사용법</summary>
  <br/>

  *SCSS*

  ```scss
  .demo1 {
    @include padding(top 30px bottom 20px left 0);
  }

  .demo2 {
    @include paddingTB(10px);
  }
  
  .demo3 {
    @include paddingLR(24px);
  }
  ```

  *CSS 출력 결과*

  ```css
  .demo1 {
    padding-top: 30px;
    padding-bottom: 20px;
    padding-left: 0;
  }

  .demo2 {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  .demo3 {
    padding-left: 24px;
    padding-right: 24px;
  }
  ```
</details>

<br/>

### position() 믹스인

포지셔닝(`positioning`) 손쉽게 설정하는 믹스인입니다.

- `position()`

다음의 단축 믹스인을 사용해 코드를 단축할 수도 있습니다.

- `static()`
- `relative()`
- `absolute()`
- `fixed()`
- `sticky()`

<details>
  <summary>상세 사용법</summary>
  <br/>

  *SCSS*

  ```scss
  .demo1 {
    @include positoin(absolute, top 30px right 20px z-index 100);
  }

  .demo2 {
    @include relative(bottom 100px right 100px);
  }
  
  .demo3 {
    @include fixed(top 0 left 0 right 0 bottom 0 z-index 1000);
  }
  ```

  *CSS 출력 결과*

  ```css
  .demo1 {
    position: absolute;
    top: 30px;
    right: 20px;
    z-index: 100;
  }

  .demo2 {
    position: relative;
    bottom: 100px;
    right: 100px;
  }
  
  .demo3 {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }
  ```
</details>

<br/>