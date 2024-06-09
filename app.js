let h2Wrd = document.querySelector(".h2Wrd");
let h3Me = document.querySelector(".h3Me");
let h3Ex = document.querySelector(".h3Ex");
let h3Syn = document.querySelector(".h3Syn");
let h3Ant = document.querySelector(".h3Ant");
let meaning = document.querySelector(".meaning");
let examples = document.querySelector(".examples");
let synonyms = document.querySelector(".synonyms");
let antonyms = document.querySelector(".antonyms");
let pPronnctn = document.querySelector(".pronunciation");
let searchBtn = document.querySelector(".searchBtn");
let randbtn = document.querySelector(".randbtn");
let dayWrdBtn = document.querySelector(".dayWrdBtn");
let BkListBtn = document.querySelector(".BkListBtn");
let BkMrkAddBtn = document.querySelector(".BkMrkAddBtn");
let bookmarkedBtn = document.querySelector(".bookmarkedBtn");
let inp = document.querySelector("input");
let exUl = document.querySelector(".exUl");
let antUl = document.querySelector(".antUl");
let synUl = document.querySelector(".synUl");
let BkMrkUl = document.querySelector(".BkMrkUl");
let adjective = document.querySelector(".adjective");
let adverb = document.querySelector(".adverb");
let noun = document.querySelector(".noun");
let verb = document.querySelector(".verb");
let related_terms = document.querySelector(".related_terms");
let h3Rtrm = document.querySelector(".h3Rtrm");
let RtrmUl = document.querySelector(".RtrmUl");
const AudioBtn = document.querySelector('.AudioBtn');

const apiKey = 'YOUR_API_KEY_HERE'
const url = 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
    }
};

const url_2 = 'https://wordsapiv1.p.rapidapi.com/words/';
const options_2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
};

async function getMeaning() {
    try {
        let url2 = url + inp.value;
        meaning.classList.add("Blur");
        h2Wrd.classList.remove("h2Err");
        h2Wrd.innerText = inp.value;
        const response = await fetch(url2, options);
        const result = await response.json();
        inp.value = "";
        adjective.innerHTML = "";
        adverb.innerHTML = "";
        noun.innerHTML = "";
        verb.innerHTML = "";
        if (result.ipa.length > 0) {
            pPronnctn.classList.add("pronunce");
            pPronnctn.innerHTML = `Pronunciation: <b>${result.ipa} </b>`;
        } else {
            pPronnctn.classList.remove("pronunce");
            pPronnctn.innerHTML = "";
        }
        h3Me.innerText = "Meaning";
        if (result.meaning.adjective.length > 0) {
            let parts = result.meaning.adjective.split('(adj)').map(term => term.trim()).slice(1, 6);
            adjective.innerHTML = `<b>Adjective:</b> ${parts.join(', ')}.`;
        }
        if (result.meaning.adverb.length > 0) {
            let parts = result.meaning.adverb.split('(adv)').map(term => term.trim()).slice(1, 6);
            adverb.innerHTML = `<b>Adverb:</b> ${parts.join(', ')}.`;
        }
        if (result.meaning.noun.length > 0) {
            let parts = result.meaning.noun.split('(nou)').map(term => term.trim()).slice(1, 7);
            noun.innerHTML = `<b>Noun:</b> ${parts.join(', ')}.`;
        }
        if (result.meaning.verb.length > 0) {
            let parts = result.meaning.verb.split('(vrb)').map(term => term.trim()).slice(1, 6);
            verb.innerHTML = `<b>Verb:</b> ${parts.join(', ')}.`;
        }
        meaning.classList.remove("Blur");
    } catch (error) {
        h2Wrd.classList.add("h2Err");
        h2Wrd.innerText = `'${h2Wrd.innerText}' meaning couldn't be found!`;
        console.error(error);
    }
}

