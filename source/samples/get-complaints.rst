
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getComplaints() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/complaints")
             .basicAuth("api", API_KEY)
             .queryString("limit", "100")
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php


  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient  = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain    = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->suppressions()->complaints()->index($domain);

.. code-block:: py

 def get_complaints():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_complaints
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetComplaintsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetComplaints ().Content.ToString ());
     }

     public static IRestResponse GetComplaints ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/complaints";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ListComplaints(domain, apiKey string) ([]mailgun.Complaint, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     it := mg.ListComplaints(nil)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     var page, result []mailgun.Complaint
     for it.Next(ctx, &page) {
         result = append(result, page...)
     }

     if it.Err() != nil {
         return nil, it.Err()
     }
     return result, nil
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const complaints = await client.suppressions.list(DOMAIN, 'complaints');
      console.log('complaints', complaints);
    } catch (error) {
      console.error(error);
    }
  })();
