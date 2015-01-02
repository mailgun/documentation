
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/tags/newsletter

.. code-block:: java

 public static ClientResponse DeleteTag() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/YOUR_DOMAIN_NAME" +
 				"/tags/newsletter");
 	return webResource.delete(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';
  $tag = 'myexampletag';

  # Issue the call to the client.
  $result = $mgClient->delete("$domain/tags/$tag");

.. code-block:: py

 def delete_tag():
     return requests.delete(
         "https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/tags/newsletter",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_tag
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/YOUR_DOMAIN_NAME/tag/newsletter"
 end

.. code-block:: csharp

 public static IRestResponse DeleteTag() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.Resource = "{domain}/tags/{tag}";
 	request.AddUrlSegment("tag", "newsletter");
 	request.Method = Method.DELETE;
 	return client.Execute(request);
 }

.. code-block:: go

 func DeleteTag(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.DeleteTag("newsletter")
 }
