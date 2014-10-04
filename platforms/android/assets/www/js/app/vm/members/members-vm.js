/* Global variables*/

var members;

/* Init view functions */

function initMembersVM(e) {
    findMembers();
    $('#membersListView').kendoMobileListView({
        filterable: {
            field: 'name',
            ignoreCase: true,
            operator: 'contains',
            placeholder: 'Type to search...'
        },                
        dataSource: kendo.data.DataSource.create(members),
        template: '<a><h2>#:data.name#</h2><img src="#:data.photo#" class="list-image-circle" /></a>',
        click: function(e) {
            e.preventDefault();
            sessionStorage.memberID = e.dataItem.id;
            app.navigate('../members/member.html');
        }
    });
    $("#toolbar").kendoToolBar({
        resizable: false,
        items: [
            {
                id: "back",
                type: "button",
                icon: "arrow-w",
                overflow: "never",
                align: "left",
                url: "#:back"
            },
            { 
                type: "button", 
                text: "Add",
                icon: "add",
                showText: "overflow",
                click: function(e) {
                    sessionStorage.memberID = null;
                    app.navigate('../members/member.html');
                }
            }
        ]
    });
}

/* Business logic functions */

function findMembers() {
    $.ajax({
        url: '../../json/members/members.json',
        dataType: 'json',
        async: false,
        cache: false
    }).done(function(data) {
        members = data.members;
    });
}