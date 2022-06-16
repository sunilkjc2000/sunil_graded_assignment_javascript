
// set needed elements
let reset_btn = document.querySelector(".reset_btn");
let char_per_min_group = document.querySelector(".char_per_min");
let wrd_per_min_group = document.querySelector(".wrd_per_min");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_char_per_min");
let wpm_text = document.querySelector(".curr_wrd_per_min");
let sample_text = document.querySelector(".sample_text");
let text_input_area = document.querySelector(".text_input_area");

// Initialize globals
let testTime = 60;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_text = "";
let textNo = 0;
let timer = null;

function startApp() {
 
  resetValues();
  updateSampleText();
 
  // Start new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}
 
// Reset values to initial state
function resetValues() {
  text_input_area.disabled = false;
  text_input_area.value = "";
  sample_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = testTime + 's';
  error_text.textContent = 0;
  char_per_min_group.style.display = "none";
  wrd_per_min_group.style.display = "none";
  testTime = 60;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  textNo = 0;
 
}

function updateTimer() {
  if (testTime > 0) {
    // decrease the current time left
    testTime--;
 
    // increase the time elapsed
    timeElapsed++;
 
    // update the timer text
    timer_text.textContent = testTime + "s";
  }
  else {
    // finish the game
    stop();
  }
}
// Routine to display sample line of text
function updateSampleText() {
  let sample_text_array = [
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "The way to get started is to quit talking and begin doing.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "When you reach the end of your rope, tie a knot in it and hang on. ",
    "Always remember that you are absolutely unique. Just like everyone else.",
    "Life is what happens when you're busy making other plans."
  ];

    // Display every Sample line of text
    sample_text.textContent = null;
    current_text = sample_text_array[textNo];
   
    current_text.split('').forEach(str => {
      const charSpan = document.createElement('span');
      charSpan.innerText = str;
      sample_text.appendChild(charSpan);
    })
   
    // Post display of all quotes, roll to first quote
    if (textNo < sample_text_array.length - 1)
      textNo++;
    else
      textNo = 0;
  }

  // Process input text to compute typing speed and error
  function processInputText() {
 
    // get current input text and split it
    curr_input = text_input_area.value;
    curr_input_array = curr_input.split('');
   
    characterTyped++;
   
    errors = 0;
   
    SampleTexts = sample_text.querySelectorAll('span');
    SampleTexts.forEach((char, index) => {
      let typedChar = curr_input_array[index]
   
      // character not currently typed
      if (typedChar == null) {
        char.classList.remove('correct_char');
        char.classList.remove('incorrect_char');
   
        // correct character
      } else if (typedChar === char.innerText) {
        char.classList.add('correct_char');
        char.classList.remove('incorrect_char');
   
        // incorrect character
      } else {
        char.classList.add('incorrect_char');
        char.classList.remove('correct_char');
   
        // increment number of errors
        errors++;
      }
    });
   
    // display the number of errors
    error_text.textContent = total_errors + errors;
   
    // update accuracy text
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);
   
    // if current text is completely typed
    // irrespective of errors
    if (curr_input.length == current_text.length) {
      updateSampleText();
   
      // update total errors
      total_errors += errors;
   
      // clear the input area
      text_input_area.value = "";
    }
  }

  

  // Perform final speed computations and display
  function stop() {

    // stop the timer, disable input area, display default text
    clearInterval(timer);
    text_input_area.disabled = true;
    sample_text.textContent = "Click on restart to start a new game.";
    
    // calculate character per minute and word per minute
    char_per_min = Math.round(((characterTyped / timeElapsed) * 60));
    wrd_per_min = Math.round((((characterTyped / 5) / timeElapsed) * 60));
    
    // Display character per minute and word per minute
    cpm_text.textContent = char_per_min;
    wpm_text.textContent = wrd_per_min;
    char_per_min_group.style.display = "block";
    wrd_per_min_group.style.display = "block";
    }
    