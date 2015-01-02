.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
        https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/events

.. code-block:: java

 public static ClientResponse GetLogs() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("
        https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/events");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';

  # Make the call to the client.
  $result = $mgClient->get("$domain/events");

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/events",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/YOUR_DOMAIN_NAME/events"}
 end

.. code-block:: csharp

 public static IRestResponse GetLogs() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.Resource = "{domain}/events";
 	return client.Execute(request);
 }

.. code-block:: go

 // coming soon
