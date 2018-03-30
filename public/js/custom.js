//Custom jQuery/JS for KYONL

$(function(){

   $("#submit-new-member").on("click", addNewMember);

});

function addNewMember(){
    if (validateNewMemberForm()){
        var form = $("#new-member");
        var data = form.serialize();
        $.ajax({
            url: "php/Ajax/add-account.php",
            type: "post",
            data: data
        }).done(function(cb){
            console.log(cb);
        });
    }
}

function validateNewMemberForm(){
    $(".help-block").remove();
    $(".form-control-feedback").remove();

    var textRequired = [
        "username",
        "first_name",
        "last_name",
        "email_home",
        "title",
        "job_description",
        "education_level",
        "district",
        "organization",
        "work_street",
        "work_city",
        "work_state",
        "work_zip",
        "home_street",
        "home_city",
        "home_zip",
        "home_phone"
    ];

    var password_1 = $("#password_1");
    var password_2 = $("#password_2");
    if (password_1.val() !== password_2.val() || password_1.val() === "" || password_2.val() === ""){

        var passHtml = '<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span><span id="helpBlock" class="help-block">Passwords do not match</span>';
        var pass2Html = '<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>';
        password_1.parent().addClass("has-error");
        password_1.parent().addClass("has-feedback");
        password_2.parent().addClass("has-error");
        password_2.parent().addClass("has-feedback");
        password_1.parent().append(passHtml);
        password_2.parent().append(pass2Html);

    } else {
        password_1.parent().removeClass("has-error");
        password_1.parent().removeClass("has-feedback");
        password_2.parent().removeClass("has-error");
        password_2.parent().removeClass("has-feedback");
    }


    for(var i = 0; i<textRequired.length;i++){
        var field = textRequired[i];
        var el = $("#"+field);
        var html = '<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span><span id="helpBlock" class="help-block">Required Field</span>';
        if (el.val() === ""){
                el.parent().addClass("has-error");
                el.parent().addClass("has-feedback");
                el.parent().append(html);
        } else {
            el.parent().removeClass("has-error");
            el.parent().removeClass("has-feedback");
        }
    }

    if ($(".has-error").length > 0){
        $("html, body").animate({
            scrollTop: $(".has-error").offset().top
        });
        return false;
    } else {
        return true;
    }
}