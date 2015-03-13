
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes/alice \
	-F password='abc123'

.. code-block:: java

 public static ClientResponse ChangeMailboxPassword() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME" +
 				"/mailboxes/alice");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("password", "supersecret");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		put(ClientResponse.class, formData);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';
  $mailbox = 'alice';

  # Issue the call to the client.
  $result = $mgClient->put("$domain/mailboxes/$mailbox", array(
      'password' => 'supersecret'
  ));

.. code-block:: py

 def change_mailbox_password():
     return requests.put(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes/alice",
         auth=("api", "YOUR_API_KEY"),
         data={"password": "supersecret"})

.. code-block:: rb

 def change_mailbox_password
   RestClient.put "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes/alice",
   :password => "supersecret"
 end

.. code-block:: csharp

 public static IRestResponse ChangeMailboxPassword() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v2");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.Resource = "{domain}/mailboxes/{login}";
 	request.AddUrlSegment("login", "alice");
 	request.AddParameter("password", "supersecret");
 	request.Method = Method.PUT;
 	return client.Execute(request);
 }

.. code-block:: go

 // coming soon
