
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/bounces \
        -d skip=1 \
        -d limit=1

.. code-block:: java

 public static ClientResponse GetBounces() {
  Client client = new Client();
  client.addFilter(new HTTPBasicAuthFilter("api",
      "YOUR_API_KEY"));
  WebResource webResource =
    client.resource("https://api.mailgun.net/v2/YOUR_DOMAIN_NAME" +
        "/bounces");
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
  $result = $mgClient->get("$domain/bounces", array('skip' => 0, 'limit' => 50));

.. code-block:: py

 def get_bounces():
     return requests.get(
         "https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/bounces",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_bounces
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/YOUR_DOMAIN_NAME/bounces"
 end

.. code-block:: csharp

 public static IRestResponse GetBounces() {
  RestClient client = new RestClient();
  client.BaseUrl = "https://api.mailgun.net/v2";
  client.Authenticator =
    new HttpBasicAuthenticator("api",
                               "YOUR_API_KEY");
  RestRequest request = new RestRequest();
  request.AddParameter("domain",
                       "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
  request.Resource = "{domain}/bounces";
  return client.Execute(request);
 }

.. code-block:: go

 func GetBounces(domain, apiKey string) (int, []mailgun.Bounce, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   total, bounces, err := mg.GetBounces(-1, -1)
   return total, bounces, err
 }
