var firebaseConfig = {
    apiKey: "AIzaSyBzjRH3KZRk_tTeJzfLDDqQBUSpB-kx0dw",
    authDomain: "fir-webapp-927e2.firebaseapp.com",
    databaseURL: "https://fir-webapp-927e2.firebaseio.com",
    projectId: "fir-webapp-927e2",
    storageBucket: "fir-webapp-927e2.appspot.com",
    messagingSenderId: "358202157888",
    appId: "1:358202157888:web:243e08f88c8d41922fa8a5",
    measurementId: "G-S2YBGXM32W"
};
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;


$("#btn-login").click(function()
  {
      var email =$("#email").val();
      var password =$("#password").val();
      
      if(email!="" && password!="")
      {
        var result=firebase.auth().signInWithEmailAndPassword(email,password);

        result.catch(function(error)
        {
            var errorCode=error.code;
            var errorMessage=error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message :"+errorMessage)

        });
      }
      else
      {
          window.alert("Please fill out all the fields");
      }
  });


  $("#btn-signup").click(function()
  {
      var email =$("#email").val();
      var password =$("#password").val();
      var cPassword =$("#confirmPassword").val();
      
      if(email!="" && password!="" && cPassword!="")
      {
        if(password == cPassword){
            var result=firebase.auth().createUserWithEmailAndPassword(email,password);

        result.catch(function(error)
        {
            var errorCode=error.code;
            var errorMessage=error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message :"+errorMessage)

        });
        }
        else
        {
            window.alert("Passwords do not match");

        }
      }
      else
      {
          window.alert("Please fill out all the fields");
      }
  });

  $("#btn-resetPassword").click(function()
  {
      var auth=firebase.auth();
      var email=$("#email").val();
    
      if (email!=""){
            auth.sendPasswordResetEmail(email).then(function()
            {
                window.alert("Email has been sent to you. Please check");
   
            })
            .catch(function(error)
            {
                var errorCode=error.code;
                var errorMessage=error.message;
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message :"+errorMessage);
            });
      }
      else{

        window.alert("Please write your email address");

      }
  });


$("#btn-logout").click(function()
  {
      firebase.auth().signOut();
  });

  $("#btn-update").click(function()
  {
    var fName =$("#firstName").val();
    var sName =$("#secondName").val();
    var phone =$("#phone").val();
    var gender =$("#gender").val();
    var address =$("#address").val();
    var date=$("#dob").val();
    var altemail=$("#altemail").val();

    var rootRef=firebase.database().ref().child("Users");
    var userID=firebase.auth().currentUser.uid;
    var usersRef=rootRef.child(userID+"/Profile");

    if (fName!="" && sName!="" && phone!="" && gender!="" && address!="" && date!="" && altemail!=""){
        var userData={
            "firstName":fName,
            "secondName":sName,
            "phone":phone,
            "address":address,
            "gender":gender,
            "dob":date,
            "altemail":altemail,

        };
        usersRef.set(userData, function(error){
            if(error){
                var errorCode=error.code;
                var errorMessage=error.message;
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message :"+errorMessage);
            }
            else{
                window.location.href = "MainPage.html";

            }
        });
    }
    else{
        window.alert("Please fill out all the fields");
    }
  });




var addressBook = (function() {
    var table = $('#table1');
    var tbody = table.find('tbody');
    var $name = table.find('#name');
    var $email = table.find('#email');
    var $phone = table.find('#phone');
    var $address = table.find('#address');
    var $button = table.find('#add');
    var $btnSave = table.find('#save');
    var $btnEdit = table.find('#edit');
    var $btnRemove = table.find('#remove');
    var $input = table.find(".edit");
  
    //bind events
    $button.on('click', addPerson);
    table.on('click', '#remove', deletePerson);
    /*table.on("change",'.edit' ,editPerson);*/
    console.log($input);
    _render();
  
    //render
    function _render() {
      tbody.html('');
      var length = people.length;
      for (var i = 0; i < length; i++) {
        table.prepend('<tr><td><input class="edit" type="text" value="' + people[i].firstName + '" ></td><td><input class="edit" type="text" value="' + people[i].lastName + '" ></td><td><input type="text" class="edit" value="' + people[i].phone + '" ></td><td> <button id="remove" class="btn btn-block">X</button></td></tr>');
      }
    }
  
    //custom function
    function addPerson() {
      var person = {
        name: $name.val(),
        email: $email.val(),
        phone: $phone.val(),
        address: $address.val()
      };
      people.push(person);
      $name.val('');
      $email.val('');
      $phone.val('');
      $address.val('');
      _render()
    }
  
    function deletePerson(event) {
        var element = event.target.closest('tr');
        var i = table.find('td').index(element);
        people.splice(i, 1);
        _render();
      }
    return {
      addPerson: addPerson,
      deletePerson: deletePerson
    };
  
  })();

  


