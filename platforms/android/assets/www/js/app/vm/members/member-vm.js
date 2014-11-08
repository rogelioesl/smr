/* View-Model variables */

var memberVM = {
	member: findMember(),
	memberTemplate: ''
}

/* Init view functions */

function initMemberVM(e) {
	configurateComponents(this);
}

/* Business logic functions */

function createToolbarOptions()
{
	var items = 
		[
			{
                id: "back",
                type: "button",
                icon: "arrow-w",
                overflow: "never",
                align: "left",
				url:"#:back"    
            },
			
			{
				type: "button",
				id: "	btnCall",
				text: "Call",
				overflow: "always",
                align: "left" 

			 },
			 {
				type: "button",
				id:"btnMessage",
				overflow: "always",
				text: "Message",
				textAlign: "left"
			 },
			 	{
				type: "button",
				id: "btnMail",
				text: "Mail",
				overflow: "always",
                align: "left" 

			 },
			 {
				type: "button",
				id:"btnDoctor",
				overflow: "always",
				text: "Doctor",
				textAlign: "left"
			 }
		];
		
		return items;
}

function configurateComponents(vm) {
    var member = findMember();
	memberTemplate = setTemplate();
    $("#liPersonalInformation").kendoMobileListView({
        dataSource: {
            data: member
        },
		template: memberTemplate
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
	
	$("#toolbarOptions").kendoToolBar({
		resizable:true, 
		items:
			createToolbarOptions()
	});
	
	$("#toolbarOptions2").kendoToolBar({
		resizable:true, 
		items:
			createToolbarOptions()
	});
    
}

function setTemplate()
{
	var memberID = sessionStorage.memberID;
	console.log('Entro a setTemplate');
	var templateMemberExist = 
				 '<li><a><h2>#:data.name#</h2><img src="#:data.photo#" class="list-image-circle" /></a></li>' +
				 '<li><label>Name<input type="text" value="#:data.name#" readonly /></label></li>'+
				 '<li><label>Lastname <input type="text" value="#:data.lastname#" readonly/></label></li>'+
				 '<li><label>Maternal<input type="text" value="#:data.maternal#" readonly/></label></li>'+
				 '<li><label>Birthdate<input type="text" value="#:data.birthdate#" readonly/></label></li>'+
				 '<li><label>Gender<input type="text" value="#:data.gender#"/ readonly></label></li>'+
				 '<li><label>Birthplace<input type="text" value="#:data.bornplace#" readonly/></label></li>'+
				 '<li><label>Full Age<input type="text" value="#:data.fullage#" readonly/></li>';
	
	var templateNewMember = 
				 '<li><a><h2>#:data.name#</h2><img src="" class="list-image-circle" /></a></li>' +
				 '<li><label>Name<input type="text"/></label></li>'+
				 '<li><label>Lastname <input type="text"/></label></li>'+
				 '<li><label>Maternal<input type="text"/></label></li>'+
				 '<li><label>Birthdate<input type="date" value="1900-01-01" style="font-size:12pt;"/></label></li>'+
				 '<li><label>Gender <select id="dropdown"><option value="Female">Female</option><option value="Male">Male</option></select></label></li>'+
				 '<li><label>Birthplace<input type="text"/></label></li>'+
				 '<li><label>Full Age<input type="text"</li>';
	console.log(sessionStorage.memberID);
	console.log(sessionStorage.memberID == null);
	if(memberID == null)
	{
		console.log('newtemplate');
		return templateNewMember;
	}
	else
	{
		return templateMemberExist;
	}
	
	

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