// character modal
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openCharacter(card.dataset.character));
    card.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') openCharacter(card.dataset.character);
    });
});

function openCharacter(json) {
    try {
        const data = JSON.parse(json);
        modalTitle.textContent = data.name;
        modalBody.textContent = data.bio + ' — Role: ' + data.role;
        modal.classList.add('open');
        // set focus to close button for accessibility
        closeModal.focus();
    } catch (err) {
        console.error(err)
    }
}

closeModal.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (ev) => {
    if (ev.target === modal) modal.classList.remove('open');
});


// ==============================
// HOUSE M.D. DIAGNOSTIC GAME
// ==============================

// Patient data embedded in JS
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const patients = [{
        name: "Adrian Kline",
        age: 36,
        sex: "Male",
        symptoms: ["Progressive ataxia", "Dysarthria", "Frequent falls", "Subtle mood swings"],
        labs: ["Normal MRI", "Vitamin levels borderline", "CSF negative for infection"],
        options: shuffleArray([{
                diagnosis: "Spinocerebellar ataxia type 36",
                correct: true,
                feedback: "Correct! Rare trinucleotide repeat disorder with subtle early psychiatric features."
            },
            {
                diagnosis: "Multiple system atrophy",
                correct: false,
                feedback: "Incorrect. MSA usually presents with autonomic failure early."
            },
            {
                diagnosis: "Wernicke encephalopathy",
                correct: false,
                feedback: "Incorrect. Thiamine deficiency usually has nystagmus and ophthalmoplegia acutely."
            }
        ])
    },
    {
        name: "Beatrice Lang",
        age: 29,
        sex: "Female",
        symptoms: ["Intermittent hypoglycemia", "Sweating spells", "Palpitations", "Mild cognitive fog"],
        labs: ["Insulin low during hypoglycemia", "C-peptide low", "Abdominal imaging normal"],
        options: shuffleArray([{
                diagnosis: "Noninsulinoma pancreatogenous hypoglycemia syndrome (NIPHS)",
                correct: true,
                feedback: "Correct! Functional beta-cell disorder causing endogenous hypoglycemia without tumor."
            },
            {
                diagnosis: "Factitious hypoglycemia",
                correct: false,
                feedback: "Incorrect. Insulin and C-peptide low excludes exogenous insulin use."
            },
            {
                diagnosis: "Addison’s disease",
                correct: false,
                feedback: "Incorrect. Hypoglycemia alone without electrolyte abnormalities makes adrenal insufficiency less likely."
            }
        ])
    },
    {
        name: "Carlos Mendoza",
        age: 45,
        sex: "Male",
        symptoms: ["Progressive dyspnea on exertion", "Mild cyanosis", "Occasional hemoptysis"],
        labs: ["Normal echocardiogram", "Arterial blood gas: PaO2 55 mmHg", "CT angiography normal"],
        options: shuffleArray([{
                diagnosis: "Pulmonary veno-occlusive disease",
                correct: true,
                feedback: "Correct! Rare pulmonary vascular disease causing hypoxemia with normal imaging."
            },
            {
                diagnosis: "Pulmonary embolism",
                correct: false,
                feedback: "Incorrect. CTA shows no embolus."
            },
            {
                diagnosis: "Interstitial lung disease",
                correct: false,
                feedback: "Incorrect. CT scan is normal."
            }
        ])
    },
    {
        name: "Dana White",
        age: 33,
        sex: "Female",
        symptoms: ["Episodes of hypertension", "Severe headaches", "Sweating", "Palpitations"],
        labs: ["Plasma metanephrines borderline", "Imaging: no adrenal mass"],
        options: shuffleArray([{
                diagnosis: "Paraganglioma (extra-adrenal)",
                correct: true,
                feedback: "Correct! Catecholamine-secreting tumor outside the adrenal glands can evade standard imaging."
            },
            {
                diagnosis: "Essential hypertension",
                correct: false,
                feedback: "Incorrect. Symptoms are episodic, not constant."
            },
            {
                diagnosis: "Hyperthyroidism",
                correct: false,
                feedback: "Incorrect. Thyroid labs normal."
            }
        ])
    },
    {
        name: "Elliot Fraser",
        age: 52,
        sex: "Male",
        symptoms: ["Chronic fatigue", "Muscle cramps", "Mood swings", "Intermittent jaundice"],
        labs: ["Normal liver enzymes", "Plasma ammonia mildly elevated", "Uric acid slightly high"],
        options: shuffleArray([{
                diagnosis: "Late-onset urea cycle disorder (ornithine transcarbamylase deficiency)",
                correct: true,
                feedback: "Correct! Adult-onset OTC deficiency can present subtly with neuropsychiatric and hepatic-like symptoms."
            },
            {
                diagnosis: "Hepatitis C",
                correct: false,
                feedback: "Incorrect. Serology negative."
            },
            {
                diagnosis: "Hemochromatosis",
                correct: false,
                feedback: "Incorrect. Iron studies are normal."
            }
        ])
    },
    {
        name: "Felicity Moore",
        age: 40,
        sex: "Female",
        symptoms: ["Intermittent vision changes", "Transient weakness in limbs", "Confusion episodes", "Nausea"],
        labs: ["MRI brain normal", "CSF mildly elevated protein", "No autoantibodies"],
        options: shuffleArray([{
                diagnosis: "HaNDL syndrome (Headache with Neurologic Deficits and CSF Lymphocytosis)",
                correct: true,
                feedback: "Correct! Rare syndrome with transient neurologic deficits and mild CSF abnormalities."
            },
            {
                diagnosis: "Migraine with aura",
                correct: false,
                feedback: "Incorrect. Migraine rarely causes limb weakness with CSF changes."
            },
            {
                diagnosis: "Multiple sclerosis",
                correct: false,
                feedback: "Incorrect. MRI is normal."
            }
        ])
    },
    {
        name: "Gideon Park",
        age: 47,
        sex: "Male",
        symptoms: ["Severe night sweats", "Unexplained anemia", "Low-grade fevers", "Splenomegaly"],
        labs: ["Peripheral smear normal", "Bone marrow: hemophagocytosis present", "Ferritin extremely high"],
        options: shuffleArray([{
                diagnosis: "Adult-onset hemophagocytic lymphohistiocytosis (HLH)",
                correct: true,
                feedback: "Correct! Rare hyperinflammatory syndrome in adults presenting with cytopenias and systemic inflammation."
            },
            {
                diagnosis: "Chronic leukemia",
                correct: false,
                feedback: "Incorrect. Blood counts do not show typical leukemic changes."
            },
            {
                diagnosis: "Tuberculosis",
                correct: false,
                feedback: "Incorrect. No infectious etiology confirmed."
            }
        ])
    },
    {
        name: "Helena Voss",
        age: 39,
        sex: "Female",
        symptoms: ["Recurrent pneumonia", "Bronchiectasis", "Infertility", "Sinus infections"],
        labs: ["Sweat chloride borderline", "Genetic testing inconclusive", "Ciliary biopsy abnormal"],
        options: shuffleArray([{
                diagnosis: "Primary ciliary dyskinesia",
                correct: true,
                feedback: "Correct! Rare congenital disorder affecting motile cilia, causing respiratory and fertility problems."
            },
            {
                diagnosis: "Cystic fibrosis",
                correct: false,
                feedback: "Incorrect. Genetic tests inconclusive; presentation suggests ciliary defect instead."
            },
            {
                diagnosis: "Immunodeficiency",
                correct: false,
                feedback: "Incorrect. Immunoglobulins normal."
            }
        ])
    },
    {
        name: "Isaac Romero",
        age: 50,
        sex: "Male",
        symptoms: ["Progressive numbness in feet", "Balance issues", "Blurred vision", "Cardiac arrhythmias"],
        labs: ["Vitamin B12 normal", "Methylmalonic acid elevated", "Homocysteine elevated"],
        options: shuffleArray([{
                diagnosis: "Methylmalonic acidemia presenting in adulthood",
                correct: true,
                feedback: "Correct! Rare metabolic disorder causing neuropathy, visual issues, and cardiac manifestations even in adults."
            },
            {
                diagnosis: "Diabetic neuropathy",
                correct: false,
                feedback: "Incorrect. No diabetes history; labs indicate metabolic origin."
            },
            {
                diagnosis: "Peripheral vascular disease",
                correct: false,
                feedback: "Incorrect. Symptoms are neuropathic, not ischemic."
            }
        ])
    },
    {
        name: "Jocelyn Frost",
        age: 43,
        sex: "Female",
        symptoms: ["Intermittent psychosis", "Autonomic instability", "Profuse sweating", "Fluctuating blood pressure"],
        labs: ["Urinary catecholamines normal", "No structural lesions on imaging", "Genetic panel inconclusive"],
        options: shuffleArray([{
                diagnosis: "Autoimmune encephalitis (anti-LGI1)",
                correct: true,
                feedback: "Correct! Rare autoimmune disorder with subtle neuropsychiatric and autonomic symptoms."
            },
            {
                diagnosis: "Schizophrenia",
                correct: false,
                feedback: "Incorrect. Onset and episodic autonomic features suggest organic cause."
            },
            {
                diagnosis: "Pheochromocytoma",
                correct: false,
                feedback: "Incorrect. Catecholamines normal."
            }
        ])
    }
];




