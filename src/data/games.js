const COMPLETION_LETTERS = ['도', '전', '완', '료', '성', '공'];
const CLASSROOM_PLACES = ['교실 앞문 근처', '책장 또는 교재 보관함', '정수기 근처', '벽시계 또는 시간표 근처', '학생 책상 아래', '칠판 또는 화이트보드'];

function createMission(item, index, tokenPrefix, gradeLabel, theme) {
  const id = index + 1;
  return {
    id,
    token: `${tokenPrefix}-${String(id).padStart(2, '0')}`,
    gate: `${gradeLabel} ${id}번 문`,
    title: item.title,
    intro: `${theme} 단서를 풀어 다음 장소를 찾아가세요.`,
    hiddenPlace: CLASSROOM_PLACES[index],
    question: item.question,
    answer: item.answer,
    ...(Array.isArray(item.acceptedAnswers) ? { acceptedAnswers: item.acceptedAnswers } : {}),
    color: COMPLETION_LETTERS[index],
    nextClue: index < CLASSROOM_PLACES.length - 1 ? CLASSROOM_PLACES[index + 1] : '모든 문제를 풀고 결과 화면으로 가세요',
    explanation: item.explanation,
    hints: item.hints || ['문제에서 중요한 숫자와 낱말을 먼저 찾으세요.', '무엇을 구해야 하는지 팀원에게 말해 보세요.', item.explanation]
  };
}

function createGradeGame(subjectId, config) {
  return {
    id: config.id,
    subjectId,
    title: config.title,
    brandTitle: config.title,
    subtitle: config.subtitle,
    duration: '40~60분',
    teamSize: '4~5명',
    recordTitle: `${config.gradeLabel} ${config.subjectName} 탐험 기록`,
    studentPathLabel: '학생용 입장',
    teacherPathLabel: '교사용 준비',
    storageKey: `${subjectId}-${config.id}`,
    finalInstruction: config.finalInstruction || (config.subjectName === '영어' ? 'QR 번호 1~6을 모두 더해라' : '모든 답을 더해라'),
    finalSuccessMessage: `${config.gradeLabel} ${config.subjectName} 미션을 끝까지 해결했습니다. 오늘의 보물은 친구들과 함께 생각하고 설명한 힘입니다.`,
    teacherInstructions: '각 QR에는 주소가 아니라 미션 토큰만 들어갑니다. 학생은 이전 문제를 맞힌 뒤에만 다음 QR을 열 수 있습니다.',
    roles: [],
    missions: config.missions.map((mission, index) => createMission(mission, index, config.tokenPrefix, config.gradeLabel, config.theme))
  };
}

