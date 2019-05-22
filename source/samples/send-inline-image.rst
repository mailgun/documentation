
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
      -F from='Excited User <YOU@YOUR_DOMAIN_NAME>' \
      -F to='alice@example.com' \
      -F subject='Hello' \
      -F text='Testing some Mailgun awesomness!' \
      --form-string html='<html>Inline image here: <img src="cid:cartman.jpg"></html>' \
      -F inline=@files/cartman.jpg

.. code-block:: java

 import java.io.File;

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode sendInlineImage() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/messages")
             .basicAuth("api", API_KEY)
             .field("from", "Excited User <YOU@YOUR_DOMAIN_NAME>")
             .field("to", "alice@example.com")
             .field("to", "bob@example.com")
             .field("cc", "joe@example.com")
             .field("subject", "Hello")
             .field("text", "Testing out some Mailgun awesomeness!")
             .field("html", "<html>Inline image here: <img src=\"cid:test.jpg\"></html>")
             .field("inline", new File("/path/to/test.jpg"))
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
      'from'    => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'      => 'foo@example.com',
      'cc'      => 'baz@example.com',
      'bcc'     => 'bar@example.com',
      'subject' => 'Hello',
      'text'    => 'Testing some Mailgun awesomness!',
      'html'    => '<html>Inline image: <img src="cid:test.jpg"></html>'
  ), array(
      'inline' => array('/path/to/test.jpg')
  ));

.. code-block:: py

 def send_inline_image():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         files=[("inline", open("files/test.jpg"))],
         data={"from": "Excited User <YOU@YOUR_DOMAIN_NAME>",
               "to": "bar@example.com",
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!",
               "html": '<html>Inline image here: <img src="cid:test.jpg"></html>'})

.. code-block:: rb

 def send_inline_image
   data = {}
   data[:from] = "Excited User <YOU@YOUR_DOMAIN_NAME>"
   data[:to] = "bar@example.com"
   data[:subject] = "Hello"
   data[:text] = "Testing some Mailgun awesomness!"
   data[:html] = '<html>Inline image here: <img src="cid:test.jpg"></html>'
   data[:inline] = File.new(File.join("files", "test.jpg"))
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages", data
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class SendInlineImageChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (SendInlineImage ().Content.ToString ());
     }

     public static IRestResponse SendInlineImage ()
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
         request.AddParameter ("to", "baz@example.com");
         request.AddParameter ("subject", "Hello");
         request.AddParameter ("text", "Testing some Mailgun awesomness!");
         request.AddParameter ("html",
                               "<html>Inline image here: <img src=\"cid:test.jpg\"></html>");
         request.AddFile ("inline", "files/test.jpg");
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

 func SendInlineImage(domain, apiKey string) (string, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     m := mg.NewMessage(
         "Excited User <YOU@YOUR_DOMAIN_NAME>",
         "Hello",
         "Testing some Mailgun awesomeness!",
         "foo@example.com",
     )
     m.AddCC("baz@example.com")
     m.AddBCC("bar@example.com")
     m.SetHtml("<html>HTML version of the body</html>")
     m.AddInline("files/test.jpg")
     m.AddInline("files/test.txt")

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     _, id, err := mg.Send(ctx, m)
     return id, err
 }

.. code-block:: js

 const path = require('path');
 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 var filepath = path.join(__dirname, 'test.jpg');

 var data = {
   from: 'Excited User <me@samples.mailgun.org>',
   to: 'foo@example.com, baz@example.com, bar@example.com',
   cc: 'baz@example.com',
   bcc: 'bar@example.com',
   subject: 'Hello',
   text: 'Testing some Mailgun awesomness!',
   html: '<html>Inline image here:<img src="cid:test.jpg"></html>',
   inline: filepath
 };

 mailgun.messages().send(data, function (error, body) {
   console.log(body);
 });
