const commands = document.querySelectorAll('.command-btn');
const floors = document.querySelectorAll(".floor");
const FLOORS_LENGTH = floors.length;
const ELEVATOR_SPEED = 650;

for (let i=0; i<commands.length; i++) {
    commands[i].addEventListener('click', function(e) {
        e.preventDefault();

        // Current position of the elevator 
        const elevator = document.querySelector('.floor.elevator');
        let elevatorPosition = parseInt(elevator.id);
        // The button we pressed, i.e. the destination we want to go to 
        const destination = this;
        let destPosition = parseInt(destination.value);

        // tPosition: temporary position, initialized by the position of the elevator and
        // change value at each increment 
        let tPosition = elevatorPosition;

        // interval id (JS)
        let move = null;

        // We do nothing if we press the button whose elevator is currently there
        if(elevatorPosition === destPosition ) {
            return false;
        }

        if (elevatorPosition < destPosition) {
            // setInterval : serve the loop
            move = setInterval(() => moveElevator("up", destPosition), ELEVATOR_SPEED);
        } else {
            move = setInterval(() => moveElevator("down", destPosition), ELEVATOR_SPEED);
        }

        /*  To be able to go up and down, we must:
               - Remove the "elevator" class from the current position and
               add it to the next one.
               - Same for the "active" class of button (command)
            The only difference between going up and down is the direction of destination
            represented by the sign "+" and (-)
         */
       let upElevator = (position, elevator, commandSelected) => {
            elevator.classList.remove("elevator");
            for (let i = 0; i < FLOORS_LENGTH; i++) {
                if(parseInt(floors[i].id) === position) {
                    floors[i-1].classList.add("elevator");
                }
            }
            commandSelected.classList.remove("active");
            for (let i = 0; i < FLOORS_LENGTH; i++) {
                if(parseInt(commands[i].value) === position) {
                    commands[i+1].classList.add("active");
                }
            }
        }
        let downElevator = (position, elevator, commandSelected) => {
            elevator.classList.remove("elevator");
            for (let i = 0; i < FLOORS_LENGTH; i++) {
                if(parseInt(floors[i].id) === position) {
                    floors[i+1].classList.add("elevator");
                }
            }
            commandSelected.classList.remove("active");
            for (let i = 0; i < FLOORS_LENGTH; i++) {
                if(parseInt(commands[i].value) === position) {
                    commands[i-1].classList.add("active");
                }
            }
        }
        let moveElevator = (direction, dest) => {
            let tElevator = document.querySelector('.floor.elevator');
            let tCommandSelected = document.querySelector('.command-btn.active');
            if (tPosition == dest){
                clearInterval(move);
                return
            }
            if (direction === 'up') {
                upElevator(tPosition, tElevator, tCommandSelected);
                tPosition++;
            } else {
                downElevator(tPosition, tElevator, tCommandSelected);
                tPosition--;
            }
        }
    });
}