const mathGradeConfigs = [
  {
    id: 'elementary-1-math', gradeLabel: '초1', subjectName: '수학', title: '초1 수학 숫자 숲', subtitle: '100까지 수와 덧셈·뺄셈 단서를 찾아라', tokenPrefix: 'MATH-E1', theme: '숫자 숲',
    missions: [
      { title: '사탕 세기', question: '사탕이 10개씩 묶음 2개와 낱개 7개 있습니다. 사탕은 모두 몇 개일까요?', answer: 27, explanation: '10개 묶음 2개는 20개이고, 낱개 7개를 더하면 27개입니다.' },
      { title: '연필 더하기', question: '연필 8자루에 5자루를 더 받았습니다. 연필은 모두 몇 자루일까요?', answer: 13, explanation: '8에 5를 더하면 13입니다.' },
      { title: '풍선 빼기', question: '풍선 16개 중 7개가 날아갔습니다. 남은 풍선은 몇 개일까요?', answer: 9, explanation: '16에서 7을 빼면 9입니다.' },
      { title: '도형 찾기', question: '삼각형 4개와 사각형 3개가 있습니다. 도형은 모두 몇 개일까요?', answer: 7, explanation: '4개와 3개를 더하면 7개입니다.' },
      { title: '길이 비교', question: '빨간 끈은 12칸, 파란 끈은 9칸입니다. 빨간 끈은 파란 끈보다 몇 칸 더 길까요?', answer: 3, explanation: '12에서 9를 빼면 3칸 더 깁니다.' },
      { title: '달력 단서', question: '월요일을 1일째로 세면 금요일은 몇 일째일까요?', answer: 5, explanation: '월, 화, 수, 목, 금을 차례로 세면 금요일은 5일째입니다.' }
    ]
  },
  {
    id: 'elementary-2-math', gradeLabel: '초2', subjectName: '수학', title: '초2 수학 시간 열차', subtitle: '세 자리 수와 곱셈구구를 지나가라', tokenPrefix: 'MATH-E2', theme: '시간 열차',
    missions: [
      { title: '세 자리 수', question: '352에서 백의 자리 숫자는 무엇일까요?', answer: 3, explanation: '352는 300, 50, 2로 이루어져 백의 자리 숫자는 3입니다.' },
      { title: '자리 맞춰 더하기', question: '146 + 257은 얼마일까요?', answer: 403, explanation: '일의 자리부터 더하면 146 + 257 = 403입니다.' },
      { title: '곱셈구구', question: '7 × 4는 얼마일까요?', answer: 28, explanation: '7을 4번 더하면 28입니다.' },
      { title: '돈 계산', question: '1000원에서 380원을 썼습니다. 남은 돈은 몇 원일까요?', answer: 620, explanation: '1000 - 380 = 620입니다.' },
      { title: '정육면체', question: '정육면체의 면은 모두 몇 개일까요?', answer: 6, explanation: '정육면체는 위, 아래, 앞, 뒤, 왼쪽, 오른쪽으로 면이 6개입니다.' },
      { title: '표 읽기', question: '월요일 방문자 12명, 화요일 방문자 9명입니다. 이틀 동안 모두 몇 명일까요?', answer: 21, explanation: '12 + 9 = 21명입니다.' }
    ]
  },
  {
    id: 'elementary-3-math', gradeLabel: '초3', subjectName: '수학', title: '초3 수학 분수 정원', subtitle: '나눗셈·분수·둘레 단서를 모아라', tokenPrefix: 'MATH-E3', theme: '분수 정원',
    missions: [
      { title: '나눗셈 상자', question: '사과 36개를 4상자에 똑같이 나누면 한 상자에 몇 개씩 들어갈까요?', answer: 9, explanation: '36 ÷ 4 = 9입니다.' },
      { title: '분수 조각', question: '피자를 똑같이 8조각으로 나누어 3조각 먹었습니다. 먹은 조각 수는 몇 조각일까요?', answer: 3, explanation: '8조각 중 먹은 양은 문제에서 3조각이라고 했습니다.' },
      { title: '소수 첫걸음', question: '0.7은 0.1이 몇 개 모인 수일까요?', answer: 7, explanation: '0.7은 0.1이 7개인 수입니다.' },
      { title: '둘레 구하기', question: '한 변이 6cm인 정사각형의 둘레는 몇 cm일까요?', answer: 24, explanation: '정사각형 둘레는 한 변의 길이를 4번 더해 6×4=24입니다.' },
      { title: '각 찾기', question: '삼각형의 꼭짓점은 몇 개일까요?', answer: 3, explanation: '삼각형은 세 꼭짓점과 세 변을 가진 도형입니다.' },
      { title: '막대그래프', question: '그래프에서 축구 14명, 피구 11명이 선택했습니다. 두 운동을 합치면 모두 몇 명일까요?', answer: 25, explanation: '14 + 11 = 25명입니다.' }
    ]
  },
  {
    id: 'elementary-4-math', gradeLabel: '초4', subjectName: '수학', title: '초4 수학 각도 도시', subtitle: '큰 수 계산과 각도·넓이를 해결하라', tokenPrefix: 'MATH-E4', theme: '각도 도시',
    missions: [
      { title: '큰 수 곱셈', question: '24 × 13은 얼마일까요?', answer: 312, explanation: '24×10=240, 24×3=72이므로 모두 312입니다.' },
      { title: '분수 비교', question: '분모가 같은 분수 3/8과 5/8 중 더 큰 분수의 분자는 무엇일까요?', answer: 5, explanation: '분모가 같으면 분자가 큰 분수가 더 큽니다.' },
      { title: '소수 더하기', question: '1.4 + 2.3은 얼마일까요? 소수점을 빼고 10배한 값으로 입력하세요.', answer: 37, explanation: '1.4 + 2.3 = 3.7이고, 10배하면 37입니다.' },
      { title: '직각 세기', question: '직사각형에는 직각이 몇 개 있을까요?', answer: 4, explanation: '직사각형의 네 각은 모두 직각입니다.' },
      { title: '넓이 구하기', question: '가로 8cm, 세로 5cm인 직사각형의 넓이는 몇 cm²일까요?', answer: 40, explanation: '직사각형 넓이는 가로×세로이므로 8×5=40입니다.' },
      { title: '자료 해석', question: '표에서 1반 23명, 2반 26명이 체험학습을 신청했습니다. 모두 몇 명일까요?', answer: 49, explanation: '23 + 26 = 49명입니다.' }
    ]
  },
  {
    id: 'elementary-5-math', gradeLabel: '초5', subjectName: '수학', title: '초5 수학 약수 광산', subtitle: '약수·배수·분수와 도형 넓이를 캐내라', tokenPrefix: 'MATH-E5', theme: '약수 광산',
    missions: [
      { title: '계산 순서', question: '8 + 6 × 3은 얼마일까요?', answer: 26, explanation: '곱셈을 먼저 계산해 6×3=18, 8+18=26입니다.' },
      { title: '최대공약수', question: '12와 18의 최대공약수는 무엇일까요?', answer: 6, explanation: '12와 18을 모두 나누는 가장 큰 수는 6입니다.' },
      { title: '분수 덧셈', question: '1/4 + 2/4의 분자는 얼마일까요?', answer: 3, explanation: '분모가 같으므로 분자끼리 더해 3/4입니다.' },
      { title: '소수 곱셈', question: '2.5 × 4는 얼마일까요?', answer: 10, explanation: '25×4=100에서 소수점을 한 자리 옮기면 10입니다.' },
      { title: '직육면체 부피', question: '가로 3cm, 세로 4cm, 높이 5cm인 직육면체의 부피는 몇 cm³일까요?', answer: 60, explanation: '직육면체 부피는 가로×세로×높이로 3×4×5=60입니다.' },
      { title: '평행사변형 넓이', question: '밑변 9cm, 높이 6cm인 평행사변형의 넓이는 몇 cm²일까요?', answer: 54, explanation: '평행사변형 넓이는 밑변×높이로 9×6=54입니다.' }
    ]
  },
  {
    id: 'elementary-6-math', gradeLabel: '초6', subjectName: '수학', title: '초6 수학 비율 항해', subtitle: '비와 비율·지도·입체도형을 항해하라', tokenPrefix: 'MATH-E6', theme: '비율 항해',
    missions: [
      { title: '분수와 소수', question: '0.75는 0.25가 몇 개 모인 수일까요?', answer: 3, explanation: '0.25가 3개 모이면 0.75입니다.' },
      { title: '비율 계산', question: '사과 2개와 배 3개의 비에서 전체 과일은 몇 개일까요?', answer: 5, explanation: '비 2:3의 전체는 2+3=5입니다.' },
      { title: '분수 곱셈', question: '1/2 × 12는 얼마일까요?', answer: 6, explanation: '12의 절반은 6입니다.' },
      { title: '축척 지도', question: '지도에서 1cm가 실제 100m입니다. 지도 4cm는 실제 몇 m일까요?', answer: 400, explanation: '100m가 4번이므로 400m입니다.' },
      { title: '원기둥 단서', question: '원기둥의 밑면은 몇 개일까요?', answer: 2, explanation: '원기둥은 위와 아래에 원 모양 밑면 2개가 있습니다.' },
      { title: '평균 구하기', question: '점수 80, 90, 100의 평균은 몇 점일까요?', answer: 90, explanation: '세 수의 합 270을 3으로 나누면 90입니다.' }
    ]
  },
  {
    id: 'middle-1-math', gradeLabel: '중1', subjectName: '수학', title: '중1 수학 좌표 연구실', subtitle: '정수·방정식·좌표 단서를 해독하라', tokenPrefix: 'MATH-M1', theme: '좌표 연구실',
    missions: [
      { title: '정수 계산', question: '-7 + 12는 얼마일까요?', answer: 5, explanation: '음수와 양수를 더하면 12-7=5입니다.' },
      { title: '식의 값', question: 'x=3일 때 2x + 5의 값은 얼마일까요?', answer: 11, explanation: '2×3+5=11입니다.' },
      { title: '일차방정식', question: 'x + 7 = 15일 때 x는 얼마일까요?', answer: 8, explanation: '양변에서 7을 빼면 x=8입니다.' },
      { title: '좌표 읽기', question: '점 A(4, -2)의 x좌표는 무엇일까요?', answer: 4, explanation: '순서쌍의 첫 번째 수가 x좌표입니다.' },
      { title: '삼각형 각', question: '삼각형의 두 각이 50°, 60°입니다. 나머지 한 각은 몇 도일까요?', answer: 70, explanation: '삼각형 내각의 합은 180°이므로 180-50-60=70입니다.' },
      { title: '짝수 찾기', question: '1부터 6까지 숫자 카드 중 짝수 카드는 몇 장일까요?', answer: 3, explanation: '짝수는 2, 4, 6으로 3장입니다.' }
    ]
  },
  {
    id: 'middle-2-math', gradeLabel: '중2', subjectName: '수학', title: '중2 수학 함수 기지', subtitle: '연립방정식과 함수 그래프를 통과하라', tokenPrefix: 'MATH-M2', theme: '함수 기지',
    missions: [
      { title: '일차식 계산', question: '3x + 2x에서 x의 계수는 얼마일까요?', answer: 5, explanation: '동류항을 더하면 5x입니다.' },
      { title: '연립방정식', question: 'x+y=10, x-y=2일 때 x는 얼마일까요?', answer: 6, explanation: '두 식을 더하면 2x=12이므로 x=6입니다.' },
      { title: '부등식', question: 'x + 3 < 8을 만족하는 자연수 x 중 가장 큰 수는?', answer: 4, explanation: 'x<5이므로 자연수 중 가장 큰 수는 4입니다.' },
      { title: '함수값', question: 'y=2x+1에서 x=4일 때 y는 얼마일까요?', answer: 9, explanation: '2×4+1=9입니다.' },
      { title: '닮음비', question: '두 도형의 닮음비가 2:3일 때 작은 도형의 변이 8cm이면 큰 도형 대응변은 몇 cm일까요?', answer: 12, explanation: '8에 3/2를 곱하면 12입니다.' },
      { title: '자료 평균', question: '자료 4, 6, 8, 10의 평균은 얼마일까요?', answer: 7, explanation: '합 28을 4로 나누면 7입니다.' }
    ]
  },
  {
    id: 'middle-3-math', gradeLabel: '중3', subjectName: '수학', title: '중3 수학 이차 암호실', subtitle: '인수분해·이차방정식·피타고라스를 해결하라', tokenPrefix: 'MATH-M3', theme: '이차 암호실',
    missions: [
      { title: '인수분해', question: 'x² + 5x + 6 = (x+2)(x+□)입니다. □에 들어갈 수는?', answer: 3, explanation: '2와 3을 곱하면 6, 더하면 5입니다.' },
      { title: '이차방정식', question: 'x² = 49일 때 양수 x는 얼마일까요?', answer: 7, explanation: '7²=49이므로 양수 해는 7입니다.' },
      { title: '그래프 꼭짓점', question: 'y=x² 그래프의 꼭짓점의 y좌표는 무엇일까요?', answer: 0, explanation: 'y=x²의 꼭짓점은 (0,0)입니다.' },
      { title: '피타고라스', question: '직각삼각형의 두 직각변이 6, 8입니다. 빗변은 얼마일까요?', answer: 10, explanation: '6²+8²=36+64=100이므로 빗변은 10입니다.' },
      { title: '원주각', question: '반원에 대한 원주각은 몇 도일까요?', answer: 90, explanation: '반원에 대한 원주각은 직각입니다.' },
      { title: '상자 부피', question: '가로 4, 세로 5, 높이 6인 직육면체 부피는 얼마일까요?', answer: 120, explanation: '4×5×6=120입니다.' }
    ]
  }
];

