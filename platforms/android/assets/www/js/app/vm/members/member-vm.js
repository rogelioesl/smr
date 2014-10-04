/* View-Model variables */

var memberVM = {
	member: findMember()
}

/* Init view functions */

function initMemberVM(e) {
	configurateComponents(this);
}

/* Business logic functions */

function configurateComponents(vm) {
    var member = findMember();
    $("#liPersonalInformation").kendoListView({
        dataSource: {
            data: member
        },
        template: '<li><a><h2>#:data.name#</h2><img src="#:data.photo#" class="list-image-circle" /></a></li>' +
                  '<li>Fecha de nacimiento: <span>#:data.birthdate#</span></li>'
    });
    $("#liGeneral").kendoListView({
       dataSource:{
            data: member
        },
        template: '<li>Lugar de nacimiento: <span>#:data.bornplace#</span></li>'
    });
    
    $("#settings-view").kendoMobileButtonGroup({
        select: function() {
            listviews.hide()
                     .eq(this.selectedIndex)
                     .refresh()
                     .show();
        },
        index: 0
    });
    
}

function findMember() {
	var memberID = sessionStorage.memberID;
	var member;
    if (memberID == null) {
        member = new Member();
    } else {
        $.ajax({
            url: '../../json/members/members.json',
            dataType: 'json',
            async: false,
            cache: false
        }).done(function(data) {
            member = $.grep(data.members, function (item) {
                return item.id == memberID;
            });
        });
    } 
    return member;
}