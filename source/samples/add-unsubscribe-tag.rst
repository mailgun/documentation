
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/unsubscribes \
	-F address='bob@example.com' \
	-F tag='tag1'

.. code-block:: java

 public static ClientResponse UnsubscribeFromTag() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/YOUR_DOMAIN_NAME" +
 				"/unsubscribes");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("address", "bob@example.com");
 	formData.add("tag", "tag1");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		post(ClientResponse.class, formData);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->post("$domain/unsubscribes", array(
      'address' => 'bob@example.com',
      'tag'     => 'myexampletag'
  ));

.. code-block:: py

 def unsubscribe_from_tag():
     return requests.post(
         "https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/unsubscribes",
         auth=("api", "YOUR_API_KEY"),
         data={'address':'bob@example.com', 'tag': 'tag1'})

.. code-block:: rb

 def unsubscribe_from_tag
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/YOUR_DOMAIN_NAME/unsubscribes",
   :address => 'bob@example.com',
   :tag => 'tag1'
 end

.. code-block:: csharp

 public static IRestResponse UnsubscribeFromTag() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "{domain}/unsubscribes";
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.AddParameter("address", "bob@example.com");
 	request.AddParameter("tag", "tag1");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

 func CreateUnsubscriptionWithTag(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.Unsubscribe("bob@example.com", "tag1")
 }
