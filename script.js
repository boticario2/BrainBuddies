// -------------------------
// GLOBAL VARIABLES
// -------------------------
let currentGrade = null;
let currentGame = null;
let currentQuestionIndex = 0;
let currentQuestions = [];
const mascot = document.getElementById("mascot");
const mascotBubble = document.getElementById("mascot-bubble");
const mascotText = document.getElementById("mascot-text");
const feedback = document.getElementById("feedback");
const progressFill = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");
const gameContent = document.getElementById("game-content");

// -------------------------
// DATA STRUCTURE FOR GAMES
// -------------------------
const gameData = {
  K: [
    {
      title: "Letter Hunt",
      type: "tap",
      questions: [
        {
          prompt: "Tap all the letters 'a':",
          letters: ["a","m","s","a","t","r","a"],
          correct: ["a"]
        },
        {
          prompt: "What is the first letter in the word 'sun'?",
          options: ["s","u","n"],
          correct: "s"
        },
        {
          prompt: "Which letter makes the /m/ sound?",
          options: ["m","n","b"],
          correct: "m"
        },
        {
          prompt: "Drag the correct letter to complete the word: _at",
          options: ["c","b","d"],
          correct: "c",
          drag: true
        },
        {
          prompt: "Which word begins with the same sound as 'ball'?",
          options: ["bat","cat","dog"],
          correct: "bat"
        }
      ]
    },
    {
      title: "Rhyme Time",
      type: "mcq",
      questions: [
        {prompt:"Which word rhymes with 'cat'?", options:["hat","hot","cut"], correct:"hat"},
        {prompt:"Which word rhymes with 'sun'?", options:["fun","fan","pen"], correct:"fun"},
        {prompt:"Tap the correct word for this picture (dog)", options:["dog","dig","dug"], correct:"dog"}
      ]
    },
    {
      title: "Mini Story Time",
      type: "mcq",
      questions: [
        {prompt:"Read: 'The dog runs fast.' Who runs?", options:["dog","cat","boy"], correct:"dog"},
        {prompt:"How does the dog run?", options:["slow","fast","sad"], correct:"fast"},
        {prompt:"Read: 'The cat is on the bed.' Where is the cat?", options:["on the bed","under the bed","in the box"], correct:"on the bed"}
      ]
    }
  ],
  1: [
    {
      title:"Sound Match",
      type:"mcq",
      questions:[
        {prompt:"Which word begins with the same sound as 'fish'?", options:["fan","ship","cat"], correct:"fan"},
        {prompt:"Fill in the missing letter: c _ p", options:["a","o","u"], correct:"a"},
        {prompt:"Which word rhymes with 'cake'?", options:["lake","kick","cup"], correct:"lake"},
        {prompt:"Choose the correct spelling", options:["jumpping","jumping","jumpng"], correct:"jumping"}
      ]
    },
    {
      title:"Word Builder",
      type:"drag",
      questions:[
        {prompt:"Complete the word: s _ ow", options:["n","m","t"], correct:"n", drag:true},
        {prompt:"Choose the correct sentence", options:["The boy are happy.","The boy is happy.","The boy be happy."], correct:"The boy is happy."},
        {prompt:"Opposite of 'big'?", options:["small","tall","long"], correct:"small"},
        {prompt:"'The bird is ___ the tree.'", options:["in","on","under"], correct:"on"}
      ]
    },
    {
      title:"Story Detective",
      type:"mcq",
      questions:[
        {prompt:"Read: 'Tom has a red ball. He throws it to Ana. Ana catches the ball and smiles.' What does Tom throw?", options:["ball","cat","book"], correct:"ball"},
        {prompt:"Who catches the ball?", options:["Ana","Tom","Dog"], correct:"Ana"},
        {prompt:"Why does Ana smile?", options:["She caught the ball","She lost the ball","She is tired"], correct:"She caught the ball"},
        {prompt:"What color is the ball?", options:["red","blue","yellow"], correct:"red"}
      ]
    }
  ],
  2: [
    {
      title:"Blend Builder",
      type:"mcq",
      questions:[
        {prompt:"Which word has a consonant blend?", options:["frog","cat","sun"], correct:"frog"},
        {prompt:"Which word has a long vowel sound?", options:["rain","hat","cap"], correct:"rain"},
        {prompt:"Choose the correct spelling", options:["flight","flite","fligth"], correct:"flight"},
        {prompt:"Fill in the blank: b _ _ k", options:["oa","ai","ee"], correct:"oa"}
      ]
    },
    {
      title:"Word Lab",
      type:"mcq",
      questions:[
        {prompt:"What does 'ancient' mean?", options:["very old","new","small"], correct:"very old"},
        {prompt:"Opposite of 'happy'?", options:["sad","tall","loud"], correct:"sad"},
        {prompt:"Choose the correct verb: 'The dog ___ loudly.'", options:["bark","barks","barking"], correct:"barks"},
        {prompt:"Which word rhymes with 'moon'?", options:["spoon","sun","man"], correct:"spoon"}
      ]
    },
    {
      title:"Story Explorer",
      type:"mcq",
      questions:[
        {prompt:"Read: 'Anna went to the park. She saw ducks swimming in the pond. She fed them bread.' Where did Anna go?", options:["park","school","home"], correct:"park"},
        {prompt:"What were the ducks doing?", options:["swimming","flying","sleeping"], correct:"swimming"},
        {prompt:"What did Anna feed the ducks?", options:["bread","fish","corn"], correct:"bread"},
        {prompt:"Why did Anna go to the park?", options:["To play","To sleep","To cry"], correct:"To play"}
      ]
    }
  ],
  3: [
    {
      title:"Word Detectives",
      type:"mcq",
      questions:[
        {prompt:"Which word has a silent letter?", options:["knee","run","dog"], correct:"knee"},
        {prompt:"Which word has a vowel team?", options:["boat","cat","hat"], correct:"boat"},
        {prompt:"Choose the correct spelling", options:["knight","nite","nit"], correct:"knight"},
        {prompt:"Fill in the blank: pl _ _ ne", options:["ai","ee","oa"], correct:"oa"}
      ]
    },
    {
      title:"Vocabulary Quest",
      type:"mcq",
      questions:[
        {prompt:"What does 'enormous' mean?", options:["very big","tiny","slow"], correct:"very big"},
        {prompt:"Antonym of 'ancient'?", options:["modern","old","dusty"], correct:"modern"},
        {prompt:"'She ___ her homework before dinner.'", options:["finished","finish","finishing"], correct:"finished"},
        {prompt:"Choose the correct word: 'He was ___ to win the race.'", options:["eager","lazy","weak"], correct:"eager"}
      ]
    },
    {
      title:"Reading Adventure",
      type:"mcq",
      questions:[
        {prompt:"Read: 'The rabbit hopped quickly across the garden. It found a carrot near the fence. It ate the carrot happily and rested under a tree.' How did the rabbit move?", options:["quickly","slowly","sadly"], correct:"quickly"},
        {prompt:"Where did it find the carrot?", options:["near the fence","under the tree","on the hill"], correct:"near the fence"},
        {prompt:"Why was the rabbit happy?", options:["it ate the carrot","it lost the carrot","it was tired"], correct:"it ate the carrot"},
        {prompt:"What is the main idea of the passage?", options:["rabbit found carrot and was happy","garden is big","rabbit sleeps a lot"], correct:"rabbit found carrot and was happy"}
      ]
    }
  ]
};

