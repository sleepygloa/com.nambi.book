
var blogsJs = function(){


	return {
		init : function(){

            //css
            $('#blogRe').css('background-color', '#E8F2FF');

            initPage();

            fnReContent('VIEW');

            fnEvents();

		}
    }

	function fnEvents(){

    	//추가
    	$("#blogAddBtn").click(function(){
    		getContentUpdate(-1);
    	});

    	//수정
    	$("#blogUpdateBtn").click(function(){
    	    var idx = $('#blogIdx').val();
            getContentUpdate(idx);
    	});

    	//수정취소
    	$("#blogCancelBtn").click(function(){
            getContent();
    	});

    	//저장버튼
    	$("#blogSaveBtn").click(function(){
    		fnSave();
    	});

    	//삭제버튼
    	$("#blogDeleteBtn").click(function(){
    		fnDelete();
    	});

	}

function initPage(){
    if(app.userRole == 'A'){
        $('#blogAddBtn').css('display','block');

        var idx = $('#blogIdx').val();
        if(idx != "" && idx > -1){
            $('#blogUpdateBtn').css('display','block');
        }
    }
}


function getContent(){
    var idx = $('#blogIdx').val();
    $.ajax({
        type : 'GET',
        url : '/blogs/'+idx,
        contentType : 'application/json; charset=utf-8'
    }).done(function(data){
        console.log(data);

        //element 세팅
        $('#blogViewMarkdown').css('display', 'block');
        $('#blogUpdateMarkdown').css('display', 'none');
        $('#blogTitle').css('display','block').attr('readonly', true);
        $('#blogUpdateBtn').css('display', 'none');
        $('#blogDeleteBtn').css('display', 'none');
        $('#blogSaveBtn').css('display', 'none');
        $('#blogCancelBtn').css('display', 'none');
        $('#blogRe').css('display','block');
        $('#blogAddBtn').css('display','block');
        $('#blogUpdateBtn').css('display','block');


        //form 세팅
        $('#blogIdx').val(data.idx);
        $('#blogTitle').val(data.title);
        viewer.setMarkdown(data.markdownContent);

        fnReContent('VIEW');


    }).fail(function(error){
        alert(JSON.stringify(error));
    });
}

function getContentUpdate(idx){


    //element 세팅
    $('#blogViewMarkdown').css('display', 'none');
    $('#blogUpdateMarkdown').css('display', 'block');
    $('#blogTitle').css('display','block').attr('readonly', false);
    $('#blogUpdateBtn').css('display', 'none');
    $('#blogDeleteBtn').css('display', 'block');
    $('#blogSaveBtn').css('display', 'block');
    $('#blogCancelBtn').css('display', 'block');
    //댓글 창 안보이게
    $('#blogRe').css('display','none');
    $('#blogAddBtn').css('display','none');


    if(idx > 0){
        $.ajax({
            type : 'GET',
            url : '/blogs/content/'+idx,
            contentType : 'application/json; charset=utf-8'
        }).done(function(data){

            //form 세팅
//            $('#blogIdx').val(data.idx);
//            $('#blogTitle').val(data.title);
            editor.setMarkdown(data.markdownContent);
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    }else{
        //form 세팅
        $('#blogIdx').val('');
        $('#blogTitle').val('');
        editor.setMarkdown('');


    }

}
//글저장
function fnSave(){
    var idx = $('#blogIdx').val();

    var data = {
        title : $('#blogTitle').val(),
        markdownContent : editor.getMarkdown(),
    }

    var type = 'POST';
    var url = '/blogs/';
    if(idx > 0) {
        type = 'PUT';
        url = '/blogs/'+idx;
    }

    $.ajax({
        type : type,
        url : url,
        dataType : 'json',
        contentType : 'application/json; charset=utf-8',
        data : JSON.stringify(data)
    }).done(function(data){
        console.log(data);

        alert('저장되었습니다');
        window.location.href='/blogs/';

    }).fail(function(error){
        alert(JSON.stringify(error));
    });
}

//글삭제
function fnDelete(){
    var idx = $('#blogIdx').val();

    $.ajax({
        type : 'DELETE',
        url : '/blogs/' + idx,
    }).done(function(data){

        alert('삭제되었습니다.');
        window.location.href='/blogs/';

    }).fail(function(error){
        alert(JSON.stringify(error));
    });
}

//댓글 신규저장, 수정저장
function blogReSave(ref, pRef){
    var idx = $('#blogIdx').val();

    var data = {
        idx : idx,
        pref : pRef,
        passwd : $('#blogPw_'+ref+'_'+pRef).val(),
        content : $('#blogContent_'+ref+'_'+pRef).val()
    }

    //신규인지 수정인지
    var type = 'POST';
    var url = '/blogs/re';
    if(ref != 0){
        type = 'PUT';
        url = url + '/' + ref;
    }

    $.ajax({
        type : type,
        url : url,
        dataType : 'json',
        contentType : 'application/json; charset=utf-8',
        data : JSON.stringify(data)
    }).done(function(data){

        alert('저장되었습니다');
        fnReContent('VIEW');

    }).fail(function(error){
        alert(JSON.stringify(error));
    });
}

//댓글 삭제
function blogReDelete(ref){
    var idx = $('#blogIdx').val();

    $.ajax({
        type : 'DELETE',
        url : '/blogs/re/'+ref,
    }).done(function(data){

        alert('삭제되었습니다.');
        fnReContent('VIEW');

    }).fail(function(error){
        alert(JSON.stringify(error));
    });
}

//댓글 리스트
function fnReContent(flag, ref, pref){

        var reBody = $('#blogRe');
        reBody.empty();

        var idx = $('#blogIdx').val();
        var reAddFlag = false;

        if(idx != "" & idx > -1){
            $.ajax({
                type : 'GET',
                url : '/blogs/re/'+idx,
                dataType    : "json",
                async:false,
                contentType : "application/json; charset=utf-8",
                success     : function(result){
                    //CSS
                    var reContent = 0;
                    var imgWidth = 10

                    var dt_grid = result;

                    //-1 : 댓글 신규 작성 폼.
                    for(var i = 0; i < dt_grid.length; i++){
                            //글수정
                            if(ref == dt_grid[i].ref && pref == dt_grid[i].p_ref && flag == 'REUPDATE'){
                                getViewInsert(reBody, {
                                    ref : dt_grid[i].ref,
                                    pref : dt_grid[i].p_ref,
                                    rowData : dt_grid[i],
                                    flag : flag
                                });
                                continue;
                            }

                            //일반적인 리스트
                            getViewInsert(reBody, {
                                ref : dt_grid[i].ref,
                                pref : dt_grid[i].p_ref,
                                rowData : dt_grid[i],
                                flag : 'VIEW'
                            });

                            //댓글쓰기일때.
                            if(flag != 'REUPDATE' && dt_grid[i].ref == pref) {
                                getViewInsert(reBody, {
                                                     ref : 0,
                                                     pref : dt_grid[i].ref,
                                                     flag : flag
                                                 });
                            }
                        }
                }
            });
        }
        getViewInsert(reBody);
    }

    //댓글 - 글쓰기
    function getViewInsert(el, data){
        var dtGridRef = 0; if(data != undefined) dtGridRef = data.ref;
        var dtGridPRef = 0; if(data != undefined) dtGridPRef = data.pref;
        var rowData = undefined; if(data != undefined && data.rowData != undefined) rowData = data.rowData;
        var flag = 'VIEW'; if(data != undefined && data.flag != undefined) flag = data.flag;

        /*******************************************
        * ref -1 : 댓글쓰기 폼.
        ********************************************/
        var dd = $('<div />');
        if(dtGridPRef != 0) dd.css('padding-left', '30px');

        //컨텐츠영역
        var ddContentDiv = $('<div class="input-group input-group-sm" />');

            if(dtGridRef == 0 || (flag == 'REUPDATE')){
                var ddIdTextArea = $('<textarea id="blogContent_'+dtGridRef+'_'+dtGridPRef+'" class="form-control" aria-label="With textarea" readonly style="margin-left:45px; border:0px; background:white; padding:10px;"/>');
                ddIdTextArea.keydown(function(el){
                    if(el.keyCode == 13){
                        ddContentDiv.css('height', (12+el.target.scrollHeight)+"px");
                    }
                });
                //세션확인
                if(app.userEmail != "") {
                    ddIdTextArea.attr('readonly', false);
                    if(flag == 'REUPDATE') ddIdTextArea.text(rowData.content);
                }else{
                    ddIdTextArea.text('로그인 후 이용해 주세요. 소통과 알림을 위해 로그인을 권장하고있습니다.');
                }
                ddContentDiv.append(ddIdTextArea);

            //댓글리스트, 신규댓글확인
            }else {
                var ddIdTextArea = $('<pre id="blogContent_'+dtGridRef+'_'+dtGridPRef+'" class="" aria-label="With textarea" style="margin-bottom:0px;margin-left:45px;border:0px; background:white; padding:10px;"  />');
                ddIdTextArea.text(rowData.content);
                ddContentDiv.append(ddIdTextArea);

                if(rowData != undefined && rowData.del_yn == 'Y') ddIdTextArea.text('삭제된 글입니다.');
            }

        var ddDiv = $('<div class="input-group input-group-sm mb-3" />');
            //이미지
            var ddImg = (dtGridRef != 0 ? rowData.picture : app.userPicture);
            var ddImgDiv = $('<button type="button" class="btn btn-outline-secondary" style="border:0px;"></button>');
            var ddImgDivImg = $('<img src="'+ddImg+'" style="width:30px; height:30px; border-radius:15px"/>');
            ddImgDiv.append(ddImgDivImg);

            //작성자
            var ddId = (dtGridRef != 0 ? rowData.up_user_id : (app.userName != '' ? app.userName : '로그인해주세요'));
            var ddIdInput = $('<input id="blogName_'+dtGridRef+'_'+dtGridPRef+'" type="text" class="form-control" aria-label="Text input with segmented dropdown button" value="" readonly style="background:transparent; border:0px;">');

            //비밀번호
            var ddPw = $('<input id="blogPw_'+dtGridRef+'_'+dtGridPRef+'" type="text" class="form-control" aria-label="Text input with segmented dropdown button" placeholder="비밀번호" readonly style="background:transparent; border:0px;">');

            if(dtGridRef == 0 || flag == 'REUPDATE'){

                if(app.userName != ''){
                    ddIdInput.val(ddId);
                    ddPw.attr('readonly', false);
                }else{
                    ddIdInput.val(ddId);
                }
            }else{
                var dt = rowData.up_dt;
                //댓글리스트의 일반적인 텍스트 : 작성자 + 일시
                var ddIdDt = '' + rowData.up_user_id + ' | ' + (dt.substr(0,10) + " " + dt.substr(11,8));

                if(rowData != undefined && rowData.del_yn == 'Y'){
                }else{
                    ddIdInput.val(ddIdDt);
                }
                ddIdInput.css('font-size', '0.8em');
            }


            //*******************************************************************
            //버튼 엘리먼트 추가.
            //*******************************************************************
            var ddBtnInsertText = (flag == 'REUPDATE' || dtGridRef == 0 && dtGridPRef != 0 ? '댓글저장' : '글쓰기');
            var ddBtnInsert = $('<button id="blogInsertBtn_'+dtGridRef+'_'+dtGridPRef+'" type="button" class="btn btn-outline-secondary" style="border:0px;">'+ddBtnInsertText+'</button>');
            ddBtnInsert.on('click', function(){
                var el = $(this);
                var split = el.attr("id").split("_");
                blogReSave(parseInt(split[1]), parseInt(split[2]));
            });

            var ddBtnReAdd = $('<button id="blogReAddBtn_'+dtGridRef+'_'+dtGridPRef+'" type="button" class="btn btn-outline-secondary" style="border:0px;">댓글쓰기</button>');
            ddBtnReAdd.on('click', function(){
            var el = $(this);
            var split = el.attr("id").split("_");
                fnReContent('READD', 0, parseInt(split[1]));
            });

            var ddBtnReUpdate = $('<button id="blogReUpdateBtn_'+dtGridRef+'_'+dtGridPRef+'" type="button" class="btn btn-outline-secondary" style="border:0px;">댓글수정</button>');
            ddBtnReUpdate.on('click', function(){
            var el = $(this);
            var split = el.attr("id").split("_");
                fnReContent('REUPDATE', parseInt(split[1]), parseInt(split[2]));
            });
            var ddBtnReDelete = $('<button id="blogReDeleteBtn_'+dtGridRef+'_'+dtGridPRef+'" type="button" class="btn btn-outline-secondary" style="border:0px;">삭제</button>');
            ddBtnReDelete.on('click', function(){
            var el = $(this);
            var split = el.attr("id").split("_");
                blogReDelete(parseInt(split[1]));
            });

        /*******************************************
        * 사용자그룹, 버튼그룹 합치기
        ********************************************/
        ddContentDiv.append(ddIdTextArea);
        ddDiv.append(ddImgDiv).append(ddIdInput)

        if(dtGridRef == undefined || dtGridRef == 0) ddDiv.append(ddPw); //신규글일때만 추가

        if(rowData != undefined && rowData.del_yn == 'Y'){
        }else{
            if(flag == 'REUPDATE'){
                ddDiv.append(ddBtnReDelete).append(ddBtnInsert)
            }else{
                //세션확인
                if(app != undefined && app.userName != ''){
                    //댓글달기
                    if(dtGridPRef == 0 && dtGridRef != 0) ddDiv.append(ddBtnReAdd);
                    //댓글수정하기
                    if(rowData != undefined && app.userName == rowData.up_user_id) ddDiv.append(ddBtnReUpdate);
                    //글쓰기, 댓글저장
                    if(dtGridRef == 0) ddDiv.append(ddBtnInsert);
                }
            }
        }


        //*******************************************************************
        //최종 엘리먼트 추가.
        //*******************************************************************
        dd.append(ddContentDiv).append(ddDiv);
        el.append(dd);
    }

    /******************************************************
    * 글 상자 자동조절 높이
    *******************************************************/
    function resize(obj) {
  	  obj.currentTarget.style.height = "50px";
  	  obj.currentTarget.style.height = (12+obj.target.scrollHeight)+"px";
  	}

}();


$(document).ready(function(){
    blogsJs.init();
})