
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members \
	-F subscribed=True \
	-F address='bar@example.com' \
	-F name='Bob Bar' \
	-F description='Developer' \
	-F vars='{"age": 26}'

.. code-block:: java

 public static ClientResponse AddListMember() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/lists/" +
 				"LIST@YOUR_DOMAIN_NAME/members");
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
  $mgClient = new Mailgun('YOUR_API_KEY');
  $listAddress = 'LIST@YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->post("lists/$listAddress/members", array(
      'address'     => 'bar@example.com',
      'name'        => 'Bob Bar',
      'description' => 'Developer',
      'subscribed'  => true,
      'vars'        => '{"age": 26}'
  ));

.. code-block:: py

 def add_list_member():
     return requests.post(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members",
         auth=('api', 'YOUR_API_KEY'),
         data={'subscribed': True,
               'address': 'bar@example.com',
               'name': 'Bob Bar',
               'description': 'Developer',
               'vars': '{"age": 26}'})

.. code-block:: rb

 def add_list_member
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members",
                   :subscribed => true,
                   :address => 'bar@example.com',
                   :name => 'Bob Bar',
                   :description => 'Developer',
                   :vars => '{"age": 26}')
 end

.. code-block:: csharp

  using System;
  using System.IO;
  using RestSharp;
  using RestSharp.Authenticators;
  
  public class AddListMemberChunk
  {
  
      public static void Main (string[] args)
      {
          Console.WriteLine (AddListMember ().Content.ToString ());
      }
  
      public static IRestResponse AddListMember ()
      {
          RestClient client = new RestClient ();
          client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
          client.Authenticator =
              new HttpBasicAuthenticator ("api",
                                          "YOUR_API_KEY");
          RestRequest request = new RestRequest ();
          request.Resource = "lists/{list}/members";
          request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                                ParameterType.UrlSegment);
          request.AddParameter ("address", "bar@example.com");
          request.AddParameter ("subscribed", true);
          request.AddParameter ("name", "Bob Bar");
          request.AddParameter ("description", "Developer");
          request.AddParameter ("vars", "{\"age\": 26}");
          request.Method = Method.POST;
          return client.Execute (request);
      }
  
  }

.. code-block:: go

 func AddListMember(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   memberJoe := mailgun.Member{
     Address:    "joe@example.com",
     Name:       "Joe Example",
     Subscribed: mailgun.Subscribed,
   }
   return mg.CreateMember(true, "mailingList@example.com", memberJoe)
 }
