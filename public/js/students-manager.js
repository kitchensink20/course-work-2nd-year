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
        let addBtn = document.querySelector('#addBtn');
        addBtn.innerText = "Додати нового студента";
        addBtn.dataset.bsTarget = "#createStudent";

        const genderSelectElement = document.querySelector("#studentGenderInput");
        const facultySelectElement = document.querySelector("#facultyNameForStudentInput");
        const dormSelectElement = document.querySelector("#dormNumberForStudentInput");
        const roomSelectElement = document.querySelector("#roomNumberForStudentInput");
        let choosenGender;
        genderSelectElement.addEventListener("change", (e) => {
            if(e.target.value == 'true')
                choosenGender = true;
            else
                choosenGender = false;
            roomSelectElement.disabled = false;
        });
        for(let i = 0; i < this.faculties.length; i++){
            let option = document.createElement("option");
            option.value = this.faculties[i]._id;
            option.textContent = this.faculties[i].name;
            facultySelectElement.appendChild(option);   
        }
        facultySelectElement.addEventListener("change", (e) => {
            dormSelectElement.innerHTML = "";
            for(let i = 0; i < this.dorms.length; i++){
                if(e.target.value == this.dorms[i].faculty_id){
                    let option = document.createElement("option");
                    option.value = this.dorms[i]._id;
                    option.textContent = this.dorms[i].number;
                    dormSelectElement.appendChild(option);    
                }
            }
        });
        dormSelectElement.addEventListener("change", (e) => { 
            roomSelectElement.innerHTML = "";
            for(let i = 0; i < this.rooms.length; i++) {
                if(e.target.value == this.rooms[i].dorm_id && this.rooms[i].capacity > this.rooms[i].ocuppied && this.rooms[i].gender == choosenGender){
                    let option = document.createElement("option");
                    option.value = this.rooms[i]._id;
                    option.textContent = this.rooms[i].number;
                    roomSelectElement.appendChild(option);
                }
            }
        });

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
            editBtn.dataset.bsToggle = "modal";
            editBtn.dataset.bsTarget = "#editStudent";
            editBtn.addEventListener('click', () => {
                document.querySelector("#studentFullNameEditInput").value = this.students[i].full_name;
                document.querySelector("#studentGenderEditInput").selectedIndex = this.students[i].gender ? 0 : 1;
                document.querySelector("#studentBenefitEditInput").selectedIndex = this.students[i].benefit ? 0 : 1;
                for(let j = 0; j < this.faculties.length; j++){
                    let option = document.createElement("option");
                    option.textContent = this.faculties[j].name;
                    option.value = this.faculties[j]._id;
                    document.querySelector("#facultyNameForStudentEditInput").appendChild(option);
                    if(this.faculties[j]._id == this.students[i].faculty_id)
                        document.querySelector("#facultyNameForStudentEditInput").selectedIndex = j;
                }
                for(let j = 0; j < this.dorms.length; j++){
                    let option = document.createElement("option");
                    option.textContent = this.dorms[j].number;
                    option.value = this.dorms[j]._id;
                    document.querySelector("#dormNumberForStudentEditInput").appendChild(option);
                    if(this.dorms[j]._id == this.students[i].dorm_id)
                        document.querySelector("#dormNumberForStudentEditInput").selectedIndex = j;
                }
                for(let j = 0; j < this.rooms.length; j++){
                    let option = document.createElement("option");
                    option.textContent = this.rooms[j].number;
                    option.value = this.rooms[j]._id;
                    document.querySelector("#roomNumberForStudentEditInput").appendChild(option);
                    if(this.rooms[j]._id == this.students[i].room_id)
                        document.querySelector("#roomNumberForStudentEditInput").selectedIndex = j;
                }
            });

            let deleteBtnTd = document.createElement('td');
            let deleteBtn = document.createElement('btn-close');
            deleteBtn.classList.add('btn-close');
            deleteBtnTd.appendChild(deleteBtn);
            deleteBtn.addEventListener("click", () => {
                this.#deleteStudent(i);
            });
            row.appendChild(deleteBtnTd);

            document.querySelector('#tableBody').append(row);
         }
    }

    #deleteStudent(index){
        let deleteConfirm = confirm('Ви впевнені, що хочете видалити студента ' + this.students[index].name + " з бази даних?");
        if(!deleteConfirm)
            return;

        let xhr = new XMLHttpRequest();

        xhr.open("DELETE", window.location.pathname + '/' + this.students[index]._id, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(this.students[index]));
        alert("Оновіть сторінку, щоб побачити зміни.");
    }
}