// Concur_Admin_NavigateTo_ExpenseUserProfile.xaml
// Author: https://github.com/crystalyun
// Repository: https://github.com/rpahero/uipath-reusable-components

// Description:
// The Expense User Profile cannot be accessed via a GET request using the UserId, CUUID and CESEmpKey parameters (unlike the Travel User Profile).
// Instead we emulate a POST request by constructing a form within the DOM of the UiPath Chrome Extension with the relevant parameters, ie:
// Method: POST
// Path: https://www.concursolutions.com/companyadmin/user_detail.asp
// UserId':''
// CUUID: from in_str_UserProfileUrl
// CESEmpKey: from in_str_UserProfileUrl
// This javascript function submits the constructed form, which results in the browser navigating to the target User Profile.

function (e, in_str_UserProfileUrl) {
    var form = document.createElement('form');
        cuuid = in_str_UserProfileUrl.split('\'')[1];
        cesEmpKey = in_str_UserProfileUrl.split('\'')[3];
        var params = {'UserId':'', 'CUUID': cuuid, 'CESEmpKey': cesEmpKey};
        form.setAttribute('method', 'POST');
        form.setAttribute('action', 'https://www.concursolutions.com/companyadmin/user_detail.asp');
        form._submit_function_ = form.submit;
        
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement('input');
                hiddenField.setAttribute('type', 'hidden');
                hiddenField.setAttribute('name', key);
                hiddenField.setAttribute('value', params[key]);
                form.appendChild(hiddenField);
             }
        }
    
        document.body.appendChild(form);
        form._submit_function_();
    }