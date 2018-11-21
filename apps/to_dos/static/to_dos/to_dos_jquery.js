$(document).ready(function(){
  
  function addErrorAndFadeOut(target, error){
    $(target).before(error)
    $(".form_error").delay(800).fadeOut("slow")
  }


  $(".edit_modal_trigger").click(function(){
    $(".edit_modal").toggleClass("show_modal")
  })

  $(".add_agreement").on('click', function(){
    $.ajax({
      url: "/home/render_agreement",
      method: "GET"
    }).done(function(res) {  
    $(".add_agreement").before(res)
    })
  })

  $(document).on('change', ".length_of_agreement", function(){
      this_form = this
     
      if ($(this_form).val() == "long_term"){
            $.ajax({
              url: "/home/render_due_date",
              method: "GET"
            }).done(function (res) {
              $(this_form).before(res)
            })
          } 
      if ($(this_form).val() != "long_term") {
        $(".due_date").remove()
    }
    }) 
  
    $(document).on('submit', ".agreements", function() {
      this_form = this;
      var data = $(this).serialize()
      // e.preventDefault();
      $.ajax({
        method: "POST",
        url: "/home/add_agreement",
        data: data
      })
      .done(function(res){
        console.log(res)
        var resDescription = `<p class = "form_error">${res.description}</p>`
        var resDueDate = `<p class = "form_error">${res.due_date}</p>`
        if(res.description){
          addErrorAndFadeOut(this_form, resDescription) 
        }
        if (res.due_date) {
          addErrorAndFadeOut(this_form, resDueDate)
        }
        if (res.success){
          $(this_form).remove()
        }
        })
      return false;
    })

  
})