
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members.json \
	-F upsert=true \
	-F members='[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]'

.. code-block:: java

 import javax.ws.rs.client.Client;
 import javax.ws.rs.client.ClientBuilder;
 import javax.ws.rs.client.Entity;
 import javax.ws.rs.client.WebTarget;

 import javax.ws.rs.core.Form;
 import javax.ws.rs.core.MediaType;

 import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;

 public class MGSample {

     // ...

     public static ClientResponse AddListMembers() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         Form reqData = new Form();
         reqData.param("members", "[{\"address\": \"Alice <alice@example.com>\", \"vars\": {\"age\": 26}},{\"name\": \"Bob\", \"address\": \"bob@example.com\", \"vars\": {\"age\": 34}}]");

         return mgRoot
             .path("/lists/{list}@{domain}/members.json")
             .resolveTemplate("list", "YOUR_LIST_NAME")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
             .request(MediaType.APPLICATION_FORM_URLENCODED)
             .buildPost(Entity.entity(reqData, MediaType.APPLICATION_FORM_URLENCODED))
             .invoke(ClientResponse.class);
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $listAddress = 'LIST@YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->post("lists/$listAddress/members.json", array(
      'members'    => '[{"address": "Alice <alice@example.com>", "vars": {"age": 26}}, {"name": "Alice", "address": "alice@example.com", "vars": {"age": 34}}]',
      'upsert' => true
  ));

.. code-block:: py

 def add_list_member():
     return requests.post(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members.json",
         auth=('api', 'YOUR_API_KEY'),
         data={'upsert': True,
               'members': '[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]')

.. code-block:: rb

 def add_list_member
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members.json",
                   :upsert => true,
                   :members => '[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class AddListMembersChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (AddListMembers ().Content.ToString ());
     }
 
     public static IRestResponse AddListMembers ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/members.json";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.AddParameter ("members",
                               "[{\"address\":\"Alice<alice@example.com>\",\"vars\":{\"age\":26}},{\"name\":\"Bob\",\"address\":\"bob@example.com\",\"vars\":{\"age\":34}}]");
         request.AddParameter ("upsert", true);
         request.Method = Method.POST;
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 func AddListMembers(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateMemberList(nil, "LIST@YOUR_DOMAIN_NAME", []interface{}{
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
