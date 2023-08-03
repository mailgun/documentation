.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://storage-{{MESSAGE_STORAGE_REGION}}.api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/messages/STORAGE_KEY \
      -F to='bob@example.com'

.. code-block:: java

    import com.mailgun.api.v3.MailgunStoreMessagesApi;
    import com.mailgun.client.MailgunClient;
    import com.mailgun.model.message.MessageResponse;

    // ...

    public MessageResponse resendSimpleMessage() {
        MailgunStoreMessagesApi mailgunStoreMessagesApi = MailgunClient.config(MESSAGE_STORAGE_URL, API_KEY)
                .createApiWithAbsoluteUrl(MailgunStoreMessagesApi.class);

        return mailgunStoreMessagesApi.resendMessage("user@samples.org");
    }

.. code-block:: php

  # Currently, the PHP SDK does not support Resend Messages endpoint.
  # Consider using the following php curl function.
  function resend_message() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, MESSAGE_STORAGE_URL);
    curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'to'=> 'bob@example.com'
        )
    );

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }
.. code-block:: py

 def resend_simple_message():
     return requests.post(
         "https://storage-{{MESSAGE_STORAGE_REGION}}.api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/messages/STORAGE_KEY",
         auth=("api", "YOUR_API_KEY"),
         data={"to": ["bar@example.com", "YOU@YOUR_DOMAIN_NAME"] })

.. code-block:: rb

    def resend_simple_message
        RestClient.post "https://api:YOUR_API_KEY"\
        "@https://storage-{{MESSAGE_STORAGE_REGION}}.api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/messages/STORAGE_KEY",
        :to => "bar@example.com, YOU@YOUR_DOMAIN_NAME"
    end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class SendSimpleMessageChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (ResendSimpleMessage ().Content.ToString ());
     }

     public static IRestResponse ResendSimpleMessage ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://storage-{{MESSAGE_STORAGE_REGION}}.api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "domains/{domain}/messages/MESSAGE_STORAGE_URL";
         request.AddParameter ("to", "bar@example.com");
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

 func ResendMessage(domain, apiKey string) (string, string, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.ReSend(ctx, "MESSAGE_STORAGE_URL", "bar@example.com")
 }

.. code-block:: js

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const api_key = 'YOUR_API_KEY';
  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const data = {
    to: 'bar@example.com, alice@example.com'
  };

  const options = {
    /*
    The domain of storage. Can be found in Sending -> logs on your dashboard.
    The needed value is the full storage.url
    */
    url: 'https://storage-{{MESSAGE_STORAGE_REGION}}.api.mailgun.net/',
    username: 'api',
    key: api_key
  };

  (async () => {
    try {
      const mailgun = new Mailgun(formData);
      const client = mailgun.client(options);

      /*
        The key of message in storage.
        Can be found in Sending -> logs on your dashboard
        The needed value is located in storage.key
      */
      const storageKey = 'STORAGE_KEY';
      const res = await client.request.postWithFD(`v3/domains/${DOMAIN}/messages/${storageKey}`, data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  })();

