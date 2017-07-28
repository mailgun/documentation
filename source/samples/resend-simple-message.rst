.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
    https://se.api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/messages/STORAGE_URL \
    -F to='bob@example.com'


.. code-block:: java

  public static JsonNode resendSimpleMessge() throws UnirestException{

  HttpResponse<JsonNode> request = Unirest.post("https://se.api.mailgun.net/v3/domains/" + YOUR_DOMAIN_NAME + "/messages/{storage_url}")
      .basicAuth("api", API_KEY)
      .queryString("to", "user@samples.mailgun.org")
      .asJson();

  return request.getBody();
}


.. code-block:: php

 $api_key = 'YOUR_API_KEY';
 $storage_url = 'https://se.api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/messages/STORAGE_URL';
 $payload = http_build_query(
     array(
         'to' => array(
             'user@samples.mailgun.org',
         ),
     )
 );

 $opts = array(
   'http' => array(
     'method' => 'POST',
     'content' => $payload,
     'header' => implode("\r\n", array(
       'Authorization: Basic ' . base64_encode("api:$api_key"),
       'Content-Type: application/x-www-form-urlencoded',
     )),
   ),
 );

 print_r($opts);

 $context = stream_context_create($opts);

 $result = file_get_contents($storage_url, false, $context);
 print_r($result);

.. code-block:: py
    def resend_simple_message():
        return requests.post(
             "https://se.api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages/STORAGE_URL",
             auth=("api", "YOUR_API_KEY"),
             data={"to": ["bar@example.com", "YOU@YOUR_DOMAIN_NAME"] })

.. code-block:: rb

    def resend_simple_message
        RestClient.post "https://api:YOUR_API_KEY"\
        "@se.api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/messages/STORAGE_URL",
        :to => "bar@example.com, YOU@YOUR_DOMAIN_NAME"
    end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class SendSimpleMessageChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (ResendSimpleMessage ().Content.ToString ());
     }

     public static IRestResponse ResendSimpleMessage ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://se.api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "domains/{domain}/messages/STORAGE_URL";
         request.AddParameter ("to", "bar@example.com");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }


.. code-block:: go
