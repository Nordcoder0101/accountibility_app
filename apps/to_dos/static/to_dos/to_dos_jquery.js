$(document).ready(function(){
  
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
  
    $(document).on('submit', ".agreements", function(e) {
      this_form = this;
      console.log(this)
      var data = $(this).serialize()
      // e.preventDefault();
      $.ajax({
        method: "POST",
        url: "/home/add_agreement",
        data: data
      })
      .done(function(res){
        console.log(res)
          $(this_form).remove()
        }
      )
      return false;
    })

  
})