
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks/click

.. code-block:: java

 public static ClientResponse GetDomain() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks/click);
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
  $result = $mgClient->get("$domain/webhooks/click");

.. code-block:: py

 def get_domain():
     return requests.get(
         "https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks/click",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_domain
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks/click"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 public static IRestResponse GetDomain() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
                            "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
       request.Resource = "/domains/{domain}/webhooks/click";
 	return client.Execute(request);
 }

.. code-block:: go

 func GetWebhook(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetWebhookByType("deliver")
 }
