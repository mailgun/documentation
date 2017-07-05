.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
        https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/events/W3siYSI6IGZhbHNlLC

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getLogsPagination() throws UnirestException{

		     HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/events/W3siYSI6IGZhbHNlLCAi")
				     .basicAuth("api", API_KEY)
				     .asJson();

		     return request.getBody();
	   }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';
  $nextPage = 'W3siYSI6IGZhbHNlLC';

  # Make the call to the client.
  $result = $mgClient->get("$domain/events/$nextPage");

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/events/W3siYSI6IGZhbHNlLC",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/events/W3siYSI6IGZhbHNlLC"}
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class EventsPaginationChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (EventsPagination ().Content.ToString ());
     }

     public static IRestResponse EventsPagination ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/events/W3siYSI6IGZhbHNlLC";
         return client.Execute (request);
     }

 }

.. code-block:: go

 func GetLog2(domain, apiKey string) ([]mailgun.Event, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   ei := mg.NewEventIterator()
   err := ei.GetFirstPage(mailgun.GetEventsOptions{
     Filter:         map[string]string{
       "event": "rejected OR failed",
     }
   })
   if err != nil {
     return nil, err
   }
   // ...
   err = ei.GetNext()
   if err != nil {
     return nil, err
   }
   events := ei.Events()
   if len(events) == 0 {
     return nil, fmt.Errorf("No more events")
   }
   return events, nil
 }
