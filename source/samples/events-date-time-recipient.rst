.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
        https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/events \
        --data-urlencode begin='Fri, 3 May 2013 09:00:00 -0000' \
        --data-urlencode ascending=yes \
        --data-urlencode limit=25 \
        --data-urlencode pretty=yes \
        --data-urlencode recipient=joe@example.com

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getLogs() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/events")
             .basicAuth("api", API_KEY)
             .queryString("begin", "Thurs, 18 May 2017 09:00:00 -0000")
             .queryString("ascending", "yes")
             .queryString("limit", 1)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient    = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain      = 'YOUR_DOMAIN_NAME';
  $queryString = array(
      'begin'        => 'Wed, 1 Jan 2020 09:00:00 -0000',
      'ascending'    => 'yes',
      'limit'        =>  25,
      'pretty'       => 'yes',
      'recipient'    => 'bob@example.com'
  );

  # Issue the call to the client.
  $result = $mgClient->events()->get($domain, $queryString);

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/events",
         auth=("api", "YOUR_API_KEY"),
         params={"begin"       : "Fri, 3 May 2013 09:00:00 -0000",
                 "ascending"   : "yes",
                 "limit"       :  25,
                 "pretty"      : "yes",
                 "recipient" : "joe@example.com"})

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/events",
    :params => {
     :'begin'       => 'Fri, 3 May 2013 09:00:00 -0000',
     :'ascending'   => 'yes',
     :'limit'       =>  25,
     :'pretty'      => 'yes',
     :'recipient' => 'joe@example.com'
    }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class EventsDateTimeRecipientChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (EventsDateTimeRecipient ().Content.ToString ());
     }

     public static IRestResponse EventsDateTimeRecipient ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/events";
         request.AddParameter ("begin", "Fri, 3 May 2013 09:00:00 -0000");
         request.AddParameter ("ascending", "yes");
         request.AddParameter ("limit", 25);
         request.AddParameter ("pretty", "yes");
         request.AddParameter ("recipient", "joe@example.com");
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func PrintEventLog(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     // Create an iterator
     it := mg.ListEvents(&mailgun.ListEventOptions{
         Begin: time.Now().Add(-50 * time.Minute),
         Limit: 100,
         Filter: map[string]string{
             "recipient": "joe@example.com",
         },
     })

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     // Iterate through all the pages of events
     var page []mailgun.Event
     for it.Next(ctx, &page) {
         for _, event := range page {
             fmt.Printf("%+v\n", event)
         }
     }

     // Did iteration end because of an error?
     if it.Err() != nil {
         return it.Err()
     }

     return nil
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`/${DOMAIN}/events`, {"begin": "Thurs, 06 July 2017 09:00:00 -0000", "ascending": "yes", "limit": 1},  function (error, body) {
   console.log(body);
 });
