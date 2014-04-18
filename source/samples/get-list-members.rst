
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members

.. code-block:: java

 public static ClientResponse ListingMembers() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/lists/" +
 				"dev@samples.mailgun.org/members");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $listAddress = 'dev@samples.mailgun.org';

  # Issue the call to the client.
  $result = $mgClient->get("lists/$listAddress/members", array(
      'subscribed' => 'yes',
      'limit'      =>  5,
      'skip'       =>  10
  ));

.. code-block:: py

 def list_members():
     return requests.get(
         "https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members",
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'))

.. code-block:: rb

 def list_members
   RestClient.get("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0" \
                  "@api.mailgun.net/v2/lists/dev@samples.mailgun.org/members")
 end

.. code-block:: csharp

 public static IRestResponse ListingMembers() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "lists/{list}/members";
 	request.AddParameter("list", "dev@samples.mailgun.org", ParameterType.UrlSegment);
 	return client.Execute(request);
 }
