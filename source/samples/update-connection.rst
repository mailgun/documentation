
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection
	-F require_tls='true' \
	-F skip_verification='false'

.. code-block:: java

 public static ClientResponse UpdateConnection() {
	Client client = Client.create();
	client.addFilter(new HTTPBasicAuthFilter("api",
			"YOUR_API_KEY"));
	WebResource webResource =
		client.resource("https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection");
	MultivaluedMapImpl formData = new MultivaluedMapImpl();
	formData.add("require_tls", true);
	formData.add("skip_verification", false);
	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
		put(ClientResponse.class, formData);

 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');

  # Issue the call to the client.
  $result = $mgClient->put("domains/$domain/connection", array(
      'require_tls'       => 'true',
      'skip_verification' => 'false'
  ));

.. code-block:: py

 def update_connection():
     return requests.put(
         ("https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection"),
         auth=('api', 'YOUR_API_KEY'),
         data={'require_tls': True,
               'skip_verification': False})

.. code-block:: rb

 def update_member
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection",
                  :require_tls => true,
                  :skip_verification => false)
 end

.. code-block:: csharp

  using System;
  using System.IO;
  using RestSharp;
  using RestSharp.Authenticators;
  
  public class UpdateConnectionChunk
  {
  
      public static void Main (string[] args)
      {
          Console.WriteLine (UpdateConnection ().Content.ToString ());
      }
  
      public static IRestResponse UpdateConnection ()
      {
          RestClient client = new RestClient ();
          client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
          client.Authenticator =
              new HttpBasicAuthenticator ("api",
                                          "YOUR_API_KEY");
          RestRequest request = new RestRequest ();
          request.Resource = "domains/YOUR_DOMAIN_NAME/connection";
          request.AddParameter ("require_tls", true);
          request.AddParameter ("skip_verification", false);
          request.Method = Method.PUT;
          return client.Execute (request);
      }
  
  }
