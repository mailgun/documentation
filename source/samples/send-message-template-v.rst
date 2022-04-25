
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
    -F from='Sender Bob <sbob@YOUR_DOMAIN_NAME>' \
    -F to='alice@example.com' \
    -F subject='Hello' \
    -F template='template.test' \
    -F v:title='API documentation' \
    -F v:body='Sending messages with templates'

.. code-block:: java

    import com.mailgun.api.v3.MailgunMessagesApi;
    import com.mailgun.model.message.Message;
    import com.mailgun.model.message.MessageResponse;

    import java.util.Map;

    // ...

    public MessageResponse sendMessageByTemplateId() {
        MailgunMessagesApi mailgunMessagesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMessagesApi.class);

        Map<String, String> mailgunVariables = Map.of(
                "title", "API Documentation",
                "body", "Sending messages with templates"
        );

        Message message = Message.builder()
            .from("Excited User <YOU@YOUR_DOMAIN_NAME>")
            .to("alice@example.com")
            .subject("Hello")
            .template(TEMPLATE_NAME)
            .tracking(false)
            .mailgunVariables(mailgunVariables)
            .build();

        return mailgunMessagesApi.sendMessage(YOUR_DOMAIN_NAME, message);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = "YOUR_DOMAIN_NAME";
  $params = array(
      'from'     => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'       => 'foo@example.com',
      'subject'  => 'Hello',
      'template' => 'template.test',
      'v:title'  => 'API Documentation',
      'v:body'   => 'Sending messages with templates'
  );
  # Make the call to the client.
  $result = $mgClient->messages()->send($domain, $params);

.. code-block:: py

 def send_message_by_template_id():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         data={"from": "Excited User <YOU@YOUR_DOMAIN_NAME>",
               "to": ["bar@example.com", "baz@example.com"],
               "subject": "Hello",
               "template": "template.test",
               "v:title": "API Documentation",
               "v:body": "Sending messages with templates"})

.. code-block:: rb

 def send_message_by_template_id
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
   :from => "Excited User <YOU@YOUR_DOMAIN_NAME>",
   :to => "bar@example.com, baz@example.com",
   :subject => "Hello",
   :template => "template.test",
   :"v:title" => "API Documentation",
   :"v:body" => "Sending messages with templates"
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
         request.AddParameter ("template", "template.test");
         request.AddParameter ("v:title": "API Documentation");
         request.AddParameter ("v:body": "Sending messages with templates");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not implemented yet

.. code-block:: js

  const API_KEY = 'YOUR_API_KEY';
  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);
  const client = mailgun.client({ username: 'api', key: API_KEY });
  const title = 'title value';
  const slug = 'slug value';

  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'alice@example.com',
    subject: `Email ${title}`,
    template: 'name-of-the-template-you-made-in-mailgun-web-portal',
    'v:title': title,
    'v:slug': slug
  };

  client.messages.create(DOMAIN, data).then((res) => {
    console.log(res);
  })
    .catch((err) => {
      console.error(err);
    });

