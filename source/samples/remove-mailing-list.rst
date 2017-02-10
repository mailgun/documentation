
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X DELETE \
	https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME

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

     public static ClientResponse RemoveMailingList() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         return mgRoot
             .path("/lists/{list_name}@{domain}")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
             .resolveTemplate("list_name", "YOUR_MAILING_LIST_NAME")
             .request()
             .buildDelete()
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
  $result = $mgClient->delete("lists/$listAddress");

.. code-block:: py

 def remove_list():
     return requests.delete(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def remove_list
   RestClient.delete("https://api:YOUR_API_KEY" \
                     "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class RemoveMailingListChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (RemoveMailingList ().Content.ToString ());
     }
 
     public static IRestResponse RemoveMailingList ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.Method = Method.DELETE;
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 func DeleteList(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.DeleteList("LIST@YOUR_DOMAIN_NAME")
 }
