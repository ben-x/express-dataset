#Node.js Express: Express Challenge API (48Hours) 
<br>

<p>In this challenge, you are part of a team building a git event tracking platform. One requirement is for a REST API service to provide events information using the Nodejs Express framework. You will need to add functionality to add and delete information as well as to perform some queries. You'll be dealing with typical information for git event data like repository, actor, event type, etc. The team has come up with a set of requirements including filtering and ordering requirements, response codes and error messages for the queries you must implement.</p>

<p>&nbsp;</p>

<p>The definitions and a detailed requirements list follow. You will be graded on whether your application performs data retrieval and manipulation based on given use cases exactly as described in the requirements.</p>

<p>&nbsp;</p>

<p>Each event data is a JSON entry with the following keys:</p>

<ul>
	<li>
<code>id</code>: This is the event unique ID.</li>
	<li>
<code>type</code>: This is the event type.</li>
	<li>
<code>actor</code>: The actor responsible for the event. The actor itself is a JSON entry consisting of following fields:
	<ul>
		<li>
<code>id</code>: This is the actor unique ID.</li>
		<li>
<code>login</code>: This is the actor unique login ID.</li>
		<li>
<code>avatar_url</code>: This is the actor avatar URL.</li>
	</ul>
	</li>
	<li>
<code>repo</code>: The repository to which this event is associated with. The repo itself is a JSON entry consisting of following fields:
	<ul>
		<li>
<code>id</code>: This is the repo unique ID.</li>
		<li>
<code>name</code>: This is the repo name.</li>
		<li>
<code>url</code>: This is the repo URL.</li>
	</ul>
	</li>
	<li>
<code>created_at</code>: This is the timestamp for the event creation given in the format <code>yyyy-MM-dd HH:mm:ss</code>. The timezone is <code>UTC +0</code>.</li>
</ul>

<p>&nbsp;</p>

<details><summary class="section-title">Sample JSON git event object</summary>

<div class="collapsable-details">
<pre>{
&nbsp; "id":4055191679,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":2790311,
&nbsp; &nbsp; "login":"daniel33",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2790311"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":352806,
&nbsp; &nbsp; "name":"johnbolton/exercitationem",
&nbsp; &nbsp; "url":"https://github.com/johnbolton/exercitationem"
&nbsp; },
&nbsp; "created_at":"2015-10-03 06:13:31"
}</pre>
</div>
</details>

<p>&nbsp;</p>

<p>The <em>REST</em> service should implement the following functionalities:</p>

<ol>
	<li>
<em>Erasing all the events</em>: The service should be able to erase all the events by the <em>DELETE</em> request at <code>/erase</code>. The <em>HTTP</em> response code should be <em>200</em>.</li>
	<li>
<em>Adding new events</em>: The service should be able to add a new event by the <em>POST</em> request at <code>/events</code>. The event <em>JSON</em> is sent in the request body. If an event with the same id already exists then the <em>HTTP</em> response code should be <em>400</em>, otherwise, the response code should be <em>201</em>.</li>
	<li>
<em>Returning all the events</em>: The service should be able to return the JSON array of all the events by the <em>GET</em> request at <code>/events</code>. The <em>HTTP</em> response code should be <em>200</em>. The JSON array should be sorted in ascending order by event ID.</li>
	<li>
<em>Returning the event records filtered by the actor ID</em>: The service should be able to return the <em>JSON</em> array of all the events which are performed by the actor ID by the <em>GET</em> request at <code>/events/actors/{actorID}</code>. If the requested actor does not exist then <em>HTTP</em> response code should be <em>404</em>, otherwise, the response code should be <em>200</em>. The JSON array should be sorted in ascending order by event ID.</li>
	<li>
<em>Updating the avatar URL of the actor</em>: The service should be able to update the avatar URL of the actor by the <em>PUT</em> request at <code>/actors</code>. The actor <em>JSON</em> is sent in the request body. If the actor with the id does not exist then the response code should be <em>404</em>, or if there are other fields being updated for the actor then the <em>HTTP</em> response code should be <em>400</em>, otherwise, the response code should be <em>200</em>.</li>
	<li>
<em>Returning the actor records ordered by the total number of events</em>: The service should be able to return the <em>JSON</em> array of all the actors sorted by the total number of associated events with each actor in descending order by the <em>GET</em> request at <code>/actors</code>. If there are more than one actors with the same number of events, then order them by the timestamp of the latest event in the descending order. If more than one actors have the same timestamp for the latest event, then order them by the alphabetical order of login. The <em>HTTP</em> response code should be <em>200</em>.</li>
	<li>
