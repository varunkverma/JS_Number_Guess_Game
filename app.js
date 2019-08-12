/*
GAME FUNCTION:
 - Player must guessa number between a min and max
 - Player gets a certain amount of guesses
 - Notify player of guesses remaining
 - Let player choose to play again
*/

// Game values

let min=1,
    max=10,
    winningNum=getRandomNumber(min,max),
    guessesLeft=3;

//UI variables

const game=document.querySelector('#game');
const minNum=document.querySelector('.min-num');
const maxNum=document.querySelector('.max-num');
const guessInput=document.querySelector('#guess-input');
const guessBtn=document.querySelector('#guess-btn');
const message=document.querySelector('.message');

//Assign min and max to UI element

minNum.textContent=min;
maxNum.textContent=max;

//Adding an event listener to the parent of submit/play again button i.e. game, because of event delegation

game.addEventListener('mousedown',function(e)
{
    // The mousedown event occurs when the left mouse button is pressed down over the selected element. 
    if(e.target.className === 'play-again')
    {
        window.location.reload();
    }
});

//Adding event listener to submit button

guessBtn.addEventListener('click',function(){
    let guess=parseInt(guessInput.value);
    
    if(isNaN(guess)  || guess<min || guess>max){
        setMessage(`Please guess a number between ${min} and ${max}`,'red');
    }

    //If Guess is correct
    if(guess == winningNum)
    {
        //Game over - WON

        gameOver(true,`${guess} is the correct number, You've Won !!!`);
    }
    else{
        // Wrong Number
        guessesLeft -= 1;
        console.log('guesses left:',guessesLeft);
        if(guessesLeft === 0)
        {
            //Game Over - LOST

            gameOver(false,`${guess} is the wrong number, GAME OVER !!!, Correct Number was ${winningNum}`);
        }
        else{
            // Game continues

            // Make border orange
            guessInput.style.borderColor='orange';

            //Clear the input field
            guessInput.value='';

            // setMessage that guess is wrong and show guesses left
            setMessage(`${guess} is the wrong guess, ${guessesLeft} guess left`,'orange');
        }
    }
});


//setMessage function

function setMessage(msg,color){
    message.style.color=color;
    message.textContent=msg;    
}


//gameOver function

function gameOver(won,msg)
{
    let color;

    // set color accordingly
    won ===true ? color='green' : color='red';

    // Disable the input field
    guessInput.disabled=true;

    // Make borders Red
    guessInput.style.borderColor=color;

    // setMessage to the color recieved as a parameter and color decided on the basis of won paramenter
    setMessage(msg,color);

    //changing the value of submit button to play again?
    guessBtn.value='Play Again?'
    guessBtn.classList.add('play-again');
    // Since, this class was added after the page loads, we need to add eventListner to it's parent i.e., we need to use event delegation.
}

// Get random Number

function getRandomNumber(min,max)
{
    num=Math.floor(Math.random()*(max-min+1) + min);
    return num;
}