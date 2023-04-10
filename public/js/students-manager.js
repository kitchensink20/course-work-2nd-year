class StudentsManager {

    //---------concructor-------------------------------

    constructor(students, faculties, dorms, rooms){
        this.students = students;
        this.rooms = rooms;
        this.dorms = dorms;
        this.faculties = faculties;
        this.students.sort((a, b) => (a.full_name > b.full_name) ? 1 : ((b.full_name > a.full_name) ? -1 : 0));
    }

    //--------methods-----------------------------------

    displayStudentsInTable(){
        let temp = document.getElementsByTagName('template')[0];
        document.querySelector('#mainSection').append(temp.content.cloneNode(true));

        document.querySelector('#tableTitle').innerText = "Список студентів, що проживають в гуртожитках";
        document.querySelector('#addBtn').innerText = "Додати нового студента";

        for(let i = 0; i < this.students.length; i++){
            if(i == 0){
                let firstRow = document.querySelector('#headerRow');

                let fullNameTh = document.createElement('th');
                fullNameTh.innerText = 'ПІБ студента';
                firstRow.append(fullNameTh);
                fullNameTh.classList.add('pe-5');

                let benefitTh = document.createElement('th');
                benefitTh.innerText = 'Пільга';
                firstRow.append(benefitTh);
                benefitTh.classList.add('pe-5');

                let genderTh = document.createElement('th');
                genderTh.innerText = 'Стать';
                firstRow.append(genderTh);
                genderTh.classList.add('pe-5');

                let facultyName = document.createElement('th');
                facultyName.innerText = 'Факультет';
                firstRow.append(facultyName);
                facultyName.classList.add('pe-5');

                let dormNumberTh = document.createElement('th');
                dormNumberTh.innerText = 'Номер гуртожитку';
                firstRow.append(dormNumberTh);
                dormNumberTh.classList.add('pe-5');

                let roomNumberTh = document.createElement('th');
                roomNumberTh.innerText = 'Номер кімнати';
                firstRow.append(roomNumberTh);
                roomNumberTh.classList.add('pe-5');
            }

            let row = document.createElement('tr');

            let fullNameTh = document.createElement('td');
            fullNameTh.innerText = this.students[i].full_name;
            row.appendChild(fullNameTh);

            let benefitTd = document.createElement('td');
            if(this.students[i].benefit)
                benefitTd.innerText = '+';
            else
                benefitTd.innerText = '-';
            row.appendChild(benefitTd);

            let genderTd = document.createElement('td');
            if(this.students[i].gender)
                genderTd.innerText = 'Ж';
            else
                genderTd.innerText = 'Ч';
            row.appendChild(genderTd);

            let facultyNameTd = document.createElement('td');
            for(let j = 0; j < this.faculties.length; j++){
                if(this.faculties[j]._id == this.students[i].faculty_id){
                    facultyNameTd.innerText = this.faculties[j].name;
                    break;
                }
            }
            row.appendChild(facultyNameTd);

            let dormNumberTd = document.createElement('td');
            let dorm_id;
            for(let j = 0; j < this.rooms.length; j++){
                if(this.rooms[j]._id == this.students[i].room_id){
                    dorm_id = this.rooms[j].dorm_id;
                    for(let k = 0; k < this.dorms.length; k++){
                        if(this.dorms[k]._id == dorm_id){
                            dormNumberTd.innerText = this.dorms[k].number;
                            break;
                        }
                    }
                    break;
                }
            }
            row.appendChild(dormNumberTd);

            let roomNumberTd = document.createElement('td');
            for(let j = 0; j < this.rooms.length; j++){
                if(this.rooms[j]._id == this.students[i].room_id){
                    roomNumberTd.innerText = this.rooms[j].number;
                }
            }
            row.appendChild(roomNumberTd);

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