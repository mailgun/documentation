.. code-block:: bash

  curl -X POST https://api.mailgun.net/v4/inbox/tests \
    -F 'subject=testSubject' \
    -F 'from=user@domain.com' \
    --form-string html='<html>HTML version of the body</html>' \
    --user 'api:<YOUR_API_KEY'>'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode createInboxPlacementTest() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v4/inbox/tests")
             .basicAuth("api", API_KEY)
             .field("sending_domain", "domain.com")
             .field("subject", "testSubject")
             .field("from", "Sample User <user@domain.com>")
             .field("html", "<html>HTML version of the body</html>")
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the inbox placement endpoint.
  # Consider using the following php curl function.
  function create_inbox_placement_test() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/inbox/tests');
    curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'sending_domain'=> 'domain.com',
        'from'=> 'Sample User <user@domain.com>',
        'subject'=>'testSubject',
        'html'=>'<html>HTML version of the body</html>',
        )
    );

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def create_inbox_placement_test():
     data = {'sending_domain': 'domain.com',
             'from': 'Sample User <user@domain.com>',
             'subject': 'testSubject',
             'html': '<html>HTML version of the body</html>' }
     return requests.post(
         "https://api.mailgun.net/v4/inbox/tests",
         data=json.dumps(data),
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def create_inbox_placement_test
   data = {'sending_domain'=> 'domain.com',
           'from'=> 'Sample User <user@domain.com>',
           'subject'=> 'testSubject',
           'html'=> '<html>HTML version of the body</html>' }
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v4/inbox/tests",
                   fields_hash.merge(data))
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateInboxPlacementTest
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (StartInboxPlacementTest ().Content.ToString ());
     }

     public static IRestResponse StartInboxPlacementTest ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("sending_domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "inbox/tests";
         request.AddParameter ("from", "Sample User <user@domain.com>");
         request.AddParameter ("domain", "domain.com");
         request.AddParameter ("subject", "testSubject");
         request.AddParameter ("html", "<html>HTML version of the body</html>");
         request.Method = Method.POST;
         return client.Execute (request);
     }
 }
