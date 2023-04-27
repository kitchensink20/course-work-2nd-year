class DormsManager {

    //---------concructor-------------------------------

    constructor(dorms, faculties){
        this.faculties = faculties;
        this.dorms = dorms;
        this.dorms.sort((a, b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0));
    }

    //--------methods-----------------------------------

    displayDormsInTable(){
        let temp = document.getElementsByTagName('template')[0];
        document.querySelector('#mainSection').append(temp.content.cloneNode(true));

        document.querySelector('#tableTitle').innerText = "Список гуртожитків";
        let addBtn = document.querySelector('#addBtn');
        addBtn.innerText = "Додати новий гуртожиток";
        addBtn.dataset.bsTarget = "#createDorm";

        for(let i = 0; i < this.faculties.length; i++){
            let option = document.createElement("option");
            option.textContent = this.faculties[i].name;
            option.value = this.faculties[i]._id;
            document.querySelector("#facultyNameForDormInput").appendChild(option);
        }

        for(let i = 0; i < this.dorms.length; i++){
            if(i == 0){
                let firstRow = document.querySelector('#headerRow');

                let numberTh = document.createElement('th');
                numberTh.innerText = 'Номер гуртожитку';
                firstRow.append(numberTh);
                numberTh.classList.add('pe-5');

                let commandantNameTh = document.createElement('th');
                commandantNameTh.innerText = 'Комендант гуртожитку';
                firstRow.append(commandantNameTh);
                commandantNameTh.classList.add('pe-5');

                let facultyNameTh = document.createElement('th');
                facultyNameTh.innerText = 'Факультет';
                firstRow.append(facultyNameTh);
                facultyNameTh.classList.add('pe-5');
            }

            let row = document.createElement('tr');

            let numberTd = document.createElement('td');
            numberTd.innerText = this.dorms[i].number;
            row.appendChild(numberTd);

            let commandantNameTd = document.createElement('td');
            commandantNameTd.innerText = this.dorms[i].dorm_commandant_name;
            row.appendChild(commandantNameTd);

            let facultyNameTd = document.createElement('td');
            for(let j = 0; j < this.faculties.length; j++){
                if(this.faculties[j]._id == this.dorms[i].faculty_id){
                    facultyNameTd.innerText = this.faculties[j].name;
                    break;
                }
            }
            row.appendChild(facultyNameTd);

            let editBtnTd = document.createElement('td');
            let editBtn = document.createElement('img');
            editBtn.src = "./images/edit-btn.png";
            editBtn.classList.add('edit-btn');
            editBtnTd.appendChild(editBtn);
            row.appendChild(editBtnTd);
            editBtn.dataset.bsToggle = "modal";
            editBtn.dataset.bsTarget = "#editDorm";
            editBtn.addEventListener('click', () => {
                document.querySelector("#dormNumberEditInput").value = this.dorms[i].number;
                document.querySelector("#dormCommandantNameEditInput").value = this.dorms[i].dorm_commandant_name; 
                for(let j = 0; j < this.faculties.length; j++){
                    let option = document.createElement("option");
                    option.textContent = this.faculties[j].name;
                    option.value = this.faculties[j]._id;
                    document.querySelector("#facultyNameForDormEditInput").appendChild(option);
                    if(this.faculties[j]._id == this.dorms[i].faculty_id)
                        document.querySelector("#facultyNameForDormEditInput").selectedIndex = j;
                }
            });
           
            let deleteBtnTd = document.createElement('td');
            let deleteBtn = document.createElement('btn-close');
            deleteBtn.classList.add('btn-close');
            deleteBtnTd.appendChild(deleteBtn);
            deleteBtn.addEventListener("click", () => {
                this.#deleteDorm(i);
            });
            row.appendChild(deleteBtnTd);

            document.querySelector('#tableBody').append(row);
         }
    }

    #deleteDorm(index){
        let deleteConfirm = confirm('Ви впевнені, що хочете видалити гуртожиток №' + this.dorms[index].number + " з бази даних?");
        if(!deleteConfirm)
            return;

        let xhr = new XMLHttpRequest();

        xhr.open("DELETE", window.location.pathname + '/' + this.dorms[index]._id, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(this.dorms[index]));
        alert("Оновіть сторінку, щоб побачити зміни.");
    }
}