// -------------------------
// SCREEN NAVIGATION
// -------------------------
function goToLevelSelect(){
  showScreen("level-screen");
  showMascotText("Pick your grade to start!");
}

function selectLevel(grade){
  currentGrade = grade;
  populateGameSelect();
  showScreen("game-select-screen");
  showMascotText("Choose a game! Let's play!");
}

function goHome(){
  showScreen("start-screen");
}

function populateGameSelect(){
  const grid = document.getElementById("game-grid");
  grid.innerHTML = "";
  gameData[currentGrade].forEach((game,index)=>{
    const div = document.createElement("div");
    div.className = "game-card";
    div.innerHTML = `<span class="game-title">${game.title}</span>`;
    div.onclick = ()=>startGame(index);
    grid.appendChild(div);
  });
  document.getElementById("selected-grade-title").textContent = `Grade ${currentGrade} Games`;
}

function startGame(gameIndex){
  currentGame = gameIndex;
  currentQuestionIndex = 0;
  currentQuestions = gameData[currentGrade][currentGame].questions;
  document.getElementById("game-title-display").textContent = gameData[currentGrade][currentGame].title;
  progressFill.style.width = "0%";
  showQuestion();
  showScreen("gameplay-screen");
}

// -------------------------
// SHOW QUESTIONS
// -------------------------
function showQuestion(){
  feedback.textContent = "";
  nextBtn.style.display = "none";
  gameContent.innerHTML = "";
  const q = currentQuestions[currentQuestionIndex];

  const prompt = document.createElement("div");
  prompt.style.fontSize="1.4rem";
  prompt.style.textAlign="center";
  prompt.textContent = q.prompt;
  gameContent.appendChild(prompt);

  // TAP LETTERS
  if(q.letters){
    const grid = document.createElement("div");
    grid.className = "letter-grid";
    q.letters.forEach(l=>{
      const btn = document.createElement("button");
      btn.className = "letter-tile";
      btn.textContent = l;
      btn.onclick = ()=>checkTapLetter(btn,l,q.correct);
      grid.appendChild(btn);
    });
    gameContent.appendChild(grid);
  }

  // OPTIONS MCQ
  if(q.options){
    const grid = document.createElement("div");
    grid.className = "options-grid";
    q.options.forEach(opt=>{
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt;
      btn.onclick = ()=>checkAnswer(opt,q.correct,btn);
      grid.appendChild(btn);
    });
    gameContent.appendChild(grid);
  }
}

