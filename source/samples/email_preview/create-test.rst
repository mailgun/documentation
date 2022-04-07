.. code-block:: bash

  curl -X POST https://api.mailgun.net/v1/preview/tests \
    -F 'subject=test' \
    -F 'url=url' \
    --user 'api:<YOUR_API_KEY>'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode createTest() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v4/preview/tests")
             .basicAuth("api", API_KEY)
             .field("subject", "test")
             .field("url", "url")
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the email preview endpoint.
  # Consider using the following php curl function.
  function create_seed_list() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v1/preview/tests');
    curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'subject'=> 'test',
        'url'=> 'url',
        )
    );

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def create_seed_list():
     data = {'subject': 'test', 'url': 'url'}
     return requests.post(
         "https://api.mailgun.net/v1/preview/tests", data=data
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def create_seed_list
   data = { subject: "test", url: "url" }
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v1/preview/tests",
                   fields_hash.merge(data))
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateEmailPreviewTests
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateEmailPreview ().Content.ToString ());
     }

     public static IRestResponse CreateEmailPreview ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net");
         client.Authenticator =
             new HttpBasicAuthenticator ("api", "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("subject", "test", ParameterType.UrlSegment);
         request.AddParameter ("url", "url", ParameterType.UrlSegment);
         request.Resource = "v1/preview/tests";
         request.Method = Method.POST;
         return client.Execute (request);
     }
 }

