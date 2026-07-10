# Quiz Escape

초등부 팀 활동용 QR 방탈출 정적 웹앱입니다.

## 구조

- `index.html`: GitHub Pages에 배포되는 단일 페이지 앱
- `src/data/games.js`: 과목/방탈출/미션 데이터 카탈로그
- `math-qr-escape-storybook.html`: 기존 인쇄용 스토리북 원본
- `math-qr-escape-storybook.pdf`: 기존 PDF 자료
- `math-secret-lab-qr-list.pdf`: 교사용 QR 리스트 PDF

## 사용 흐름

1. 학생은 학생용 URL을 엽니다.
2. 팀 이름과 인원을 입력합니다.
3. 앱 안의 QR 스캐너로 교실 QR을 스캔합니다.
4. QR 토큰과 매칭되는 문제가 열립니다.
5. 학생은 앱에 정답을 입력합니다.
6. 정답이면 앱이 다음 문제 QR 위치 힌트를 보여 줍니다.
7. 학생은 힌트를 따라 다음 장소로 이동해 다음 QR을 스캔합니다.
8. 모든 미션을 완료하면 결과 화면을 선생님께 보여 줍니다.

## 운영 URL

- 학생용: `#/student/math/secret-lab`
- 교사용: `#/teacher/math/secret-lab`
- 인쇄용 QR 페이지: `#/print/math/secret-lab`
- QR 리스트 PDF: `math-secret-lab-qr-list.pdf`

학생에게는 학생용 URL만 공유하고, 교사용 URL/PDF는 수업 준비용으로 사용합니다.

## 새 방탈출 추가

`src/data/games.js`의 `subjects` 배열에 과목과 게임 데이터를 추가합니다.

각 미션은 최소한 다음 값을 갖습니다.

```js
{
  id: 1,
  token: 'MATH_NEW_GAME_01',
  gate: '시작의 문',
  title: '문제 제목',
  intro: '도입 문장',
  hiddenPlace: '이 QR 붙일 장소',
  question: '문제 HTML',
  answer: 12,
  color: '모',
  nextClue: '다음 문제 QR 위치 힌트',
  explanation: '풀이 설명',
  hints: ['힌트 1', '힌트 2', '힌트 3']
}
```

## 로컬 실행

```bash
python3 -m http.server 4173
```

브라우저에서 `http://127.0.0.1:4173/index.html#/student/math/secret-lab`을 엽니다.

## 배포

GitHub Pages에서 `main` 브랜치의 루트(`/`)를 배포 소스로 사용합니다.

카메라 기반 QR 스캔은 HTTPS 또는 localhost에서 동작합니다.
