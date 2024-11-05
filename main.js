import './style.css'

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
  const gameContainer = document.getElementById('game');
  gameContainer.innerHTML = ''; // 이전 스테이지 내용 초기화

  // 스테이지 정보를 화면에 업데이트
  const stageInfo = document.getElementById('stageInfo');
  stageInfo.textContent = `Stage: ${stage}`;

  // 2차원 배열 생성
  const gameBoard = Array.from({ length: rows }, () =>
    Array(columns).fill(defaultChar)
  );

  // 랜덤 위치에 정답 글자 넣기
  const answerRow = Math.floor(Math.random() * rows);
  const answerColumn = Math.floor(Math.random() * columns);
  gameBoard[answerRow][answerColumn] = answerChar;

  // 화면에 배열 표시
  gameBoard.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    row.forEach((char, colIndex) => {
      const charDiv = document.createElement('span');
      charDiv.className = 'char';
      charDiv.textContent = char;

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
// 1. 10초가 지나면 게임끝
// 2. 마지막 스테이지 9 (스테이지 마다 1초씩 감소) 클리어시 축하

// 3. 구글에 hsl 기반으로 코드를 구현해서 만들기