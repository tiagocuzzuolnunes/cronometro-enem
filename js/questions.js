let questionIndex;
const questionSections = document.querySelectorAll('.question-section');
let html = "";

function loadQuestions() {

    for (let i = 1; i <= 90; i++) {
        function formatText() {
            return i < 10 ? `0${i}` : i;
        }
        
        html += `<a class="question-link" id="${i}" href="index.html"><li class="question-btn">${formatText(i)}</li></a>`;
    }
    questionSections.forEach(section => {
        section.innerHTML += html
    })

}

loadQuestions();

const linkQuestions = document.querySelectorAll('.question-link');

linkQuestions.forEach(link => {
    link.addEventListener("click", () => {
        questionText.textContent = `Questão: ${link.id}`
        // console.log(`Questão: ${link.id}`)
    })
})