<em>Returning the actor records ordered by the maximum streak</em>: The service should be able to return the <em>JSON</em> array of all the actors sorted by the maximum streak (i.e., the total number of consecutive days actor has pushed an event to the system) in descending order by the <em>GET</em> request at <code>/actors/streak</code>. If there are more than one actors with the same maximum streak, then order them by the timestamp of the latest event in the descending order. If more than one actors have the same timestamp for the latest event, then order them by the alphabetical order of login. The <em>HTTP</em> response code should be <em>200</em>.</li>
</ol>

<p>&nbsp;</p>

<p>You should complete the given incomplete project so that it passes all the test cases when running the provided unit tests. The project by default supports the use of SQLite3 database but you also use NeDB. These two are the only accepted database</p>

<p>&nbsp;</p>

<details><summary class="section-title">Sample Series of Requests</summary>

<div class="collapsable-details">
<p>Requests are received in the following order and are provided in the test file <em>http00.json</em>:</p>

<details><summary class="section-title">POST <code>/events</code></summary>

<div class="collapsable-details">
<p>Consider the following <em>POST</em> requests (these are performed in the ascending order of event id):</p>

<div class="json-object-array">
<ol>
	<li>
	<pre>{
&nbsp; "id":4055191679,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":2790311,
&nbsp; &nbsp; "login":"daniel33",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2790311"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":352806,
&nbsp; &nbsp; "name":"johnbolton/exercitationem",
&nbsp; &nbsp; "url":"https://github.com/johnbolton/exercitationem"
&nbsp; },
&nbsp; "created_at":"2015-10-03 06:13:31"
}</pre>
	</li>
	<li>
	<pre>{
&nbsp; "id":2712153979,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":2907782,
&nbsp; &nbsp; "login":"eric66",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2907782"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":426482,
&nbsp; &nbsp; "name":"pestrada/voluptatem",
&nbsp; &nbsp; "url":"https://github.com/pestrada/voluptatem"
&nbsp; },
&nbsp; "created_at":"2014-07-13 08:13:31"
}</pre>
	</li>
	<li>
	<pre>{
&nbsp; "id":4633249595,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":4276597,
&nbsp; &nbsp; "login":"iholloway",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/4276597"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":269910,
&nbsp; &nbsp; "name":"iholloway/aperiam-consectetur",
&nbsp; &nbsp; "url":"https://github.com/iholloway/aperiam-consectetur"
&nbsp; },
&nbsp; "created_at":"2016-04-18 00:13:31"
}</pre>
	</li>
	<li>
	<pre>{
&nbsp; "id":1514531484,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":3698252,
&nbsp; &nbsp; "login":"daniel51",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/3698252"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":451024,
&nbsp; &nbsp; "name":"daniel51/quo-tempore-dolor",
&nbsp; &nbsp; "url":"https://github.com/daniel51/quo-tempore-dolor"
&nbsp; },
&nbsp; "created_at":"2013-06-16 02:13:31"
}</pre>
	</li>
	<li>
	<pre>{
&nbsp; "id":1838493121,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":4864659,
&nbsp; &nbsp; "login":"katrinaallen",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/4864659"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":275832,
&nbsp; &nbsp; "name":"elizabethbailey/error-quod-a",
&nbsp; &nbsp; "url":"https://github.com/elizabethbailey/error-quod-a"
&nbsp; },
&nbsp; "created_at":"2013-09-28 01:13:31"
}</pre>
	</li>
	<li>
	<pre>{
&nbsp; "id":1979554031,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":3648056,
&nbsp; &nbsp; "login":"ysims",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/3648056"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":292520,
&nbsp; &nbsp; "name":"svazquez/dolores-quidem",
&nbsp; &nbsp; "url":"https://github.com/svazquez/dolores-quidem"
&nbsp; },
&nbsp; "created_at":"2013-11-11 17:13:31"
}</pre>
	</li>
	<li>
	<pre>{
&nbsp; "id":1536363444,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":4949434,
&nbsp; &nbsp; "login":"millerlarry",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/4949434"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":310964,
&nbsp; &nbsp; "name":"brownphilip/rerum-quidem",
&nbsp; &nbsp; "url":"https://github.com/brownphilip/rerum-quidem"
&nbsp; },
&nbsp; "created_at":"2013-06-23 08:13:31"
}</pre>
	</li>
	<li>
	<pre>{
&nbsp; "id":4501280090,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":2917996,
&nbsp; &nbsp; "login":"oscarschmidt",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2917996"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":301227,
&nbsp; &nbsp; "name":"oscarschmidt/doloremque-expedita",
&nbsp; &nbsp; "url":"https://github.com/oscarschmidt/doloremque-expedita"
&nbsp; },
&nbsp; "created_at":"2016-03-05 10:13:31"
}</pre>
	</li>
	<li>
	<pre>{
&nbsp; "id":3822562012,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":2222918,
&nbsp; &nbsp; "login":"xnguyen",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2222918"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":425512,
&nbsp; &nbsp; "name":"cohenjacqueline/quam-autem-suscipit",
&nbsp; &nbsp; "url":"https://github.com/cohenjacqueline/quam-autem-suscipit"
&nbsp; },
&nbsp; "created_at":"2015-07-15 15:13:31"
}</pre>
	</li>
	<li>
	<pre>{
&nbsp; "id":1319379787,
&nbsp; "type":"PushEvent",
&nbsp; "actor":{
&nbsp; &nbsp; "id":3466404,
&nbsp; &nbsp; "login":"khunt",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/3466404"
&nbsp; },
&nbsp; "repo":{
&nbsp; &nbsp; "id":478747,
&nbsp; &nbsp; "name":"ngriffin/rerum-aliquam-cum",
&nbsp; &nbsp; "url":"https://github.com/ngriffin/rerum-aliquam-cum"
&nbsp; },
&nbsp; "created_at":"2013-04-17 04:13:31"
}</pre>
	</li>
