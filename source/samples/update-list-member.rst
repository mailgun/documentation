
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -X PUT \
	https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members/bar@example.com \
	-F subscribed=False \
	-F name='Foo Bar'

.. code-block:: java

 public static ClientResponse UpdateMember() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/lists/" +
 				"dev@samples.mailgun.org/members/bar@example.com");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("subscribed", false);
 	formData.add("name", "Foo Bar");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		put(ClientResponse.class, formData);

 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $listAddress = 'dev@samples.mailgun.org';
  $memberAddress = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->put("lists/$listAddress/members/$memberAddress", array(
      'subscribed' => false,
      'name'       => 'Foo Bar'
  ));

.. code-block:: py

 def update_member():
     return requests.put(
         ("https://api.mailgun.net/v2/lists/dev@samples.mailgun.org/members"
          "/bar@example.com"),
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'),
         data={'subscribed': False,
               'name': 'Foo Bar'})

.. code-block:: rb

 def update_member
   RestClient.put("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0" \
                  "@api.mailgun.net/v2/lists/dev@samples.mailgun.org/members" \
                  "/bar@example.com",
                  :subscribed => false,
                  :name => 'Foo Bar')
 end

.. code-block:: csharp

 public static IRestResponse UpdateMember() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "lists/{list}/members/{member}";
 	request.AddParameter("list", "dev@samples.mailgun.org", ParameterType.UrlSegment);
 	request.AddParameter("member", "bar@example.com", ParameterType.UrlSegment);
 	request.AddParameter("subscribed", false);
 	request.AddParameter("name", "Foo Bar");
 	request.Method = Method.PUT;
 	return client.Execute(request);
 }

.. code-block:: go

 func UpdateMember(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   _, err = mg.UpdateMember("bar@example.com", "dev@samples.mailgun.org", mailgun.Member{
     Name: "Foo Bar",
     Subscribed: mailgun.Unsubscribed,
   })
   return err
 }
