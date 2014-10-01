/* Global variables*/

var members;

/* Init view functions */

function initMembersVM(e) {
    console.log('initMembersVM');
    findMembers();
    $('#listview').kendoMobileListView({
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
            console.log('e.id: ' + e.dataItem.id);
            sessionStorage.memberID = e.dataItem.id;
            app.navigate('../members/member.html');
            //kendo.bind($("#member.html"), e);
        }
    });
}

/* Business logic functions */

function findMembers() {
    $.ajax({
        url: '../../json/familymen.json',
        dataType: 'json',
        async: false,
        cache: false
    }).done(function(data) {
        members = data.familymembers;
    });
}