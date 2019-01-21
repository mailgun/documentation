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
            --au postmaster@YOUR_DOMAIN_NAME \
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

 public class MGSendSimpleSMTP {

     public static void main(String args[]) throws Exception {

         Properties props = System.getProperties();
         props.put("mail.smtps.host", "smtp.mailgun.org");
         props.put("mail.smtps.auth", "true");

         Session session = Session.getInstance(props, null);
         Message msg = new MimeMessage(session);
         msg.setFrom(new InternetAddress("YOU@YOUR_DOMAIN_NAME"));

         InternetAddress[] addrs = InternetAddress.parse("bar@example.com", false));
         msg.setRecipients(Message.RecipientType.TO, addrs)

         msg.setSubject("Hello");
         msg.setText("Testing some Mailgun awesomness");
         msg.setSentDate(new Date());

         SMTPTransport t =
             (SMTPTransport) session.getTransport("smtps");
         t.connect("smtp.mailgun.com", "postmaster@YOUR_DOMAIN_NAME", "YOUR_SMTP_PASSWORD");
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
  $mail->Username = 'postmaster@YOUR_DOMAIN_NAME';   // SMTP username
  $mail->Password = 'secret';                           // SMTP password
  $mail->SMTPSecure = 'tls';                            // Enable encryption, only 'tls' is accepted

  $mail->From = 'YOU@YOUR_DOMAIN_NAME';
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

  import smtplib

  from email.mime.text import MIMEText

  msg = MIMEText('Testing some Mailgun awesomness')
  msg['Subject'] = "Hello"
  msg['From']    = "foo@YOUR_DOMAIN_NAME"
  msg['To']      = "bar@example.com"

  s = smtplib.SMTP('smtp.mailgun.org', 587)

  s.login('postmaster@YOUR_DOMAIN_NAME', '3kh9umujora5')
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
    from    'foo@YOUR_DOMAIN_NAME'
    subject 'Hello'

    text_part do
      body 'Testing some Mailgun awesomness'
    end
  end

.. code-block:: csharp

 using System;
 using System.IO;
 using MailKit;
 using MailKit.Net.Smtp;
 using MimeKit;
 using RestSharp;
 using RestSharp.Authenticators;

 public class SmtpMessageChunk
 {

     public static void Main (string[] args)
     {
         SendMessageSmtp ();
     }

     public static void SendMessageSmtp ()
     {
         // Compose a message
         MimeMessage mail = new MimeMessage ();
         mail.From.Add (new MailboxAddress ("Excited Admin", "foo@YOUR_DOMAIN_NAME"));
         mail.To.Add (new MailboxAddress ("Excited User", "bar@example.com"));
         mail.Subject = "Hello";
         mail.Body = new TextPart ("plain") {
             Text = @"Testing some Mailgun awesomesauce!",
         };

         // Send it!
         using (var client = new SmtpClient ()) {
             // XXX - Should this be a little different?
             client.ServerCertificateValidationCallback = (s, c, h, e) => true;

             client.Connect ("smtp.mailgun.org", 587, false);
             client.AuthenticationMechanisms.Remove ("XOAUTH2");
             client.Authenticate ("postmaster@YOUR_DOMAIN_NAME", "3kh9umujora5");

             client.Send (mail);
             client.Disconnect (true);
         }
     }

 }

.. code-block:: go

 import (
     "github.com/jordan-wright/email"
 )

 func main() {
     e := email.NewEmail()
     e.From = "Your Name <foo@YOUR_DOMAIN_NAME>"
     e.To = []string{"bar@example.com"}
     e.Subject = "Hello"
     e.Text = []byte("Testing some Mailgun awesomeness")
     err := e.Send("smtp.mailgun.com:587", smtp.PlainAuth("", "YOUR_USERNAME", "YOUR_PASSWORD", "smtp.mailgun.com"))
     if err != nil {
        panic(err)
     }
 }
