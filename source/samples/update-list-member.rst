
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/bar@example.com \
	-F subscribed=False \
	-F name='Foo Bar'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode updateMembers() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.put("https://api.mailgun.net/v3/lists/LIST_NAME@YOUR_DOMAIN_NAME/members/alice@example.com")
		     .basicAuth("api", API_KEY)
	         .field("subscribed", false)
             .field("name", "Alice")
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $listAddress = 'LIST@YOUR_DOMAIN_NAME';
  $memberAddress = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->put("lists/$listAddress/members/$memberAddress", http_build_query(array(
      'subscribed' => false,
      'name'       => 'Foo Bar'
  )));

.. code-block:: py

 def update_member():
     return requests.put(
         ("https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members"
          "/bar@example.com"),
         auth=('api', 'YOUR_API_KEY'),
         data={'subscribed': False,
               'name': 'Foo Bar'})

.. code-block:: rb

 def update_member
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members" \
                  "/bar@example.com",
                  :subscribed => false,
                  :name => 'Foo Bar')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class UpdateListMemberChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (UpdateListMember ().Content.ToString ());
     }

     public static IRestResponse UpdateListMember ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/members/{member}";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.AddParameter ("member", "bar@example.com",
                               ParameterType.UrlSegment);
         request.AddParameter ("subscribed", false);
         request.AddParameter ("name", "Foo Bar");
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func UpdateMember(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   _, err = mg.UpdateMember("bar@example.com", "LIST@YOUR_DOMAIN_NAME", mailgun.Member{
     Name: "Foo Bar",
     Subscribed: mailgun.Unsubscribed,
   })
   return err
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 var list = mailgun.lists(`mylist@${DOMAIN}`);

 list.members('bob@example.com').update({ "name": 'Bob Bar'}, function (error, data) {
   console.log(data);
 });
