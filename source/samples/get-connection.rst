
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection

.. code-block:: java

 public static ClientResponse GetConnection() {
	Client client = Client.create();
	client.addFilter(new HTTPBasicAuthFilter("api",
			"YOUR_API_KEY"));
	WebResource webResource =
		client.resource("https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME" +
				"/connection");
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
  $result = $mgClient->get("domains/$domain/connection", array());

.. code-block:: py

 def get_connection():
     return requests.get(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_connection
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection"
 end

.. code-block:: csharp

using System;
using System.IO;
using RestSharp;
using RestSharp.Authenticators;

public class GetConnectionChunk
{

    public static void Main (string[] args)
    {
        Console.WriteLine (GetConnection ().Content.ToString ());
    }

    public static IRestResponse GetConnection ()
    {
        RestClient client = new RestClient ();
        client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
        client.Authenticator =
            new HttpBasicAuthenticator ("api",
                                        "YOUR_API_KEY");
        RestRequest request = new RestRequest ();
        request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
        request.Resource = "domains/{domain}/connection";
        return client.Execute (request);
    }

}