// State variables
let currentPatient = 0;
let score = 0;

// DOM elements
const patientName = document.getElementById('patient-name');
const patientDetails = document.getElementById('patient-details');
const patientSymptoms = document.getElementById('patient-symptoms');
const patientLabs = document.getElementById('patient-labs');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const scoreboard = document.getElementById('score');
const nextBtn = document.getElementById('next-patient');

// Load a patient
function loadPatient() {
    const patient = patients[currentPatient];

    // Clear previous
    feedback.textContent = '';
    optionsContainer.innerHTML = '';
    nextBtn.style.display = 'none';

    // Display patient info
    patientName.textContent = patient.name;
    patientDetails.textContent = `${patient.sex}, ${patient.age} years old`;

    patientSymptoms.innerHTML = '';
    patient.symptoms.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `Symptom: ${s}`;
        patientSymptoms.appendChild(li);
    });

    patientLabs.innerHTML = '';
    patient.labs.forEach(l => {
        const li = document.createElement('li');
        li.textContent = `Lab: ${l}`;
        patientLabs.appendChild(li);
    });

    // Display options
    patient.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = opt.diagnosis;
        btn.addEventListener('click', () => selectOption(opt));
        optionsContainer.appendChild(btn);
    });
}

// Handle option selection
function selectOption(option) {
    feedback.textContent = option.feedback;
    if (option.correct) {
        score += 1;
        scoreboard.textContent = score;
    }
    nextBtn.style.display = 'inline-block';
}

