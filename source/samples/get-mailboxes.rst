
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	https://api.mailgun.net/v2/samples.mailgun.org/mailboxes

.. code-block:: java

 public static ClientResponse GetMailboxes() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
 				"/mailboxes");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/mailboxes", 
                           array('limit' => 5, 'skip'  => 10));
                                                 
.. code-block:: py

 def get_mailboxes():
     return requests.get(
         "https://api.mailgun.net/v2/samples.mailgun.org/mailboxes",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"))

.. code-block:: rb

 def get_mailboxes
   RestClient.get "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/mailboxes"
 end

.. code-block:: csharp

 public static RestResponse GetMailboxes() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org",
 	                     ParameterType.UrlSegment);
 	request.Resource = "{domain}/mailboxes";
 	return client.Execute(request);
 }
