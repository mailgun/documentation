
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks/click \
	-F url='http://google.com'

.. code-block:: java

 public static ClientResponse UpdateMember() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/lists/" +
 				"dev@YOUR_DOMAIN_NAME/members/bar@example.com");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("url", "http://google.com");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		put(ClientResponse.class, formData);

 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $listAddress = 'YOUR_DOMAIN_NAME';
  $memberAddress = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->put("$domain/webhooks/click", array(
      'url' => 'http://google.com'
  ));

.. code-block:: py

 def update_member():
     return requests.put(
         ("https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks/click"),
         auth=('api', 'YOUR_API_KEY'),
         data={'url': 'http://google.com'})

.. code-block:: rb

 def update_member
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks/click" \
                  "/bar@example.com",
                  :url => 'http://google.com')
 end

.. code-block:: csharp

 public static IRestResponse UpdateMember() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "/domains/YOUR_DOMAIN_NAME/webhooks/click";
 	request.AddParameter("url", "http://google.com");
 	request.Method = Method.PUT;
 	return client.Execute(request);
 }

.. code-block:: go

 func UpdateWebhook(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.UpdateWebhook("deliver", "http://api.example.com")
 }
