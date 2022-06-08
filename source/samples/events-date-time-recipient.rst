.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
        https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/events \
        --data-urlencode begin='Fri, 3 May 2013 09:00:00 -0000' \
        --data-urlencode ascending=yes \
        --data-urlencode limit=25 \
        --data-urlencode pretty=yes \
        --data-urlencode recipient=joe@example.com

.. code-block:: java

    import com.mailgun.api.v3.MailgunEventsApi;
    import com.mailgun.model.events.EventsQueryOptions;
    import com.mailgun.model.events.EventsResponse;

    import java.time.ZoneId;
    import java.time.ZonedDateTime;

    // ...

    public EventsResponse getEvents() {
        MailgunEventsApi mailgunEventsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunEventsApi.class);

        EventsQueryOptions eventsQueryOptions = EventsQueryOptions.builder()
            .begin(ZonedDateTime.now().minusDays(5))
            .ascending(true)
            .limit(1)
            .build();

        return mailgunEventsApi.getEvents(YOUR_DOMAIN_NAME, eventsQueryOptions);
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

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const date = new Date(2021, 10, 1, 0, 0, 0, 0); // Mon Nov 01 2021 00:00:00 GMT+0200
      const events = await client.events.get(DOMAIN, {
        begin: date.toGMTString(), // Sun, 31 Oct 2021 22:00:00 GMT
        ascending: 'yes',
        limit: 5
      });
      console.log('events', events)
    } catch (error) {
        console.error(error);
    }
  })();
