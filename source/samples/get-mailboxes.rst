
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes

.. code-block:: java

 public static ClientResponse GetMailboxes() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME" +
 				"/mailboxes");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/mailboxes", array(
      'limit' => 5,
      'skip'  => 10
  ));

.. code-block:: py

 def get_mailboxes():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_mailboxes
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class GetMailboxesChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (GetMailboxes ().Content.ToString ());
     }
 
     public static IRestResponse GetMailboxes ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/mailboxes";
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 // Not supported
