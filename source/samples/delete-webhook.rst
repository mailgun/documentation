
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks/click

.. code-block:: java

 public static ClientResponse DeleteDomain() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2" +
 				"/domains/YOUR_DOMAIN_NAME/webhooks/click");
 	return webResource.delete(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->delete("$domain/webhooks/click");

.. code-block:: py

 def delete_domain():
     return requests.delete(
         "https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks/click",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_domain
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks/click"
 end

.. code-block:: csharp

 public static IRestResponse DeleteDomain() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v2");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "/domains/{name}/webhooks/click";
 	request.AddUrlSegment("name", "YOUR_DOMAIN_NAME");
 	request.Method = Method.DELETE;
 	return client.Execute(request);
 }

.. code-block:: go

 func DeleteWebhook(t *testing.T) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.DeleteWebhook("deliver")
 }

