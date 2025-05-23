const inputFieldEle = document.getElementById("text-input");
const checkBtnEle = document.getElementById("check-btn");
const inputTextResultEle = document.getElementById("text");
const isPalindromeEle = document.getElementById("isPalindrome");


checkBtnEle.addEventListener("click", () => {
    const formattedInput = inputFieldEle.value.match(/[a-zA-Z0-9]+/g);
    if (inputFieldEle.value.trim() == "" || formattedInput == null) {
        alert("Please input a value");
    } else {
        const input = formattedInput.join("").toLowerCase()
        const reverseInput = formattedInput.join("").split("").reverse().join("").toLowerCase();
        if (input == reverseInput) {
            inputTextResultEle.textContent = inputFieldEle.value;
            isPalindromeEle.textContent = "is a palindrome";
        } else {
            inputTextResultEle.textContent = inputFieldEle.value;
            isPalindromeEle.textContent = "is not a palindrome";
        }
        inputFieldEle.value = "";
    }
})