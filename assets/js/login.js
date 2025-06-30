const USER = {
    email: 'zeynabamiri@gmail.com',
    password: 20210606,
    userName: 'Test User'
}

const handleLogin = (e) =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if(email === USER.email && +password === USER.password){
        localStorage.setItem('user', JSON.stringify(USER.userName))
        console.log('login successful');
        location.replace('../index.html')

    } else{
        console.log('invalid dredentials');
        
    }

}


(() =>{
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', handleLogin)
})()