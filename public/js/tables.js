function isReserved(elementId, reservations) {
    for (const reservation of reservations) {
        if (elementId === reservation) {
            return true;
        }
    }
    return false;
}

function onDateClicked(event) {
    let dates = document.getElementsByClassName('date');
    for (const dateElement of dates) {
        dateElement.setAttribute('class', 'date');
    }
    this.setAttribute('class', 'date selected');
    document.getElementById('message').style.display = 'none';

    fetch("http://localhost:3000/book?date=" + this.children[1].innerText,
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
            }))
        .catch((err) => console.log(err));
}

document.getElementById('date1').addEventListener('click', onDateClicked);
document.getElementById('date2').addEventListener('click', onDateClicked);
document.getElementById('date3').addEventListener('click', onDateClicked);
document.getElementById('date4').addEventListener('click', onDateClicked);
document.getElementById('date5').addEventListener('click', onDateClicked);