
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -X DELETE \
	https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members/bar@example.com

.. code-block:: java

 public static ClientResponse RemoveMember() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/lists/" +
 				"dev@samples.mailgun.org/members/bar@example.com");
 	return webResource.delete(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $listAddress = 'dev@samples.mailgun.org';
  $listMember = 'bar@example.com';

  # Issue the call to the client.
  $result = $mgClient->delete("lists/$listAddress/members/$listMember");

.. code-block:: py

 def remove_member():
     return requests.delete(
         ("https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members"
          "/bar@example.com"),
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'))

.. code-block:: rb

 def remove_member
   RestClient.delete("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0" \
                     "@api.mailgun.net/v2/lists/dev@samples.mailgun.org/members" \
                     "/bar@example.com")
 end

.. code-block:: csharp

 public static IRestResponse RemoveMember() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "lists/{list}/members/{member}";
 	request.AddParameter("list", "dev@samples.mailgun.org", ParameterType.UrlSegment);
 	request.AddParameter("member", "bar@example.com");
 	request.Method = Method.DELETE;
 	return client.Execute(request);
 }
