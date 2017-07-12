
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/pages

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode listMembers() throws UnirestException{

         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/lists/{list_name}@{domain}/members/pages")
				     .basicAuth("api", API_KEY)
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

  # Issue the call to the client.
  $result = $mgClient->get("lists/$listAddress/members/pages", array(
      'subscribed' => 'yes',
      'limit'      =>  5
  ));

.. code-block:: py

 def list_members():
     return requests.get(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/pages",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def list_members
   RestClient.get("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/pages")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetListMembersChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetListMembers ().Content.ToString ());
     }

     public static IRestResponse GetListMembers ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/members/pages";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         return client.Execute (request);
     }

 }

.. code-block:: go

 func GetMembers(domain, apiKey string) (int, []mailgun.Member, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetMembers(-1, -1, mailgun.All, "LIST@YOUR_DOMAIN_NAME")
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 var list = mailgun.lists(`mylist@${DOMAIN}`);

 list.members().list(function (err, members) {
   console.log(members);
 });
