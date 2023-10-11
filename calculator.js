//In browser calculator web app
//Initial Functions: Addition, Substraction, Multiplication, Division
//Maximum digits: 9

class Calculator{
    constructor(prevOperandText, currOperandText){
        this.prevOperandText = prevOperandText
        this.currOperandText = currOperandText
        this.clear()
    }

    clear(){
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined

    }

    delete(){
        this.currOperand= ''
    }

    appendNum(number){
        if(number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currOperand === '') return
        if(this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation;
        this.prevOperand = this.currOperand
        this.currOperand = '';
    }
    
    compute(){
        let computation
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                if( current === 0){
                    console.log('Error cannot divide by zero');
                }
                else{
                    computation = prev/current
                }
                break
            default:
                return
        }
        this.currOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }

    updateDisplay(){
        this.currOperandText.innerText = this.currOperand
        if(this.operation != null){
            this.prevOperandText.innerText = `${this.prevOperand} ${this.operation}`
        }
        else{
            this.prevOperandText.innerText = ''
        }
    }



}


const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allClear]')
const prevOperandText = document.querySelector('[previous-operand-data]')
const currOperandText = document.querySelector('[current-operand-data]')

const calculator = new Calculator(prevOperandText, currOperandText)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })

})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()

})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})