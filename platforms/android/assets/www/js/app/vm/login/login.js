var app = new kendo.mobile.Application($(document).body,{ 
    initial: 'app/login/login.html',
            layout:"overview-layout"
});
/* View-Model variables */

var loginVM = {
    user: new User(),
    login: function(e) {
        e.preventDefault();
        validateUser(this.user);        
    },
    clear: function(e) {        
        e.preventDefault();
        this.set('user', new User());        
    }
}

/* Business logic functions */

function validateUser(user) {
    $.ajax({
        url: 'json/user.json',
        dataType: 'json',
    }).done(function(data) {
        var userFound = data.user;
        if (user.username === userFound.username && user.password === userFound.password) {
            document.location.href="app/home/home.html";
        } else {
            alert('Invalid user or password, try again please.');
        }
    });
}