// Create coorresponding constant for each of these elements in html
const quoteContainer =  document.getElementById('quote-container');
const quoteText =  document.getElementById('quote');
const authorText =  document.getElementById('author');
const twitterBtn =  document.getElementById('twitter');
const newQuoteBtn =  document.getElementById('new-quote');
const loader =  document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // To populate the text content of our author, end quote, elements.
    // Check if Author filed is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check the quote length to determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
   // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
// to do this, we're going to use an asynchronous fetch request within a try catch statement
// An asynchronous function can run at any time independently and it won't stop the browser from completing loading the page

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response =  await fetch(apiUrl);
        // this constant will not be populated until it has some data fetched from our API.
        // So that means by default, if we did not do asynchronous and we did not do await, it would try to set this response value before it had a chance to fetch and that would cause an error.
        apiQuotes = await response.json();
        newQuote();
        // global variable - apiQuotes
    } catch (error) {
        // Catch Error Here 
    }
}

// To Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
// run our get quotes function as soon as the page loads
getQuotes();
