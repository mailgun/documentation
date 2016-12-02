
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/unsubscribes

.. code-block:: java

 public static ClientResponse GetUnsubscribes() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME" +
 				"/unsubscribes");
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
  $result = $mgClient->get("$domain/unsubscribes", array(
      'limit' => 5,
      'skip' => 10
  ));

.. code-block:: py

 def get_unsubscribes():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/unsubscribes",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_unsubscribes
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/unsubscribes"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class GetUnsubscribesChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (GetUnsubscribes ().Content.ToString ());
     }
 
     public static IRestResponse GetUnsubscribes ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/unsubscribes";
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 func GetUnsubscribes(domain, apiKey string) (int, []mailgun.Unsubscribe, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetUnsubscribes(-1, -1)
 }
