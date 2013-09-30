
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -X PUT \
	https://api.mailgun.net/v2/domains/samples.mailgun.org/webhooks/click \
	-F url='http://google.com'

.. code-block:: java

 public static ClientResponse UpdateMember() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/lists/" +
 				"dev@samples.mailgun.org/members/bar@example.com");
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
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $listAddress = 'samples.mailgun.org';
  $memberAddress = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->put("$domain/webhooks/click",
                     array('url' => 'http://google.com'));

.. code-block:: py

 def update_member():
     return requests.put(
         ("https://api.mailgun.net/v2/domains/samples.mailgun.org/webhooks/click"),
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'),
         data={'url': 'http://google.com'})

.. code-block:: rb

 def update_member
   RestClient.put("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0" \
                  "@api.mailgun.net/v2/domains/samples.mailgun.org/webhooks/click" \
                  "/bar@example.com",
                  :url => 'http://google.com')
 end

.. code-block:: csharp

 public static RestResponse UpdateMember() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "/domains/samples.mailgun.org/webhooks/click";
 	request.AddParameter("url", "http://google.com");
 	request.Method = Method.PUT;
 	return client.Execute(request);
 }
