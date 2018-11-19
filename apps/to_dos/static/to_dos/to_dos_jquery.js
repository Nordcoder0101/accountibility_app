$(document).ready(function(){
  
  $(".add_agreement").on('click', function(){
    $.ajax({
      url: "/home/render_agreement",
      method: "GET"
    }).done(function(res) {  
    $(".add_agreement").before(res)
    })
  })

  $(document).on('change', ".length_of_agreement", function(){
      if ($(this).val() == "long_term"){
        $(this).before('<p>Due Date<input name="due_date" class="full_line due_date" type="date" name="due_date"</p>')
    } 
      if ($(this).val() != "long_term" && ($(this).prev().attr("class", "due_date"))){
        $(this).prev().remove()
      }
  })
  
  // $(document).on('click', '.add_agreement_button', function(e){
  //   e.preventdefault()
  //   if ($(this).prev().val().length > 10){
  //     $(this).prev().prev().remove()
  //   }
  // })
})