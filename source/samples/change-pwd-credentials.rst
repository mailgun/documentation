
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X PUT \
    https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials/alice \
    -F password='abc123'

.. code-block:: java

    import com.mailgun.api.v3.MailgunDomainsApi;
    import com.mailgun.model.ResponseWithMessage;

    // ...

    public ResponseWithMessage updatePassword() {
        MailgunDomainsApi mailgunDomainsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunDomainsApi.class);

        return mailgunDomainsApi.updateCredentials(YOUR_DOMAIN_NAME, YOUR_LOGIN, "super_secret_password");
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';
  $smtpUser = 'bob';
  $smtpPass = 'new_password';

  # Issue the call to the client.
  $result = $mgClient->domains()->updateCredential($domain, $smtpUser, $smtpPass);

.. code-block:: py

 def change_credential_password():
     return requests.put(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials/alice",
         auth=("api", "YOUR_API_KEY"),
         data={"password": "supersecret"})

.. code-block:: rb

 def change_credential_password
   RestClient.put "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials/alice",
   :password => "supersecret"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class ChangePwdCredentialsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (ChangeCredentialPassword ().Content.ToString ());
     }

     public static IRestResponse ChangeCredentialPassword ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "domains/{domain}/credentials/{username}";
         request.AddUrlSegment ("username", "alice");
         request.AddParameter ("password", "supersecret");
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ChangePassword(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.ChangeCredentialPassword(ctx, "alice", "super_secret")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const updatedCredentials = await client.domains.domainCredentials.update(DOMAIN, 'LOGIN_FROM_CREDENTIALS', {
             password: 'new_password'
         });
      console.log('updatedCredentials -------->', updatedCredentials);
    } catch (error) {
        console.error(error);
    }
  })();


