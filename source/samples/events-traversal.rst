.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/events

.. code-block:: java

    import com.mailgun.api.v3.MailgunEventsApi;
    import com.mailgun.model.events.EventsResponse;

    // ...

    public EventsResponse getEvents() {
        MailgunEventsApi mailgunEventsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunEventsApi.class);

        return mailgunEventsApi.getAllEvents(YOUR_DOMAIN_NAME);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->events()->($domain);

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/events",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/events"}
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class EventsTraversalChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (EventsTraversal ().Content.ToString ());
     }

     public static IRestResponse EventsTraversal ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/events";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "fmt"
     "github.com/mailgun/mailgun-go/v3"
     "github.com/mailgun/mailgun-go/v3/events"
     "time"
 )

 func PrintEvents(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     // Create an iterator
     it := mg.ListEvents(nil)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     // Iterate through all the pages of events
     var page []mailgun.Event
     for it.Next(ctx, &page) {
         for _, event := range page {
             switch e := event.(type) {
             case *events.Accepted:
                 fmt.Printf("Accepted ID: %s", e.Message.Headers.MessageID)
             case *events.Rejected:
                 fmt.Printf("Rejected Reason: %s", e.Reject.Reason)
             // Add other event types here
             }
             fmt.Printf("%+v\n", event.GetTimestamp())
         }
     }

     // Did iteration end because of an error?
     if it.Err() != nil {
         return it.Err()
     }
     return nil
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const events = await client.events.get(DOMAIN);
      console.log('events', events);
    } catch (error) {
      console.error(error);
    }
  })();
