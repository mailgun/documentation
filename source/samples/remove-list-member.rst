
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X DELETE \
	https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/bar@example.com

.. code-block:: java

 public static ClientResponse RemoveMember() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/lists/" +
 				"LIST@YOUR_DOMAIN_NAME/members/bar@example.com");
 	return webResource.delete(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $listAddress = 'LIST@YOUR_DOMAIN_NAME';
  $listMember = 'bar@example.com';

  # Issue the call to the client.
  $result = $mgClient->delete("lists/$listAddress/members/$listMember");

.. code-block:: py

 def remove_member():
     return requests.delete(
         ("https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members"
          "/bar@example.com"),
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def remove_member
   RestClient.delete("https://api:YOUR_API_KEY" \
                     "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members" \
                     "/bar@example.com")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class RemoveListMemberChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (RemoveListMember ().Content.ToString ());
     }
 
     public static IRestResponse RemoveListMember ()
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
         request.Method = Method.DELETE;
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 func DeleteListMember(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.DeleteMember("joe@example.com", "LIST@YOUR_DOMAIN_NAME")
 }
