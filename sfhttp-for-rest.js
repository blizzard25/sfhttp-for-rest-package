export const name = 'sfhttp-for-rest';


if(Meteor.isServer){

  Meteor.methods({retrieveAccount: 
    function(password, clientid, clientsecret, username, passwordtoken) {

    this.unblock();

    var accountcredentials = HTTP.call("POST", 
      “https://login.salesforce.com/services/oauth2/token”, 
        {params: {grant_type: password, 
                  client_id: clientid, 
                  client_secret: clientsecret, 
                  username: username, 
                  password: passwordtoken}}, 
        {headers: {X-PrettyPrint: 1}});

    var accesstoken = accountcredentials.Session.get("access_token");
    var instanceUrl = accountcredentials.Session.get("instance_url"); 
    var accountid =  accountcredentials.Session.get("id");

    var uri = instanceUrl + “/services/data/v34.0/sobjects/Account/” + accountid;



    return HTTP.call("GET", uri, {headers: {Authorization: Bearer accesstoken, X-PrettyPrint: 1}});
    
    });

  }});

}

if(Meteor.isServer){

  Meteor.methods({retrieveSubAccount: 
    function(password, clientid, clientsecret, username, passwordtoken) {

    this.unblock();

    var accountcredentials = HTTP.call("POST", 
      “https://login.salesforce.com/services/oauth2/token”, 
        {params: {grant_type: password, 
                  client_id: clientid, 
                  client_secret: clientsecret, 
                  username: username, 
                  password: passwordtoken}}, 
        {headers: {X-PrettyPrint: 1}});

    var accesstoken = accountcredentials.Session.get("access_token");
    var instanceUrl = accountcredentials.Session.get("instance_url"); 
    var accountid =  accountcredentials.Session.get("id");

    var uri = instanceUrl + “/services/data/v34.0/sobjects/Account/” + accountid;



    var masteraccount = HTTP.call("GET", uri, {headers: {Authorization: Bearer accesstoken, X-PrettyPrint: 1}});


    var subaccountid = masteraccount.Session.get("OwnerId");

    uri = uri + subaccountid;

    return HTTP.call("GET", uri, {headers: {Authorization: Bearer accesstoken, X-PrettyPrint: 1}});
    });

  }});

}

