//element var
var siteNameInput = document.getElementById("siteNameInput")
var siteUrlInput = document.getElementById("siteUrlInput")
var nextButton = document.getElementById("nextButton")
var submitButton = document.getElementById("submitButton")
var inputContent = document.getElementById("inputContent")
var siteRows = document.getElementById("siteRows")



//global var

var nameRegex = /^[A-Z][a-z0-9]{3,}$/
var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/


var siteList = JSON.parse(localStorage.getItem("sites")) || []
displayAllSites()
//functions

function validate(regex,element) {
    if(regex.test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        
        return true;
    }else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        
        return false;

    }
}

function addSiteUrlInput() {
    if(validate(nameRegex,siteNameInput)) {
        inputContent.classList.remove("d-none")
        nextButton.classList.add("d-none")
        submitButton.classList.remove("d-none")
        
    }else {
        Swal.fire({
            icon: "error",
            title: "Invalid Site Name",
            text: "Site name must start with a capital letter and be at least 4 characters long (letters or numbers).",
            footer: ' <strong>Please try again</strong>'
        });
    }
}

function addSite() {
    if(validate(urlRegex,siteUrlInput) ) {
        var siteInfo = {
            name: siteNameInput.value,
            URL: siteUrlInput.value
        }
        if(siteList.length !== 0) {
            for (var i = 0; i < siteList.length; i++) {
                if(!siteList[i].URL.toLowerCase().includes(siteUrlInput.value.toLowerCase()) && !siteList[i].name.toLowerCase().includes(siteNameInput.value.toLowerCase())) {
                    siteList.push(siteInfo)
                    localStorage.setItem("sites",JSON.stringify(siteList))
                    displaySite(siteList.length - 1)
                    Swal.fire({
                        title: "Site added successfully!",
                        icon: "success",
                        draggable: true
                    });
                    clearInputs()
                }
        }
        }else {
            siteList.push(siteInfo)
            localStorage.setItem("sites",JSON.stringify(siteList))

            displaySite(siteList.length - 1)
            Swal.fire({
                title: "Site added successfully!",
                icon: "success",
                draggable: true
            });
            clearInputs()
        }
        
        
    }else {
        Swal.fire({
            icon: "error",
            title: "Invalid Site URL",
            text: "Site URL must start with http:// or https:// and contain a valid domain name (e.g. https://test.com).",
            footer: '<strong>Please enter a correct URL format</strong>'
        });
    }
    
}

function displaySite(index) {
    var tableRow = `<tr>
                    <td>${siteList[index].name}</td>
                    <td>
                        <a href="${siteList[index].URL}" class="btn btn-success me-2" role="button" target=_blank>View</a>
                        <button class="btn btn-danger" onclick="deleteSite(${index})">Delete</button>
                    </td>
                    </tr>`
    siteRows.innerHTML += tableRow

}   

function displayAllSites() {
    for (let i = 0; i < siteList.length; i++) {
        displaySite(i)
        
    }
}

function deleteSite(index) {
    siteList.splice(index,1)
    localStorage.setItem("sites",JSON.stringify(siteList))
    siteRows.innerHTML =""
    displayAllSites()
}


function clearInputs() {
    siteNameInput.value = ""
    siteUrlInput.value = ""
    siteNameInput.classList.remove("is-valid")
    siteUrlInput.classList.remove("is-valid")
    removeSiteUrlInput()
}

function removeSiteUrlInput() {
    inputContent.classList.add("d-none")
        nextButton.classList.remove("d-none")
        submitButton.classList.add("d-none")
}