const englishGradeConfigs = [
  {
    id: 'elementary-1-english', gradeLabel: '초1', subjectName: '영어', title: '초1 영어 색깔 놀이터', subtitle: '그림과 소리로 영어 단서를 찾아라', tokenPrefix: 'ENG-E1', theme: '색깔 놀이터',
    missions: [
      { title: 'Color Code', question: 'red의 뜻을 한글로 쓰세요.', answer: '빨강', acceptedAnswers: ['빨강', '빨간색'], explanation: 'red는 빨강입니다.' },
      { title: 'Number Code', question: '숫자 5를 영어로 쓰세요.', answer: 'five', explanation: 'five는 5입니다.' },
      { title: 'Classroom Code', question: 'book의 뜻을 한글로 쓰세요.', answer: '책', explanation: 'book은 책입니다.' },
      { title: 'Animal Code', question: 'cat의 뜻을 한글로 쓰세요.', answer: '고양이', explanation: 'cat은 고양이입니다.' },
      { title: 'Hello Code', question: 'hello의 뜻을 한글 인사말로 쓰세요.', answer: '안녕', acceptedAnswers: ['안녕', '안녕하세요'], explanation: 'hello는 안녕이라는 인사입니다.' },
      { title: 'Action Code', question: 'stand up의 뜻을 한글로 쓰세요.', answer: '일어서기', acceptedAnswers: ['일어서기', '일어서다'], explanation: 'stand up은 일어서기입니다.' }
    ]
  },
  {
    id: 'elementary-2-english', gradeLabel: '초2', subjectName: '영어', title: '초2 영어 가족 상점', subtitle: '가족·몸·음식 단어를 모아라', tokenPrefix: 'ENG-E2', theme: '가족 상점',
    missions: [
      { title: 'Body Code', question: 'eye의 뜻을 한글로 쓰세요.', answer: '눈', explanation: 'eye는 눈입니다.' },
      { title: 'Family Code', question: 'sister의 뜻을 한글로 쓰세요.', answer: '자매', acceptedAnswers: ['자매', '여자 형제', '여자형제'], explanation: 'sister는 여자 형제, 즉 자매를 뜻합니다.' },
      { title: 'Toy Code', question: 'ball의 뜻을 한글로 쓰세요.', answer: '공', explanation: 'ball은 공입니다.' },
      { title: 'Food Code', question: 'milk의 뜻을 한글로 쓰세요.', answer: '우유', explanation: 'milk는 우유입니다.' },
      { title: 'Weather Code', question: 'sunny의 뜻을 한글로 쓰세요.', answer: '맑은', acceptedAnswers: ['맑은', '맑음', '화창한'], explanation: 'sunny는 맑은 날씨입니다.' },
      { title: 'Letter Code', question: 'A, B, C 다음에 오는 알파벳을 대문자로 쓰세요.', answer: 'D', acceptedAnswers: ['D', 'd'], explanation: 'A, B, C 다음에는 D가 옵니다.' }
    ]
  },
  {
    id: 'elementary-3-english', gradeLabel: '초3', subjectName: '영어', title: '초3 영어 파닉스 숲', subtitle: '소리와 짧은 문장 단서를 해결하라', tokenPrefix: 'ENG-E3', theme: '파닉스 숲',
    missions: [
      { title: 'CVC Code', question: 'cat, cap, can은 모두 어떤 첫 글자로 시작할까요? 알파벳으로 쓰세요.', answer: 'C', acceptedAnswers: ['C', 'c'], explanation: 'cat, cap, can은 모두 C 소리로 시작합니다.' },
      { title: 'School Code', question: 'eraser의 뜻을 한글로 쓰세요.', answer: '지우개', explanation: 'eraser는 지우개입니다.' },
      { title: 'Animal Home', question: 'fish가 사는 곳인 ocean의 뜻을 한글로 쓰세요.', answer: '바다', explanation: 'ocean은 바다입니다.' },
      { title: 'Question Code', question: 'What is this?에 알맞은 영어 대답을 쓰세요. 답: It is a ______.', answer: 'pencil', acceptedAnswers: ['pencil', 'a pencil', 'it is a pencil'], explanation: 'What is this?는 이것이 무엇인지 묻는 말이므로 It is a pencil.이 알맞습니다.' },
      { title: 'Like Code', question: 'I like apples.의 뜻에서 빈칸에 들어갈 말을 쓰세요. 나는 사과를 ______.', answer: '좋아한다', acceptedAnswers: ['좋아한다', '좋아해'], explanation: 'I like는 좋아한다는 뜻입니다.' },
      { title: 'Verb Code', question: 'run의 뜻을 한글로 쓰세요.', answer: '달리다', acceptedAnswers: ['달리다', '달리기'], explanation: 'run은 달리다입니다.' }
    ]
  },
  {
    id: 'elementary-4-english', gradeLabel: '초4', subjectName: '영어', title: '초4 영어 하루 지도', subtitle: '집·시간·일상 표현을 따라가라', tokenPrefix: 'ENG-E4', theme: '하루 지도',
    missions: [
      { title: 'House Code', question: 'kitchen의 뜻을 한글로 쓰세요.', answer: '부엌', acceptedAnswers: ['부엌', '주방'], explanation: 'kitchen은 부엌입니다.' },
      { title: 'Time Code', question: '3:00을 영어로 쓰세요.', answer: 'three o’clock', acceptedAnswers: ['three o’clock', 'three oclock', "three o'clock"], explanation: 'three o’clock은 3시입니다.' },
      { title: 'Menu Code', question: 'I want juice.에서 원하는 음료를 영어로 쓰세요.', answer: 'juice', explanation: 'I want juice는 주스를 원한다는 뜻입니다.' },
      { title: 'Routine Code', question: 'get up의 뜻을 한글로 쓰세요.', answer: '일어나다', acceptedAnswers: ['일어나다', '일어서다'], explanation: 'get up은 일어나다입니다.' },
      { title: 'Clothes Code', question: 'jacket의 뜻을 한글로 쓰세요.', answer: '재킷', acceptedAnswers: ['재킷', '자켓'], explanation: 'jacket은 재킷입니다.' },
      { title: 'Hobby Code', question: 'He likes soccer.에서 주어를 영어로 쓰세요.', answer: 'He', acceptedAnswers: ['He', 'he'], explanation: '문장의 주어는 He입니다.' }
    ]
  },
  {
    id: 'elementary-5-english', gradeLabel: '초5', subjectName: '영어', title: '초5 영어 길찾기 탐험', subtitle: '장소·과거·비교 표현을 찾아라', tokenPrefix: 'ENG-E5', theme: '길찾기 탐험',
    missions: [
      { title: 'Place Code', question: 'library의 뜻을 한글로 쓰세요.', answer: '도서관', explanation: 'library는 도서관입니다.' },
      { title: 'Direction Code', question: 'turn left의 뜻을 한글로 쓰세요.', answer: '왼쪽으로 돌아라', acceptedAnswers: ['왼쪽으로 돌아라', '왼쪽으로 돌기', '왼쪽으로 돌아'], explanation: 'left는 왼쪽입니다.' },
      { title: 'Past Code', question: 'I visited Busan yesterday.에서 과거를 나타내는 단어를 영어로 쓰세요.', answer: 'visited', explanation: 'visited는 visit의 과거형입니다.' },
      { title: 'Compare Code', question: 'bigger의 뜻을 한글로 쓰세요.', answer: '더 큰', acceptedAnswers: ['더 큰', '더크다', '더 크다'], explanation: 'bigger는 비교급으로 더 크다는 뜻입니다.' },
      { title: 'Job Code', question: 'doctor의 뜻을 한글로 쓰세요.', answer: '의사', explanation: 'doctor는 의사입니다.' },
      { title: 'Invitation Code', question: 'Let’s play soccer.는 무엇을 하는 표현일까요? 한글로 쓰세요.', answer: '제안', acceptedAnswers: ['제안', '초대', '초대/제안'], explanation: 'Let’s는 함께 하자고 제안하는 표현입니다.' }
    ]
  },
  {
    id: 'elementary-6-english', gradeLabel: '초6', subjectName: '영어', title: '초6 영어 세계 여행', subtitle: '여행·건강·미래 계획을 해독하라', tokenPrefix: 'ENG-E6', theme: '세계 여행',
    missions: [
      { title: 'Travel Code', question: 'airport의 뜻을 한글로 쓰세요.', answer: '공항', explanation: 'airport는 공항입니다.' },
      { title: 'Health Code', question: 'headache의 뜻을 한글로 쓰세요.', answer: '두통', explanation: 'headache는 두통입니다.' },
      { title: 'Future Code', question: 'I will study tomorrow.에서 미래를 나타내는 단어를 영어로 쓰세요.', answer: 'will', explanation: 'will은 미래를 나타낼 때 씁니다.' },
      { title: 'Reason Code', question: 'because의 뜻을 한글로 쓰세요.', answer: '왜냐하면', explanation: 'because는 이유를 말할 때 씁니다.' },
      { title: 'Culture Code', question: 'festival의 뜻을 한글로 쓰세요.', answer: '축제', explanation: 'festival은 축제입니다.' },
      { title: 'Message Code', question: 'Dear Mina로 시작하는 글은 보통 어떤 형식일까요? 한글로 쓰세요.', answer: '편지', acceptedAnswers: ['편지', '이메일', '편지/이메일'], explanation: 'Dear는 편지나 이메일에서 자주 쓰는 시작 표현입니다.' }
    ]
  },
  {
    id: 'middle-1-english', gradeLabel: '중1', subjectName: '영어', title: '중1 영어 문장 연구실', subtitle: 'be동사·일반동사·의문사를 분석하라', tokenPrefix: 'ENG-M1', theme: '문장 연구실',
    missions: [
      { title: 'Be Verb Code', question: 'She is kind.에서 be동사를 영어로 쓰세요.', answer: 'is', explanation: 'She is kind.에서 be동사는 is입니다.' },
      { title: 'Do Verb Code', question: 'They play soccer.에서 일반동사를 영어로 쓰세요.', answer: 'play', explanation: 'play가 일반동사입니다.' },
      { title: 'Can Code', question: 'I can swim.에서 능력을 나타내는 조동사를 영어로 쓰세요.', answer: 'can', explanation: 'can은 할 수 있다는 능력을 나타냅니다.' },
      { title: 'Command Code', question: 'Open the door.는 어떤 문장 종류일까요? 한글로 쓰세요.', answer: '명령문', explanation: '동사원형으로 시작해 지시하므로 명령문입니다.' },
      { title: 'Wh Code', question: 'Where do you live?에서 장소를 묻는 의문사를 영어로 쓰세요.', answer: 'Where', acceptedAnswers: ['Where', 'where'], explanation: 'Where가 장소를 묻는 의문사입니다.' },
      { title: 'Reading Code', question: 'Tom has two dogs and three cats. Tom의 동물 수를 영어 단어로 쓰세요.', answer: 'five', acceptedAnswers: ['five', 'Five'], explanation: 'two dogs 2마리와 three cats 3마리로 모두 five입니다.' }
    ]
  },
  {
    id: 'middle-2-english', gradeLabel: '중2', subjectName: '영어', title: '중2 영어 시제 타워', subtitle: '과거·미래·비교와 접속사를 통과하라', tokenPrefix: 'ENG-M2', theme: '시제 타워',
    missions: [
      { title: 'Past Code', question: 'go의 과거형을 영어로 쓰세요.', answer: 'went', explanation: 'go의 과거형은 went입니다.' },
      { title: 'Future Code', question: '미래 의미를 만드는 표현 be going to를 그대로 쓰세요.', answer: 'be going to', explanation: 'be going to는 미래 계획을 나타내는 세 단어 표현입니다.' },
      { title: 'Comparative Code', question: 'taller의 뜻을 한글로 쓰세요.', answer: '더 키가 큰', acceptedAnswers: ['더 키가 큰', '더 큰'], explanation: 'taller는 비교급입니다.' },
      { title: 'Infinitive Code', question: 'I want to read.에서 to부정사를 영어로 쓰세요.', answer: 'to read', explanation: 'to read가 to부정사입니다.' },
      { title: 'Conjunction Code', question: 'I was tired, but I studied.에서 반대 의미를 연결하는 단어를 영어로 쓰세요.', answer: 'but', explanation: 'but이 반대 의미를 연결합니다.' },
      { title: 'Opinion Code', question: 'I think math is fun.에서 의견을 나타내는 동사를 영어로 쓰세요.', answer: 'think', explanation: 'think는 생각이나 의견을 나타냅니다.' }
    ]
  },
  {
    id: 'middle-3-english', gradeLabel: '중3', subjectName: '영어', title: '중3 영어 독해 암호국', subtitle: '현재완료·수동태·관계대명사 단서를 해독하라', tokenPrefix: 'ENG-M3', theme: '독해 암호국',
    missions: [
      { title: 'Perfect Code', question: 'I have visited Jeju.에서 현재완료를 만드는 조동사를 영어로 쓰세요.', answer: 'have', explanation: 'have가 현재완료를 만듭니다.' },
      { title: 'Passive Code', question: 'The window was broken.에서 수동태를 나타내는 be동사를 영어로 쓰세요.', answer: 'was', explanation: 'was가 수동태의 be동사입니다.' },
      { title: 'Relative Code', question: 'This is the book that I bought.에서 관계대명사를 영어로 쓰세요.', answer: 'that', explanation: 'that이 관계대명사입니다.' },
      { title: 'Participle Code', question: 'Look at the sleeping baby.에서 baby를 꾸미는 현재분사를 영어로 쓰세요.', answer: 'sleeping', explanation: 'sleeping이 baby를 꾸밉니다.' },
      { title: 'If Code', question: 'If it rains, I will stay home.에서 조건을 나타내는 단어를 영어로 쓰세요.', answer: 'If', acceptedAnswers: ['If', 'if'], explanation: 'If가 조건을 나타냅니다.' },
      { title: 'Inference Code', question: 'Mina missed the bus, so she was late. Mina가 늦은 이유를 한글로 쓰세요.', answer: '버스를 놓침', acceptedAnswers: ['버스를 놓침', '버스를 놓쳤다', '버스 놓침'], explanation: 'missed the bus가 늦은 이유입니다.' }
    ]
  }
];

