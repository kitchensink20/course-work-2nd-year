let roomsManager,
    facultiesManager,
    studentsManager,
    dormsManager;

let facultiesDataURL = 'http://localhost:8080/data/faculties',
    dormsDataURL = 'http://localhost:8080/data/dorms',
    roomsDataURL = 'http://localhost:8080/data/rooms',
    studentsDataURL = 'http://localhost:8080/data/students';

if(window.location.pathname == "/") {
    let temp = document.getElementsByTagName('template')[1];
    document.querySelector('#mainSection').append(temp.content.cloneNode(true));
} else if(window.location.pathname == "/faculties") {
    fetch(facultiesDataURL)
        .then((res) => res.json())
        .then((data) => {
            facultiesManager = new FacultiesManager(data);
            facultiesManager.displayFacultiesInTable();
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
} else if(window.location.pathname == "/dorms") {
    Promise.all([fetch(dormsDataURL), fetch(facultiesDataURL)])
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((data) => {
        dormsManager = new DormsManager(data[0], data[1]);
        dormsManager.displayDormsInTable();
    });
} else if(window.location.pathname == "/rooms") {
    Promise.all([fetch(dormsDataURL), fetch(roomsDataURL), fetch(studentsDataURL)])
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((data) => {
        roomsManager = new RoomsManager(data[0], data[1], data[2]);
        roomsManager.displayRoomsInTable();
    });
} else if(window.location.pathname == "/students") {
    Promise.all([fetch(studentsDataURL), fetch(facultiesDataURL), fetch(dormsDataURL), fetch(roomsDataURL)])
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((data) => {
        studentsManager = new StudentsManager(data[0], data[1], data[2], data[3]);
        studentsManager.displayStudentsInTable();
    });
}