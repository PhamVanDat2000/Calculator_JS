//screen
var historyMath = document.querySelector(".history-math p")
var result = document.querySelector(".showresult h1")
// button
var clear = document.querySelector(".clear")
var change = document.querySelector(".change-sign")
var numberArr = document.querySelectorAll(".number")
var operatorArr = document.querySelectorAll(".operator")
var equal = document.querySelector(".equal")

var binComplete = false // true : du 2 toan tu va 1 toan hang
var op = false // true neu co 1 toan hang
// Clear
function clearAll() {
	historyMath.innerHTML = "";
	result.innerHTML = "";
	binComplete = false
	op = false
}

function clickNumber() {
	if(result.innerHTML ==="" && this.name ==="%") return
	if (this.name === '.' && result.innerHTML.includes('.')) {
		return
	}
	else if (result.innerHTML.slice(-1) === "%" && !op) {
		return
	}
	else if (historyMath.innerHTML.includes('=')) {
		if (this.name === "%") {
		 result.innerHTML += this.name
		}
		else result.innerHTML = this.name
	}
	else if (op) { // nếu có toán tử + - * / %
		if (this.name === "%") return
		result.innerHTML = this.name
		binComplete = true
	}
	else {
		result.innerHTML = result.innerHTML + this.name
	}
	op = false
}
function clickOperator() {
	if(result.innerHTML === "") return
	if (!binComplete) { // nếu biểu thức chưa hoàn tất
		if (op) { // nếu có toán tử thì sửa lại thành toán tử this
			if (this.name === "=") return
			temp = historyMath.innerHTML
			historyMath.innerHTML = temp.substring(0, temp.length - 1) + this.name
		}
		else { // nếu chưa có toán tử thì append vào
			if (this.name === "="){
				if(result.innerHTML.includes("%")){
					var temp = result.innerHTML
					result.innerHTML = temp.substring(0, temp.length-1) /100

				}
				historyMath.innerHTML = result.innerHTML + this.name
			}
			historyMath.innerHTML = result.innerHTML + this.name
			op = true
		}
	}
	else {	// nếu biểu thức hoàn tất
		var res = calculate(historyMath.innerHTML, result.innerHTML)
		if (this.name === "=") {
			historyMath.innerHTML += result.innerHTML + this.name
			result.innerHTML = res;
			op = false
		}
		else {
			result.innerHTML = res;
			historyMath.innerHTML = result.innerHTML + this.name;
			op = true
		}
	}
	binComplete = false
}

function changeSign() {
	temp = result.innerHTML
	if(result.innerHTML === "") return
	if (op) return
	else if (result.innerHTML.includes("%")){
		result.innerHTML = temp.substring(0, temp.length-1) * -1 + "%"
	}
	else {
		result.innerHTML = result.innerHTML * -1
	}
}
function calculate(a, b) {
	var x = parseFloat(a)
	var y = parseFloat(b)
	check = a.slice(-1)
	if (a.slice(-2, -1) == "%") {
		x = parseFloat(a) / 100
	}
	if (b.slice(-1) == "%") {
		y = parseFloat(b) / 100
	}
	switch (check) {
		case "+":
			return x + y
		case "-":
			return x - y
		case "*":
			return x * y
		case "/":
			return x / y
		default:
			return
	}
}

// add event
clear.addEventListener('click', clearAll)
change.addEventListener('click', changeSign)
numberArr.forEach(elem => elem.addEventListener("click", clickNumber))
operatorArr.forEach(elem => elem.addEventListener("click", clickOperator))
operatorArr.forEach(elem => elem.addEventListener("click", clickOperator))