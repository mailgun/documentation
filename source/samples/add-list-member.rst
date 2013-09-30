
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members \
	-F subscribed=True \
	-F address='bar@example.com' \
	-F name='Bob Bar' \
	-F description='Developer' \
	-F vars='{"age": 26}'

.. code-block:: java

 public static ClientResponse AddListMember() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/lists/" +
 				"dev@samples.mailgun.org/members");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("address", "bar@example.com");
 	formData.add("subscribed", true);
 	formData.add("name", "Bob Bar");
 	formData.add("description", "Developer");
 	formData.add("vars", "{\"age\": 26}");
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
  $result = $mgClient->post("lists/$listAddress/members", 
                      array('address'     => 'bar@example.com',
                            'name'        => 'Bob Bar',
                            'description' => 'Developer',
                            'subscribed'  => true,
                            'vars'        => '{"age": 26}'));

.. code-block:: py

 def add_list_member():
     return requests.post(
         "https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members",
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'),
         data={'subscribed': True,
               'address': 'bar@example.com',
               'name': 'Bob Bar',
               'description': 'Developer',
               'vars': '{"age": 26}'})

.. code-block:: rb

 def add_list_member
   RestClient.post("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0" \
                   "@api.mailgun.net/v2/lists/dev@samples.mailgun.org/members",
                   :subscribed => true,
                   :address => 'bar@example.com',
                   :name => 'Bob Bar',
                   :description => 'Developer',
                   :vars => '{"age": 26}')
 end

.. code-block:: csharp

 public static RestResponse AddListMember() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "lists/{list}/members";
 	request.AddParameter("list", "dev@samples.mailgun.org", ParameterType.UrlSegment);
 	request.AddParameter("address", "bar@example.com");
 	request.AddParameter("subscribed", true);
 	request.AddParameter("name", "Bob Bar");
 	request.AddParameter("description", "Developer");
 	request.AddParameter("vars", "{\"age\": 26}");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
