# nstitute-api



## Dev Environment Info

The local dev environment is managed using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).


### Build local environment
```
docker-compose build
```


### Start local environment
```
docker-compose up
```

### Run tests
```
docker-compose run app npm test
```

### Run tests with coverage
```
docker-compose run app npm run coverage
```


## Data Conversion

Scripts used to convert data from legacy website to MongoDB are located in `./data-conversion`. You only need to set a MONGO_URL environment variable if you wish to run any of these items on a remote database. It will run locally in a Docker Compose database by default.


### Import N-Sider (old site) to staging collections

```
docker-compose run app node import_data.js
```


### Convert imported N-Sider data to nsider_archive collection

```
docker-compose run app node convert_data.js
```



## API Routes


### Get a list N-Sider archive articles

**GET:**
```
/nsider-archive
```

**Query Parameters:**

* `skip` - Number of records to skip. Default: 0
* `take` - Number of records to take. Default: 10
* `staffID` - String to filter by `authors.nsider_staff_id`. Optional.

**Response:**
```json
[
  {
    "_id": "56a52476d211b5010079f059",
    "nsider_id": "4207",
    "title": "Sakurai you idiot",
    "published_date": "2012-05-28 07:00:00",
    "spill": "SICK OF YOUR CRAP\r\n\r\nYou make some sloppy decisions in your single player games let me tell you.  It's easy to beat a thing sure but the second you try to do the harder challenges they end up being hard because of frustrating STUPID things.\r\n\r\nKid Dick at the moment here.  Intensity down a level when you die.  BITE ME.  Half of the shit in the game is \"do this at this intensity.\"  Challenges, certain doors, etc.  The intensity itself is CHALLENGE ENOUGH.  Everything's harder.  But they carry with them the secondary requirement of \"never die ever.\"  Are you fucking me.  I play a level for 15 minutes and die and nope, have to restart completely for this dinky little challenge, because you think \"aw he died better make it a level easier.\"  It's HARD but it's hard for frustrating annoying-ass reasons.  \"Replay everything.\"  Forced replaying of 20-minute levels upon failure is not FUN, it's STUPID.\r\n\r\n[center][img=1][/center]\r\n\r\nYou want to penalize me?  Fine, make me spend hearts again to maintain the intensity upon death.  But do not PERMA-LOWER it and force me to REDO EVERYTHING.\r\n\r\nNOT FUN.\r\n\r\nYOU ARE STUPID.\r\n\r\nYou do this a lot, MasaHiro, this sort of extreme-fuck stuff.  It was all over the place in the Subspace Emissary in SSBB.  I think you are OUT OF CONTROL when not being managed by a Nintendo producer.  I am not sure you have that \"Nintendo sense\" that keeps a game accessible and not really annoying.  You can be hard without being stupid.  So LESS STUPID.\r\n\r\nScore: 9/10",
    "style": "",
    "feature": "N",
    "feature_blurb": "",
    "feature_img": "",
    "linked_type": "NULL",
    "linked_id": "0",
    "finished": "Y",
    "date_created": "0000-00-00 00:00:00",
    "date_updated": "0000-00-00 00:00:00",
    "last_modified_by": "0",
    "deleted": "N",
    "pages": [],
    "authors": [
      {
        "_id": "56a52473d211b5010079cb39",
        "nsider_staff_id": "2",
        "first_name": "Cory",
        "last_name": "Faller",
        "date_created": "0000-00-00 00:00:00",
        "date_updated": "0000-00-00 00:00:00",
        "last_modified_by": "0",
        "deleted": "N",
        "display_order": "1",
        "contributor": "N"
      }
    ]
  }
]
```

**Status Codes:**
* `200` if successful
* `400` if invalid query parameters


### Get a N-Sider archive article

**GET:**
```
/nsider-archive/:nsider_id
```

**Response:**
```json
{
  "_id": "56a52476d211b5010079f059",
  "nsider_id": "4207",
  "title": "Sakurai you idiot",
  "published_date": "2012-05-28 07:00:00",
  "spill": "SICK OF YOUR CRAP\r\n\r\nYou make some sloppy decisions in your single player games let me tell you.  It's easy to beat a thing sure but the second you try to do the harder challenges they end up being hard because of frustrating STUPID things.\r\n\r\nKid Dick at the moment here.  Intensity down a level when you die.  BITE ME.  Half of the shit in the game is \"do this at this intensity.\"  Challenges, certain doors, etc.  The intensity itself is CHALLENGE ENOUGH.  Everything's harder.  But they carry with them the secondary requirement of \"never die ever.\"  Are you fucking me.  I play a level for 15 minutes and die and nope, have to restart completely for this dinky little challenge, because you think \"aw he died better make it a level easier.\"  It's HARD but it's hard for frustrating annoying-ass reasons.  \"Replay everything.\"  Forced replaying of 20-minute levels upon failure is not FUN, it's STUPID.\r\n\r\n[center][img=1][/center]\r\n\r\nYou want to penalize me?  Fine, make me spend hearts again to maintain the intensity upon death.  But do not PERMA-LOWER it and force me to REDO EVERYTHING.\r\n\r\nNOT FUN.\r\n\r\nYOU ARE STUPID.\r\n\r\nYou do this a lot, MasaHiro, this sort of extreme-fuck stuff.  It was all over the place in the Subspace Emissary in SSBB.  I think you are OUT OF CONTROL when not being managed by a Nintendo producer.  I am not sure you have that \"Nintendo sense\" that keeps a game accessible and not really annoying.  You can be hard without being stupid.  So LESS STUPID.\r\n\r\nScore: 9/10",
  "style": "",
  "feature": "N",
  "feature_blurb": "",
  "feature_img": "",
  "linked_type": "NULL",
  "linked_id": "0",
  "finished": "Y",
  "date_created": "0000-00-00 00:00:00",
  "date_updated": "0000-00-00 00:00:00",
  "last_modified_by": "0",
  "deleted": "N",
  "pages": [],
  "authors": [
    {
      "_id": "56a52473d211b5010079cb39",
      "nsider_staff_id": "2",
      "first_name": "Cory",
      "last_name": "Faller",
      "date_created": "0000-00-00 00:00:00",
      "date_updated": "0000-00-00 00:00:00",
      "last_modified_by": "0",
      "deleted": "N",
      "display_order": "1",
      "contributor": "N"
    }
  ]
}
```

**Status Codes:**
* `200` if successful
* `404` if does not exist
