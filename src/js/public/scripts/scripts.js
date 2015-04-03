$(function(){
    $('form').on('submit', function(e){
        e.preventDefault();
            var parameters = {};
            var form = $(this);
            var html = "";

            if(form.find('input').val())
            {
                parameters.search = form.find('input').val();
                isChecked(form, 'topics') ? parameters.inTopics = true : null;
                isChecked(form, 'milestones') ? parameters.inMilestones = true : null;
                $.get( '/v1/courses',parameters, function(data) {
                    for(var course in data)
                    {
                        html += "<p>" + data[course].name +"</p>";
                    }
                    $('#result').html(html);
                });
            }
    });
});

var isChecked = function(form, idCheckbox){
    return form.find("#" + idCheckbox + "").prop("checked");
};