
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	https://api.mailgun.net/v2/samples.mailgun.org/unsubscribes

.. code-block:: java

 public static ClientResponse GetUnsubscribes() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
 				"/unsubscribes");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/unsubscribes", array(
      'limit' => 5,
      'skip' => 10
  ));

.. code-block:: py

 def get_unsubscribes():
     return requests.get(
         "https://api.mailgun.net/v2/samples.mailgun.org/unsubscribes",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"))

.. code-block:: rb

 def get_unsubscribes
   RestClient.get "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/unsubscribes"
 end

.. code-block:: csharp

 public static IRestResponse GetUnsubscribes() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "{domain}/unsubscribes";
 	return client.Execute(request);
 }

.. code-block:: go

 func GetUnsubscribes(domain, apiKey string) (int, []mailgun.Unsubscribe, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetUnsubscribes(-1, -1)
 }
