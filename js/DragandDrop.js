/*eslint-disable no-unused-vars*/
/* eslint-env browser */
/* global document */
/*global $, templateFolder, $myElement*/
/*eslint no-console:  ["error", { allow: ["warn", "error", "log","no-used-vars"] }] */

var mytempsrc = '';

$('[id*="Elem"]').draggable({
    appendTo: "body",
    containment: "body",
    cursor: "move",
    revert: true,
    helper: "clone",
    scroll: false
});



$('#DesignView').droppable({
    accept: '[id*="Elem"], .MyThumbnail',
    greedy: true,
    drop: function (event, ui) {
        var thisdroppable = true;
        var draggable, myTemp, myurl, myimg;

        if (ui.draggable.hasClass('MyThumbnail')) {
            console.log(ui.draggable.find('img').attr('src').toLocaleLowerCase());
            console.log(ui.draggable.find('img').attr('src').toLocaleLowerCase().indexOf('http'));
            if (ui.draggable.find('img').attr('src').toLocaleLowerCase().indexOf('http') >= 0) {
                myimg = ui.draggable.find('img').attr('src');
                var myalttext = ui.draggable.find('p').text();
                draggable = $('<img src="' + myimg + '" alt="' + myalttext + '">');

                if ($myElement.prop('tagName').toLowerCase() == "img") {
                    var mysrc = myimg;
                    $myElement.attr('src', mysrc);
                    return;
                } else
                    $myElement.append(draggable);
            } else {
                myimg = ui.draggable.find('p').text();
                draggable = $('<img src="images/' + myimg + '" alt="' + myimg + '">');
                if ($myElement.prop('tagName').toLowerCase() == "img") {
                    mysrc = 'images/' + myimg;
                    $myElement.attr('src', mysrc);
                    return;
                } else
                    $myElement.append(draggable);
            }
            
            draggable.trigger('click');
        } 
        else if (ui.draggable.hasClass('MyTemplate')) {

            mytempsrc = new Array();
            myTemp = ui.draggable.find('p').text().replace(/\s/g, '\%20');
            
            myurl = 'templates/' + templateFolder.replace(/\s/g, "\%20") + '/' + myTemp;
            
            $('#DesignView').attr('src',myurl);
            $('#DesignView').contents().find('body').trigger('click');
            
            $('#DesignView').contents().find('img[src*="http"]').each(function () {
                mytempsrc.push($(this).attr('src'));
            })


        } 
        else if (ui.draggable.hasClass('MyBrief')) {

            var myText, myList;
            myTemp = ui.draggable.find('p').text().replace(/\s/g, '\%20');
            //$(this).load('templates/'+templateFolder.replace(/\s/g,"\%20")+'/'+ myTemp);
            myurl = 'templates/' + templateFolder.replace(/\s/g, "\%20") + '/brief/' + myTemp;
            $.ajax({
                type: 'GET',
                url: myurl,
                async: false,
                success: function (data) {
                    myText = data;
                }
            });

            myList = generateList(myText);

            console.log($(myList));
            $myElement.append(myList);
            myList.trigger('click');
        } 
        else if (ui.draggable.hasClass('MyEmailTemplate')) {
            myTemp = ui.draggable.text().replace(/\s/g, '\%20');
            myurl = 'EmailComponents/' + myTemp;

            $.ajax({
                type: 'GET',
                url: myurl,
                async: false,
                success: function (data) {
                    draggable = data;
                }
            });
            $myElement.append(draggable);
        }
        else if (ui.draggable.hasClass('MyBs4Template')) {
            myTemp = ui.draggable.text().replace(/\s/g, '\%20');
            myurl = 'Bootstrap4Components/' + myTemp;

            $.ajax({
                type: 'GET',
                url: myurl,
                async: false,
                success: function (data) {
                    draggable = data;
                }
            });
            $myElement.append(draggable);
        } 
        else {
            draggable = $("#Drag" + ui.draggable.attr('id')).clone();
            draggable.removeAttr('id');
            $myElement.append(draggable);
            draggable.trigger('click');
            var elemId = ui.draggable.attr('id');

        }



        for (var i = 0; i < $('form').length; i++) {
            $('form')[i].reset();
        }

    }
});


function generateList(myText) {
    var mylist = myText.split('\n')
    var $listelem = $('#DragElemUl').clone();
    $listelem.children().remove();
    $listelem.removeAttr('id');
    for (var i in mylist) {
        if (mylist[i].trim().length > 0) {
            $listelem.append('<tr> <td class ="bullet" align="center" valign="top" bgcolor="#ffffff" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: 22px;">&bull;</td> <td class="data" align="left" valign="top" bgcolor="#ffffff" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: 22px; padding: 0px 5px;">' + mylist[i].trim() + '</td> </tr>')
        }
    }
    return $listelem;
}
