//1. Deposit Some Money 
//2. Dtermine number of lines to bet on 
//3. Collect a bet amount 
//4. Spin the Slot Machine
//5. Check if the user Won or Lost
//6. Give the user their winnings
//7. Ask the user if they want to play again

const prompt = require('prompt-sync')();

const Rows = 3;
const Cols = 3;

const symbols_count = { 
    'A': 2,
    'B': 4,
    'C': 6,
    'D': 8,
};

const symbols_values = { 
    'A': 5,
    'B': 4,
    'C': 3,
    'D': 2,
};

const deposit = () =>
{
    while(true)
    {
        const depositAmount = prompt('How much money would you like to deposit? : ');
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log('Please enter a valid deposit amount');
        }
        else{
            return numberDepositAmount;
        }
    }
};

const betLines = () => {
    while(true)
    {
        const Lines = prompt('Enter the number of lines to bet on (1-3): ');
        const numberOfLines = parseFloat(Lines);

        if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3){
            console.log('Please enter valid number of lines ');
        }
        else{
            return numberOfLines;
        }
    }
};

const betAmount = (balance, lines) => {
    while(true)
    {
        const bet = prompt('Enter the total bet: ');
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <=0 || numberBet > balance / lines){
            console.log('Please enter valid number of lines ');
        }
        else{
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for([symbol, count] of Object.entries(symbols_count)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0; i < Cols; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < Rows; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols [randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;   
};

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < Rows; i++){
        rows.push([]);
        for(let j = 0; j < Cols; j++){
            rows[i].push(reels[j][i]);
        }     
    }
    return rows;
};

const printRows = (rows) => {
    for(const row of rows){
        let rowString = '';
        for(const [i, symbol ] of row.entries()){
            rowString += symbol;
            if(i != rows.length - 1){
                rowString += ' | ';
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings  = 0;

    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;
        
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * symbols_values[symbols[0]];
        }
    }

    return winnings;
};

const game = () => {
    
    console.log('Welcome to the Slot Machine!');
    let balance = deposit();

    while(true){
        console.log('You have a balance of $' + balance.toString());
        const numberOfLines = betLines();
        const bet = betAmount(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won $" + winnings.toString());

        if(balance <= 0){
            console.log('You are out of money!');
            break;
        }

        const playAgain = prompt('Would you like to play again? (y/n): ');
        if(playAgain != 'y'){
            break;
        }

    }

};
game();