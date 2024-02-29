// Define special characters, numeric characters, lowercase characters, and uppercase characters
const specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Function to get password options
function getPasswordOptions() {
    const length = parseInt(prompt('How many characters would you like your password to contain?'), 10);

    if (Number.isNaN(length)) {
        alert('Password length must be provided as a number');
        return null;
    }

    if (length < 8) {
        alert('Password length must be at least 8 characters');
        return null;
    }

    if (length > 128) {
        alert('Password length must be less than 129 characters');
        return null;
    }

    const hasSpecialCharacters = confirm('Click OK to confirm including special characters.');
    const hasNumericCharacters = confirm('Click OK to confirm including numeric characters.');
    const hasLowerCasedCharacters = confirm('Click OK to confirm including lowercase characters.');
    const hasUpperCasedCharacters = confirm('Click OK to confirm including uppercase characters.');

    if (!hasSpecialCharacters && !hasNumericCharacters && !hasLowerCasedCharacters && !hasUpperCasedCharacters) {
        alert('Must select at least one character type');
        return null;
    }

    return {
        length,
        hasSpecialCharacters,
        hasNumericCharacters,
        hasLowerCasedCharacters,
        hasUpperCasedCharacters,
    };
}

// Function to get a random element from an array
function getRandom(arr) {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
}

// Function to generate password
function generatePassword() {
    const options = getPasswordOptions();
    if (!options) return null;

    const result = [];
    const possibleCharacters = [];
    const guaranteedCharacters = [];

    if (options.hasSpecialCharacters) {
        possibleCharacters.push(...specialCharacters);
        guaranteedCharacters.push(getRandom(specialCharacters));
    }

    if (options.hasNumericCharacters) {
        possibleCharacters.push(...numericCharacters);
        guaranteedCharacters.push(getRandom(numericCharacters));
    }

    if (options.hasLowerCasedCharacters) {
        possibleCharacters.push(...lowerCasedCharacters);
        guaranteedCharacters.push(getRandom(lowerCasedCharacters));
    }

    if (options.hasUpperCasedCharacters) {
        possibleCharacters.push(...upperCasedCharacters);
        guaranteedCharacters.push(getRandom(upperCasedCharacters));
    }

    for (let i = guaranteedCharacters.length; i < options.length; i++) {
        const possibleCharacter = getRandom(possibleCharacters);
        result.push(possibleCharacter);
    }

    for (let i = 0; i < guaranteedCharacters.length; i++) {
        result.splice(getRandom(result.length), 0, guaranteedCharacters[i]);
    }

    return result.join('');
}

// Get the 'Generate' button element
const generateBtn = document.querySelector('#generate');

// Function to write generated password to the DOM
function writePassword() {
    const password = generatePassword();
    const passwordText = document.querySelector('#password');
    passwordText.value = password;
}

// Add event listener to the 'Generate' button
generateBtn.addEventListener('click', writePassword);
