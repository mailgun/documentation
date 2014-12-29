
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X DELETE \
	https://api.mailgun.net/v2/lists/dev@YOUR_DOMAIN_NAME

.. code-block:: java

 public static ClientResponse RemoveMailingList() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/lists/" +
 				"dev@YOUR_DOMAIN_NAME");
 	return webResource.delete(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $listAddress = 'dev@YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->delete("lists/$listAddress");

.. code-block:: py

 def remove_list():
     return requests.delete(
         "https://api.mailgun.net/v2/lists/dev@YOUR_DOMAIN_NAME",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def remove_list
   RestClient.delete("https://api:YOUR_API_KEY" \
                     "@api.mailgun.net/v2/lists/dev@YOUR_DOMAIN_NAME")
 end

.. code-block:: csharp

 public static IRestResponse RemoveMailingList() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "lists/{list}";
 	request.AddParameter("list", "dev@YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.Method = Method.DELETE;
 	return client.Execute(request);
 }

.. code-block:: go

 func DeleteList(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.DeleteList("dev@YOUR_DOMAIN_NAME")
 }
