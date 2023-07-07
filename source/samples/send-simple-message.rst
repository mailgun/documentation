.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
      -F from='Excited User <mailgun@YOUR_DOMAIN_NAME>' \
      -F to=YOU@YOUR_DOMAIN_NAME \
      -F to=bar@example.com \
      -F subject='Hello' \
      -F text='Testing some Mailgun awesomeness!'

.. code-block:: java

    import com.mailgun.api.v3.MailgunMessagesApi;
    import com.mailgun.model.message.Message;
    import com.mailgun.model.message.MessageResponse;

    // ...

    public MessageResponse sendSimpleMessage() {
        MailgunMessagesApi mailgunMessagesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMessagesApi.class);

        Message message = Message.builder()
            .from("Excited User <USER@YOURDOMAIN.COM>")
            .to("artemis@example.com")
            .subject("Hello")
            .text("Testing out some Mailgun awesomeness!")
            .build();

        return mailgunMessagesApi.sendMessage(YOUR_DOMAIN_NAME, message);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain = "YOUR_DOMAIN_NAME";
  $params = array(
    'from'    => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
    'to'      => 'bob@example.com',
    'subject' => 'Hello',
    'text'    => 'Testing some Mailgun awesomness!'
  );

  # Make the call to the client.
  $mgClient->messages()->send($domain, $params);

.. code-block:: py

 def send_simple_message():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         data={"from": "Excited User <mailgun@YOUR_DOMAIN_NAME>",
               "to": ["bar@example.com", "YOU@YOUR_DOMAIN_NAME"],
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!"})

.. code-block:: rb

 def send_simple_message
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
   :from => "Excited User <mailgun@YOUR_DOMAIN_NAME>",
   :to => "bar@example.com, YOU@YOUR_DOMAIN_NAME",
   :subject => "Hello",
   :text => "Testing some Mailgun awesomness!"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class SendSimpleMessageChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (SendSimpleMessage ().Content.ToString ());
     }

     public static IRestResponse SendSimpleMessage ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/messages";
         request.AddParameter ("from", "Excited User <mailgun@YOUR_DOMAIN_NAME>");
         request.AddParameter ("to", "bar@example.com");
         request.AddParameter ("to", "YOU@YOUR_DOMAIN_NAME");
         request.AddParameter ("subject", "Hello");
         request.AddParameter ("text", "Testing some Mailgun awesomness!");
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

 func SendSimpleMessage(domain, apiKey string) (string, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     m := mg.NewMessage(
         "Excited User <mailgun@YOUR_DOMAIN_NAME>",
         "Hello",
         "Testing some Mailgun awesomeness!",
         "YOU@YOUR_DOMAIN_NAME",
     )

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     _, id, err := mg.Send(ctx, m)
     return id, err
 }

.. code-block:: js

 const API_KEY = 'YOUR_API_KEY';
 const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

 const mailgun = new Mailgun(formData);
 const client = mailgun.client({username: 'api', key: API_KEY});

 const messageData = {
   from: 'Excited User <me@samples.mailgun.org>',
   to: 'foo@example.com, bar@example.com',
   subject: 'Hello',
   text: 'Testing some Mailgun awesomeness!'
 };

 client.messages.create(DOMAIN, messageData)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
