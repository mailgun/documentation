
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members.json \
	-F subscribed=True \
	-F members='[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]'

.. code-block:: java

 public static ClientResponse AddListMember() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/lists/" +
 				"dev@samples.mailgun.org/members.json");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("members", "[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]");
 	formData.add("subscribed", true);
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		post(ClientResponse.class, formData);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $listAddress = 'dev@samples.mailgun.org';

  # Issue the call to the client.
  $result = $mgClient->post("lists/$listAddress/members.json", array(
      'members'    => '[{"address": "Alice <alice@example.com>", "vars": {"age": 26}}, {"name": "Alice", "address": "alice@example.com", "vars": {"age": 34}}]',
      'subscribed' => true
  ));

.. code-block:: py

 def add_list_member():
     return requests.post(
         "https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members.json",
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'),
         data={'subscribed': True,
               'members': '[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]')

.. code-block:: rb

 def add_list_member
   RestClient.post("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0" \
                   "@api.mailgun.net/v2/lists/dev@samples.mailgun.org/members.json",
                   :subscribed => true,
                   :members => '[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]')
 end

.. code-block:: csharp

 public static IRestResponse AddListMember() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "lists/{list}/members.json";
 	request.AddParameter("list", "dev@samples.mailgun.org", ParameterType.UrlSegment);
 	request.AddParameter("members", "[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]");
 	request.AddParameter("subscribed", true);
  	request.Method = Method.POST;
 	return client.Execute(request);
 }
