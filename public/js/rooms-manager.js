class RoomsManager {
    //---------concructor-------------------------------

    constructor(dorms, rooms){
        this.rooms = rooms;
        this.dorms = dorms;
        this.rooms.sort((a, b) => (a.dorm_id > b.dorm_id) ? 1 : ((b.dorm_id > a.dorm_id) ? -1 : 0));
    }

    //--------methods-----------------------------------

    displayRoomsInTable(){
        let temp = document.getElementsByTagName('template')[0];
        document.querySelector('#mainSection').append(temp.content.cloneNode(true));

        document.querySelector('#tableTitle').innerText = "Список кімнат";
        document.querySelector('#addBtn').innerText = "Додати нову кімнату";

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

            let editBtnTd = document.createElement('td');
            let editBtn = document.createElement('img');
            editBtn.src = "./images/edit-btn.png";
            editBtn.classList.add('edit-btn');
            editBtnTd.appendChild(editBtn);
            row.appendChild(editBtnTd);

            let deleteBtnTd = document.createElement('td');
            let deleteBtn = document.createElement('btn-close');
            deleteBtn.classList.add('btn-close');
            deleteBtnTd.appendChild(deleteBtn);
            row.appendChild(deleteBtnTd);

            document.querySelector('#tableBody').append(row);
         }
    }

}   
