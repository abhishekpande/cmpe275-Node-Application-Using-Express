// Userlist data array for filling in info box
var userListData = [];
var propertyListData = [];


// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnAddUser').on('click', addUser);

   $('#btnAddProperty').on('click', addProperty);
   // $('#btnAddProperty').on('click', addAgent);

    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }
};

/*------------------------------------------------------------------
 * Property table operations START*
 -------------------------------------------------------------------*/

    // Add Property
function addProperty(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addProperty input').each(function(index, val) {
        // To be implemented or uncommented
       // if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newProperty = {
            'propertyId':'4',
            'propertyname': 'Kensigton place',//$('#addProperty fieldset input#inputUserName').val(),
            'address': '1220 N Fair Oaks Ave',//$('#addProperty fieldset input#inputUserEmail').val(),
            'zipcode': '94089',//$('#addProperty fieldset input#inputUserFullname').val(),
            'price': '$2000',//$('#addProperty fieldset input#inputUserAge').val(),
            'mediaId': '10',//$('#addProperty fieldset input#inputUserLocation').val()
            'agentId' : '2'
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newProperty,
            url: '/property/addproperty',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addProperty fieldset input').val('');

                // Update the table
                populateTable('/property/propertyList');

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete Property
function deleteProperty(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/property/deleteproperty/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable('/property/propertyList');

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }
};

/*------------------------------------------------------------------
 * Property table operations END*
 -------------------------------------------------------------------*/

 /*------------------------------------------------------------------
 * Agent table operations START*
 -------------------------------------------------------------------*/

    // Add Agent
function addAgent(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addProperty input').each(function(index, val) {
        // To be implemented or uncommented
       // if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newAgent = {
            'agentId':'2',
            'agentName': 'Tressy',//$('#addProperty fieldset input#inputUserEmail').val(),
            'email': 'a@b.com',//$('#addProperty fieldset input#inputUserFullname').val(),
            'mobile': '123456789'

        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newAgent,
            url: '/agent/addAgent',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addProperty fieldset input').val('');

                // Update the table
                populateTable('/agent/agentList');

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete Agent
function deleteAgent(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/agent/deleteagent/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable('/agent/agentList');

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }
};

/*------------------------------------------------------------------
 * Agent table operations END *
 -------------------------------------------------------------------*/

 /*------------------------------------------------------------------
 * buyer table operations START*
 -------------------------------------------------------------------*/

    // Add Buyer
function addbuyer(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addProperty input').each(function(index, val) {
        // To be implemented or uncommented
       // if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newBuyer = {
            'buyerId':'2',
            'buyerName': 'Patrick',//$('#addProperty fieldset input#inputUserEmail').val(),
            'email': 'c@d.com',//$('#addProperty fieldset input#inputUserFullname').val(),
            'mobile': '987654321'

        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newBuyer,
            url: '/buyer/addbuyer',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addProperty fieldset input').val('');

                // Update the table
                populateTable('/buyer/buyerList');

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete Buyer
function deleteBuyer(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/buyer/deletebuyer/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable('/buyer/buyerList');

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }
};

/*------------------------------------------------------------------
 * buyer table operations END *
 -------------------------------------------------------------------*/

/*------------------------------------------------------------------
 * adDetails table operations START*
 -------------------------------------------------------------------*/

    // Add adDetails
function addAdvDetails(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addProperty input').each(function(index, val) {
        // To be implemented or uncommented
       // if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newAdv = {
            'adId':'6',
            'agentId': '2',//$('#addProperty fieldset input#inputUserEmail').val(),
            'propertyId': '4',//$('#addProperty fieldset input#inputUserFullname').val(),
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newAdv,
            url: '/adDetails/addadvertisement',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addProperty fieldset input').val('');

                // Update the table
                populateTable('/adDetails/adDetailList');

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete adv
function deleteAdDetails(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/adDetails/deleteadvertise/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable('/adDetails/adDetailList');

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }
};

/*------------------------------------------------------------------
 * adDetails table operations END *
 -------------------------------------------------------------------*/



 // Fill table with data
function populateTable(path) {

    // jQuery AJAX call for JSON
    $.getJSON( path, function( data ) {

        // Stick our user data array into a userlist variable in the global object
        PropertyListData = data;

    });
};