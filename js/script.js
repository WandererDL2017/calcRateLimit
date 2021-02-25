window.onload = function(){
    let calcButton = document.querySelector(".calc_button");
    let checkMaskSubmit = document.querySelector(".check_mask__submit")
    let calcResult = document.querySelector(".calc_result");
    let masks = {"0":"000.000.000.000", "1":"128.000.000.000", "2":"192.000.000.000", "3":"224.000.000.000", "4": "240.000.000.000",
                 "5": "248.000.000.000", "6":"252.000.000.000", "7":"254.000.000.000", "8":"255.000.000.000", "9":"255.128.000.000", 
                 "10":"255.192.000.000", "11":"255.224.000.000", "12":"255.240.000.000", "13":"255.248.000.000","14":"255.252.000.000",
                 "15":"255.254.000.000", "16":"255.255.000.000", "17":"255.255.128.000", "18":"255.255.192.000", "19":"255.255.224.000", 
                 "20":"255.255.240.000", "21":"255.255.248.000", "22":"255.255.252.000", "23":"255.255.254.000", "24":"255.255.255.000", 
                 "25":"255.255.255.128", "26":"255.255.255.192", "27":"255.255.255.224", "28":"255.255.255.240", 
                 "29":"255.255.255.248", "30":"255.255.255.252", "31":"255.255.255.254", "32":"255.255.255.255"}
    
    calcButton.onclick = function(evt){
        evt.preventDefault();
        let limitBps = document.getElementById("limitBps").value;
        let mode = document.getElementById("mode").value;
        let accessGroup = document.getElementById("accessGroup").value;
        let nbc = Math.round(Number(limitBps)/8*1.5);
        let ebc = Math.round(2*Number(nbc));
        let end = ' conform-action transmit exceed-action drop'
        calcResult.innerHTML = "rate-limit " + mode + ' access-group ' + accessGroup + ' ' + limitBps + ' ' + nbc + ' ' + ebc + end;
    }

    checkMaskSubmit.addEventListener('click', function(event){
        event.preventDefault();
        let checkMaskInput = document.querySelector('.check_mask__input').value;
        let straightMaskOutput = document.querySelector('.check_mask__straight');
        let wildMaskOutput = document.querySelector('.check_mask__wild');
        let amountAddresses = document.querySelector('.check_mask__amount-addresses');
        
        if(document.querySelector('.check_mask__input').value == ''){
            alert("Введите значение. Поле не может быть пустым.");
        } else{
            let addresses = masks[checkMaskInput].split('.');
            let wildMask = [];
            let wildOctet;
            let amount = 1;
            for(let octet of addresses){
                wildOctet = 256 - (Number(octet) + 1);           
                wildMask.push(wildOctet);   
                amount *= (wildOctet + 1);
            }

            wildMaskOutput.innerHTML = "Обратная маска: " + wildMask.join('.');
            straightMaskOutput.innerHTML = "Прямая маска: " + masks[checkMaskInput];
            amountAddresses.innerHTML = "Количество адресов: " + amount;
        }
        
    })
}
