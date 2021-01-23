const btnCommands = document.querySelectorAll('.command-btn');
const LENGTH_BTN_COMMANDS = btnCommands.length;
const etages = document.querySelectorAll(".etage");
const LENGTH_ETAGE = etages.length;

for (let i=0; i<btnCommands.length; i++) {
    btnCommands[i].addEventListener('click', function(e) {
        e.preventDefault();

        const currentEtage = document.querySelector('.etage.elevator');
        let currentEtagePosition = parseInt(currentEtage.id);
        const destination = this;
        const activeBtn = document.querySelector('.command-btn.active');
        let activePosition = parseInt(activeBtn.value);

        function upElevator(positionEtage, positionBtn){
            currentEtage.classList.remove("elevator");
            for (let i = 0; i < LENGTH_ETAGE; i++) {
                if(parseInt(etages[i].id) === positionEtage) {
                    etages[i-1].classList.add("elevator");
                }
            }
            activeBtn.classList.remove("active");
            for (let i = 0; i < LENGTH_ETAGE; i++) {
                if(parseInt(btnCommands[i].value) === positionBtn) {
                    destination.classList.add("active");
                }
            }
        }
        function downElevator(positionEtage, positionBtn){
            currentEtage.classList.remove("elevator");
            for (let i = 0; i < LENGTH_ETAGE; i++) {
                if(parseInt(etages[i].id) === positionEtage) {
                    etages[i+1].classList.add("elevator");
                }
            }
            activeBtn.classList.remove("active");
            for (let i = 0; i < LENGTH_ETAGE; i++) {
                if(parseInt(btnCommands[i].value) === positionBtn) {
                    destination.classList.add("active");
                }
            }
        }

        if(eval("currentEtage.id === destination.value")) {
            return false;
        }

        if (eval("currentEtage.id < destination.value")) {
            upElevator(currentEtagePosition, activePosition);
        } else {
            downElevator(currentEtagePosition, activePosition);
        }
    });
}