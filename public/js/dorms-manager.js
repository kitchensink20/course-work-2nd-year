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
        document.querySelector('#addBtn').innerText = "Додати новий гуртожиток";

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

            let deleteBtnTd = document.createElement('td');
            let deleteBtn = document.createElement('btn-close');
            deleteBtn.classList.add('btn-close');
            deleteBtnTd.appendChild(deleteBtn);
            row.appendChild(deleteBtnTd);

            document.querySelector('#tableBody').append(row);
         }
    }

}