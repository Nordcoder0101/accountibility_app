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
      if ($(this).val() == "long_term"){
            $.ajax({
              url: "/home/render_due_date",
              method: "POST"
            }).done(function (res) {
              $(this_form).before(res)
            })
          } 
      if ($(this).val() != "long_term" && ($(this).prev().attr("class", "due_date"))) {
        $(this).prev().remove()
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
          $(this).remove()
        }
      )
      return false;
    })

  
})