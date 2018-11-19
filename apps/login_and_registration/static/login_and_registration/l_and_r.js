var modal = document.getElementsByClassName('sign_up')

$(document).ready(function(){
  $(".sign_up").click(function(){
    console.log('clicked')
    $(".signup_modal").show();
  
    $(".close").click(function(){
      $(".signup_modal").hide();
          
      })
    })
  })
