function viewUsers(view) {

  getUsers(
    success = function (data) {
      //console.log(data);
      populateUsersTable(data);
    },
    error = function (jqxhr) {
      handleApiError(jqxhr);
    }
  );

  function populateUsersTable(data) {

    var usersHtml = templates.userList(data);
    var isEditor = false;
    $('.section').html(usersHtml);


    $('.collections-select-table tbody tr').click(function () {
      $('.collections-select-table tbody tr').removeClass('selected');
      $(this).addClass('selected');
      var userId = $(this).attr('data-id');
      viewUserDetails(userId);
    });

    $('.radioBtnDiv').change(function () {
      if($('input:checked').val() === 'publisher') {
        isEditor = true;
      } else {
        isEditor = false;
      }
    });

    $('.form-create-user').submit(function (e) {
      e.preventDefault();

      var username = $('#create-user-username').val();
      var email = $('#create-user-email').val();
      var password = $('#create-user-password').val();

      if (username.length < 1) {
        sweetAlert("Please enter the users name.");
        return;
      }

      if (email.length < 1) {
        sweetAlert("Please enter the users name.");
        return;
      }

      if (password.length < 1) {
        sweetAlert("Please enter the users password.");
        return;
      }
      postUser(username, email, password, isEditor);
      viewUsers();
    });
  }
}

