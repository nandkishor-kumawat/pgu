function $(id) {
    return document.getElementById(id);
}

function generate() {
    var lowercase = "abcdefghjkmnpqrstuvwxyz",
        uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ",
        numbers = "23456789",
        punctuation = $("CustomizeSymbols").value,

        lowercaseInput = $("Lowercase"),
        uppercaseInput = $("Uppercase"),
        punctuationInput = $("Symbols"),
        AllUniqueC = $("AllUniqueC"),
        Nosimilar = $("Nosimilar"),
        BeginWithC = $("BeginWithC"),
        numbersInput = $("Numbers"),

        passwordFeild = $("final_pass"),
        plength = $('pgLength').value,
        userPassword = "",
        passwordCharSet = "";

    if (!Nosimilar.checked) {
        lowercase += "ilo";
        uppercase += "IO";
        numbers += "01";
    }

    if (lowercaseInput.checked) passwordCharSet += lowercase;
    if (uppercaseInput.checked) passwordCharSet += uppercase;
    if (punctuationInput.checked) passwordCharSet += punctuation;
    if (numbersInput.checked) passwordCharSet += numbers;

    if (BeginWithC.checked) {
        var letters = "";
        plength = plength - 1;
        if (lowercaseInput.checked) letters += lowercase;
        if (uppercaseInput.checked) letters += uppercase;
        userPassword = letters ? letters.charAt(Math.floor(Math.random() * letters.length)) : 'No Lowercase or Uppercase letters selected';
    }

    if (AllUniqueC.checked) {
        if (!letters) userPassword = "";
        if (BeginWithC.checked) plength = plength + 1;
        if (plength <= passwordCharSet.length) {
            for (let i = 0; i < passwordCharSet.length; i++) userPassword += passwordCharSet.charAt(Math.floor(Math.random() * passwordCharSet.length));

            userPassword = [...new Set(userPassword.split(""))].join("");
            userPassword = userPassword.substr(0, plength);
            passwordFeild.innerHTML = BeginWithC.checked && !lowercaseInput.checked && !uppercaseInput.checked ? 'No Lowercase or Uppercase letters selected' : userPassword;

        } else {
            passwordFeild.innerHTML = !lowercaseInput.checked && !uppercaseInput.checked && !numbersInput.checked && !punctuationInput.checked ? "You must select at least one character set!" : "no enough charactors";
        }
    } else {
        for (let i = 0; i < plength; i++) userPassword += passwordCharSet.charAt(Math.floor(Math.random() * passwordCharSet.length));
        passwordFeild.innerHTML = userPassword ? userPassword : "You must select at least one character set!";
        if (BeginWithC.checked && !lowercaseInput.checked && !uppercaseInput.checked) passwordFeild.innerHTML = 'No Lowercase or Uppercase letters selected';
    }

    if (passwordFeild.textContent.match(/ /)) {
        document.querySelector('.result__info.right').style.opacity = '0';
        document.querySelector('.result__info.right').style.bottom = '4px';
        passwordFeild.removeAttribute('onclick', 'copy(this)');
    } else {
        document.querySelector('.result__info.right').style.opacity = '1';
        document.querySelector('.result__info.right').style.bottom = '35px';
        passwordFeild.setAttribute('onclick', 'copy(this)');
    }
}

function copy(that) {
    var inp = document.createElement('input');
    document.body.appendChild(inp)
    inp.value = that.textContent
    inp.select();
    document.execCommand('copy');
    document.querySelector('.result__info.left').classList.add('success');
    setTimeout(function () {
        document.querySelector('.result__info.left').classList.remove('success');
    }, 2000);
    inp.remove();
}