up vote
124
down vote
accepted
[Updated 31.10.2014] Allright! It works! Here is how I did it from scratch, so others with the same problem can fix it too. First I will explain how to setup Heroku and GoDaddy, then I will explain how to create a naked domain (www.example.com -> example.com).

Setup Heroku and GoDaddy:

In your project folder in terminal (on your computer) write heroku domains:add www.example.com (where www.example.com is the domain you have bought at GoDaddy)

Sign in to GoDaddy -> DOMAINS -> choose your domain -> Launch (this will take you to the Domain Details)

Click 'DNS Zone File' tab

Remove the CNAME record named 'www' (which points to @)

Click 'Add record' -> CNAME(Alias) -> 'Host' should be www and 'Points to' should be your Heroku address (example supermoo-bil-3411.herokuapp.com). TTL can be 1 hour.

It can take some time for the DNS to propogate. For me it took about 10 minutes.

That's it! supermoo-bil-3411.herokuapp.com will now be under www.example.com :)

Create a naked domain:

A naked domain removes the need to write www in front of your domain name. This can be done by forwarding example.com to www.example.com. This is super easy on GoDaddy:

In the same window as above, click on the 'Settings' tab

Under Forwarding -> Domain -> Click 'Manage' -> then click 'Add Forwarding'

'Forward to' should be www.example.com (your domain), 'Redirect type' should be '301 (Permanent)', 'Forward settings' should be 'Forward only'

Make sure "Update my nameservers and DNS settings to support this change. (Recommended)" is checked

That's it! You are done :)

Useful links:

https://devcenter.heroku.com/articles/custom-domains
Thanks to Ryan Kazinec for help :)