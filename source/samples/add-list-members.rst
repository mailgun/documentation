
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members.json \
	-F upsert=true \
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
 	formData.add("upsert", true);
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
      'upsert' => true
  ));

.. code-block:: py

 def add_list_member():
     return requests.post(
         "https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members.json",
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'),
         data={'upsert': True,
               'members': '[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]')

.. code-block:: rb

 def add_list_member
   RestClient.post("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0" \
                   "@api.mailgun.net/v2/lists/dev@samples.mailgun.org/members.json",
                   :upsert => true,
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
 	request.AddParameter("upsert", true);
  	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

 func AddListMembers(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateMemberList(nil, "dev@samples.mailgun.org", []interface{}{
     mailgun.Member{
       Address:    "alice@example.com",
       Name:       "Alice's debugging account",
       Subscribed: mailgun.Unsubscribed,
     },
     mailgun.Member{
       Address:    "Bob Cool <bob@example.com>",
       Name:       "Bob's Cool Account",
       Subscribed: mailgun.Subscribed,
     },
     mailgun.Member{
       Address: "joe.hamradio@example.com",
       // Charlette is a ham radio packet BBS user.
       // We attach her packet BBS e-mail address as an arbitrary var here.
       Vars: map[string]interface{}{
         "packet-email": "KW9ABC @ BOGUS-4.#NCA.CA.USA.NOAM",
       },
     },
   })
 }
