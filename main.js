import './style.css'

function getRandomHSLColor() {
  // 기본 색상 H, 채도 S, 밝기 L을 랜덤으로 설정
  const hue = Math.floor(Math.random() * 360); // 0~359 사이의 정수
  const saturation = Math.floor(Math.random() * 100); // 0~100 사이의 정수
  const lightness = Math.floor(Math.random() * 100); // 0~100 사이의 정수

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getSimilarHSLColor(hslColor, hueDifference = 10) {
  // hslColor를 파싱해서 hue, saturation, lightness 값을 얻음
  const hslMatch = hslColor.match(/hsl\((\d+), (\d+)%?, (\d+)%?\)/);
  if (!hslMatch) return null; // 잘못된 hsl 형식의 입력일 경우

  let hue = parseInt(hslMatch[1], 10);
  const saturation = parseInt(hslMatch[2], 10);
  const lightness = parseInt(hslMatch[3], 10);

  // hue를 hueDifference만큼 변경하여 유사한 색상 생성 (원형 반복)
  hue = (hue + hueDifference + 360) % 360;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}



// 게임 스테이지 및 화면 크기 설정
const rows = 4; // 행의 개수
const columns = 8; // 열의 개수
const defaultChar = '멵'; // 기본 글자
const answerChar = '먽'; // 정답 글자
let stage = 1;

// 게임 시작
function startGame() {
  renderStage();
}

// 스테이지를 렌더링하는 함수
function renderStage() {
  const color = getRandomHSLColor();
  const similarColor = getSimilarHSLColor(color, 20);

  const gameContainer = document.getElementById('game');
  gameContainer.innerHTML = ''; // 이전 스테이지 내용 초기화

  // 스테이지 정보를 화면에 업데이트
  const stageInfo = document.getElementById('stageInfo');
  stageInfo.textContent = `Stage: ${stage}`;

  // 2차원 배열 생성
  const gameBoard = Array.from({ length: rows }, () =>
    Array(columns).fill(color)
  );

  // 랜덤 위치에 정답 글자 넣기
  const answerRow = Math.floor(Math.random() * rows);
  const answerColumn = Math.floor(Math.random() * columns);
  gameBoard[answerRow][answerColumn] = similarColor;

  // 화면에 배열 표시
  gameBoard.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    row.forEach((char, colIndex) => {
      const charDiv = document.createElement('span');
      charDiv.className = 'char';
      charDiv.style.background = char;

      // 정답 클릭 확인
      charDiv.addEventListener('click', () =>
        checkAnswer(rowIndex, colIndex, answerRow, answerColumn)
      );

      rowDiv.appendChild(charDiv);
    });
    gameContainer.appendChild(rowDiv);
  });
}

// 정답 확인 함수
function checkAnswer(row, col, answerRow, answerCol) {
  if (row === answerRow && col === answerCol) {
    alert('정답입니다! 다음 스테이지로 넘어갑니다.');
    stage++;
    renderStage(); // 다음 스테이지 렌더링
  } else {
    alert('실패! 게임을 종료합니다.');
    document.getElementById('game').innerHTML = ''; // 게임 종료 시 게임 화면 초기화
    document.getElementById('stageInfo').textContent = 'Game Over!';
    stage = 1; // 스테이지 초기화
  }
}

// 게임 시작 버튼 클릭
document.getElementById('startButton').addEventListener('click', startGame);

// 숙제 
// 1. 클리어 할때마다 기본 90 하고 클리어 할때마다 10씩 감소 getSimilarHSLColor(color, 100);
// 2. 마지막 스테이지 9 (스테이지 마다 1초씩 감소) 클리어시 축하
// 3. 10초가 지나면 게임끝

// 3. 구글에 hsl 기반으로 코드를 구현해서 만들기 (함)


