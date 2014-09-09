
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	https://api.mailgun.net/v2/samples.mailgun.org/bounces/foo@bar.com

.. code-block:: java

 public static ClientResponse GetBounce() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org/" +
 				"bounces/foo@bar.com");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';
  $bounce = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/bounces/$bounce");

.. code-block:: py

 def get_bounce():
     return requests.get(
         "https://api.mailgun.net/v2/samples.mailgun.org/bounces/foo@bar.com",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"))

.. code-block:: rb

 def get_bounce
   RestClient.get("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
                  "@api.mailgun.net/v2/samples.mailgun.org/bounces"\
                  "/foo@bar.com"){|response, request, result| response }
 end

.. code-block:: csharp

 public static IRestResponse GetBounce() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "{domain}/bounces/foo@bar.com";
 	return client.Execute(request);
 }

.. code-block:: go

 func GetBounce(domain, apiKey string) (mailgun.Bounce, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetSingleBounce("foo@bar.com")
 }
