
.. code-block:: bash

 curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -X DELETE \
     https://api.mailgun.net/v2/domains/samples.mailgun.org/credentials/alice

.. code-block:: java

 public static ClientResponse DeleteCredentials() {
  Client client = Client.create();
  client.addFilter(new HTTPBasicAuthFilter("api",
      "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
  WebResource webResource =
    client.resource("https://api.mailgun.net/v2/domains/samples.mailgun.org" +
        "/credentials/alice");
  return webResource.delete(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';
  $login = 'alice';

  # Issue the call to the client.
  $result = $mgClient->delete("domains/$domain/credentials/$login");

.. code-block:: py

 def delete_credentials():
     return requests.delete(
         "https://api.mailgun.net/v2/domains/samples.mailgun.org/credentials/alice",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"))

.. code-block:: rb

 def delete_credentials
   RestClient.delete "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/domains/samples.mailgun.org/credentials/alice"
 end

.. code-block:: csharp

 public static IRestResponse DeleteCredentials() {
  RestClient client = new RestClient();
  client.BaseUrl = "https://api.mailgun.net/v2";
  client.Authenticator =
    new HttpBasicAuthenticator("api",
                               "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
  RestRequest request = new RestRequest();
  request.AddParameter("domain",
                       "samples.mailgun.org", ParameterType.UrlSegment);
  request.Resource = "domains/{domain}/credentials/{login}";
  request.AddUrlSegment("login", "alice");
  request.Method = Method.DELETE;
  return client.Execute(request);
 }
