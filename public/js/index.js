function handleFailedLogin(body) {
    document.getElementById('errorLbl').innerText = body.error || 'An error occurred.';
}

document.getElementById('loginBtn').addEventListener('click', (event) => {
    var mail = document.getElementById('usrMail').value;
    var psw = document.getElementById('usrPsw').value;

    var user = {
        'usrMail': mail,
        'usrPsw': psw
    }

    document.getElementById('errorLbl').innerText = '';

    fetch('http://localhost:3000/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            res.json().then(body => {
                if (res.status !== 200) {
                    handleFailedLogin(body)
                } else {
                    window.location.href = '/tables?uid=' + body.uid;
                }
            })
        })
        .catch(err => console.log(err));
});