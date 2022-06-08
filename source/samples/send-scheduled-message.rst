
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
      -F from='Sender Bob <sbob@YOUR_DOMAIN_NAME>' \
      -F to='alice@example.com' \
      -F subject='Hello' \
      -F text='Testing some Mailgun awesomness!' \
      -F o:deliverytime='Fri, 14 Oct 2011 23:10:10 -0000'

.. code-block:: java

    import com.mailgun.api.v3.MailgunMessagesApi;
    import com.mailgun.model.message.Message;
    import com.mailgun.model.message.MessageResponse;

    import java.time.ZonedDateTime;

    // ...

    public MessageResponse sendScheduledMessage() {
        MailgunMessagesApi mailgunMessagesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMessagesApi.class);

        Message message = Message.builder()
            .from("Excited User <USER@YOURDOMAIN.COM>")
            .to("bruce@example.com")
            .subject("Hello")
            .text("Testing out some Mailgun awesomeness!")
            .deliveryTime(ZonedDateTime.now().plusHours(2L)) // Two hours delay.
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
      'from'           => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'             => 'bob@example.com',
      'subject'        => 'Hello',
      'text'           => 'Testing some Mailgun awesomness!',
      'o:deliverytime' => 'Wed, 01 Jan 2020 09:00:00 -0000'
  );

  # Make the call to the client.
  $result = $mgClient->messages()->send($domain, $params);

.. code-block:: py

 def send_scheduled_message():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         data={"from": "Excited User <YOU@YOUR_DOMAIN_NAME>",
               "to": "bar@example.com",
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!",
               "o:deliverytime": "Fri, 25 Oct 2011 23:10:10 -0000"})

.. code-block:: rb

 def send_scheduled_message
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
   :from => "Excited User <YOU@YOUR_DOMAIN_NAME>",
   :to => "bar@example.com",
   :subject => "Hello",
   :text => "Testing some Mailgun awesomeness!",
   "o:deliverytime" => "Fri, 25 Oct 2011 23:10:10 -0000"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class SendScheduledMessageChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (SendScheduledMessage ().Content.ToString ());
     }

     public static IRestResponse SendScheduledMessage ()
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
         request.AddParameter ("subject", "Hello");
         request.AddParameter ("text", "Testing some Mailgun awesomness!");
         request.AddParameter ("o:deliverytime",
                               "Fri, 14 Oct 2011 23:10:10 -0000");
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

 func SendScheduledMessage(domain, apiKey string) (string, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     m := mg.NewMessage(
         "Excited User <YOU@YOUR_DOMAIN_NAME>",
         "Hello",
         "Testing some Mailgun awesomeness!",
         "bar@example.com",
     )
     m.SetDeliveryTime(time.Now().Add(5 * time.Minute))

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     _, id, err := mg.Send(ctx, m)
     return id, err
 }

.. code-block:: js

  const API_KEY = 'YOUR_API_KEY';
  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);
  const client = mailgun.client({username: 'api', key: API_KEY});

  const messageData = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'alice@example.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!',
    "o:deliverytime": 'Fri, 6 Jul 2017 18:10:10 -0000'
  };

  client.messages.create(YOUR_DOMAIN_NAME, messageData)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