// Handle next patient
nextBtn.addEventListener('click', () => {
    currentPatient++;
    if (currentPatient >= patients.length) {
        alert(`Simulation complete! Final score: ${score} / ${patients.length}`);
        currentPatient = 0;
        score = 0;
        scoreboard.textContent = score;
    }
    loadPatient();
});

// Initialize game
loadPatient();



// ready
document.addEventListener('DOMContentLoaded', () => {
    // small micro-interaction: animate the mark
    document.querySelector('.mark').classList.add('float');
});

const canvas = document.getElementById('ecgCanvas');
const ctx = canvas.getContext('2d');

let width; // Will be set dynamically
let height; // Will be set dynamically

let x = 0;
let points = [];
let ecgSpeed = 2;
let heartbeatMultiplier = 1;

// --- 1. NEW: Resize Observer and Function ---
function resizeCanvas() {
    // Get the actual computed size from CSS
    const rect = canvas.getBoundingClientRect();

    // Set the internal drawing surface dimensions
    canvas.width = rect.width;
    canvas.height = rect.height;

    width = canvas.width;
    height = canvas.height;
}

// Attach event listeners for responsiveness
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Run once on load to initialize dimensions

// --- 2. Existing ECG Drawing Logic (Updated to use dynamic dimensions) ---

// Function to simulate ECG point
function generateECGPoint(pos) {
    // Adjust logic to use dynamic 'height'
    const t = pos / 20;
    let value = 0;

    // Use a smaller multiplier as the height might be smaller than the fixed 100
    const amplitude = height / 5;

    if ((t % 6) < 1) value = Math.sin(t * Math.PI * 2) * amplitude * 0.2; // P wave
    else if ((t % 6) < 1.5) value = amplitude * Math.sin((t - 1) * Math.PI * 6) * heartbeatMultiplier; // QRS spike
    else if ((t % 6) < 2) value = -amplitude * 0.5 * Math.sin((t - 1.5) * Math.PI * 2) * heartbeatMultiplier; // S dip
    else value = 0;

    return height / 2 - value;
}

// Function to trigger heartbeat spike
function spikeHeartbeat(intensity = 2, duration = 200) {
    heartbeatMultiplier = intensity;
    setTimeout(() => heartbeatMultiplier = 1, duration);
}

// Draw ECG frame
function drawECG() {
    // Clear the drawing context (essential for animation)
    ctx.clearRect(0, 0, width, height);

    // Maintain the point array size relative to the current width
    if (points.length > width) points.shift();

    points.push(generateECGPoint(x));

    ctx.beginPath();
    ctx.strokeStyle = "#00fffc";
    ctx.lineWidth = 2;

    // Draw the entire line
    ctx.moveTo(0, points[0]);
    for (let i = 1; i < points.length; i++) {
        // Draw the line from left-to-right
        ctx.lineTo(i, points[i]);
    }
    ctx.stroke();

    x += ecgSpeed;
    // Reset x and points array if it gets too large (performance check)
    if (x > 10000) {
        x = 0;
        points = [];
    }

    requestAnimationFrame(drawECG);
}

// Start the drawing loop
drawECG();

// Set up the heartbeat spike interval
setInterval(() => {
    spikeHeartbeat(2.5, 150);
}, 1500);

// ==============================
// Responsive Navbar Toggle
// ==============================

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
const navLinks = mainNav.querySelectorAll('a');

function toggleNav() {
    const isVisible = mainNav.getAttribute('data-visible') === 'true';

    // Toggle the attributes
    mainNav.setAttribute('data-visible', !isVisible);
    navToggle.setAttribute('aria-expanded', !isVisible);
}

// 1. Listen for button click
navToggle.addEventListener('click', toggleNav);

// 2. Listen for link clicks to close the menu (best practice for mobile UX)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Only close if it's currently open (i.e., on mobile)
        if (mainNav.getAttribute('data-visible') === 'true') {
            toggleNav();
        }
    });
});
