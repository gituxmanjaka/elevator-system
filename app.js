const btnCommands = document.querySelectorAll('.command-btn');
const floors = document.querySelectorAll(".floor");
const FOORS_LENGTH = floors.length;

for (let i=0; i<btnCommands.length; i++) {
    btnCommands[i].addEventListener('click', function(e) {
        e.preventDefault();

        /* Pour pouvoir monter et descendre, on doit:
              - Enlever la classe elevator de la position actuelle et
              l'ajouter à celle de suivante.
              - Pareil pour la classe "active" de button (command)
            La seule difference entre monter et descendre, c'est le sens de destination
            représenté par le signe "+" et (-)
        */
        function upElevator(position, elevator, commandSelected){
            elevator.classList.remove("elevator");
            for (let i = 0; i < FOORS_LENGTH; i++) {
                if(parseInt(floors[i].id) === position) {
                    floors[i-1].classList.add("elevator");
                }
            }
            commandSelected.classList.remove("active");
            for (let i = 0; i < FOORS_LENGTH; i++) {
                if(parseInt(btnCommands[i].value) === position) {
                    btnCommands[i+1].classList.add("active");
                }
            }
        }
        function downElevator(position, elevator, commandSelected){
            elevator.classList.remove("elevator");
            for (let i = 0; i < FOORS_LENGTH; i++) {
                if(parseInt(floors[i].id) === position) {
                    floors[i+1].classList.add("elevator");
                }
            }
            commandSelected.classList.remove("active");
            for (let i = 0; i < FOORS_LENGTH; i++) {
                if(parseInt(btnCommands[i].value) === position) {
                    btnCommands[i-1].classList.add("active");
                }
            }
        }

        // Position courante de l'elevator
        const elevator = document.querySelector('.floor.elevator');
        let elevatorPosition = parseInt(elevator.id);
        // Le bouton qu'on a appuyé, c-a-d, la destination où on veut aller
        const destination = this;
        let destPosition = parseInt(destination.value);

        // On ne fait rien si on appui le bouton dont l'ascenseur se situe actuellement
        if(elevatorPosition===destPosition) {
            return false;
        }

        
        if (elevatorPosition<destPosition) { 
            /* On monte quand on est en bas
            L'action doit se repéter jusqu'à la position voulue */
            for (let i=elevatorPosition; i<destPosition; i++) {
                let tElevator = document.querySelector('.floor.elevator');
                let tCommandSelected = document.querySelector('.command-btn.active');
                upElevator(i, tElevator, tCommandSelected);
                alert("pause");
            }
        } else {
            /* On descend quand on est en haut
            L'action doit se repéter jusqu'à la position voulue*/
            for (let i=elevatorPosition; i>destPosition; i--) {
                let tElevator = document.querySelector('.etage.elevator');
                let tCommandSelected = document.querySelector('.command-btn.active')
                downElevator(i, tElevator, tCommandSelected);
                alert("pause");
            }
        }
    });
}