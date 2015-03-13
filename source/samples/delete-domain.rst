
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/domains/example.mailgun.org

.. code-block:: java

 public static ClientResponse DeleteDomain() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2" +
 				"/domains/example.mailgun.org");
 	return webResource.delete(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'example.mailgun.org';

  # Issue the call to the client.
  $result = $mgClient->delete("domains/$domain");

.. code-block:: py

 def delete_domain():
     return requests.delete(
         "https://api.mailgun.net/v3/domains/example.mailgun.org",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_domain
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/example.mailgun.org"
 end

.. code-block:: csharp

 public static IRestResponse DeleteDomain() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v2");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "/domains/{name}";
 	request.AddUrlSegment("name", "example.mailgun.org");
 	request.Method = Method.DELETE;
 	return client.Execute(request);
 }

.. code-block:: go

 func DeleteDomain(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.DeleteDomain("subdomain.example.com")
 }