// -------------------------
// TAP LETTER LOGIC
// -------------------------
function checkTapLetter(btn,letter,correctLetters){
  btn.classList.toggle("selected");
  const selected = Array.from(document.querySelectorAll(".letter-tile.selected")).map(b=>b.textContent);
  selected.sort();
  correctLetters.sort();
  if(selected.length===correctLetters.length && selected.every((v,i)=>v===correctLetters[i])){
    feedback.textContent = "✅ Great job!";
    nextBtn.style.display = "block";
  } else {
    feedback.textContent = "";
  }
}

// -------------------------
// MCQ LOGIC
// -------------------------
function checkAnswer(answer,correct,btn){
  if(answer===correct){
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = "❌ Try again!";
    btn.classList.add("shake");
    setTimeout(()=>btn.classList.remove("shake"),300);
    return;
  }
  nextBtn.style.display = "block";
}

// -------------------------
// NEXT QUESTION
// -------------------------
function nextQuestion(){
  currentQuestionIndex++;
  const percent = Math.round((currentQuestionIndex/currentQuestions.length)*100);
  progressFill.style.width = percent+"%";
  if(currentQuestionIndex>=currentQuestions.length){
    showScreen("end-screen");
    showMascotText("You did it! 🎉");
    return;
  }
  showQuestion();
}

// -------------------------
// UTILS
// -------------------------
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showMascotText(text){
  mascotText.textContent = text;
  mascotBubble.classList.add("show");
  mascot.classList.add("waving");
  setTimeout(()=>mascotBubble.classList.remove("show"),4000);
  setTimeout(()=>mascot.classList.remove("waving"),4000);
}