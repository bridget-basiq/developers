---
title: Query car details
description: Query the data of a single car
order: 3
frequently:
- id
- make
- model
- standard
- power
- usable_kwh
- fast_charging_support
---

# Query car details
Car data can be useful when you want to display more information about the car. You can access data using the `car` query or get even more data with`carPremium`. Please <cta action='smallchat'>contact us</cta> for more information on how to get access to our premium data set. You can see a live example with all available output parameters [here](https://playground.chargetrip.com/?page=car).

<api-reference-actions example-url="https://chargetrip.github.io/examples/car/" url="https://playground.chargetrip.com/?page=car"></api-reference-actions>

## Query
To get specific details of a car you need to provide a `carId`. This `id` can be obtained by using the `carList` query.

<schema name="car" :frequent="frequently"></schema>

<response error="car"></response>

<playground>
<code-block lang="graphql" type="query">
query car {
  car(id: "5ed1175bad06853b3aa1e492") {
    id
    naming {
      make
      model
      version
      edition
      chargetrip_version
    }
    connectors {
      standard
      power
      time
      speed
    }
    adapters {
      standard
      power
      time
      speed
    }
    battery {
      usable_kwh
      full_kwh
    }
    body {
      width
      height
      weight
      seats
    }
    availability {
      status
    }
    performance {
      acceleration
      top_speed
    }
    range {
      real
      real_is_estimated
      worst {
        highway
        city
        combined
      }
      best {
        highway
        city
        combined
      }
      chargetrip_range {
        worst
        best
      }
    }
    media {
      evdb_details_url
      image {
        id
        type
        url
        height
        width
        thumbnail_url
        thumbnail_width
        thumbnail_height
      }
      brand {
        id
        type
        url
        height
        width
        thumbnail_url
        thumbnail_width
        thumbnail_height
      }
      image_list {
        id
        type
        url
        height
        width
        thumbnail_url
        thumbnail_width
        thumbnail_height
      }
      video {
        id
        url
      }
      video_list {
        id
        url
      }
    }
    routing {
      fast_charging_support
    }
  }
}

</code-block>

<code-block lang="json" type="response">
{
  "data": {
    "car": {
      "id": "5ed1175bad06853b3aa1e492",
      "naming": {
        "make": "car-test",
        "model": "car-test",
        "version": "car-test",
        "edition": "car-test",
        "chargetrip_version": "car-test"
      },
      "connectors": [
        {
          "standard": "IEC_62196_T2",
          "power": 22,
          "time": 285,
          "speed": 81
        },
        {
          "standard": "IEC_62196_T2_COMBO",
          "power": 130,
          "time": 35,
          "speed": 460
        }
      ],
      "adapters": [],
      "battery": {
        "usable_kwh": 87,
        "full_kwh": 90
      },
      "body": {
        "width": 1850,
        "height": 1660,
        "weight": 2300
      },
      "availability": {
        "status": 3
      },
      "performance": {
        "acceleration": 5.1,
        "top_speed": 200
      },
      "range": {
        "real": 385,
        "real_is_estimated": false,
        "worst": {
          "highway": 275,
          "city": 390,
          "combined": 330
        },
        "best": {
          "highway": 345,
          "city": 555,
          "combined": 430
        },
        "chargetrip_range": {
          "worst": 407,
          "best": 471
        }
      },
      "media": {
        "evdb_details_url": "car-test",
        "image": null,
        "brand": null,
        "image_list": null,
        "video": null,
        "video_list": null
      }
      "routing": {
        "fast_charging_support": true
      }
    }
  }
}
</code-block>

</playground>
