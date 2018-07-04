
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
	-F from='Sender Bob <sbob@YOUR_DOMAIN_NAME>' \
	-F to='alice@example.com' \
	-F subject='Hello' \
	-F template='bcgpf36d2q100094buc0' \
        -F v:title='API Documentation' \
        -F v:body='Sending messages with template id'

.. code-block:: java

 import java.io.File;

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode sendMessageByTemplateId() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/messages")
            .basicAuth("api", API_KEY)
            .queryString("from", "Excited User <YOU@YOUR_DOMAIN_NAME>")
 			.queryString("to", "alice@example.com")
 	        .queryString("subject", "Hello")
            .queryString("template", "bcgpf36d2q100094buc0")
 		    .field("o:tracking", "False")
            .field("v:title", "API Documentation")
 		    .asJson("v:body", "Sending messages with template id");

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
      'template'   => 'bcgpf36d2q100094buc0',
      'v:title'    => 'API Documentation',
      'v:body'     => 'Sending messages with template id'
  ));

.. code-block:: py

 def send_message_by_template_id():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         data={"from": "Excited User <YOU@YOUR_DOMAIN_NAME>",
               "to": ["bar@example.com", "baz@example.com"],
               "subject": "Hello",
               "template": "bcgpf36d2q100094buc0",
               "v:title": "API Documentation",
               "v:body": "Sending messages with tempalte id"})

.. code-block:: rb

 def send_message_by_template_id
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
   :from => "Excited User <YOU@YOUR_DOMAIN_NAME>",
   :to => "bar@example.com, baz@example.com",
   :subject => "Hello",
   :template => "bcgpf36d2q100094buc0",
   "v:title" => "API Documentation",
   "v:body" => "Sending messages with template id"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class SendMessageByTemplateIdChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (SendMessageByTemplateId ().Content.ToString ());
     }

     public static IRestResponse SendMessageByTemplateId ()
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
         request.AddParameter ("template", "bcgpf36d2q100094buc0");
         request.AddParameter ("v:title", "API Documentation");
         request.AddParameter ("v:body", "Sending messages with template id");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not implemented yet

.. code-block:: js

 var mailgun = require("mailgun-js");
 var api_key = 'YOUR_API_KEY';
 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

 var data = {
   from: 'Excited User <me@samples.mailgun.org>',
   to: 'alice@example.com',
   subject: 'Hello',
   template: 'bcgpf36d2q100094buc0',
   "v:title": "API Documentation",
   "v:body": "Sending messages with template id"
 };

 mailgun.messages().send(data, function (error, body) {
   console.log(body);
 });

