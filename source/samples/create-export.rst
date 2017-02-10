.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/exports
    -F url='/v3/domains' \
    -x POST

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

     public static ClientResponse CreateExport() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         Form reqData = new Form();
         reqData.param("url", "/v3/domains");

         return mgRoot
             .path("/exports")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
             .request(MediaType.APPLICATION_FORM_URLENCODED)
             .buildPost(Entity.entity(reqData, MediaType.APPLICATION_FORM_URLENCODED))
             .invoke(ClientResponse.class);
     }
 }

.. code-block:: php

    Exports are unsupported in the php client bindings

.. code-block:: py

 def create_export():
     return requests.post(
         "https://api.mailgun.net/v3/exports",
         auth=("api", "YOUR_API_KEY"),
         data={"url": "/v3/domains"})

.. code-block:: rb

 def create_export
   data = Multimap.new
   data[:url] = "v3/domains"
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/exports", data
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateExportChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateExport ().Content.ToString ());
     }

     public static IRestResponse CreateExport () {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3/");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest();
         request.Resource = "exports";
         request.Method = Method.POST;
         request.AddParameter ("url", "/v3/domains");
         return client.Execute (request);
     }
 }

.. code-block:: go

    Exports are unsupported in the go client bindings
