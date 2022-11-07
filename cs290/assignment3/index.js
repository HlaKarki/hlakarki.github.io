/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Hla Htun
 * Email: kshaph@oregonstate.edu
 */

// =====================================================================
// =========================== Global Variables Definition ===============================
var posts = document.getElementById("posts")
var globalState = Array.from(posts.children)
var filterCities = ["corvallis", "albany", "eugene", "portland", "salem", "bend"]

var sellButton = document.getElementById("sell-something-button")
var closeButton = document.getElementById("modal-close")
var cancelButton = document.getElementById("modal-cancel")
var createButton = document.getElementById("modal-accept")
var updateButton = document.getElementById("filter-update-button")

sellButton.addEventListener('click', unhide)
closeButton.addEventListener('click', clear)
cancelButton.addEventListener('click', clear)
createButton.addEventListener('click', create)
updateButton.addEventListener('click', update)

// =====================================================================
// =========================== Functions ===============================
function unhide() {
    document.getElementById("modal-backdrop").classList.toggle("hidden")
    document.getElementById("sell-something-modal").classList.toggle("hidden")
}

function clear() {

    document.getElementById("post-text-input").value = ""
    document.getElementById("post-photo-input").value = ""
    document.getElementById("post-price-input").value = ""
    document.getElementById("post-city-input").value = ""
    document.getElementById("post-condition-new").checked = true

    document.getElementById("modal-backdrop").classList.toggle("hidden")
    document.getElementById("sell-something-modal").classList.toggle("hidden")
}

function create() {

    var postTextInput = document.getElementById("post-text-input").value
    var postImageInput = document.getElementById("post-photo-input").value
    var postPriceInput = document.getElementById("post-price-input").value
    var postCityInput = document.getElementById("post-city-input").value
    postCityInput = postCityInput.replace(postCityInput[0],postCityInput[0].toUpperCase())
    var postConditionInput = document.querySelector("input[name='post-condition']:checked").value
    
    if (!postTextInput || !postImageInput || !postPriceInput || !postCityInput || !postConditionInput) {
        window.alert("You did not enter all the fields")
    }
    else {
        var postClass = document.createElement("div")
        postClass.classList.add("post")
        postClass.dataset.price = postPriceInput
        postClass.dataset.city = postCityInput
        postClass.dataset.condition = postConditionInput
    
        
        // ----------------- post contents -----------------
        var postContents = document.createElement("div")
        postContents.classList.add("post-contents")
        postClass.appendChild(postContents)
    
        // ----------------- post-image-container ----------------
        var postImageContainer = document.createElement("div")
        postImageContainer.classList.add("post-image-container")
        postContents.appendChild(postImageContainer)
    
        // ------------------ image -----------------------
        var image = document.createElement("img")
        image.src = document.getElementById("post-photo-input").value
        postImageContainer.appendChild(image)
    
        // --------------- post info container ---------------
        var postInfoContainer = document.createElement("div")
        postInfoContainer.classList.add("post-info-container")
        postContents.appendChild(postInfoContainer)
        
        // ---------------- post-title, post-price, post-city ----------------
        var postTitle = document.createElement("a")
        postTitle.setAttribute('href', '#')
        postTitle.textContent = document.getElementById("post-text-input").value
        postTitle.classList.add("post-title")
    
        var postPrice = document.createElement("span")
        postPrice.classList.add("post-price")
        postPrice.textContent = ("$" + postPriceInput)
    
        var postCity = document.createElement("span")
        postCity.classList.add("post-city")
        postCity.textContent = "(" + postCityInput + ")"
    
        postInfoContainer.appendChild(postTitle)
        postInfoContainer.appendChild(postPrice)
        postInfoContainer.appendChild(postCity)
    
        var postSection = document.getElementById("posts")
        postSection.appendChild(postClass)
        

        //---------------------------------------------------------------
        globalState.push(posts.lastChild)
        var cityCheck = true
        for (var i = 0; i < filterCities.length; i++) {
            if (filterCities[i].toLowerCase() == postCityInput.toLowerCase()) {
                cityCheck = false
            }
        }
        if (cityCheck) {
            var option = document.createElement('option')
            option.textContent = postCityInput
            document.getElementById("filter-city").appendChild(option)
            filterCities.push(postCityInput)
        }
        
        //-------- clear the fields -------------
        clear()
    }
    

    // https://a.espncdn.com/photo/2022/1031/r1083962_1296x518_5-2.jpg
    // https://placekitten.com/480/480
}

