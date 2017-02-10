
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' https://api.mailgun.net/v3/exports

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

     public static ClientResponse GetExports() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         return mgRoot
             .path("/exports")
             .request()
             .buildGet()
             .invoke(ClientResponse.class);
     }
 }

.. code-block:: php

    Exports are unsupported in the php client bindings

.. code-block:: py

 def get_exports():
     return requests.get(
         "https://api.mailgun.net/v3/exports",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_exports
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/exports"
   }
 end

.. code-block:: csharp

 public static IRestResponse GetExports() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v3");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "exports";
 	return client.Execute(request);
 }

.. code-block:: go

    Exports are unsupported in the go client bindings
