
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
	-F from='Sender Bob <sbob@YOUR_DOMAIN_NAME>' \
	-F to='alice@example.com' \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomness!' \
	-F o:tracking=False

.. code-block:: java

 public static ClientResponse SendMessageNoTracking() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME" +
 				"/messages");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("from", "Excited User <YOU@YOUR_DOMAIN_NAME>");
 	formData.add("to", "bar@example.com");
 	formData.add("to", "baz@example.com");
 	formData.add("subject", "Hello");
 	formData.add("text", "Testing some Mailgun awesomness!");
 	formData.add("o:tracking", false);
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
      'from'       => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'         => 'foo@example.com',
      'subject'    => 'Hello',
      'text'       => 'Testing some Mailgun awesomness!',
      'o:tracking' => false
  ));

.. code-block:: py

 def send_message_no_tracking():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         data={"from": "Excited User <YOU@YOUR_DOMAIN_NAME>",
               "to": ["bar@example.com", "baz@example.com"],
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!",
               "o:tracking": False})

.. code-block:: rb

 def send_message_no_tracking
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
   :from => "Excited User <YOU@YOUR_DOMAIN_NAME>",
   :to => "bar@example.com, baz@example.com",
   :subject => "Hello",
   :text => "Testing some Mailgun awesomness!",
   "o:tracking" => false
 end

.. code-block:: csharp

  using System;
  using System.IO;
  using RestSharp;
  using RestSharp.Authenticators;
  
  public class SendMessageNoTrackingChunk
  {
  
      public static void Main (string[] args)
      {
          Console.WriteLine (SendMessageNoTracking ().Content.ToString ());
      }
  
      public static IRestResponse SendMessageNoTracking ()
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
          request.AddParameter ("text", "Testing some Mailgun awesomness!");
          request.AddParameter ("o:tracking", false);
          request.Method = Method.POST;
          return client.Execute (request);
      }
  
  }

.. code-block:: go

 func SendMessageNoTracking(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   m := mg.NewMessage(
     "Excited User <YOU@YOUR_DOMAIN_NAME>",
     "Hello",
     "Testing some Mailgun awesomeness!",
     "foo@example.com",
   )
   m.SetTracking(false)
   _, id, err := mg.Send(m)
   return id, err
 }
