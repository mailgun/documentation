.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
	-F from='Excited User <mailgun@YOUR_DOMAIN_NAME>' \
	-F to=YOU@YOUR_DOMAIN_NAME \
	-F to=bar@example.com \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomness!'

.. code-block:: java

 public static ClientResponse SendSimpleMessage() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME" +
 				"/messages");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("from", "Excited User <mailgun@YOUR_DOMAIN_NAME>");
 	formData.add("to", "bar@example.com");
 	formData.add("to", "YOU@YOUR_DOMAIN_NAME");
 	formData.add("subject", "Hello");
 	formData.add("text", "Testing some Mailgun awesomness!");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		post(ClientResponse.class, formData);
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
      'from'    => 'Excited User <mailgun@YOUR_DOMAIN_NAME>',
      'to'      => 'Baz <YOU@YOUR_DOMAIN_NAME>',
      'subject' => 'Hello',
      'text'    => 'Testing some Mailgun awesomness!'
  ));

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

 func SendSimpleMessage(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, publicApiKey)
   m := mg.NewMessage(
     "Excited User <mailgun@YOUR_DOMAIN_NAME>", 
     "Hello", 
     "Testing some Mailgun awesomeness!", 
     "YOU@YOUR_DOMAIN_NAME",
   )
   _, id, err := mg.Send(m)
   return id, err
 }