async function getSynonyms() {
    try {
        let url = 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/?entry=';
        let url2 = url + inp.value;
        synonyms.classList.add("Blur");
        const response = await fetch(url2, options);
        const result = await response.json();
        synUl.innerText = "";
        if (result.assoc_word_ex.length > 0) {
            h3Syn.innerText = "Synonyms";
            for (let ex = 0; ex < 4; ex++) {
                li = document.createElement("li");
                li.innerText = result.assoc_word_ex[ex];
                synUl.appendChild(li);
            }
        } else {
            h3Syn.innerText = "";
        }
        synonyms.classList.remove("Blur");
    } catch (error) {
        console.error(error);
    }
}

async function getAntonyms() {
    try {
        let url = url_2 + inp.value + "/antonyms";
        const response = await fetch(url, options_2);
        const result = await response.json();
        antUl.innerText = "";
        if (result.antonyms.length > 0) {
            h3Ant.innerText = "Antonyms";
            for (let ex = 0; ex < result.antonyms.length; ex++) {
                li = document.createElement("li");
                li.innerText = result.antonyms[ex];
                antUl.appendChild(li);
            }
        } else {
            h3Ant.innerText = "";
        }

    } catch (error) {
        console.error(error);
    }
}

async function getRelated_terms() {
    try {
        let url = 'https://twinword-word-graph-dictionary.p.rapidapi.com/reference/?entry=';
        let url2 = url + inp.value;
        related_terms.classList.add("Blur");
        const response = await fetch(url2, options);
        const result = await response.json();
        RtrmUl.innerText = "";
        if (result.relation.broad_terms.length > 0) {
            h3Rtrm.innerText = "Related terms";
            let parts = result.relation.broad_terms.split(',').map(term => term.trim()).slice(0, 4);
            for (let ex = 0; ex < parts.length; ex++) {
                li = document.createElement("li");
                li.innerText = parts[ex];
                RtrmUl.appendChild(li);
            }
        } else {
            h3Rtrm.innerText = "";
        }
        related_terms.classList.remove("Blur");
    } catch (error) {
        console.error(error);
    }
}

async function getExamples() {
    try {
        let url = 'https://twinword-word-graph-dictionary.p.rapidapi.com/example/?entry=';
        let url2 = url + inp.value;
        examples.classList.add("Blur");
        const response = await fetch(url2, options);
        const result = await response.json();
        exUl.innerText = "";
        if (result.example.length > 0) {
            h3Ex.innerText = "Example sentences";
            for (let ex = 0; ex < 4; ex++) {
                li = document.createElement("li");
                li.innerText = result.example[ex];
                exUl.appendChild(li);
            }
        }
        examples.classList.remove("Blur");
    } catch (error) {
        console.error(error);
    }
}

let BkMrkArr = [];

function BkMrkBtns() {
    if (BkMrkArr.includes(h2Wrd.innerHTML)) {
        BkMrkAddBtn.style.display = "none";
        bookmarkedBtn.style.display = "inline-block";
    } if (!BkMrkArr.includes(h2Wrd.innerHTML)) {
        BkMrkAddBtn.style.display = "inline-block";
        bookmarkedBtn.style.display = "none";
    }
    if (BkMrkArr.length == 0) {
        BkListBtn.disabled = true;
    }
    if (BkMrkArr.length != 0) {
        BkListBtn.disabled = false;
    }
}

function bookmarkIt() {
    let valueToAdd = h2Wrd.innerHTML;
    BkMrkArr.push(valueToAdd);
    BkMrkUl.innerHTML = '';
    for (let ex = 0; ex < BkMrkArr.length; ex++) {
        let li = document.createElement("li");
        li.innerText = BkMrkArr[ex];
        BkMrkUl.appendChild(li);
    }
    BkMrkBtns();
}

function DltBkMrk() {

    let valueToDlt = h2Wrd.innerHTML;
    let index = BkMrkArr.indexOf(valueToDlt);
    if (index !== -1) {
        BkMrkArr.splice(index, 1);
    }
    BkMrkUl.innerHTML = '';
    console.log(BkMrkArr);
    for (let ex = 0; ex < BkMrkArr.length; ex++) {
        let li = document.createElement("li");
        li.innerText = BkMrkArr[ex];
        BkMrkUl.appendChild(li);
    }
    BkMrkBtns();
}


