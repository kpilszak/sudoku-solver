const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const explainerDisplay = document.querySelector('#explainer')
const squares = 81
let submission = []

for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', '0')
    inputElement.setAttribute('max', '9')
    puzzleBoard.appendChild(inputElement)
}


const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('.')
        }
    })
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i]
        })
        explainerDisplay.innerHTML = 'This is the answer'
    } else {
        explainerDisplay.innerHTML = 'This is not solvable'
    }
}

const solve = () => {
    joinValues()
    const data = { numbers: submission.join('') }
    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    })  .then(response => response.json())
        .then(data => {
            console.log('Success:', data)
            populateValues(data.solvable, data.solution)
            submission = []
        })
        .catch((error) => {
            console.log('Error:', error)
        })
}

solveButton.addEventListener('click', solve)