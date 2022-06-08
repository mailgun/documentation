
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X DELETE \
      https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME

.. code-block:: java

    import com.mailgun.api.v3.MailgunMailingListApi;
    import com.mailgun.model.mailing.lists.DeleteMailingListResponse;

    // ...

    public DeleteMailingListResponse removeMailingList() {
        MailgunMailingListApi mailgunMailingListApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMailingListApi.class);

        return mailgunMailingListApi.deleteMailingList(MAILING_LIST_ADDRESS);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $mailing_list = 'LIST@YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->mailingList()->delete($mailing_list);

.. code-block:: py

 def remove_list():
     return requests.delete(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def remove_list
   RestClient.delete("https://api:YOUR_API_KEY" \
                     "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class RemoveMailingListChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (RemoveMailingList ().Content.ToString ());
     }

     public static IRestResponse RemoveMailingList ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func DeleteMailingList(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.DeleteMailingList(ctx, "list@example.com")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const removedList = await client.lists.destroy('YOUR_LIST_NAME');
      console.log('removedList', removedList);
    } catch (error) {
      console.error(error);
    }
  })();
