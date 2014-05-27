.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/domains/samples.mailgun.org/webhooks \
	-F id='click' \
	-F url='http://bin.mailgun.net/8de4a9c4'

.. code-block:: java

 public static ClientResponse AddDomain() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/domains/samples.mailgun.org/webhooks");
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
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';

  # Issue the call to the client.
  $result = $mgClient->post("domains/$domain/webhooks", array(
      'id'  => 'click',
      'url' => 'http://bin.mailgun.net/8de4a9c4'
  ));

.. code-block:: py

 def add_domain():
     return requests.post(
         "https://api.mailgun.net/v2/domains/samples.mailgun.org/webhooks",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={'id':'click', 'url':'http://bin.mailgun.net/8de4a9c4'})

.. code-block:: rb

 def add_domain
   RestClient.post("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
                   "@api.mailgun.net/v2/domains/samples.mailgun.org/webhooks",
                   :id => 'click',
                   :url => 'http://bin.mailgun.net/8de4a9c4')
 end

.. code-block:: csharp

 public static IRestResponse AddDomain() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2/";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "domains/samples.mailgun.org/webhooks";
 	request.AddParameter("id", "click");
 	request.AddParameter("url", "http://bin.mailgun.net/8de4a9c4");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
