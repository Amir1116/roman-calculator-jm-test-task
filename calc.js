// Решение должно пройти все тесты.
// Калькулятор умеет выполнять операции сложения, вычитания, умножения и деления с двумя числами: a + b, a - b, a * b, a / b. Данные передаются в виде одной строки!
// Калькулятор умеет работать как с арабскими (1,2,3,4,5…), так и с римскими (I,II,III,IV,V…) числами. Оба операнда должны быть либо арабскими, либо римскими.
// Операнды должны лежать в диапазоне от 1 до 10 включительно, без ноля. Ответ может быть больше 10.
// Калькулятор умеет работать только с целыми числами, принимает и возвращает.
// Результат на выходе всегда строка с целым числом. В делении учитываем только целую часть - десятичную отбрасываем, например 2 / 4 = 0,5 - вернём 0.
// Калькулятор умеет работать только с арабскими или римскими цифрами одновременно, при вводе пользователем строки вроде 3 + II калькулятор должен выбросить исключение (ошибку) и прекратить свою работу.
// Поскольку в римской системе счисления нет нуля и отрицательных чисел, то вместо них возвращаем пустую строку. (например I - II = ‘’)
// При вызове калькулятора с неподходящими числами, функция выбрасывает исключение и завершает свою работу.
// При вызове калькулятора со строкой, которая не является математическим примером с одной из арифметических операций, описанных в требовании, приложение выбрасывает исключение и завершает свою работу.






function calculator(str){
    const arrRomanNumeric = ['','I','II','III','IV','V','VI','VII','VIII','IX','X'];
    //==========================spliting string for array of numbers; 
    const numbers = arrOfNums(str); 
    let operand = getOperand(str);        
    //=================checking length === 2
    if(numbers.length!==2){
        throw new Error('не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)')
    }else{              
        //=======================checking both of numbers arabic or roman
        let arabic= checkArabic(numbers);
        let roman = checkRoman(numbers);
        console.log(arabic);
        console.log(roman);
        //========================get results        
        if(arabic){
            const newArr = numbers.map(item => parseInt(item));
            let resArabic = getArabicResult(newArr,operand);           
            return resArabic;            
        }else if(roman){
            if(checkValidrRomeNumbers(numbers,arrRomanNumeric)){
                throw new Error('не удовлетворяет заданию');
            }else{
                const newArrNumber = getArabicArray(numbers, arrRomanNumeric);            
                let resOfRoman = getArabicResult(newArrNumber,operand);          
                let convertedArabic = convertToRoman(resOfRoman);         
                console.log(convertedArabic);  
                return convertedArabic;           
            }
        }else{
            throw new Error('используются одновременно разные системы счисления');
        };      
    };    
};


function arrOfNums(str){
    const separator = /[+,\-,*,/]/g;  
    const outArr = str.split(separator).map(item=>item.trim());
    let emptyString = outArr.some(item=>item=='');
    let wrongNumber = outArr.some(item=>item>10||item<=0);    
    if(emptyString||wrongNumber){
        throw new Error('удовлетворяет заданию - два операнда и один оператор (+, -, /, *)');
    }  
    return outArr;
    
};

function checkValidrRomeNumbers(arr, nums){
    const out = arr.map(item => nums.findIndex(num =>num===item)).some(item => item ===-1);  
    return out;
}

function getOperand(str){
    let operand = str.replace(/[^+,\-,*,/]/g,'').trim();    
    return operand;
};

function checkRoman(arr){
    const out =  arr.map(item => parseInt(item)).every(item => Number.isNaN(item));    
    return out;
};
function checkArabic(arr){
    const out =  arr.map(item => parseInt(item)).every(item => !Number.isNaN(item)); 
     return out;
}

function getArabicArray(arr,nums){
    const outArr = arr.map(item =>nums.findIndex(el => el===item)); 
    return outArr;
}

function getArabicResult(arr, operand){    
    let result = 0;    
    switch(operand){
        case '+':
            result = arr.reduce((acc,item)=> acc + item);
            break;
        case '-':
            result = arr.reduce((acc,item)=>acc - item);
            break;
        case '*':
            result = arr.reduce((acc,item)=>acc * item);
            break;
        case '/':
            result = arr.reduce((acc,item)=>acc / item);
            break;           
    }
    return parseInt(result).toString();
}

function convertToRoman(num){    
        let intNum = parseInt(num);
        if(intNum<1){
            return '';
        }    
        let digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
        "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
        "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman_num = "",
        i = 3;
        while (i--)
        roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
        return Array(+digits.join("") + 1).join("M") + roman_num;       

};


//console.log(calculator('10 + 2')); // вернется строка '12'
// calculate('10 * 10'); // вернется строка '12'
// calculate('1 + 2'); // вернется строка '3'
// calculate('1 * 2'); // вернется строка '3'
// calculate('6 / 2'); // вернется строка '3'
//console.log(calculator('VI / III')); // вернется строка 'II'
// calculate('VII / III'); // вернётся строка II'
// calculate('I + II'); // вернется строка 'III'
// calculate('I * II'); // вернется строка 'III'
// calculate('II * II'); // вернется строка 'III'
// calculate('I - II'); // вернётся строка '' (пустая строка) т.к. в римской системе нет отрицательных чисел
// calculate('I * II');//'II' // вернётся строка '' (пустая строка) т.к. в римской системе нет отрицательных чисел
//calculate('I + 1'); // вернётся исключение (ошибка) throws Error т.к. используются одновременно разные системы счисления
// calculate('I'); // вернётся исключение throws Error т.к. строка не является математической операцией
// calculate('1 + 1 + 1'); // вернётся исключение throws Error т.к. формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)

//calculator('     ');
//calculator('4');
//calculator('+');
//calculator('+1');
//calculator('++1');
//calculator('V');
//calculator('3 % 4');
//alculator('11 + 1');
//calculator('XI + I')
//calculator('1 + V');
calculator('5 / 0');