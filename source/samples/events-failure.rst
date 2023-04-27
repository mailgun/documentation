.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
        https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/events \
        --data-urlencode event='rejected OR failed'

.. code-block:: java

    import com.mailgun.api.v3.MailgunEventsApi;
    import com.mailgun.enums.EventType;
    import com.mailgun.model.events.EventsQueryOptions;
    import com.mailgun.model.events.EventsResponse;

    // ...

    public EventsResponse getEvents() {
        MailgunEventsApi mailgunEventsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunEventsApi.class);

        EventsQueryOptions eventsQueryOptions = EventsQueryOptions.builder()
            .event(EventType.FAILED)
            .build();

        return mailgunEventsApi.getEvents(YOUR_DOMAIN_NAME, eventsQueryOptions);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain      = 'YOUR_DOMAIN_NAME';
  $queryString = array(
      'begin'        => 'Wed, 1 Jan 2020 09:00:00 -0000',
      'ascending'    => 'yes',
      'limit'        =>  25,
      'pretty'       => 'yes',
      'event'        => 'failed'
  );

  # Issue the call to the client.
  $result = $mgClient->events()->get($domain, $queryString);

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/events",
         auth=("api", "YOUR_API_KEY"),
         params={"event" : "rejected OR failed"})

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/events",
   :params => {
     :"event" => 'rejected OR failed'
   }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class EventsFailureChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (EventsFailure ().Content.ToString ());
     }

     public static IRestResponse EventsFailure ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/events";
         request.AddParameter ("event", "rejected OR failed");
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

 func PrintFailedEvents(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     // Create an iterator
     it := mg.ListEvents(&mailgun.ListEventOptions{
         Filter: map[string]string{
             "event": "rejected OR failed",
         },
     })

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     // Iterate through all the pages of events
     var page []mailgun.Event
     for it.Next(ctx, &page) {
         for _, event := range page {
             switch e := event.(type){
             case *events.Failed:
                 fmt.Printf("Failed Reason: %s", e.Reason)
             case *events.Rejected:
                 fmt.Printf("Rejected Reason: %s", e.Reject.Reason)
             }
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

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const events = await client.events.get(DOMAIN, {
        event: 'failed'
      });
      console.log('events', events)
    } catch (error) {
      console.error(error);
    }
  })();
