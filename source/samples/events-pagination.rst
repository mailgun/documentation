.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/events/W3siYSI6IGZhbHNlLC

.. code-block:: java

    import com.mailgun.api.v3.MailgunEventsApi;
    import com.mailgun.model.events.EventsResponse;

    // ...

    public EventsResponse getLogsPagination() {
        MailgunEventsApi mailgunEventsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunEventsApi.class);

        return mailgunEventsApi.getEvents(YOUR_DOMAIN_NAME, PAGE_ID);
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
      'pretty'       => 'yes'
  );

  # Issue the call to the client.
  $result = $mgClient->events()->get($domain, $queryString);

  # Request the next page.
  $nextPage = $mgClient->events()->nextPage($result);

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
      const events = await client.events.get(DOMAIN, {
        page: 'WzMseyJiIjoiMjAyMS0xMi0wNlQwODo1ODowMi43MTIrMDA6MDAiLCJlIjoiMjAyMS0xMS0wNlQwODo1ODowMi43MTMrMDA6MDAifSx7ImIiOiIyMDIxLTExLTI2VDEwOjI4OjI0LjQ2OCswMDowMCIsImUiOiIyMDIxLTExLTA2VDA4OjU4OjAyLjcxMyswMDowMCJ9LCJfZG9jI1Z2X2hFcHlNUWdPbjRvcjF5cVFsd2ciLFsiZiJdLG51bGwsW1siYWNjb3VudC5pZCIsIjU5NDU5N2Y3ZDAzMDNhNGJkMWYzMzg5OCJdLFsiZG9tYWluLm5hbWUiLCIyMDQ4LnplZWZhcm1lci5jb20iXSxbImV2ZW50IiwiZmFpbGVkIl1dLDEwMF0='
      });
      console.log('events', events);
    } catch (error) {
      console.error(error);
    }
  })();

