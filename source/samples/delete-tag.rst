
.. code-block:: bash

 curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -X DELETE \
     https://api.mailgun.net/v2/samples.mailgun.org/tags/newsletter

.. code-block:: java

 public static ClientResponse DeleteTag() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
 				"/tags/newsletter");
 	return webResource.delete(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';
  $tag = 'myexampletag';

  # Issue the call to the client.
  $result = $mgClient->delete("$domain/tags/$tag");

.. code-block:: py

 def delete_tag():
     return requests.delete(
         "https://api.mailgun.net/v2/samples.mailgun.org/tags/newsletter",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"))

.. code-block:: rb

 def delete_tag
   RestClient.delete "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/tag/newsletter"
 end

.. code-block:: csharp

 public static RestResponse DeleteTag() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "{domain}/tags/{tag}";
 	request.AddUrlSegment("tag", "newsletter");
 	request.Method = Method.DELETE;
 	return client.Execute(request);
 }
