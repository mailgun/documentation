
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' \
     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
     -F from='Excited User <YOU@YOUR_DOMAIN_NAME>' \
     -F to=alice@example.com \
     -F to=bob@example.com \
     -F recipient-variables='{"bob@example.com": {"first":"Bob", "id":1}, "alice@example.com": {"first":"Alice", "id": 2}}' \
     -F subject='Hey, %recipient.first%' \
     -F text='If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%'

.. code-block:: java

 import java.io.File;

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode sendTemplateMessage() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/messages")
             .basicAuth("api", API_KEY)
             .field("from", "Excited User <YOU@YOUR_DOMAIN_NAME>")
             .field("to", "alice@example.com")
             .field("to", "bob@example.com")
             .field("Subject", "Hello, %recipient.first%!")
             .field("text", "If you wish to unsubscribe, click <https://mailgun.com/unsubscribe/%recipient.id%>")
             .field("recipient-variables", "{\"bob@example.com\": {\"first\":\"Bob\", \"id\":1}, \"alice@example.com\": {\"first\":\"Alice\", \"id\": 2}}")
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain = "YOUR_DOMAIN_NAME";
  $params =  array(
      'from'    => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'      => array('bob@example.com, alice@example.com'),
      'subject' => 'Hey %recipient.first%',
      'text'    => 'If you wish to unsubscribe, click http://example.com/unsubscribe/%recipient.id%',
      'recipient-variables' => '{"bob@example.com": {"first":"Bob", "id":1},
                                 "alice@example.com": {"first":"Alice", "id": 2}}'
  );

  # Make the call to the client.
  $result = $mgClient->messages()-send($domain, $params);

.. code-block:: py

 def send_template_message():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         data={"from": "Excited User <YOU@YOUR_DOMAIN_NAME>",
               "to": ["alice@example.com, bob@example.com"],
               "subject": "Hey, %recipient.first%",
               "text": "If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%'",
               "recipient-variables": ('{"bob@example.com": {"first":"Bob", "id":1}, '
                                       '"alice@example.com": {"first":"Alice", "id": 2}}')})

.. code-block:: rb

 def send_template_message
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
   :from => "Excited User <YOU@YOUR_DOMAIN_NAME>",
   :to => "alice@example.com, bob@example.com",
   :subject => "Hey, %recipient.first%",
   :text => "If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%'",
   :'recipient-variables' => '{"bob@example.com": {"first":"Bob", "id":1}, "alice@example.com": {"first":"Alice", "id": 2}}'
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class SendTemplateMessageChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (SendTemplateMessage ().Content.ToString ());
     }

     public static IRestResponse SendTemplateMessage ()
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
         request.AddParameter ("to", "alice@example.com");
         request.AddParameter ("to", "bob@example.com");
         request.AddParameter ("subject", "Hey, %recipient.first%");
         request.AddParameter ("text",
                               "If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%'");
         request.AddParameter ("recipient-variables",
                               "{\"bob@example.com\": {\"first\":\"Bob\", \"id\":1}, \"alice@example.com\": {\"first\":\"Alice\", \"id\": 2}}");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func SendTemplateMessage(domain, apiKey string) (string, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     m := mg.NewMessage(
         "Excited User <YOU@YOUR_DOMAIN_NAME>",
         "Hey %recipient.first%",
         "If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%",
     ) // IMPORTANT: No To:-field recipients!

     m.AddRecipientAndVariables("bob@example.com", map[string]interface{}{
         "first": "bob",
         "id":   1,
     })

     m.AddRecipientAndVariables("alice@example.com", map[string]interface{}{
         "first": "alice",
         "id":   2,
     })

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     _, id, err := mg.Send(ctx, m)
     return id, err
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 var data = {
   from: 'Excited User <me@samples.mailgun.org>',
   to: 'alice@example.com, bob@example.com',
   subject: 'Hey %recipient.first%',
   text: 'If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%',
       'recipient-variables': '{"alice@example.com": {"first":"Alice", "id":1}, "bob@example.com":{"first":"Bob", "id":2}}'
 };

 mailgun.messages().send(data, function (error, body) {
   console.log(body);
 });