window.QUIZ_ESCAPE_CATALOG = {
  subjects: [
    {
      id: 'math',
      name: '수학',
      description: '계산, 도형, 규칙을 협력해서 해결하는 수학 방탈출',
      games: [
        {
          id: 'secret-lab',
          subjectId: 'math',
          title: '비밀 수학 연구소',
          brandTitle: '비밀 수학 연구소',
          subtitle: '사라진 보물 암호를 찾아라!',
          duration: '60~80분',
          teamSize: '4~5명',
          recordTitle: '수학 탐험 기록',
          qrListPdf: 'math-secret-lab-qr-list.pdf',
          studentPathLabel: '학생용 입장',
          teacherPathLabel: '교사용 준비',
          storageKey: 'math-secret-lab',
          finalInstruction: '모든 답을 더해라',
          finalSuccessMessage: '진짜 보물은 친구들과 함께 읽고, 계산하고, 설명하고, 끝까지 도전한 힘입니다.',
          teacherInstructions: '각 QR에는 주소가 아니라 연구소 토큰만 들어갑니다. QR을 아래 장소에 붙이면, 학생은 앱에서 정답을 맞힌 뒤 받은 위치 힌트를 따라 다음 QR을 찾아갑니다.',
          roles: ['낭독자', '계산가', '검산가', '기록가', '발표가'],
          missions: [
            {
              id: 1,
              token: 'LAB-MATH-01-MO',
              gate: '시작의 문',
              title: '스티커 보관함',
              intro: '연구소 입구가 열리려면 첫 번째 계산 암호가 필요합니다.',
              hiddenPlace: '선생님 책상 위 또는 입구 근처',
              question: '지아는 스티커를 <span class="highlight">모</span>아 15장 가지고 있었습니다. 친구에게 8장을 받고, 동생에게 6장을 주었습니다. 지아에게 남은 스티커는 몇 장일까요?',
              answer: 17,
              color: '모',
              nextClue: '책이 많은 곳',
              explanation: '15장에 8장을 더하고, 6장을 빼야 합니다.',
              hints: ['처음 가진 스티커 수를 찾아 밑줄 그어 보세요.', '받은 것은 더하고, 준 것은 빼는 상황입니다.', '15 + 8 - 6 순서로 계산해 보세요.']
            },
            {
              id: 2,
              token: 'LAB-MATH-02-DEUN',
              gate: '곱셈의 방',
              title: '연필 상자 암호',
              intro: '책장 뒤에서 연필 상자가 발견되었습니다.',
              hiddenPlace: '책장 또는 교재 보관함',
              question: '연필 상자가 <span class="highlight">든</span>든하게 4개 놓여 있습니다. 한 상자에 연필이 6자루씩 들어 있다면 연필은 모두 몇 자루일까요?',
              answer: 24,
              color: '든',
              nextClue: '물을 마시는 곳',
              explanation: '6자루씩 든 상자가 4개이므로 6을 4번 더하거나 6×4로 구합니다.',
              hints: ['한 상자에 몇 자루인지 먼저 찾으세요.', '같은 수가 여러 번 반복되면 곱셈으로 나타낼 수 있습니다.', '6 + 6 + 6 + 6 또는 6 × 4를 계산하세요.']
            },
            {
              id: 3,
              token: 'LAB-MATH-03-DAP',
              gate: '나눗셈의 방',
              title: '초콜릿 나누기',
              intro: '정수기 근처에 초콜릿 나눔 기록이 놓여 있습니다.',
              hiddenPlace: '정수기 근처',
              question: '탐험가들의 <span class="highlight">답</span>을 찾기 위해 초콜릿 32개를 4명이 똑같이 나누어 먹으려고 합니다. 한 명은 몇 개씩 받을까요?',
              answer: 8,
              color: '답',
              nextClue: '시간을 확인하는 곳',
              explanation: '32개를 4명이 똑같이 나누므로 32÷4를 계산합니다.',
              hints: ['전체 초콜릿 수와 사람 수를 각각 찾아 보세요.', '똑같이 나누는 상황은 나눗셈으로 나타낼 수 있습니다.', '32 ÷ 4를 계산하세요.']
            },
            {
              id: 4,
              token: 'LAB-MATH-04-EUL',
              gate: '도형의 문',
              title: '직사각형 지도',
              intro: '시계 아래에서 직사각형 지도 조각을 발견했습니다.',
              hiddenPlace: '벽시계 또는 시간표 근처',
              question: '비밀 지도의 가로는 9cm, 세로는 4cm입니다. 지도<span class="highlight">을</span> 펼쳤을 때 직사각형의 넓이는 몇 cm²일까요?',
              answer: 36,
              color: '을',
              nextClue: '가장 많이 앉는 곳 아래',
              explanation: '직사각형의 넓이는 가로 × 세로입니다. 9×4를 계산합니다.',
              hints: ['직사각형 넓이 공식을 떠올려 보세요.', '가로와 세로에 해당하는 수를 문제에서 찾으세요.', '9 × 4를 계산하세요.']
            },
            {
              id: 5,
              token: 'LAB-MATH-05-DEO',
              gate: '시간의 방',
              title: '실험 시간 계산',
              intro: '책상 아래에서 연구소 활동 시간이 적힌 종이를 찾았습니다.',
              hiddenPlace: '학생 책상 아래',
              question: '수학 실험은 25분 동안 하고, 정리 시간은 20분 동안 합니다. 두 시간을 <span class="highlight">더</span>하면 모두 몇 분일까요?',
              answer: 45,
              color: '더',
              nextClue: '칠판 또는 화이트보드',
              explanation: '실험 시간과 정리 시간을 모두 합치므로 25+20을 계산합니다.',
              hints: ['구해야 하는 것은 전체 시간입니다.', '두 시간이 모두 걸렸다면 더해야 할까요, 빼야 할까요?', '25 + 20을 계산하세요.']
            },
            {
              id: 6,
              token: 'LAB-MATH-06-HAERA',
              gate: '규칙의 방',
              title: '숫자 계단',
              intro: '마지막 문 앞에는 규칙 숫자열이 반짝이고 있습니다.',
              hiddenPlace: '칠판, 화이트보드, 선생님 옆',
              question: '숫자 계단은 3씩 커지는 규칙입니다. 3, 6, 9, 12, 15, __. 빈칸에 들어갈 수를 구<span class="highlight">해라</span>.',
              answer: 18,
              color: '해라',
              nextClue: '색칠 글자를 모두 모으세요',
              explanation: '3씩 커지는 규칙이므로 15 다음에는 18입니다.',
              hints: ['앞의 수에서 다음 수로 얼마나 커지는지 보세요.', '모든 수가 3씩 커지고 있습니다.', '15에 3을 더하세요.']
            }
          ]
        },
        ...mathGradeConfigs.map(config => createGradeGame('math', config))
      ]
    },
    {
      id: 'english',
      name: '영어',
      description: '단어, 문장, 읽기 단서를 단계별로 해결하는 영어 방탈출',
      games: englishGradeConfigs.map(config => createGradeGame('english', config))
    }
  ]
};
