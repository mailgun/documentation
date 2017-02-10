
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
	-F from='Sender Bob <sbob@YOUR_DOMAIN_NAME>' \
	-F to='alice@example.com' \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomness!' \
	-F o:deliverytime='Fri, 14 Oct 2011 23:10:10 -0000'

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

     public static ClientResponse SendScheduled() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         Form reqData = new Form();
         reqData.param("from", "Excited User <YOU@YOUR_DOMAIN_NAME>");
         reqData.param("to", "alice@example.com");
         reqData.param("subject", "Hello");
         reqData.param("text", "Testing out some Mailgun awesomeness!");
         reqData.param("o:deliverytime", "Fri, 14 Oct 2011 23:10:10 -0000");

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
      'from'           => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'             => 'Baz <baz@example.com>',
      'subject'        => 'Hello',
      'text'           => 'Testing some Mailgun awesomness!',
      'o:deliverytime' => 'Fri, 25 Oct 2013 23:10:10 -0000'
  ));

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

 func SendScheduledMessage(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, publicApiKey)
   m := mg.NewMessage(
     "Excited User <YOU@YOUR_DOMAIN_NAME>", 
     "Hello", 
     "Testing some Mailgun awesomeness!", 
     "bar@example.com",
   )
   m.SetDeliveryTime(time.Now().Add(5 * time.Minute))
   _, id, err := mg.Send(m)
   return id, err
 }
