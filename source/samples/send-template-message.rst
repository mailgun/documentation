
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

    import java.util.List;
    import java.util.Map;

    import com.mailgun.api.v3.MailgunMessagesApi;
    import com.mailgun.model.message.Message;
    import com.mailgun.model.message.MessageResponse;

    // ...

    public MessageResponse sendTemplateMessage() {
        MailgunMessagesApi mailgunMessagesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMessagesApi.class);

        Map<String, Object> aliceVars = Map.of(
                "name", "Alice",
                "id", 1
        );

        Map<String, Object> bobVars = Map.of(
                "name", "Bob",
                "id", 2
        );

        Map<String, Map<String, Object>> recipientVariables = Map.ofEntries(
                Map.entry("alice@example.com", aliceVars),
                Map.entry("bob@example.com", bobVars)
        );

        Message message = Message.builder()
            .from("Excited User <USER@YOURDOMAIN.COM>")
            .to(List.of("alice@example.com", "bob@example.com"))
            .subject("Hey %recipient.name%")
            .text("If you wish to unsubscribe, click <https://mailgun.com/unsubscribe/%recipient.id%>")
            .recipientVariables(recipientVariables)
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

  const API_KEY = 'YOUR_API_KEY';
  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);
  const client = mailgun.client({username: 'api', key: API_KEY});

  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: ['alice@example.com', 'bob@example.com'],
    subject: 'Hey %recipient.name%',
    text: 'If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.recipientId%',
    'recipient-variables': JSON.stringify({
      'alice@example.com': {
        name: 'Alice',
        recipientId: 1
      },
      'bob@example.com':
      {
        name: 'Bob',
        recipientId: 2
      }
    })
  };

 client.messages.create(DOMAIN, data)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
