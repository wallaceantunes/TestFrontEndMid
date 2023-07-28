function ValidateForm() {
    let name = document.forms["formValidate"]["name"].value;
    let email = document.forms["formValidate"]["email"].value;
    let msg = document.forms["formValidate"]["message"].value;
    const validate = {
        name: false,
        email: false,
        msg: false
    }
    if(!name) {
        document.getElementById("nameError").innerHTML = "The name needs to be filled in"
    } else {
        document.getElementById("nameError").innerHTML = ""
        validate.name = true
    }

    if(!email) {
        document.getElementById("emailError").innerHTML = "The e-mail needs to be filled in"
    } else {
        const emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if(!emailIsValid) {
            document.getElementById("emailError").innerHTML = "Enter a valid e-mail address"
        } else {
            document.getElementById("emailError").innerHTML = ""
            validate.email = true
        }
    }

    if(!msg) {
        document.getElementById("messageError").innerHTML = "The message needs to be filled in"
    } else {
        document.getElementById("messageError").innerHTML = ""
        validate.msg = true
    }

    if(validate.name && validate.email && validate.msg) {
        alert('Message sent successfully')
    }
}