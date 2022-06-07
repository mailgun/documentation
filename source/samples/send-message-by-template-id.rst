
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
    -F from='Sender Bob <sbob@YOUR_DOMAIN_NAME>' \
    -F to='alice@example.com' \
    -F subject='Hello' \
    -F template='template.test' \
    -F t:variables='{"title": "API documentation", "body": "Sending messages with templates"}'

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
            .field("from", "Excited User <YOU@YOUR_DOMAIN_NAME>")
            .field("to", "alice@example.com")
            .field("subject", "Hello")
            .field("template", "template.test")
            .field("o:tracking", "False")
            .field("t:variables", "{\"title\": \"API Documentation\", \"body\": \"Sending messages with templates\"}")
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
  $params = array(
      'from'                  => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'                    => 'bob@example.com',
      'subject'               => 'Hello',
      'template'              => 'template.test',
      't:variables' => '{"title": "API Documentation", "body": "Sending messages with templates"}'
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
               "t:variables": json.dumps({"title": "API documentation", "body": "Sending messages with templates"}))

.. code-block:: rb

 def send_message_by_template_id
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
   :from => "Excited User <YOU@YOUR_DOMAIN_NAME>",
   :to => "bar@example.com, baz@example.com",
   :subject => "Hello",
   :template => "template.test",
   :"t:variables" => '{"title": "API Documentation", "body": "Sending messages with template"}'
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
         request.AddParameter ("t:variables", "{\"title\": \"API Documentation\", \"body\": \"Sending messages with templates\"}");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

  import (
    "context"
    "encoding/json"
    "github.com/mailgun/mailgun-go"
    "time"
  )


  func SendMessageWithTemplate() (id string , err error) {
    mg := mailgun.NewMailgun("YOUR_DOMAIN_NAME", "YOUR_API_KEY")
    ctx, cancel := context.WithTimeout(context.Background(), time.Second * 30)
    defer cancel()

    m := mg.NewMessage("Excited User <YOU@YOUR_DOMAIN_NAME>", "???", "")
    m.SetTemplate("template.test")
    if err := m.AddRecipient("bar@example.com"); err != nil {
      return "", err
    }

    vars, err := json.Marshal(map[string]string{
        "title": "API Documentation",
        "body":  "Sending messages with templates",
    })
    if err != nil {
      return "", err
    }
    m.AddHeader("X-Mailgun-Template-Variables", string(vars))

    _, id, err := mg.Send(ctx, m)
    return
  }

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
    't:variables': JSON.stringify({ // be sure to stringify your payload
      title,
      slug,
    })
  };

  client.messages.create(DOMAIN, data).then((res) => {
    console.log(res);
  })
    .catch((err) => {
      console.error(err);
    });


