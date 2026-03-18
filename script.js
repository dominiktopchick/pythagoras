// Quiz Questions in Hungarian
const quizQuestions = [
    {
        id: 1,
        question: "Pythagoras mely szigeten született?",
        options: [
            "Kréta",
            "Szamosz",
            "Rhodos",
            "Leszbosz"
        ],
        correct: 1
    },
    {
        id: 2,
        question: "Hol alapította híresítője titkos iskoláját?",
        options: [
            "Athénban",
            "Szamoszon",
            "Crotónban",
            "Róma közelében"
        ],
        correct: 2
    },
    {
        id: 3,
        question: "Mi a Pythagoras-tétel képlete?",
        options: [
            "a + b = c",
            "a² + b² = c²",
            "a × b = c",
            "a - b = c"
        ],
        correct: 1
    },
    {
        id: 4,
        question: "Melyik egy Pythagoras-i triplet?",
        options: [
            "2-3-5",
            "3-4-5",
            "1-2-3",
            "4-5-6"
        ],
        correct: 1
    },
    {
        id: 5,
        question: "Körülbelül hány éves korában halt meg Pythagoras?",
        options: [
            "50 éves",
            "60 éves",
            "75 éves",
            "85 éves"
        ],
        correct: 2
    },
    {
        id: 6,
        question: "Melyik nem Pythagoras feltalálása?",
        options: [
            "Aranymetszés",
            "Szférák zenéje",
            "Geocentrizmus",
            "Harmonikus viszony zenében"
        ],
        correct: 2
    },
    {
        id: 7,
        question: "Pythagoras mely országban tanult hosszan?",
        options: [
            "Görögország",
            "Egyiptom",
            "Perzsia",
            "India"
        ],
        correct: 1
    },
    {
        id: 8,
        question: "Derékszögű háromszögben 'a' és 'b' mit jelentenek?",
        options: [
            "Szögeket",
            "Szférákat",
            "Befogókat",
            "Szögméréseket"
        ],
        correct: 2
    }
];

// Initialize Quiz
function initializeQuiz() {
    const quizContent = document.getElementById('quiz-content');
    const submitBtn = document.getElementById('submit-btn');
    
    // Clear previous content
    quizContent.innerHTML = '';
    
    // Create quiz questions
    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.setAttribute('data-question-id', q.id);
        
        let optionsHTML = '';
        q.options.forEach((option, optionIndex) => {
            optionsHTML += `
                <label class="option">
                    <input type="radio" name="question-${q.id}" value="${optionIndex}" required>
                    <label>${option}</label>
                </label>
            `;
        });
        
        questionDiv.innerHTML = `
            <div class="question-title">Kérdés ${index + 1}: ${q.question}</div>
            <div class="question-options">
                ${optionsHTML}
            </div>
        `;
        
        quizContent.appendChild(questionDiv);
    });
    
    // Add submit button event listener
    submitBtn.addEventListener('click', checkAnswers);
    
    // Add animation to questions
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach((q, index) => {
        q.style.opacity = '0';
        q.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s forwards`;
    });
}

// Check Answers
function checkAnswers() {
    const resultsContainer = document.getElementById('results');
    let correctAnswers = 0;
    let totalQuestions = quizQuestions.length;
    let detailedResults = [];
    
    quizQuestions.forEach(q => {
        const selectedOption = document.querySelector(`input[name="question-${q.id}"]:checked`);
        
        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            const isCorrect = userAnswer === q.correct;
            
            if (isCorrect) {
                correctAnswers++;
            }
            
            detailedResults.push({
                question: q.question,
                userAnswer: q.options[userAnswer],
                correctAnswer: q.options[q.correct],
                isCorrect: isCorrect
            });
        } else {
            detailedResults.push({
                question: q.question,
                userAnswer: 'Nem válaszolt',
                correctAnswer: q.options[q.correct],
                isCorrect: false
            });
        }
    });
    
    // Calculate percentage
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Display results
    let resultClass = 'success';
    let resultMessage = '';
    
    if (percentage === 100) {
        resultMessage = `🎉 Remek! ${correctAnswers}/${totalQuestions} helyes válasz! Pythagoras volna büszke rád!`;
        resultClass = 'success';
    } else if (percentage >= 75) {
        resultMessage = `✨ Nagyon jó! ${correctAnswers}/${totalQuestions} helyes válasz (${percentage}%).`;
        resultClass = 'success';
    } else if (percentage >= 50) {
        resultMessage = `👍 Jó munka! ${correctAnswers}/${totalQuestions} helyes válasz (${percentage}%). Még tanulhatsz!`;
        resultClass = 'partial';
    } else {
        resultMessage = `📚 Tanulj tovább! ${correctAnswers}/${totalQuestions} helyes válasz (${percentage}%). Nézd meg újra az anyagot!`;
        resultClass = 'partial';
    }
    
    let detailsHTML = `
        <div class="results-title">${resultMessage}</div>
        <div style="margin-top: 1.5rem;">
            <div style="font-weight: bold; margin-bottom: 1rem;">Válaszok részletesen:</div>
    `;
    
    detailedResults.forEach((result, index) => {
        const statusIcon = result.isCorrect ? '✓' : '✗';
        const statusClass = result.isCorrect ? 'success' : 'error';
        
        detailsHTML += `
            <div style="margin-bottom: 1rem; padding: 1rem; background: rgba(0,0,0,0.05); border-radius: 6px;">
                <div style="font-weight: bold; margin-bottom: 0.5rem;">
                    <span style="color: ${result.isCorrect ? '#4caf50' : '#f44336'};">${statusIcon}</span>
                    Kérdés ${index + 1}: ${result.question}
                </div>
                <div style="margin-left: 1.5rem;">
                    <div>Te: <strong>${result.userAnswer}</strong></div>
                    ${!result.isCorrect ? `<div style="color: #4caf50;">Helyes: <strong>${result.correctAnswer}</strong></div>` : ''}
                </div>
            </div>
        `;
    });
    
    detailsHTML += '</div>';
    
    resultsContainer.innerHTML = detailsHTML;
    resultsContainer.className = `results-container show ${resultClass}`;
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll animation for elements
function handleScroll() {
    const elements = document.querySelectorAll('.invention-card, .timeline-item, .example-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
        }
    });
}

window.addEventListener('scroll', handleScroll);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    handleScroll();
    
    // Add loading animation
    const body = document.body;
    body.style.opacity = '0';
    body.style.animation = 'fadeIn 0.6s ease-out 0.2s forwards';
});

// Prevent form submission on Enter key in quiz
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.target.closest('.quiz-section')) {
        event.preventDefault();
    }
});

// Add active state to nav links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Add touch support for mobile
if (window.innerWidth <= 768) {
    document.addEventListener('touchstart', function() {
        // Touch event handler
    });
}

// Console welcome message
console.log('%c🎓 Pythagoras Oktatási Weboldal', 'font-size: 20px; font-weight: bold; color: #8b5a8c;');
console.log('%cÜdvözlünk az ókori matematika világában!', 'font-size: 14px; color: #d4a574;');
console.log('%cMagyar nyelvű Pythagoras enciklopédia', 'font-size: 12px; color: #999;');
