
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/lists \
	-F address='LIST@YOUR_DOMAIN_NAME' \
	-F description='Mailgun developers list'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode createMailingList() throws UnirestException{

         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/lists")
				     .basicAuth("api", API_KEY)
				     .field("address", "LIST@YOUR_DOMAIN_NAME")
				     .field("description", "LIST_DESCRIPTION")
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

  # Issue the call to the client.
  $result = $mgClient->post("lists", array(
      'address'     => 'LIST@YOUR_DOMAIN_NAME',
      'description' => 'Mailgun Dev List'
  ));

.. code-block:: py

 def create_mailing_list():
     return requests.post(
         "https://api.mailgun.net/v3/lists",
         auth=('api', 'YOUR_API_KEY'),
         data={'address': 'LIST@YOUR_DOMAIN_NAME',
               'description': "Mailgun developers list"})

.. code-block:: rb

 def create_mailing_list
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v3/lists",
                   :address => 'LIST@YOUR_DOMAIN_NAME',
                   :description => "Mailgun developers list")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateMailingListChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateMailingList ().Content.ToString ());
     }

     public static IRestResponse CreateMailingList ()
     {

         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists";
         request.AddParameter ("address", "LIST@YOUR_DOMAIN_NAME");
         request.AddParameter ("description", "Mailgun developers list");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

  func CreateMailingList(domain, apiKey string) (mailgun.List, error) {
    mg := mailgun.NewMailgun(domain, apiKey, "")
    protoList := mailgun.List{
      Address:     "LIST@YOUR_DOMAIN_NAME",
      Name:        "dev",
      Description: "Mailgun developers list.",
      AccessLevel: mailgun.Members,
    }
    return mg.CreateList(protoList)
  }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post('/lists', {"address": `list_name@${DOMAIN}`, "description": "list_description"}, function (error, body) {
   console.log(body);
 });
 
