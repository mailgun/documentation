
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/bar@example.com \
	-F subscribed=False \
	-F name='Foo Bar'

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

     public static ClientResponse UpdateMailingListMember() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         Form reqData = new Form();
         reqData.param("subscribed", "false");
         reqData.param("name", "Alice Doe");

         return mgRoot
             .path("/lists/{list_name}@{domain}/members/{address}")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
             .resolveTemplate("list_name", "YOUR_MAILING_LIST_NAME")
             .resolveTemplate("address", "alice@example.com")
             .request(MediaType.APPLICATION_FORM_URLENCODED)
             .buildPut(Entity.entity(reqData, MediaType.APPLICATION_FORM_URLENCODED))
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
  $memberAddress = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->put("lists/$listAddress/members/$memberAddress", http_build_query(array(
      'subscribed' => false,
      'name'       => 'Foo Bar'
  )));

.. code-block:: py

 def update_member():
     return requests.put(
         ("https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members"
          "/bar@example.com"),
         auth=('api', 'YOUR_API_KEY'),
         data={'subscribed': False,
               'name': 'Foo Bar'})

.. code-block:: rb

 def update_member
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members" \
                  "/bar@example.com",
                  :subscribed => false,
                  :name => 'Foo Bar')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class UpdateListMemberChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (UpdateListMember ().Content.ToString ());
     }
 
     public static IRestResponse UpdateListMember ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/members/{member}";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.AddParameter ("member", "bar@example.com",
                               ParameterType.UrlSegment);
         request.AddParameter ("subscribed", false);
         request.AddParameter ("name", "Foo Bar");
         request.Method = Method.PUT;
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 func UpdateMember(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   _, err = mg.UpdateMember("bar@example.com", "LIST@YOUR_DOMAIN_NAME", mailgun.Member{
     Name: "Foo Bar",
     Subscribed: mailgun.Unsubscribed,
   })
   return err
 }
