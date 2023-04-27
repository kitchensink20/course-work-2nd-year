class RoomsManager {
    //---------concructor-------------------------------

    constructor(dorms, rooms, students){
        this.rooms = rooms;
        this.dorms = dorms;
        this.students = students;
        this.dorms.sort((a, b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
        this.rooms.sort((a, b) => (a.dorm_id > b.dorm_id) ? 1 : ((b.dorm_id > a.dorm_id) ? -1 : 0));
    }

    //--------methods-----------------------------------

    displayRoomsInTable(){
        let temp = document.getElementsByTagName('template')[0];
        document.querySelector('#mainSection').append(temp.content.cloneNode(true));

        document.querySelector('#tableTitle').innerText = "Список кімнат";
        let addBtn = document.querySelector('#addBtn');
        addBtn.innerText = "Додати нову кімнату";
        addBtn.dataset.bsTarget = "#createRoom";

        for(let i = 0; i < this.dorms.length; i++){
            let option = document.createElement("option");
            option.value = this.dorms[i]._id;
            option.textContent = this.dorms[i].number;
            document.querySelector("#dormNumberForRoomInput").appendChild(option);
        }

        for(let i = 0; i < this.rooms.length; i++){
            if(i == 0){
                let firstRow = document.querySelector('#headerRow');

                let dormNumberTh = document.createElement('th');
                dormNumberTh.innerText = 'Номер гуртожитку';
                firstRow.append(dormNumberTh);
                dormNumberTh.classList.add('pe-5');

                let roomNumberTh = document.createElement('th');
                roomNumberTh.innerText = 'Номер кімнати';
                firstRow.append(roomNumberTh);
                roomNumberTh.classList.add('pe-5');

                let capacityTh = document.createElement('th');
                capacityTh.innerText = 'Вмістність';
                firstRow.append(capacityTh);
                capacityTh.classList.add('pe-5');

                let genderTh = document.createElement('th');
                genderTh.innerText = 'Стать';
                firstRow.append(genderTh);
                genderTh.classList.add('pe-5');

                let ocuppiedTh = document.createElement('th');
                ocuppiedTh.innerText = 'Заповненість';
                firstRow.append(ocuppiedTh);
                ocuppiedTh.classList.add('pe-5');
            }

            let row = document.createElement('tr');

            let dormNumberTd = document.createElement('td');
            for(let j = 0; j < this.dorms.length; j++){
                if(this.dorms[j]._id == this.rooms[i].dorm_id){
                    dormNumberTd.innerText = this.dorms[j].number;
                    break;
                }
            }
            row.appendChild(dormNumberTd);

            let roomNumberTh = document.createElement('td');
            roomNumberTh.innerText = this.rooms[i].number;
            row.appendChild(roomNumberTh);

            let capacityTd = document.createElement('td');
            capacityTd.innerText = this.rooms[i].capacity;
            row.appendChild(capacityTd);

            let genderTd = document.createElement('td');
            if(this.rooms[i].gender)
                genderTd.innerText = 'Ж';
            else
                genderTd.innerText = 'Ч';
            row.appendChild(genderTd);

            let ocuppiedTd = document.createElement('td');
            ocuppiedTd.innerText = this.rooms[i].ocuppied;
            row.appendChild(ocuppiedTd);

            let editBtnTd = document.createElement('td');
            let editBtn = document.createElement('img');
            editBtn.src = "./images/edit-btn.png";
            editBtn.classList.add('edit-btn');
            editBtnTd.appendChild(editBtn);
            row.appendChild(editBtnTd);
            editBtn.dataset.bsToggle = "modal";
            editBtn.dataset.bsTarget = "#editRoom";
            editBtn.addEventListener('click', () => {
                for(let j = 0; j < this.dorms.length; j++){
                    let option = document.createElement("option");
                    option.textContent = this.dorms[j].number;
                    option.value = this.dorms[j]._id;
                    document.querySelector("#dormNumberForRoomEditInput").appendChild(option);
                    if(this.dorms[j]._id == this.rooms[i].dorm_id)
                        document.querySelector("#dormNumberForRoomEditInput").selectedIndex = j;
                }
                document.querySelector("#roomNumberEditInput").value = this.rooms[i].number; 
                document.querySelector("#roomCapacityEditInput").value = this.rooms[i].capacity;
                document.querySelector("#roomOcuppacityEditInput").value = this.rooms[i].ocuppied;
                document.querySelector("#roomGenderEditInput").selectedIndex = this.rooms[i].gender ? 1 : 0;
            });

            let deleteBtnTd = document.createElement('td');
            let deleteBtn = document.createElement('btn-close');
            deleteBtn.classList.add('btn-close');
            deleteBtnTd.appendChild(deleteBtn);
            deleteBtn.addEventListener("click", () => {
                this.#deleteRoom(i);
            });
            row.appendChild(deleteBtnTd);

            document.querySelector('#tableBody').append(row);
         }
    }

    #deleteRoom(index){
        let dormNumber;
        for(let j = 0; j < this.dorms.length; j++){
            if(this.dorms[j]._id == this.rooms[index].dorm_id){
                dormNumber = this.dorms[j].number;
                break;
            }
        }
        let deleteConfirm = confirm('Ви впевнені, що хочете видалити кімнату №' + this.rooms[index].number + " гуртожитку №" + dormNumber + " з бази даних?");
        if(!deleteConfirm)
            return;

        let xhr = new XMLHttpRequest();

        xhr.open("DELETE", window.location.pathname + '/' + this.rooms[index]._id, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(this.rooms[index]));
        alert("Оновіть сторінку, щоб побачити зміни.");
    }
}   
