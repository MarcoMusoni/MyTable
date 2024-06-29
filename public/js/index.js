document.getElementById('loginBtn').addEventListener('click', () => {
    var mail = document.getElementById('usrMail').value;
    var psw = document.getElementById('usrPsw').value;

    var user = {
        'usrMail': mail,
        'usrPsw': psw
    }

    fetch('http://localhost:3000/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(() => {
        console.log('posted');
    })
});