</ol>
</div>
</div>
</details>

<details><summary class="section-title">GET <code>/events/actors/2222918</code></summary>

<div class="collapsable-details">
<p>The response of the <em>GET</em> request is the following <em>JSON</em> array with the <em>HTTP</em> response code <em>200</em>:</p>

<pre>[
&nbsp; {
&nbsp; &nbsp; "id":3822562012,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":2222918,
&nbsp; &nbsp; &nbsp; "login":"xnguyen",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/2222918"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":425512,
&nbsp; &nbsp; &nbsp; "name":"cohenjacqueline/quam-autem-suscipit",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/cohenjacqueline/quam-autem-suscipit"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2015-07-15 15:13:31"
&nbsp; }
]</pre>
</div>
</details>

<details><summary class="section-title">GET <code>/actors/streak</code></summary>

<div class="collapsable-details">
<p>The response of the <em>GET</em> request is the following <em>JSON</em> array with the <em>HTTP</em> response code <em>200</em>:</p>

<pre>[
&nbsp; {
&nbsp; &nbsp; "id":4276597,
&nbsp; &nbsp; "login":"iholloway",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/4276597"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":2917996,
&nbsp; &nbsp; "login":"oscarschmidt",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2917996"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":2790311,
&nbsp; &nbsp; "login":"daniel33",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2790311"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":2222918,
&nbsp; &nbsp; "login":"xnguyen",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2222918"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":2907782,
&nbsp; &nbsp; "login":"eric66",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2907782"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":3648056,
&nbsp; &nbsp; "login":"ysims",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/3648056"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":4864659,
&nbsp; &nbsp; "login":"katrinaallen",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/4864659"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":4949434,
&nbsp; &nbsp; "login":"millerlarry",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/4949434"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":3698252,
&nbsp; &nbsp; "login":"daniel51",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/3698252"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":3466404,
&nbsp; &nbsp; "login":"khunt",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/3466404"
&nbsp; }
]</pre>
</div>
</details>

<details><summary class="section-title">PUT <code>/actors</code></summary>

<div class="collapsable-details">
<p>The request is sent with the following body. Response should be an empty body with a status code of <em>200</em></p>

<pre>{
&nbsp; "id":3648056,
&nbsp; "login":"ysims",
&nbsp; "avatar_url":"https://avatars.com/modified2"
}</pre>
</div>
</details>

<details><summary class="section-title">GET <code>/events</code></summary>

<div class="collapsable-details">
<p>The response of the <em>GET</em> request is the following <em>JSON</em> array with the <em>HTTP</em> response code <em>200</em>:</p>

