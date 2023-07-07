
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
     https://api.mailgun.net/v3/lists \
     -F address='LIST@YOUR_DOMAIN_NAME' \
     -F description='Mailgun developers list'

.. code-block:: java

    import com.mailgun.api.v3.MailgunMailingListApi;
    import com.mailgun.enums.AccessLevel;
    import com.mailgun.enums.ReplyPreference;
    import com.mailgun.model.mailing.lists.MailingListRequest;
    import com.mailgun.model.mailing.lists.MailingListResponse;

    // ...

    public MailingListResponse createMailingList() {
        MailgunMailingListApi mailgunMailingListApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMailingListApi.class);

        MailingListRequest mailingListRequest = MailingListRequest.builder()
            .address( "LIST@YOUR_DOMAIN_NAME")
            .name("LIST_NAME")
            .description("LIST_DESCRIPTION")
            .accessLevel(AccessLevel.EVERYONE)
            .replyPreference(ReplyPreference.LIST)
            .build();

        return mailgunMailingListApi.createMailingList(mailingListRequest);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $mailing_list     = 'LIST@YOUR_DOMAIN_NAME';
  $list_name        = 'Mailgun Subscribers';
  $list_description = 'News and service updates';
  $access_level     = 'readonly';

  # Issue the call to the client.
  $result = $mgClient->mailingList()->create($mailing_list, $list_name, $list_description, $access_level);

.. code-block:: py

 def create_mailing_list():
     return requests.post(
         "https://api.mailgun.net/v3/lists",
         auth=('api', 'YOUR_API_KEY'),
         data={'address': 'LIST@YOUR_DOMAIN_NAME',
               'description': "Mailgun developers list"})

.. code-block:: rb

 def create_mailing_list
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v3/lists",
                   :address => 'LIST@YOUR_DOMAIN_NAME',
                   :description => "Mailgun developers list")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateMailingListChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateMailingList ().Content.ToString ());
     }

     public static IRestResponse CreateMailingList ()
     {

         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists";
         request.AddParameter ("address", "LIST@YOUR_DOMAIN_NAME");
         request.AddParameter ("description", "Mailgun developers list");
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

 func CreateMailingList(domain, apiKey string) (mailgun.MailingList, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.CreateMailingList(ctx, mailgun.MailingList{
         Address:     "list@example.com",
         Name:        "dev",
         Description: "Mailgun developers list.",
         AccessLevel: mailgun.AccessLevelMembers,
     })
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const newList = await client.lists.create({
        address: "list_name@${DOMAIN}",
        name: "list_name",
        description: "list_description",
        access_level: "everyone", // readonly (default), members, everyone
      });
      console.log('newList', newList);
    } catch (error) {
      console.error(error);
    }
  })();


