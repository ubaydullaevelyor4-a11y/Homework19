
  const questions = [
    {
      q: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: "Mars"
    },
    {
      q: "Which planet has the most moons?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correct: "Saturn"
    },
    {
      q: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      correct: "Mercury"
    }

  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let selectedAnswer = null;
  let timeLeft = 10;
  let timerId = null;

  const questionTextEl = document.getElementById("questionText");
  const optionsEl = document.getElementById("options");
  const submitBtn = document.getElementById("submitBtn");
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("time");
  const speakBtn = document.getElementById("speakBtn");

  function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionTextEl.textContent = q.q;
    optionsEl.innerHTML = "";

    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.className = "option";
      div.textContent = opt;
      div.dataset.answer = opt;
      div.addEventListener("click", () => selectAnswer(div));
      optionsEl.appendChild(div);
    });

    selectedAnswer = null;
    submitBtn.disabled = true;
    timeLeft = 10;
    timeEl.textContent = timeLeft;
    clearInterval(timerId);
    startTimer();
  }

  function selectAnswer(el) {
    document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
    el.classList.add("selected");
    selectedAnswer = el.dataset.answer;
    submitBtn.disabled = false;
  }

  
  function startTimer() {
    timerId = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timerId);
        submitAnswer(true); 
      }
    }, 1000);
  }

  function submitAnswer(timeout = false) {
    clearInterval(timerId);

    const correct = questions[currentQuestionIndex].correct;
    const isCorrect = selectedAnswer === correct;

    if (!timeout && isCorrect) {
      score++;
      scoreEl.textContent = score;
      alert("Correct! 🎉");
    } else {
      alert(timeout ? "Time's up! ⏰" : `Wrong! The correct answer is ${correct} 😔`);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      setTimeout(loadQuestion, 1200);
    } else {
      setTimeout(() => {
        alert(`Game Over!\nYour final score: ${score}/${questions.length}`);
       
        currentQuestionIndex = 0;
        score = 0;
        scoreEl.textContent = score;
        loadQuestion();
      }, 1200);
    }
  }


  speakBtn.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(questionTextEl.textContent);
    utterance.lang = "en-US";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    speechSynthesis.speak(utterance);
  });

  submitBtn.addEventListener("click", () => submitAnswer());


  loadQuestion();