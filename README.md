<h1 align="center"> Todoo-List-2.0 </h1>

<br>

<p align="center">Be more productive with this todo list, made with Node.js, Express, Mongoose and EJS as the templating system, using MongoDB as the database.</p>
<br>

<img align="center" src="/images/preview.png">

<br>

<h2>Features</h2>

* **Create** new todo lists when the need arises.
* **Read** the contents of your todo list.
* **Delete** items from the todo list or **delete lists** as a whole.
* Switch to any list whenever you want.
* View all the lists at one place.

<br>

<img align="center" src="/images/all.png">

<br>
<br>

Previous version of this app can be found [here](https://github.com/RushanKhan1/ToDoo-List).
<br>
<br>

<h2>Build Instructions</h2>

1. Make sure you have Node.js installed in your system. If not download and install from [here](https://nodejs.org/en/download/).
2. Clone the repository and then navigate to it.
3. Run the command ```npm install``` in the root directory of the cloned repository to install the dependencies.
4. Since the database is hosted on [MongoDB atlas](https://www.mongodb.com/cloud/atlas/lp/try2-in?utm_source=google&utm_campaign=gs_apac_india_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624347&gclid=Cj0KCQiA962BBhCzARIsAIpWEL28vWNux8Kn4uwNGDDGeiQrpnIxOhnnVShrPgteZTU4ORcyUVEymyUaAt-SEALw_wcB) you will need to have access to a database's user id and password because I ain't giving you mine ;) To get your own follow the steps below.
   - Create a free account on [MongoDB atlas](https://www.mongodb.com/cloud/atlas/lp/try2-in?utm_source=google&utm_campaign=gs_apac_india_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624347&gclid=Cj0KCQiA962BBhCzARIsAIpWEL28vWNux8Kn4uwNGDDGeiQrpnIxOhnnVShrPgteZTU4ORcyUVEymyUaAt-SEALw_wcB).
   - Create a new cluster. (make sure that all the options you selected are free so you don't have to pay!)
   - Create a **new user** under **Database Access**, note down the username and password.
   - Now under **Network Access** add a new IP address and enter ```0.0.0.0/0``` to allow access from anywhere.
   - Your database setup is now done!
 5. Now inside the root directory of the project create new file called ```.env``` and write the username and password that you noted before in that file, use the following format:
 ``` 
 DB_USER="yourUsername"
 DB_PASS="yourPassword"
 ```
 6. Now finally you are ready to run the app, enter ```node app.js``` to run it.
 7. Open the url ```localhost:3000/``` in your favourite browser to use the app.
