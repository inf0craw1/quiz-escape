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
          subtitle: '사라진 보물 암호를 찾아라!',
          duration: '60~80분',
          teamSize: '4~5명',
          storageKey: 'math-secret-lab',
          finalInstruction: '모든 답을 더해라',
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
        }
      ]
    }
  ]
};
