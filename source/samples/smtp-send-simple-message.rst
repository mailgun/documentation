.. code-block:: bash

    # Swaks is an smtp of CURL, install it first:
    curl http://www.jetmore.org/john/code/swaks/files/swaks-20130209.0/swaks -o swaks
    # Set the permissions for the script so you can run it
    chmod +x swaks
    # It's based on perl, so install perl
    sudo apt-get -y install perl
    # now send!
    ./swaks --auth \
            --server smtp.mailgun.org \
            --au postmaster@samples.mailgun.org \
            --ap 3kh9umujora5 \
            --to bar@example.com \
            --h-Subject: "Hello" \
            --body 'Testing some Mailgun awesomness!'

.. code-block:: java

  import java.io.*;
  import java.net.InetAddress;
  import java.util.Properties;
  import java.util.Date;

  import javax.mail.*;

  import javax.mail.internet.*;

  import com.sun.mail.smtp.*;


  public class SendMail {
      public static void main(String args[]) throws Exception {
          Properties props = System.getProperties();
          props.put("mail.smtps.host","smtp.mailgun.org");
          props.put("mail.smtps.auth","true");
          Session session = Session.getInstance(props, null);
          Message msg = new MimeMessage(session);
          msg.setFrom(new InternetAddress("me@samples.mailgun.org"));
          msg.setRecipients(Message.RecipientType.TO,
          InternetAddress.parse("bar@example.com", false));
          msg.setSubject("Hello");
          msg.setText("Testing some Mailgun awesomness");
          msg.setSentDate(new Date());
          SMTPTransport t =
              (SMTPTransport)session.getTransport("smtps");
          t.connect("smtp.mailgun.com", "postmaster@samples.mailgun.org", "3kh9umujora5");
          t.sendMessage(msg, msg.getAllRecipients());
          System.out.println("Response: " + t.getLastServerResponse());
          t.close();
      }
  }

.. code-block:: php

  // Using Awesome https://github.com/PHPMailer/PHPMailer
  <?php
  require 'PHPMailerAutoload.php';

  $mail = new PHPMailer;

  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'smtp.mailgun.org';                     // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = 'postmaster@samples.mailgun.org';   // SMTP username
  $mail->Password = 'secret';                           // SMTP password
  $mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

  $mail->From = 'me@samples.mailgun.org';
  $mail->FromName = 'Mailer';
  $mail->addAddress('bar@example.com');                 // Add a recipient

  $mail->WordWrap = 50;                                 // Set word wrap to 50 characters

  $mail->Subject = 'Hello';
  $mail->Body    = 'Testing some Mailgun awesomness';

  if(!$mail->send()) {
      echo 'Message could not be sent.';
      echo 'Mailer Error: ' . $mail->ErrorInfo;
  } else {
      echo 'Message has been sent';
  }

.. code-block:: py

  import os
  import smtplib

  from email.mime.text import MIMEText

  msg = MIMEText('Testing some Mailgun awesomness')
  msg['Subject'] = "Hello"
  msg['From']    = "foo@samples.mailgun.org"
  msg['To']      = "bar@example.com"

  s = smtplib.SMTP('smtp.mailgun.org', 587)

  s.login('postmaster@samples.mailgun.org', '3kh9umujora5')
  s.sendmail(msg['From'], msg['To'], msg.as_string())
  s.quit()

.. code-block:: rb

  # install `mail` gem first: `gem install mail`

  require 'mail'

  Mail.defaults do
    delivery_method :smtp, {
      :port      => 587,
      :address   => "smtp.mailgun.com",
      :user_name => "",
      :password  => "",
    }
  end

  mail = Mail.deliver do
    to      'bar@example.com'
    from    'foo@samples.mailgun.org'
    subject 'Hello'

    text_part do
      body 'Testing some Mailgun awesomness'
    end
  end

.. code-block:: csharp

  public static IRestResponse SendSimpleMessage() {
    // Compose a message
    MailMessage mail = new MailMessage("foo@samples.mailgun.org", "bar@example.com");
    mail.Subject = "Hello";
    mail.Body = "Testing some Mailgun awesomness";

    // Send it!
    SmtpClient client = new SmtpClient();
    client.Port = 587;
    client.DeliveryMethod = SmtpDeliveryMethod.Network;
    client.UseDefaultCredentials = false;
    client.Credentials = new System.Net.NetworkCredential("postmaster@samples.mailgun.org", "3kh9umujora5");
    client.Host = "smtp.mailgun.org";

    client.Send(mail);
  }

