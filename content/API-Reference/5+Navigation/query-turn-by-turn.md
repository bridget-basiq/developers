---
title: Query turn-by-turn instructions
description: Query turn-by-turn instructions to build a navigation experience.
order: 2
---

# Query turn-by-turn instructions

After creating a [new route](/API-Reference/Routes/mutate-route) and obtaining your `route ID`, you can use the `navigationMapping` query to obtain a turn-by-turn instruction object tailored to your preferred navigation service provider. The returned object is in JSON format and contains all relevant data for the specified mapping provider.

<note display="block">
This query contains experimental features. They are not supported and may change, break, or disappear at any time.
</note>

## Query

To query the navigation mapping, you need a `route ID`, a navigation service provider name, the number of decimals for the polyline encoding and the preferred language for the navigation instructions. **Note: at the moment only English is supported.**

<schema name="navigationMapping"></schema>

<response error="navigationMapping"></response>

<playground>
<code-block lang="graphql" type="query">					
query navigationMapping {
    navigationMapping(
        id: "61dd9e078f1738f4131e8144",
        provider: MapboxV5,
        precision: 5,
        language: en
    )
}
</code-block>
<code-block lang="json" type="response">
{
  "data": {
    "navigationMapping": {
      "routes": [
        {
          "weight_typical": 231,
          "duration_typical": 231,
          "weight_name": "auto",
          "weight": 231,
          "duration": 231,
          "distance": 2630,
          "routeOptions": {
            "baseUrl": "https://api.mapbox.com",
            "user": "mapbox",
            "profile": "driving-traffic",
            "language": "en",
            "continue_straight": true,
            "roundabout_exits": true,
            "geometries": "polyline",
            "overview": "full",
            "coordinates": "4.904250269794076,52.36844360564212;4.899021139596144,52.36377317653018",
            "steps": true,
            "voice_instructions": true,
            "banner_instructions": true,
            "voice_units": "metric",
            "uuid": "ab0287b0-b9c8-44bb-8c4a-1ad891222a42"
          },
          "legs": [
            {
              "via_waypoints": [],
              "admins": [],
              "annotation": {},
              "weight_typical": 231,
              "duration_typical": 231,
              "weight": 231,
              "duration": 231,
              "steps": [
                {
                  "bannerInstructions": [
                    {
                      "primary": {
                        "components": [
                          {
                            "text": "Valkenburgerstraat",
                            "type": "text"
                          }
                        ],
                        "driving_side": "right",
                        "type": "turn",
                        "modifier": "sharp left",
                        "text": "Valkenburgerstraat"
                      },
                      "distanceAlongGeometry": 107
                    }
                  ],
                  "voiceInstructions": [
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;In 100 meters, turn sharp left&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "In 100 meters, turn sharp left",
                      "distanceAlongGeometry": 100
                    },
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;Turn sharp left&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "Turn sharp left",
                      "distanceAlongGeometry": 50
                    }
                  ],
                  "intersections": [
                    {
                      "entry": [
                        true
                      ],
                      "bearings": [
                        25
                      ],
                      "is_urban": true,
                      "out": 0,
                      "location": [
                        52.36845,
                        4.90424
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        205,
                        0
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.369028,
                        4.905502
                      ]
                    }
                  ],
                  "maneuver": {
                    "bearing_before": 0,
                    "bearing_after": 25,
                    "location": [
                      4.90424,
                      52.36845
                    ],
                    "type": "depart",
                    "instruction": "CONTINUE_ON_STREET"
                  },
                  "name": "Valkenburgerstraat",
                  "weight_typical": 9,
                  "duration_typical": 9,
                  "duration": 9,
                  "distance": 107,
                  "driving_side": "right",
                  "weight": 9,
                  "mode": "driving",
                  "geometry": ""
                },
                {
                  "bannerInstructions": [
                    {
                      "primary": {
                        "components": [
                          {
                            "text": "S100",
                            "type": "text"
                          }
                        ],
                        "driving_side": "right",
                        "type": "turn",
                        "modifier": "right",
                        "text": "S100"
                      },
                      "distanceAlongGeometry": 1109
                    }
                  ],
                  "voiceInstructions": [
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;In 1 kilometer, turn right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "In 1 kilometer, turn right",
                      "distanceAlongGeometry": 1000
                    },
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;In 500 meters, turn right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "In 500 meters, turn right",
                      "distanceAlongGeometry": 500
                    },
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;Turn right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "Turn right",
                      "distanceAlongGeometry": 50
                    }
                  ],
                  "intersections": [
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        0,
                        195
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.369028,
                        4.905502
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        15,
                        199
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.368924,
                        4.90512
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        19,
                        203
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.36884,
                        4.904876
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        23,
                        207
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.368563,
                        4.904227
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        27,
                        214
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.368431,
                        4.903968
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        34,
                        220
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.368321,
                        4.903804
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        40,
                        229
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.368145,
                        4.903598
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        49,
                        273
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.368001,
                        4.903473
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        93,
                        317
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.367901,
                        4.903478
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        137,
                        329
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.367831,
                        4.903553
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        149,
                        317
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.367566,
                        4.903999
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        137,
                        300
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.367407,
                        4.904171
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        120,
                        298
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.366489,
                        4.904705
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        118,
                        302
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.366218,
                        4.904849
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        122,
                        301
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.365246,
                        4.905448
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        121,
                        303
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.365109,
                        4.905529
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        123,
                        300
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.364272,
                        4.906075
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        120,
                        301
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.363576,
                        4.906481
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        121,
                        301
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.363409,
                        4.90658
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        121,
                        299
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.362491,
                        4.90713
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        119,
                        302
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.362311,
                        4.907228
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        122,
                        300
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.362264,
                        4.907257
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        120,
                        301
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.360674,
                        4.908187
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        121,
                        301
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.360406,
                        4.908347
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        121,
                        0
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.360308,
                        4.908406
                      ]
                    }
                  ],
                  "maneuver": {
                    "bearing_before": 301,
                    "bearing_after": 195,
                    "location": [
                      4.905502,
                      52.369028
                    ],
                    "type": "turn",
                    "modifier": "sharp left",
                    "instruction": "TURN_SHARP_LEFT"
                  },
                  "name": "Valkenburgerstraat",
                  "weight_typical": 89,
                  "duration_typical": 89,
                  "duration": 89,
                  "distance": 1109,
                  "driving_side": "right",
                  "weight": 89,
                  "mode": "driving",
                  "geometry": ""
                },
                {
                  "bannerInstructions": [
                    {
                      "primary": {
                        "components": [
                          {
                            "text": "Westeinde",
                            "type": "text"
                          }
                        ],
                        "driving_side": "right",
                        "type": "turn",
                        "modifier": "sharp right",
                        "text": "Westeinde"
                      },
                      "distanceAlongGeometry": 688
                    }
                  ],
                  "voiceInstructions": [
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;In 500 meters, turn sharp right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "In 500 meters, turn sharp right",
                      "distanceAlongGeometry": 500
                    },
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;Turn sharp right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "Turn sharp right",
                      "distanceAlongGeometry": 50
                    }
                  ],
                  "intersections": [
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        0,
                        195
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.360308,
                        4.908406
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        15,
                        207
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.360256,
                        4.908215
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        27,
                        202
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.359448,
                        4.906638
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        22,
                        194
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.359229,
                        4.906111
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        14,
                        193
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.359207,
                        4.906025
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        13,
                        188
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.358744,
                        4.904038
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        8,
                        183
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.358711,
                        4.903793
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        3,
                        192
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.358696,
                        4.903533
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        12,
                        191
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.358316,
                        4.901791
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        11,
                        0
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.357818,
                        4.899297
                      ]
                    }
                  ],
                  "maneuver": {
                    "bearing_before": 191,
                    "bearing_after": 195,
                    "location": [
                      4.908406,
                      52.360308
                    ],
                    "type": "turn",
                    "modifier": "right",
                    "instruction": "TURN_RIGHT"
                  },
                  "name": "S100",
                  "weight_typical": 56,
                  "duration_typical": 56,
                  "duration": 56,
                  "distance": 688,
                  "driving_side": "right",
                  "weight": 56,
                  "mode": "driving",
                  "geometry": ""
                },
                {
                  "bannerInstructions": [
                    {
                      "primary": {
                        "components": [
                          {
                            "text": "Utrechtsestraat",
                            "type": "text"
                          }
                        ],
                        "driving_side": "right",
                        "type": "turn",
                        "modifier": "slight right",
                        "text": "Utrechtsestraat"
                      },
                      "distanceAlongGeometry": 375
                    }
                  ],
                  "voiceInstructions": [
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;In 370 meters, turn slight right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "In 370 meters, turn slight right",
                      "distanceAlongGeometry": 370
                    },
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;Turn slight right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "Turn slight right",
                      "distanceAlongGeometry": 50
                    }
                  ],
                  "intersections": [
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        0,
                        62
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.357818,
                        4.899297
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        242,
                        98
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.357939,
                        4.899361
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        278,
                        102
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.358041,
                        4.899346
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        282,
                        100
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.358191,
                        4.899313
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        280,
                        114
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.358641,
                        4.89923
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        294,
                        98
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.359321,
                        4.898927
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        278,
                        72
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.359472,
                        4.898907
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        252,
                        59
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.359614,
                        4.898953
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        239,
                        50
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.359755,
                        4.899038
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        230,
                        92
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.360485,
                        4.899647
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        272,
                        112
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.360634,
                        4.899641
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        292,
                        139
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.360881,
                        4.899544
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        319,
                        0
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.361003,
                        4.899405
                      ]
                    }
                  ],
                  "maneuver": {
                    "bearing_before": 139,
                    "bearing_after": 62,
                    "location": [
                      4.899297,
                      52.357818
                    ],
                    "type": "turn",
                    "modifier": "sharp right",
                    "instruction": "TURN_SHARP_RIGHT"
                  },
                  "name": "Westeinde",
                  "weight_typical": 30,
                  "duration_typical": 30,
                  "duration": 30,
                  "distance": 375,
                  "driving_side": "right",
                  "weight": 30,
                  "mode": "driving",
                  "geometry": ""
                },
                {
                  "bannerInstructions": [
                    {
                      "primary": {
                        "components": [
                          {
                            "text": "Utrechtsestraat",
                            "type": "text"
                          }
                        ],
                        "driving_side": "right",
                        "type": "turn",
                        "modifier": "slight right",
                        "text": "Utrechtsestraat"
                      },
                      "distanceAlongGeometry": 107
                    }
                  ],
                  "voiceInstructions": [
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;In 100 meters, turn slight right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "In 100 meters, turn slight right",
                      "distanceAlongGeometry": 100
                    },
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;Turn slight right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "Turn slight right",
                      "distanceAlongGeometry": 50
                    }
                  ],
                  "intersections": [
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        0,
                        112
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.361003,
                        4.899405
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        292,
                        0
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.361942,
                        4.89903
                      ]
                    }
                  ],
                  "maneuver": {
                    "bearing_before": 112,
                    "bearing_after": 112,
                    "location": [
                      4.899405,
                      52.361003
                    ],
                    "type": "turn",
                    "modifier": "slight right",
                    "instruction": "TURN_SLIGHT_RIGHT"
                  },
                  "name": "Utrechtsestraat",
                  "weight_typical": 16,
                  "duration_typical": 16,
                  "duration": 16,
                  "distance": 107,
                  "driving_side": "right",
                  "weight": 16,
                  "mode": "driving",
                  "geometry": ""
                },
                {
                  "bannerInstructions": [
                    {
                      "primary": {
                        "components": [
                          {
                            "text": "Utrechtsestraat",
                            "type": "text"
                          }
                        ],
                        "driving_side": "right",
                        "type": "turn",
                        "modifier": "right",
                        "text": "Utrechtsestraat"
                      },
                      "distanceAlongGeometry": 41
                    }
                  ],
                  "voiceInstructions": [
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;Turn right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "Turn right",
                      "distanceAlongGeometry": 32
                    }
                  ],
                  "intersections": [
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        0,
                        57
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.361942,
                        4.89903
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        237,
                        103
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.36203,
                        4.899088
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        283,
                        113
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.362101,
                        4.899072
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        293,
                        129
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.362162,
                        4.899046
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        309,
                        169
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.36224,
                        4.898984
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        349,
                        0
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.362256,
                        4.898905
                      ]
                    }
                  ],
                  "maneuver": {
                    "bearing_before": 169,
                    "bearing_after": 57,
                    "location": [
                      4.89903,
                      52.361942
                    ],
                    "type": "turn",
                    "modifier": "slight right",
                    "instruction": "TURN_SLIGHT_RIGHT"
                  },
                  "name": "Utrechtsestraat",
                  "weight_typical": 6,
                  "duration_typical": 6,
                  "duration": 6,
                  "distance": 41,
                  "driving_side": "right",
                  "weight": 6,
                  "mode": "driving",
                  "geometry": ""
                },
                {
                  "bannerInstructions": [
                    {
                      "primary": {
                        "components": [
                          {
                            "text": "Keizersgracht",
                            "type": "text"
                          }
                        ],
                        "driving_side": "right",
                        "type": "turn",
                        "modifier": "right",
                        "text": "Keizersgracht"
                      },
                      "distanceAlongGeometry": 156
                    }
                  ],
                  "voiceInstructions": [
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;In 150 meters, turn right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "In 150 meters, turn right",
                      "distanceAlongGeometry": 150
                    },
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;Turn right&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "Turn right",
                      "distanceAlongGeometry": 50
                    }
                  ],
                  "intersections": [
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        0,
                        111
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.362256,
                        4.898905
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        291,
                        0
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.36362,
                        4.898378
                      ]
                    }
                  ],
                  "maneuver": {
                    "bearing_before": 111,
                    "bearing_after": 111,
                    "location": [
                      4.898905,
                      52.362256
                    ],
                    "type": "turn",
                    "modifier": "right",
                    "instruction": "TURN_RIGHT"
                  },
                  "name": "Utrechtsestraat",
                  "weight_typical": 23,
                  "duration_typical": 23,
                  "duration": 23,
                  "distance": 156,
                  "driving_side": "right",
                  "weight": 23,
                  "mode": "driving",
                  "geometry": ""
                },
                {
                  "bannerInstructions": [
                    {
                      "primary": {
                        "components": [
                          {
                            "text": "Finish",
                            "type": "text"
                          }
                        ],
                        "driving_side": "right",
                        "type": "arrive",
                        "text": "Finish"
                      },
                      "distanceAlongGeometry": 47
                    }
                  ],
                  "voiceInstructions": [
                    {
                      "ssmlAnnouncement": "&lt;speak&gt;&lt;amazon:effect name=\"drc\"&gt;&lt;prosody rate=\"1.08\"&gt;You have reached your destination&lt;/prosody&gt;&lt;/amazon:effect&gt;&lt;/speak&gt;",
                      "announcement": "You have reached your destination",
                      "distanceAlongGeometry": 37
                    }
                  ],
                  "intersections": [
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        0,
                        11
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.36362,
                        4.898378
                      ]
                    },
                    {
                      "entry": [
                        true,
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        191,
                        0
                      ],
                      "is_urban": true,
                      "out": 1,
                      "location": [
                        52.363747,
                        4.899034
                      ]
                    }
                  ],
                  "maneuver": {
                    "bearing_before": 11,
                    "bearing_after": 11,
                    "location": [
                      4.898378,
                      52.36362
                    ],
                    "type": "turn",
                    "modifier": "right",
                    "instruction": "TURN_RIGHT"
                  },
                  "name": "Keizersgracht",
                  "weight_typical": 6,
                  "duration_typical": 6,
                  "duration": 6,
                  "distance": 47,
                  "driving_side": "right",
                  "weight": 6,
                  "mode": "driving",
                  "geometry": ""
                },
                {
                  "bannerInstructions": [],
                  "voiceInstructions": [],
                  "intersections": [
                    {
                      "entry": [
                        true
                      ],
                      "in": 0,
                      "bearings": [
                        0
                      ],
                      "is_urban": true,
                      "location": [
                        52.363747,
                        4.899034
                      ]
                    }
                  ],
                  "maneuver": {
                    "bearing_before": 11,
                    "bearing_after": 11,
                    "location": [
                      4.899034,
                      52.363747
                    ],
                    "type": "arrive",
                    "instruction": "FINISH"
                  },
                  "name": "Finish",
                  "weight_typical": 0,
                  "duration_typical": 0,
                  "duration": 0,
                  "distance": 0,
                  "driving_side": "right",
                  "weight": 0,
                  "mode": "driving",
                  "geometry": ""
                }
              ],
              "distance": 2630,
              "summary": "Valkenburgerstraat, Finish"
            }
          ],
          "geometry": "",
          "voiceLocale": "en"
        }
      ],
      "waypoints": [
        {
          "name": "Valkenburgerstraat",
          "location": [
            4.904250269794076,
            52.36844360564212
          ]
        },
        {
          "name": "Valkenburgerstraat",
          "location": [
            4.899021139596144,
            52.36377317653018
          ]
        }
      ],
      "code": "Ok",
      "uuid": "ab0287b0-b9c8-44bb-8c4a-1ad891222a42"
    }
  }
}
</code-block>
</playground>
