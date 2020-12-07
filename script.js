class Calculator {
    constructor(operatiaAnterioareTextElement, operatiaCurentaTextElement) {
        this.operatiaAnterioaraTextElement = operatiaAnterioaraTextElement
        this.operatiaCurentaTextElement = operatiaCurentaTextElement
        this.sterge()
    }

    sterge() {
        this.operatiaCurenta = ''
        this.operatiaAnterioara = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if (this.operatiaCurenta === '.' && this.operatiaCurenta.includes('.')) return
        this.operatiaCurenta = this.operatiaCurenta.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.operatiaCurenta === '') return
        if (this.operatiaAnterioara !== '') {
            this.compute()
        }
        this.operation = operation
        this.operatiaAnterioara = this.operatiaCurenta
        this.operatiaCurenta = ''
    }

    compute() {
        let computation
        const anterioara = parseFloat(this.operatiaAnterioara)
        const curenta = parseFloat(this.operatiaCurenta)
        if (isNaN(anterioara) || isNaN(curenta)) return
        switch (this.operation) {
            case '+':
                computation = anterioara + curenta
                break
            case '-':
                computation = anterioara - curenta
                break
            case 'x':
                computation = anterioara * curenta
                break
            case '÷':
                computation = anterioara / curenta
                break
            default:
                return
        }
        this.operatiaCurenta = computation
        this.operation = undefined
        this.operatiaAnterioara = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.operatiaCurentaTextElement.innerText =
            this.getDisplayNumber(this.operatiaCurenta)
        if (this.operation != null) {
            this.operatiaAnterioaraTextElement.innerText =
                `${this.getDisplayNumber(this.operatiaAnterioara)} ${this.operation}`
        } else {
            this.operatiaAnterioaraTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-egal]')
// const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-sterge]')
const operatiaAnterioaraTextElement = document.querySelector('[data-operatia-anterioara]')
const operatiaCurentaTextElement = document.querySelector('[data-operatia-curenta]')

const calculator = new Calculator(operatiaAnterioaraTextElement, operatiaCurentaTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.sterge()
    calculator.updateDisplay()
})

// deleteButton.addEventListener('click', button => {
//     calculator.delete()
//     calculator.updateDisplay()
// })