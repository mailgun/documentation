
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
	-F from='Sender Bob <sbob@YOUR_DOMAIN_NAME>' \
	-F to='alice@example.com' \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomness!' \
	-F o:tracking=False

.. code-block:: java

 import java.io.File;

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode sendMessageNoTracking() throws UnirestException{

		     HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/messages")
				     .basicAuth("api", API_KEY)
				     .queryString("from", "Excited User <YOU@YOUR_DOMAIN_NAME>")
				     .queryString("to", "alice@example.com")
				     .queryString("subject", "Hello")
				     .queryString("text", "Testing some Mailgun awesomeness")
				     .field("o:tracking", "False")
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
  $domain = "YOUR_DOMAIN_NAME";

  # Make the call to the client.
  $result = $mgClient->sendMessage($domain, array(
      'from'       => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'         => 'foo@example.com',
      'subject'    => 'Hello',
      'text'       => 'Testing some Mailgun awesomness!',
      'o:tracking' => false
  ));

.. code-block:: py

 def send_message_no_tracking():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         data={"from": "Excited User <YOU@YOUR_DOMAIN_NAME>",
               "to": ["bar@example.com", "baz@example.com"],
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!",
               "o:tracking": False})

.. code-block:: rb

 def send_message_no_tracking
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
   :from => "Excited User <YOU@YOUR_DOMAIN_NAME>",
   :to => "bar@example.com, baz@example.com",
   :subject => "Hello",
   :text => "Testing some Mailgun awesomness!",
   "o:tracking" => false
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class SendMessageNoTrackingChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (SendMessageNoTracking ().Content.ToString ());
     }

     public static IRestResponse SendMessageNoTracking ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/messages";
         request.AddParameter ("from", "Excited User <YOU@YOUR_DOMAIN_NAME>");
         request.AddParameter ("to", "bar@example.com");
         request.AddParameter ("to", "baz@example.com");
         request.AddParameter ("subject", "Hello");
         request.AddParameter ("text", "Testing some Mailgun awesomness!");
         request.AddParameter ("o:tracking", false);
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func SendMessageNoTracking(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   m := mg.NewMessage(
     "Excited User <YOU@YOUR_DOMAIN_NAME>",
     "Hello",
     "Testing some Mailgun awesomeness!",
     "foo@example.com",
   )
   m.SetTracking(false)
   _, id, err := mg.Send(m)
   return id, err
 }

.. code-block:: node

 var mailgun = require("mailgun-js");
 var api_key = 'YOUR_API_KEY';
 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
 
 var data = {
   from: 'Excited User <me@samples.mailgun.org>',
   to: 'alice@example.com',
   subject: 'Hello',
   text: 'Testing some Mailgun awesomeness!',
   "o:tracking": 'False'
 };
 
 mailgun.messages().send(data, function (error, body) {
   console.log(body);
 });