function update() {
    //------------------------variable definitions--------------------------
    var tempArray = []
    var userWords = []
    userWords = document.getElementById("filter-text").value.replace(/[!"#%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '')
    .toLowerCase().split(' ');
    var minPrice = parseInt(document.getElementById("filter-min-price").value.trim())
    var maxPrice = parseInt(document.getElementById("filter-max-price").value.trim())
    var city = document.getElementById("filter-city").value.toLowerCase()
    var conditionArray = []
    var checkbox = document.getElementsByName("filter-condition")
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            conditionArray.push(checkbox[i].value)
        }
    }
    
    removeAll()
    
    if (conditionArray.length!=0) {
        tempArray = Array.from(posts.children)
        removeAll()
        if (tempArray.length == 0) {
            for (var i = 0; i < globalState.length; i++) {
                for (var j = 0; j < conditionArray.length; j++) {
                    if (globalState[i].dataset.condition == conditionArray[j]){
                        posts.appendChild(globalState[i])
                    }
                }
                
            }
        }
        else {
            for (var i = 0; i < tempArray.length; i++) {
                for (var j = 0; j < conditionArray.length; j++) {
                    if (tempArray[i].dataset.condition == conditionArray[j]){
                        posts.appendChild(tempArray[i])
                    }
                }
                
            }
        }
    }    
    if (city) {
        tempArray = Array.from(posts.children)
        removeAll()
        if (tempArray.length == 0) {
            for (var i = 0; i < globalState.length; i++) {
                if (globalState[i].dataset.city.toLowerCase() == city) {
                    posts.appendChild(globalState[i])
                }
            }
        }
        else {
            for (var i = 0; i < tempArray.length; i++) {
                if (tempArray[i].dataset.city.toLowerCase() == city) {
                    posts.appendChild(tempArray[i])
                }
            }
        }
    }

    if (minPrice || maxPrice) {
        tempArray = Array.from(posts.children)
        removeAll()
        if (tempArray.length == 0) {
            for (var i = 0; i < globalState.length; i++) {
                if (minPrice && maxPrice) {
                    if (parseInt(globalState[i].dataset.price) >= minPrice && parseInt(globalState[i].dataset.price) <= maxPrice) {
                        posts.appendChild(globalState[i])
                    }
                }
                if (minPrice && !maxPrice) {
                    if (parseInt(globalState[i].dataset.price) >= minPrice) {
                        posts.appendChild(globalState[i])
                    }
                }
    
                if (!minPrice && maxPrice) {
                    if (parseInt(globalState[i].dataset.price) <= maxPrice) {
                        posts.appendChild(globalState[i])
                    }
                }
            }
        }
        else {
            for (var i = 0; i < tempArray.length; i++) {
                if (minPrice && maxPrice) {
                    if (parseInt(tempArray[i].dataset.price) >= minPrice && parseInt(tempArray[i].dataset.price) <= maxPrice) {
                        posts.appendChild(tempArray[i])
                    }
                }
                if (minPrice && !maxPrice) {
                    if (parseInt(tempArray[i].dataset.price) >= minPrice) {
                        posts.appendChild(tempArray[i])
                    }
                }
    
                if (!minPrice && maxPrice) {
                    if (parseInt(tempArray[i].dataset.price) <= maxPrice) {
                        posts.appendChild(tempArray[i])
                    }
                }
            }
        }
    }

    if (userWords[0]!="") {
        tempArray = Array.from(posts.children)
        removeAll()
        if (tempArray.length == 0) {
            for (var i = 0; i < globalState.length; i++) {
                var temp = globalState[i].textContent.trim().toLowerCase()
                console.log("temp:", temp)
                console.log("userWord:", userWords) 
                for (var uW = 0; uW < userWords.length; uW++) {
                    if (temp.includes(userWords[uW])) {
                        posts.appendChild(globalState[i])
                    }
                }
            }
        }
        else {
            for (var i = 0; i < tempArray.length; i++) {
                var temp = tempArray[i].textContent.trim().toLowerCase() 
                console.log("temp:", temp)
                console.log("userWord:", userWords) 
                for (var uW = 0; uW < userWords.length; uW++) {
                    if (temp.includes(userWords[uW])) {
                        posts.appendChild(tempArray[i])
                    }
                }
            }
        }
    }

    if (userWords[0]=="" && !minPrice && !maxPrice && !city && conditionArray.length==0) {
        for (var i = 0; i < globalState.length; i++) {
            posts.appendChild(globalState[i])
        }
    }
}

function removeAll() {
    while(posts.firstChild) {
        posts.removeChild(posts.firstChild)
    }
}
