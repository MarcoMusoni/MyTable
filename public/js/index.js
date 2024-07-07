function handleFailedLogin(body) {
    console.log('>>> ' + body.error);
}

document.getElementById('loginBtn').addEventListener('click', (event) => {
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
    })
        .then(res => {
            console.log(res);
            if (res.status !== 200) {
                console.log('>>> not 200');
                res.json().then(body =>
                    handleFailedLogin(body)
                );
            }
        })
        .catch(err => console.log(err));
});