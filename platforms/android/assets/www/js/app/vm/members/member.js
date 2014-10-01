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
    //alert(vm);
    var mem=findMember();
	//var listviews = vm.element.find("ul.km-listview");
    $("#listInfo").kendoListView({
        dataSource:{
            data: mem

        }, template:'<li><a><h2>#:data.name#</h2><img src="#:data.photo#" class="list-image-circle" /></a></li>'+
                    '<li>Fecha de nacimiento: <span>#:data.birthdate#</span></li>'+
                    '<li>Apellido Paterno: <span>#:data.lastname#</span></li>'+
                    '<li>Apellido Materno: <span>#:data.mmaidenname#</span></li>'+
                    '<li>Relación: <span>#:data.famrel#</span></li>'
    });

    $("#listGral").kendoListView({
       dataSource:{
            data: mem

        }, template:'<li>Lugar de nacimiento: <span>#:data.bornplace#</span></li>'+
                    '<li>Seguro de GMMM: <span>#:data.SSG#</span></li>'+
                    '<li>Sexo:<span>#:data.sexo#</span></li>'
    });

    $("#listEco").kendoListView({
       dataSource:{
            data: mem

        }, template:'<li>Ocupacion: <span>#:data.socio.fatheroccu#</span></li>'+
                    '<li>Estado Civil: <span>#:data.socio.maritalstat#</span></li>'+
                    '<li>Sexo:<span>#:data.socio.carer#</span></li>'
    });

    var listviewsGral=$("#listGral").data("kendoListView");
    listviewsGral.refresh();

    var listviews=$("#listInfo").data("kendoListView");
    listviews.refresh();

    var listviewsEco=$("#listEco").data("kendoListView");
    listviewsEco.refresh();
    
    $("#settings-view").kendoMobileButtonGroup({
        select: function() {
            listviewsGral.hide()
            listviewsEco.hide()
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
    $.ajax({
        url: '../../json/memberInfo.json',
        dataType: 'json',
        async: false,
        cache: false
    }).done(function(data) {
        member = $.grep(data.memberInf, function (item) {
		    return item.id == memberID;
		});
    });
    return member;
}