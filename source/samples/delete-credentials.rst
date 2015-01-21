
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/credentials/alice

.. code-block:: java

 public static ClientResponse DeleteCredentials() {
  Client client = Client.create();
  client.addFilter(new HTTPBasicAuthFilter("api",
      "YOUR_API_KEY"));
  WebResource webResource =
    client.resource("https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME" +
        "/credentials/alice");
  return webResource.delete(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';
  $login = 'alice';

  # Issue the call to the client.
  $result = $mgClient->delete("domains/$domain/credentials/$login");

.. code-block:: py

 def delete_credentials():
     return requests.delete(
         "https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/credentials/alice",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_credentials
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/credentials/alice"
 end

.. code-block:: csharp

 public static IRestResponse DeleteCredentials() {
  RestClient client = new RestClient();
  client.BaseUrl = new Uri("https://api.mailgun.net/v2");
  client.Authenticator =
    new HttpBasicAuthenticator("api",
                               "YOUR_API_KEY");
  RestRequest request = new RestRequest();
  request.AddParameter("domain",
                       "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
  request.Resource = "domains/{domain}/credentials/{login}";
  request.AddUrlSegment("login", "alice");
  request.Method = Method.DELETE;
  return client.Execute(request);
 }

.. code-block:: go

 func DeleteCredential(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.DeleteCredential("alice")
 }
