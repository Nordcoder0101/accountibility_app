$(document).ready(function(){
  
  function addErrorAndFadeOut(target, error){
    $(target).before(error)
    $(".form_error").delay(2000).fadeOut("slow")
  }

  function addSuccessAndFadeOut(target, success) {
    $(target).before(success)
    $(".form_success").delay(2000).fadeOut("slow")
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
  
    $(document).on('submit', "#edit_the_profile", function() {
      var this_form = this;
      var data = $(this).serialize()
      console.log('clicked')
      $.ajax({
        method: "POST",
        url: "/home/profile_update",
        data: data
      })
      .done(function(res){
        var resfirst_name = `<p class = "form_error">${res.first_name}</p>`
        var resLast_name = `<p class = "form_error">${res.last_name}</p>`
        var resEmail = `<p class = "form_error">${res.email}</p>`
        var resEmailNotUnique = `<p class = "form_error">${res.email_not_unique}</p>`
        var resSuccess = `<p class = "form_success">${res.success}</p>`
        console.log(res)
        if (res.first_name){
          addErrorAndFadeOut(this_form, resfirst_name) 
        }
        
        if(res.last_name){
          addErrorAndFadeOut(this_form, resLast_name)
        }

        if(res.email){
          addErrorAndFadeOut(this_form, resEmail)

        }
        if(res.email_not_unique){
          addErrorAndFadeOut(this_form, resEmailNotUnique)
        }

        if(res.success){
          addSuccessAndFadeOut(this_form, resSuccess)
        }
      })
      return false;
    })  

    $(document).on('submit', ".agreements", function() {
      var this_form = this;
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
    

  $(document).on('click', '.delete_agreement', function(){
    var this_agreement = this;
    var data = $(this).attr('data-id')
    $.ajax({
      method: "POST",
      url: `/home/delete/${data}`,
      data: data
    }).done(function(res){
      $(this_agreement).parent().parent().parent().parent().remove()
    })
  } )    

  $(document).on('click', '.checkboxs', function(){
    this_agreement = this;
    var data = $(this).attr('data-id')
    if($(this).prop("checked") == true){
      console.log('checked')
      $.ajax({
        method: "POST",
        url: `/home/is_complete/${data}`,
        data: data
      }).done(function(res){
        $(`.description_${data}`).css('text-decoration', 'line-through')
      })
    }
    if ($(this).prop("checked") != true) {
      console.log('unchecked')
      $.ajax({
        method: "POST",
        url: `home/is_not_complete/${data}`,
        data: data
      }).done(function (res) {
        $(`.description_${data}`).css('text-decoration', 'none')
        console.log(res)
      })
    }
  })
  
})