<pre>[
&nbsp; {
&nbsp; &nbsp; "id":1319379787,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":3466404,
&nbsp; &nbsp; &nbsp; "login":"khunt",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/3466404"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":478747,
&nbsp; &nbsp; &nbsp; "name":"ngriffin/rerum-aliquam-cum",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/ngriffin/rerum-aliquam-cum"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2013-04-17 04:13:31"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":1514531484,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":3698252,
&nbsp; &nbsp; &nbsp; "login":"daniel51",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/3698252"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":451024,
&nbsp; &nbsp; &nbsp; "name":"daniel51/quo-tempore-dolor",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/daniel51/quo-tempore-dolor"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2013-06-16 02:13:31"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":1536363444,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":4949434,
&nbsp; &nbsp; &nbsp; "login":"millerlarry",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/4949434"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":310964,
&nbsp; &nbsp; &nbsp; "name":"brownphilip/rerum-quidem",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/brownphilip/rerum-quidem"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2013-06-23 08:13:31"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":1838493121,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":4864659,
&nbsp; &nbsp; &nbsp; "login":"katrinaallen",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/4864659"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":275832,
&nbsp; &nbsp; &nbsp; "name":"elizabethbailey/error-quod-a",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/elizabethbailey/error-quod-a"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2013-09-28 01:13:31"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":1979554031,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":3648056,
&nbsp; &nbsp; &nbsp; "login":"ysims",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/modified2"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":292520,
&nbsp; &nbsp; &nbsp; "name":"svazquez/dolores-quidem",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/svazquez/dolores-quidem"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2013-11-11 17:13:31"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":2712153979,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":2907782,
&nbsp; &nbsp; &nbsp; "login":"eric66",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/2907782"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":426482,
&nbsp; &nbsp; &nbsp; "name":"pestrada/voluptatem",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/pestrada/voluptatem"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2014-07-13 08:13:31"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":3822562012,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":2222918,
&nbsp; &nbsp; &nbsp; "login":"xnguyen",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/2222918"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":425512,
&nbsp; &nbsp; &nbsp; "name":"cohenjacqueline/quam-autem-suscipit",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/cohenjacqueline/quam-autem-suscipit"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2015-07-15 15:13:31"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":4055191679,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":2790311,
&nbsp; &nbsp; &nbsp; "login":"daniel33",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/2790311"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":352806,
&nbsp; &nbsp; &nbsp; "name":"johnbolton/exercitationem",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/johnbolton/exercitationem"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2015-10-03 06:13:31"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":4501280090,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":2917996,
&nbsp; &nbsp; &nbsp; "login":"oscarschmidt",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/2917996"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":301227,
&nbsp; &nbsp; &nbsp; "name":"oscarschmidt/doloremque-expedita",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/oscarschmidt/doloremque-expedita"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2016-03-05 10:13:31"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":4633249595,
&nbsp; &nbsp; "type":"PushEvent",
&nbsp; &nbsp; "actor":{
&nbsp; &nbsp; &nbsp; "id":4276597,
&nbsp; &nbsp; &nbsp; "login":"iholloway",
&nbsp; &nbsp; &nbsp; "avatar_url":"https://avatars.com/4276597"
&nbsp; &nbsp; },
&nbsp; &nbsp; "repo":{
&nbsp; &nbsp; &nbsp; "id":269910,
&nbsp; &nbsp; &nbsp; "name":"iholloway/aperiam-consectetur",
&nbsp; &nbsp; &nbsp; "url":"https://github.com/iholloway/aperiam-consectetur"
&nbsp; &nbsp; },
&nbsp; &nbsp; "created_at":"2016-04-18 00:13:31"
&nbsp; }
]</pre>
</div>
</details>

<details><summary class="section-title">GET <code>/actors</code></summary>

<div class="collapsable-details">
<p>The response of the <em>GET</em> request is the following <em>JSON</em> array with the <em>HTTP</em> response code <em>200</em>:</p>

<pre>[
&nbsp; {
&nbsp; &nbsp; "id":4276597,
&nbsp; &nbsp; "login":"iholloway",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/4276597"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":2917996,
&nbsp; &nbsp; "login":"oscarschmidt",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2917996"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":2790311,
&nbsp; &nbsp; "login":"daniel33",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2790311"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":2222918,
&nbsp; &nbsp; "login":"xnguyen",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2222918"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":2907782,
&nbsp; &nbsp; "login":"eric66",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/2907782"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":3648056,
&nbsp; &nbsp; "login":"ysims",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/modified2"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":4864659,
&nbsp; &nbsp; "login":"katrinaallen",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/4864659"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":4949434,
&nbsp; &nbsp; "login":"millerlarry",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/4949434"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":3698252,
&nbsp; &nbsp; "login":"daniel51",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/3698252"
&nbsp; },
&nbsp; {
&nbsp; &nbsp; "id":3466404,
&nbsp; &nbsp; "login":"khunt",
&nbsp; &nbsp; "avatar_url":"https://avatars.com/3466404"
&nbsp; }
]</pre>

<p>&nbsp;</p>
</div>
</details>

<details><summary class="section-title">DELETE <code>/erase</code></summary>

<div class="collapsable-details">
<p>This request deletes all events and returns an empty body in the response with status code as <em>200</em>.</p>
</div>
</details>
</div>
</details>

*git clone https://github.com/ben-x/express-dataset node-js-express-dataset-api-6kmle676kc8*
