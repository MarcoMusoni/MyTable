function retrieveFromLocal() {
    let selection = [];
    var item = localStorage.getItem('selectedTables');
    if (item) {
        selection = JSON.parse(item);
    }
    return selection;
}

function storeIntoLocal(selection) {
    localStorage.setItem('selectedTables', JSON.stringify(selection));
}

function isReserved(elementId, reservations) {
    for (const reservation of reservations) {
        if (elementId === reservation) {
            return true;
        }
    }
    return false;
}

function onDateClicked(event) {
    localStorage.clear();

    let dates = document.getElementsByClassName('date');
    for (const dateElement of dates) {
        dateElement.setAttribute('class', 'date');
    }
    this.setAttribute('class', 'date selected');
    document.getElementById('message').style.display = 'none';

    let date = this.children[1].innerText;

    fetch("http://localhost:3000/book?date=" + date,
        { method: 'get' })
        .then(res => res.json()
            .then((reservations) => {
                let tables = document.getElementsByClassName('table');
                for (const tableElement of tables) {
                    if (isReserved(tableElement.id, reservations)) {
                        tableElement.setAttribute('class', 'table occupied');
                    } else {
                        tableElement.setAttribute('class', 'table free');
                    }
                }
                localStorage.setItem('uid', window.location.search.replace('?uid=', ''));
                localStorage.setItem('date', date);
            }))
        .catch((err) => console.log(err));
}

document.getElementById('date1').addEventListener('click', onDateClicked);
document.getElementById('date2').addEventListener('click', onDateClicked);
document.getElementById('date3').addEventListener('click', onDateClicked);
document.getElementById('date4').addEventListener('click', onDateClicked);
document.getElementById('date5').addEventListener('click', onDateClicked);


function onTableClicked(event) {
    const free = this.classList.contains('free');
    const selected = this.classList.contains('selected');

    let selection = retrieveFromLocal();

    if (free) {
        selection.push(this.id);
        this.classList.remove('free');
        this.classList.add('selected');
    } else if (selected) {
        let index = selection.findIndex((element) => element === this.id);
        selection.splice(index, 1);
        this.classList.remove('selected');
        this.classList.add('free');
    }

    storeIntoLocal(selection);
}

document.getElementById('t1').addEventListener('click', onTableClicked);
document.getElementById('t2').addEventListener('click', onTableClicked);
document.getElementById('t3').addEventListener('click', onTableClicked);
document.getElementById('t4').addEventListener('click', onTableClicked);
document.getElementById('t5').addEventListener('click', onTableClicked);
document.getElementById('t6').addEventListener('click', onTableClicked);

function resetView() {
    localStorage.clear();

    let dates = document.getElementsByClassName('date');
    for (const dateElement of dates) {
        dateElement.setAttribute('class', 'date');
    }

    let tables = document.getElementsByClassName('table');
    for (const tableElement of tables) {
        tableElement.setAttribute('class', 'table');
    }

    document.getElementById('message').style.display = 'block';
}

document.getElementById('bookBtn').addEventListener('click', (event) => {
    let selection = retrieveFromLocal();
    if (selection.length > 0) {
        let uid = localStorage.getItem('uid');
        let date = localStorage.getItem('date');
        fetch('http://localhost:3000/book', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: uid,
                date: date,
                selection: selection
            })
        }).then((res) => {
            if (res.status === 201) {
                resetView()
            }
        }).catch((err) => console.log(err));
    }
});