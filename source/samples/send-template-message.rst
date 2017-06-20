
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

 import javax.ws.rs.client.Client;
 import javax.ws.rs.client.ClientBuilder;
 import javax.ws.rs.client.Entity;
 import javax.ws.rs.client.WebTarget;

 import javax.ws.rs.core.Form;
 import javax.ws.rs.core.MediaType;

 import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;

 public class MGSample {

     // ...

     public static ClientResponse SendTemplate() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         Form reqData = new Form();
         reqData.param("from", "Excited User <YOU@YOUR_DOMAIN_NAME>");
         reqData.param("to", "alice@example.com");
         reqData.param("to", "bob@example.com");
         reqData.param("subject", "Hello, %recipient.first%!");
         reqData.param("text", "If you wish to unsubscribe, click <http://mailgun.com/unsubscribe/%recipient.id%>");
         reqData.param("recipient-variables", "{\"bob@example.com\": {\"first\":\"Bob\", \"id\":1}, \"alice@example.com\": {\"first\":\"Alice\", \"id\": 2}}");

         return mgRoot
             .path("/{domain}/messages")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
             .request(MediaType.APPLICATION_FORM_URLENCODED)
             .buildPost(Entity.entity(reqData, MediaType.APPLICATION_FORM_URLENCODED))
             .invoke(ClientResponse.class);
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
      'to'      => array('bob@example.com, alice@example.com'),
      'subject' => 'Hey %recipient.first%',
      'text'    => 'If you wish to unsubscribe,
                            click http://mailgun/unsubscribe/%recipient.id%',
              'recipient-variables' => '{"bob@example.com": {"first":"Bob", "id":1},
                                         "alice@example.com": {"first":"Alice", "id": 2}}'
  ));

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

 var recipients = []struct {
   Id          int
   Name, Email string
 }{
   {1, "Bob", bob@example.com"},
   {2, "Alice", alice@example.com"},
 }

 func SendTemplateMessage(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   m := mg.NewMessage(
     "Excited User <YOU@YOUR_DOMAIN_NAME>",
     "Hey %recipient.first%",
     "If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%",
   ) // IMPORTANT: No To:-field recipients!
   for _, recipient := range recipients {
     err := m.AddRecipientAndVariables(recipient.Email, map[string]interface{}{
       "name": recipient.Name,
       "id":   recipient.Id,
     })
     if err != nil {
       return "", err
     }
   }
   _, id, err = mg.Send(m)
   return id, err
 }
