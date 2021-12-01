
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages.mime \
      -F to='bob@example.com' \
      -F message=@files/message.mime

.. code-block:: java

 import java.io.File;

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode sendMIMEMessage() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/messages.mime")
             .basicAuth("api", API_KEY)
             .header("content-type", "multipart/form-data;")
             .field("from", "Excited User <USER@YOURDOMAIN.COM>")
             .field("to", "Megan@example.com")
             .field("subject", "Bah-weep-graaaaagnah wheep nini bong.")
             .field("message", new File("/temp/folder/file.mime"))
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

  $recipients = array(
      'bob@example.com',
      'alice@example.com',
      'john@example.com;
  );
  $params = array(
      'from' => 'Excited User <YOU@YOUR_DOMAIN_NAME>'
  );

  $mime_string = '<Pass fully formed MIME string here>'

  # Make the call to the client.
  $result = $mgClient->messages()->sendMime($domain, $recipients, $mime_string, $params);

.. code-block:: py

 def send_mime_message():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages.mime",
         auth=("api", "YOUR_API_KEY"),
         data={"to": "bar@example.com"},
         files={"message": open("files/message.mime")})

.. code-block:: rb

 def send_mime_message
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages.mime",
   :to => "bar@example.com",
   :message => File.new(File.join("files", "message.mime"))
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class SendMimeMessageChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (SendMimeMessage ().Content.ToString ());
     }

     public static IRestResponse SendMimeMessage ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/messages.mime";
         request.AddParameter ("to", "bar@example.com");
         request.AddFile ("message", Path.Combine ("files", "message.mime"));
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "os"
     "time"
 )

 func SendMimeMessage(domain, apiKey string) (string, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     mimeMsgReader, err := os.Open("files/message.mime")
     if err != nil {
         return "", err
     }

     m := mg.NewMIMEMessage(mimeMsgReader, "bar@example.com")

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     _, id, err := mg.Send(ctx, m)
     return id, err
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';
  const API_KEY = 'YOUR_API_KEY';
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const MailComposer = require('nodemailer/lib/mail-composer');

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({ username: 'api', key: API_KEY });

  (async () => {
    const mailOptions = {
      from: 'YOU@YOUR_DOMAIN_NAME',
      to: 'bob@example.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomeness!'
    };
    try {
      const mail = new MailComposer(mailOptions);
      const compiledMessage = await mail.compile().build();

      const res = await mg.messages.create(DOMAIN, {
        to: 'bob@example.com',
        message: compiledMessage
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  })();