const speechSynthesis = window.speechSynthesis;
AudioBtn.addEventListener('click', () => {
    // Create a new SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance(h2Wrd.innerHTML);
    // Speak the text
    speechSynthesis.speak(utterance);
});

dispResult(getMeaning(),
    getExamples(), getSynonyms(), getAntonyms(), getRelated_terms(), BkMrkBtns());

async function dispResult(event) {
    event.preventDefault();
    getMeaning();
    getRelated_terms()
    getExamples();
    getSynonyms(); getAntonyms()
}

function wordOfTheDay() {
    let word_of_the_day = [
        "Serendipity",
        "Mellifluous",
        "Celestial",
        "Ephemeral",
        "Resplendent",
        "Sonorous",
        "Ebullient",
        "Quixotic",
        "Ineffable",
        "Ethereal"
    ];
    // Function to get or set the word of the day
    function getOrSetWordOfTheDay() {
        const currentDate = getCurrentDate();
        let wordOfTheDay = localStorage.getItem("wordOfTheDay");
        const storedDate = localStorage.getItem("wordOfTheDayDate");
        if (storedDate !== currentDate || !wordOfTheDay) {
            wordOfTheDay = word_of_the_day[Math.floor(Math.random() * word_of_the_day.length)];
            localStorage.setItem("wordOfTheDay", wordOfTheDay);
            localStorage.setItem("wordOfTheDayDate", currentDate);
        }
        return wordOfTheDay;
    }
    // Function to get the current date in YYYY-MM-DD format
    function getCurrentDate() {
        const now = new Date();
        return now.toISOString().slice(0, 10);
    }
    // Get or set the word of the day
    let word = getOrSetWordOfTheDay();
    inp.value = word;
    dispResult(getMeaning(),
        getExamples(), getSynonyms(), getAntonyms(), getRelated_terms(), BkMrkBtns());
};

async function randWords() {

    let randwords = ["Hot", "Happy", "Big", "Up", "Light", "Fast", "Loud", "High", "Open", "Good",
        "Day", "Right", "New", "Inside", "Young", "Brave", "Summer", "Positive", "Victory", "North",
        "Success", "Sunrise", "Large", "Full", "Rich", "Love", "Expand", "Bright", "Heaven", "Safe",
        "Early", "Accept", "True", "Alive", "Healthy", "Begin", "Advance", "Win", "Increase", "Connect",
        "Righteous", "Daytime", "Northward", "Major", "Affirmative", "Ascend", "Joyful", "Open-minded",
        "Succeed", "Improve", "Beautiful", "Slow", "Cold", "Sad", "Small", "Down", "Heavy", "Quiet", "Low", "Closed",
        "Bad", "Night", "Left", "Old", "Outside", "Old", "Fearless", "Winter", "Negative", "Defeat",
        "South", "Failure", "Sunset", "Small", "Empty", "Poor", "Hate", "Shrink", "Dim", "Hell",
        "Dangerous", "Late", "Reject", "False", "Dead", "Unhealthy", "End", "Retreat", "Lose",
        "Decrease", "Disconnect", "Wicked", "Nighttime", "Southward", "Minor", "Negative", "Descend",
        "Sorrowful", "Close-minded", "Fail", "Worsen"];

    randNum = Math.floor(Math.random() * randwords.length);

    let word = randwords[randNum];
    inp.value = word;
    dispResult(getMeaning(),
        getExamples(), getSynonyms(), getAntonyms(), getRelated_terms(), BkMrkBtns());
}

searchBtn.addEventListener("click", dispResult);
randbtn.addEventListener("click", randWords);
dayWrdBtn.addEventListener("click", wordOfTheDay);
BkMrkAddBtn.addEventListener("click", bookmarkIt);
bookmarkedBtn.addEventListener("click", DltBkMrk);
