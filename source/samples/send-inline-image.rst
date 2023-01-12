
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

    import com.mailgun.api.v3.MailgunMessagesApi;
    import com.mailgun.model.message.Message;
    import com.mailgun.model.message.MessageResponse;

    // ...

    public MessageResponse sendInlineImage() {
        MailgunMessagesApi mailgunMessagesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMessagesApi.class);

        Message message = Message.builder()
            .from("Excited User <USER@YOURDOMAIN.COM>")
            .to("alice@example.com")
            .to("bob@example.com")
            .cc("joe@example.com")
            .subject("Hello")
            .html("<html>Inline image here: <img src=\"cid:test.jpg\"></html>")
            .inline(new File("/path/to/test.jpg"))
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
       'text'    => 'Testing some Mailgun awesomness!',
       'html'    => '<html>Inline image: <img src="cid:test.jpg"></html>',
       'inline' => array(
           array('filePath' => '/path/to/test.jpg')
        )
 );

  # Make the call to the client.
  $result = $mgClient->messages()->send($domain, $params);

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
     m.SetHtml(`<html>Inline image here: <img alt="image" src="cid:test.jpg"/></html>`)
     m.AddInline("files/test.jpg")

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     _, id, err := mg.Send(ctx, m)
     return id, err
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const fsPromises = require('fs').promises;
  const path = require('path');

  const mailgun = new Mailgun(formData);
  const filepath = path.resolve(__dirname, './test.jpg');

  const messageData = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'foo@example.com, baz@example.com, bar@example.com',
    subject: 'Hello',
    html: '<html>Inline image here: <img alt="image" id="1" src="cid:test.jpg"/></html> Some extra text'
  };

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  fsPromises.readFile(filepath)
    .then((data) => {
      const file = {
        filename: 'test.jpg',
        data
      };

      messageData.inline = file;
      return client.messages.create(DOMAIN, messageData);
    })
    .then((response) => {
      console.log(response);
    });
