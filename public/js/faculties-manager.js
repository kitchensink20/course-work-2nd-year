class FacultiesManager {
    
   //---------concructor-------------------------------

    constructor(faculties){
        this.faculties = faculties;
        this.faculties.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }

    //--------methods-----------------------------------

    displayFacultiesInTable(){
        let temp = document.getElementsByTagName('template')[0];
        document.querySelector('#mainSection').append(temp.content.cloneNode(true));

        document.querySelector('#tableTitle').innerText = "Список факультетів";
        document.querySelector('#addBtn').innerText = "Додати новий факультет";
       
        for(let i = 0; i < this.faculties.length; i++){
            
            if(i == 0){
                let firstRow = document.querySelector('#headerRow');
                
                let nameTh = document.createElement('th');
                nameTh.innerText = 'Назва факультету';
                firstRow.append(nameTh);
                nameTh.classList.add('pe-5');

                let headOfSelectionComitteeNameTh = document.createElement('th');
                headOfSelectionComitteeNameTh.innerText = 'Голова приймальної комісії';
                firstRow.append(headOfSelectionComitteeNameTh);
                headOfSelectionComitteeNameTh.classList.add('pe-5');
            }

            let row = document.createElement('tr');

            let nameTd = document.createElement('td');
            nameTd.innerText = this.faculties[i].name;
            row.appendChild(nameTd);

            let headOfSelectionComitteeNameTd = document.createElement('td');
            headOfSelectionComitteeNameTd.innerText = this.faculties[i].head_of_selection_comittee_name;
            row.appendChild(headOfSelectionComitteeNameTd);

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
            deleteBtn.addEventListener("click", () => {
                this.#deleteFaculty(i);
            });
            row.appendChild(deleteBtnTd);

            document.querySelector('#tableBody').append(row);
         }
    }

    #deleteFaculty(index){
        let deleteConfirm = confirm('Ви впевнені, що хочете видалити факультут ' + this.faculties[index].name + "?");
        if(!deleteConfirm)
            return;

        let xhr = new XMLHttpRequest();

        xhr.open("DELETE", window.location.pathname + '/' + this.faculties[index]._id, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(this.faculties[index]));
    }
}