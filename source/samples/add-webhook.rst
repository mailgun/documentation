.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks \
	-F id='click' \
	-F url='http://bin.mailgun.net/8de4a9c4'

.. code-block:: java

 public static ClientResponse AddDomain() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("id", "click");
 	formData.add("url", "http://bin.mailgun.net/8de4a9c4");
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
  $result = $mgClient->post("domains/$domain/webhooks", array(
      'id'  => 'click',
      'url' => 'http://bin.mailgun.net/8de4a9c4'
  ));

.. code-block:: py

 def add_domain():
     return requests.post(
         "https://api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks",
         auth=("api", "YOUR_API_KEY"),
         data={'id':'click', 'url':'http://bin.mailgun.net/8de4a9c4'})

.. code-block:: rb

 def add_domain
   RestClient.post("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v2/domains/YOUR_DOMAIN_NAME/webhooks",
                   :id => 'click',
                   :url => 'http://bin.mailgun.net/8de4a9c4')
 end

.. code-block:: csharp

 public static IRestResponse AddDomain() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2/";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "domains/YOUR_DOMAIN_NAME/webhooks";
 	request.AddParameter("id", "click");
 	request.AddParameter("url", "http://bin.mailgun.net/8de4a9c4");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

 func CreateWebhook(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateWebhook("deliver", "http://www.example.com")
 }
