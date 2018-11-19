$(document).ready(function(){
  
  $(".add_agreement").on('click', function(){
    $(".add_agreement").before(`<input class ="full_line" placeholder = "What you will do..." size="50" type="text" name="daily"> <br /> <select class="length_of_agreement"> <option value = "daily">Daily</option> <option value = "weekly">Weekly</option> <option value = "monthly">Monthly</option> <option class="long_term" value ="long_term">Long Term</option></select> <br />`)
    
  })
  $(document).on('change', ".length_of_agreement", function(){
      if ($(this).val() == "long_term"){
        $(this).before('<input class="full_line due_date" type="date" name="due_date"')
    } 
      if ($(this).val() != "long_term" && ($(this).prev().attr("class", "due_date"))){
        $(this).prev().remove()
      }
  })
  
})