/* Global variables*/


/* Init view functions */

function initGeneralVM(e) {

    var listviews = $("ul.km-listview.km-list");
    //console.log(listviews);
     $("#select-period").kendoMobileButtonGroup({
            select: function(e) {
                listviews.hide()
                         .eq(this.current().index())
                         .show();
            },
            index: 0
        });
}

/* Business logic functions */
