.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints \
     -F address='bob@example.com'

.. code-block:: java

    import java.time.ZonedDateTime;

    import com.mailgun.api.v3.suppression.MailgunSuppressionComplaintsApi;
    import com.mailgun.model.suppression.SuppressionResponse;
    import com.mailgun.model.suppression.complaints.ComplaintsSingleItemRequest;

    // ...

    public SuppressionResponse addComplaint() {
        MailgunSuppressionComplaintsApi suppressionComplaintsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunSuppressionComplaintsApi.class);

        ComplaintsSingleItemRequest complaintsSingleItemRequest = ComplaintsSingleItemRequest.builder()
            .address( "bob@example.com")
            .createdAt(ZonedDateTime.now())
            .build();

        return suppressionComplaintsApi.addAddressToComplaintsList(YOUR_DOMAIN_NAME, complaintsSingleItemRequest);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';
  $recipient = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->suppressions()->complaints()->create($domain, $recipient);

.. code-block:: py

  def add_complaint():
      return requests.post(
          "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints",
          auth=("api", "YOUR_API_KEY"),
          data={'address': 'bob@example.com'})

.. code-block:: rb

 def add_complaint
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints",
   :address => 'bob@example.com'
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class AddComplaintChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (AddComplaint ().Content.ToString ());
     }

     public static IRestResponse AddComplaint ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/complaints";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("address", "bob@example.com");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func CreateComplaint(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.CreateComplaint(ctx, "bob@example.com")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
      try {
          const createdComplaint = await client.suppressions.create(DOMAIN, 'complaints', { address: 'bob@example.com' });
          console.log('createdComplaint', createdComplaint);
      } catch (error) {
          console.error(error);
      }
  })();
