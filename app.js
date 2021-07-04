//screen
var historyMath = document.querySelector(".history-math p")
var result = document.querySelector(".showresult h1")
// buttons selector
var clear = document.querySelector(".clear")
var change = document.querySelector(".change-sign")
var mod = document.querySelector(".mod")
var div = document.querySelector(".div")
var seven = document.querySelector(".seven")
var eight = document.querySelector(".eight")
var nine = document.querySelector(".nine")
var mul = document.querySelector(".mul")
var four = document.querySelector(".four")
var five = document.querySelector(".five")
var six = document.querySelector(".six")
var minus = document.querySelector(".minus")
var one = document.querySelector(".one")
var two = document.querySelector(".two")
var three = document.querySelector(".three")
var add = document.querySelector(".add")
var zero = document.querySelector(".zero")
var dot = document.querySelector(".dot")
var equal = document.querySelector(".equal")

var numberArr = [one, two, three, four, five, six, seven, eight, nine, zero, dot]
var operatorArr = [mod, div, mul, minus, add, equal]

var endChar = "number";

// Clear
function clearAll() {
	historyMath.innerHTML = "";
	result.innerHTML = "";
	endChar = "number";
}
// Change sign
function changeSign() {
	if (historyMath.innerHTML == "" ) {
		result.innerHTML = "Syntax is wrong";
	}
	else {
		result.innerHTML = eval(result.innerHTML) * -1;
	}
}
// Number event
function clickNumber() {
	if (endChar === "equal") {
		historyMath.innerHTML = this.name;
	}
	else {
		historyMath.innerHTML = historyMath.innerHTML + this.name;
	}
	endChar = "number"
}
// Operator event
function clickOperator() {
	console.log(eval(""))
	if (this === equal) {
		if (endChar == "operator" || historyMath.innerHTML=="") {
			result.innerHTML = "Syntax is wrong"
		}
		else if (endChar == "number"){
			result.innerHTML = eval(historyMath.innerHTML);
			historyMath.innerHTML = historyMath.innerHTML + this.name;
		}
		endChar = "equal"
	}
	else if (historyMath.innerHTML == "") {
		historyMath.innerHTML = "0" + this.name;
		endChar = "operator"
	}
	else if (endChar == "number") {
		historyMath.innerHTML = historyMath.innerHTML + this.name;
		endChar = "operator"
	}
	else if (endChar == "operator") {
		len = historyMath.innerHTML.length
		historyMath.innerHTML = historyMath.innerHTML.substring(0, len - 1) + this.name;
		endChar = "operator"
	}
	else if (endChar = "equal") {
		historyMath.innerHTML = result.innerHTML + this.name;
		endChar = "operator"
	}
}
// add event
clear.addEventListener('click', clearAll)
change.addEventListener('click', changeSign)
numberArr.forEach(elem => elem.addEventListener("click", clickNumber))
operatorArr.forEach(elem => elem.addEventListener("click", clickOperator))