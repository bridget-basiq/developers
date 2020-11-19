---
title: Query route details
description: Query details like the polyline, duration and distance of route 
order: 3
frequently: 
- route
- status
---

# Query route details

After you received your `route ID` through the [route mutation](), setup your [subscription service]() you will be able to receive route details through the following query. 

## Query

This query requires you to provide a resolved `route ID` so we are able to return you every detail of that specific route.

To make sure you always receive your route details, you would like to call this query; 

1. Right after you subscribed to our subscription service
2. Everytime you receive a `done` status from our subscription service.

### Support alternative stations along a route
If your [route mutation]() included the `stationsAlongRouteRadius` with a valid distance, you can now request the station details in this query. To do so, you will need to add the `stationsAlongRoute` field with it's appropriate children.

### Support stations as waypoint
If your [route mutation]() included stations in the `via` parameter, you will receive a route with additional stations as waypoints. These station as waypoints can be found inside the `route.leg`.


<schema name="route" :frequent="frequently"></schema>

<playground>

<code-block query="route">					
query getRoute {
  route(id:"5e300e71f7e26f726afd3d71") {
    route {
      id
      type
      charges
      distance
      duration
      consumption
      chargeTime
      amenityRanking
      rangeStart
      rangeStartKwh
      rangeEnd
      rangeEndKwh
      via
      polyline
      elevationPlot
      elevationUp
      elevationDown
      elevationMax
      saving {
        co2
        money
        currency
        averageGasPrice
        averageEnergyPrice
      }
      legs {
        id
        distance
        duration
        consumption
        rangeStart
        rangeStartKwh
        rangeEnd
        rangeEndKwh
        origin {
          id
          type
          geometry {
            type
            coordinates
          }
          properties
        }
        destination {
          id
          type
          geometry {
            type
            coordinates
          }
          properties
        }
        type
        name
        stationId
        operatorId
        chargeTime
        evse {
          uid
          status
          connectors {
            standard
            power
          }
        }
        connector {
          standard
          power
        }
        plugsAvailable
        plugsCount
      }
      stationsAlongRoute {
        id
        location {
          type
          coordinates
        }
        speed
        status
        preferredOperator
        distance
      }
    }
    status
  }
}
</code-block>
<code-block>
{
  "data": {
    "route": {
      "route": {
        "id": "5e8c34fe2cc60438df7dc948",
        "type": "fastest",
        "charges": 1,
        "distance": 151327,
        "duration": 6613,
        "consumption": 29.553,
        "chargeTime": 974,
        "amenityRanking": 0,
        "rangeStart": 195000,
        "rangeStartKwh": 28,
        "rangeEnd": 47837,
        "rangeEndKwh": 6.868889337936359,
        "via": "Fastned De Poel",
        "polyline": "ejt~Hyw{\\HJ^h@P\\BMJk@BS{AgBiAqAFY@EV_A@KDO@E?IJe@@I@IXoAJa@@GRw@@E@EBKm@UoIeDKMQg@GSIUMYCAoBmBAC]WUMMGIEyBwBGWMYQUWMCABWDYBe@RuCB_@X}DVwDL}ARcDf@cPJwB?ORaFZ}FR_DBY@Kl@sJDi@De@p@aJX_EBYB[B]Dg@TuCTyCd@yFz@}Jf@eFRyAXsBDSDSNq@d@wBnAiEz@eC`@cATe@rA}BlAwA`Ay@FEFEBCNKXQIg@Ia@UkBGwABeBL_BHy@TeCh@_HFwA?mDIkDOsDaFw~@OeDGoCAsB@sBDsBFqBLqBNoBl@qFDW`DyUT_BFg@F_@Da@`AcGd@wBn@uB`C_Gf@kAdCwFN]N]t@eBLY~CmHN]T\\zCrEt@f@VJ\\@n@G\\M^UZYv@u@n@k@^W^SbAWv@?|@HdD~@dQdIt]jPbHlDPHhFhCnAjAtAhA^d@l@z@xBlEf@d@ZP^Jn@D^GRC^Qb@a@V_@Zs@J]Lm@Hi@Fq@@kAKgOBsCFuAHeAL_ARkA^aBTaABo@nA}EjAkEzAeFzAaFtAeErAeEr@sBpDwJdAaC|BuEr@kAx@wAxDaGnJ_Md@o@rAeBnAiBx@sAz@{AdCqE`BcDjAgCr@}ArAaDpAaDxA{Dt@oBTs@h@sAZ_AjAoE|A{Gr@kDTkAfAgGnAaINoAPoBVsBj@yFd@qFRyCL_CNsC\\cLFwC?oCByDCsJIc[?wBBwEF}BLcDTkCPmBN{@l@oEXyBHu@Da@JaBLmBD{A@aBAgLHiEFwAt@}K?{@d@kF|AyPzBiTfDeYzAkLfBqM^yBvCcSdAuGbDcR~@uE~B_M|@aF|@aFf@wCf@wCp@kE~BePz@mHp@qG`AwKj@_HX_EbB{[~@_Nn@yH~@cJfAeJpAyJt@yEr@uEr@_EpBgKnByJ|EaWzBkLr@eChDyOd@_Cv@_F^mCr@aIlAqOn@kFd@_Df@wC^aB^kBt@wChB_GbAqC~@uBZaApA_DbBaEtAyDfAgDxA{EbDyLbCkJxAiGv@qDd@iCZuBf@sDXsCR{BTwFFwBF_ECiDE}HWka@C_DOmSGyLK{TA_HJuFTkHb@gH`@kEd@sDbAiHv@gEjAiF|@iDbByFjB_FrEaKzBkDnBoCrCkDpAqA|A{AxJmIvZ_Xz@u@nD}CtGuFdB_B|@s@l@e@bCsAzB_A~Bq@lASrASfCOnEE~MQrBCvEWv@OvA[tAa@zAk@vAq@zBqAvBeBzDcE`D}EpB{DpA}C|E_MdZqr@rGeOJUp@_BbBaEpAsCvA_CfAcBbCuC~A{AdAaAd@[rA{@jDaBfBg@pC_@~BI|QFpCQtCc@fA]n@UnAk@pMwG~DmBx@c@jGaD\\Qx@e@dHaEbEuClCiCpDsDvA_BrAeB|DyF|BuDzAqC`DcGdMwWvIyQhEkJbIwQdDsGdFuI|JuO|D{GxA_CxEgIbEuI~CeIlC}HjBaHvBkJr@wDzAiKfAcJXsCjA}PRqFNuGLsIR{TP{R`@c`@T_UNgLZeMVyGTqE\\}Fj@kHf@cFdA}JbDoWxHym@tAoK^qCZcC`@_Dd@mDx@sGLaA`BsM~BoRfDqZjEeb@dDo]Hy@vCgYfBuPxKydAdE_a@hCiVhAkL`@sE\\_Fv@{ML_CFcAZwGjBs]|@oNd@wGl@wGj@gFpA}Jf@aD|@gFhCcMlB{HlBsGzAwE|CiIzCgHnCsFrByD~B{DrCuEnHgLdEuGvHqLvFuIfVo_@lEaH|@sAzBgDxRuYjCyD~EmHv@oAjBwCxEaIl[uf@pCwExB}DbBeDnC}F|BkFrAkDdGoPh@wAfJkWz@aC~@yC|@{Cp@{B`@oBhAqGZuBVwBDi@Fm@JwAXoEVwFnCqz@tHqeCvLmyDPsG`@wYEmSQoTQ_TOwISwI_@iLg@mLkCma@uKozA{A}Te@_I?}CBwAHoAd@mDd@aC`@mBv@aDj@gCJo@BWBc@@}@?mABSBi@FYJONIXC~@C|A@jA?zBQ`BG\\CV@d@DfAJVBlQvBrFp@f@FxEj@bM`BfHhBdGjBhDjA|@NL@JBjALtADnA?rFObHQzKh@b@@zKf@VBpXrAbJb@jGDlAAdDUjDe@xASbF_AnJqBvH_BxFyAbJeCfLcEjBs@bIqDzEiCzJeGpFqDpI{GtF{E`G{Fl@o@zC_D~E{F|EiGjH}J|DcG~DmGt[ej@bBiCvAsB|AmBvCgDrBqBpBcBjGuEfFmCvD_BrAc@lFyAdDi@fDc@bAFd@AxBH|CVzB?`BORCPAzDk@nE{ArIgCzBm@jCgAxE{AdC_AvEyBjDmBpPaKt@e@`MsHhNgJ~EkD~D{CpDoCdJwGbDiCtGwEbT{Nx[qTtDcCtDoB~DiBdCy@bCo@~Cm@lDg@pBS|BG~@J~AZh@R`Ar@Z^vAfC^^t@h@|@RrCGf@?V??g@E_DQoEy@uKAGEk@UDYFgEb@UHWP]f@}@vBWf@_@f@{@z@sAt@}C\\wCPmBXeF|@aCl@gCz@aEhBwDpBwD`CcVrPsDbCeDtBmB~@uCzAQDW@SCWKe@]a@E[BQFID{@b@e@Z??i@\\OJURKtAqCpCMTEN@d@CVCRWVuGzFaJfHwK`IwDhCuH|E{LpHu@d@ePrJ_E|BoEvBcC`AmEtA_FjAmBDiELqHa@{D`@UBDdBFrAJpCPAzDk@nE{ArIgCzBm@jCgAxE{AdC_AvEyBjDmBpPaKt@e@`MsHhNgJ~EkD~D{CpDoCdJwGbDiCtGwEbT{Nx[qTtDcCtDoB~DiBdCy@bCo@~Cm@lDg@pBS|BGzAGnDBjK`@`@?bADjNnA~Cf@dC`@vFfAhIpB\\JrA`@fGnBpHrCtB`A~At@zE`C`HxDfGxDd@\\hAt@bC`BlBxAfAp@p@Zf@N~AZ^D^@hA?rAOj@Kb@MdAe@v@c@n@g@nAoAl@y@h@}@v@{Ad@oA`@sAXeAf@gCLcAVkCFiADcC?aI@}ALuCR{Bh@gD`DsN^sANoA~DeOfD_MtBsIhC}LbC_M|ByNxAaLzBmSz@gKf@sGt@cNZaHPcEZeHdAgVn@oOFsAdAeWzAo\\hAiZJ_CBw@^cJRsL?wJqAkcAGyCe@_NYsFg@kG_AwJcA_HqA{H_AyEgAuEgAeEqAkEaB_FaNk^eCkHoBwGi@eBmA_GyAsHm@}DeAqIm@mF]}DQgC_@cHSeHIwIAwIFcHjCwkAL}IRmNJsLFkMBgO?oQCcIUwWi@i]_Aeg@YiYAkS@c[FiTByIE}MCaCI}FK}FWeJm@mNa@iHm@sIqBuWkAmOqAyOe@_GwJonAsDke@}BwYc@yGw@iPSyF[uNKqGE_N?kIDsHFeFJoEZmLn@uOz@cOl@wH`BeQhBgOvA}J\\wBT{AlBsKrQmaAz@oEn@sDhB{KpAwJn@_FP_Bl@cFvBcVtE{j@vCu_@x@wJpCq\\nAuOb@qF`A_MRcCh@}FRgCXaDfAsMbAwKd@wDf@aDj@uDzAoIzAmGlAqE|AeFtAcE`BeEtDkIbAkB|DuGnEmG~CyDjDcDpD{CbBgAnGwDlAk@vDyArg@gR`GkCjAs@jD}BbAs@pDyC|DaE`D_EbCgDtDoGnBwDn@qApAyClA{Cz@{Bl@eBr@wB`AaDvAiFPq@`AkE~@mEr@uDf@kCbByIf@}Bl@_DP{@nAuGj@}Cr@cDj@eCn@aChCsIz@eCx@wBx@sB~BgFtBeE`DmF`CoD|BaDjQyUbEsF|FwHzHyKhAgBxDuGnBaEdCyFxA{DnCuIfCyJx@{DdG}[nAkHhIqe@tAyItCwPj@_DfAoGRiAPcAdF{YXyAf@{CLs@vC_Qr@aExBkMhEwUfBkJbBmI|CwNt@iDjBiIxHm^nFuVxDiQtAmGtI{`@zF{W`AqEf@_CpCgM|AmGlBwHn@{BvDsLxCsIh@sAz@}BjGgPRk@|GmQh@uAtCsHzd@emA|L{[hIkTj@{Ax@uB~JyWfMo\\Z{@z`@ydApBgFr@iBtBcEb@aAv@kAVYn@m@zAw@LGj@SpAg@hAy@`@k@Zk@Pm@Ps@Hm@H_A@e@?gAGeAKu@U_AM_@EKO[a@m@_@_@KIOKgAi@cK_EqBw@eB_AaAo@[[a@a@{@kAqAqBaVah@}GyN_JkRsBqE{DkI_GcMmTid@Ug@sKgV_EgKkFgOeByFi@cBkA_EeC_Jw@gDkCuK_BqHiB{Is@wDuAuHmB{LwAaJaBuMu@uGuAoNu@mJg@uG}@eOYgGm@}OM}Ec@kS[{S[aTKaOAaNBiJHoJLoHdFkhCz@ke@J{IHyOAaLa@ca@WwTq@mn@c@}^o@gg@EgEM{MMeMGgD_@eOIoCy@_Oa@{Fy@iJGm@SqBmAwJM}@cBmLaB}KuCeSM_As@uFkAaLs@kHi@cH_@qFk@sJq@uPY_LSoNEoH?cIDyJPqK@}@^sN^mIv@uNlAaPzAuOtAaLzA{KxAgJpB{LToAfBuKjAsIZmCz@sJT_Db@_JVaIFkG@mIGwHgBim@e@cXQsWCeFBuUFqMJwID{B?}BTwK`@iPjBif@VcIN}FHwF@}FAyGGwFKkEUkI[{Gy@mLaAkKk@}Em@cEo@wEaBmJqBcJi@{B]eAg@_Ac@i@[]i@]q@a@w@K{@AWRLrBP`BPn@v@nHLhAX`BRb@_@jAc@fBOdAQnCAjDCjDAl@GbAm@lDs@lD]fDK`CCvAi@xOUfHMhBWpCe@|DKj@_@|A}@tCSl@Op@YjA[xCKpAQjBShCO|ASjCA\\A`BHzA@PFf@ZhCR|@Nb@n@lAZr@JOHEDAPDAoBCwC@M@KFOFKzAm@LKNQjAgBj@cBJIl@KJGFKp@}BN_@j@_AJK",
        "elevationPlot": [
          6,
          3,
          0,
          1,
          3,
          1,
          1,
          2,
          0,
          -2,
          -2,
          -2,
          1,
          1,
          1,
          1,
          2,
          7,
          23,
          24,
          12,
          3,
          3,
          0,
          0,
          2,
          -1,
          0,
          0,
          3,
          5,
          6,
          3,
          3,
          5,
          6,
          7,
          10,
          11,
          11,
          10,
          11,
          11,
          12,
          12,
          10,
          10,
          10,
          10,
          10,
          11,
          12,
          10,
          10,
          9,
          8,
          7,
          11,
          17,
          29,
          47,
          34,
          27,
          30,
          40,
          36,
          38,
          42,
          43,
          43,
          56,
          68,
          47,
          16,
          12,
          12,
          8,
          9,
          8,
          8,
          11,
          11,
          11,
          13,
          15,
          14,
          14,
          16,
          14,
          13,
          14,
          14,
          18,
          16,
          15,
          16,
          16,
          18,
          20,
          18
        ],
        "elevationUp": 7566,
        "elevationDown": 6053,
        "elevationMax": 68,
        "saving": {
          "co2": "47520",
          "money": "17.23",
          "currency": "$",
          "averageGasPrice": "1.45",
          "averageEnergyPrice": "0.3"
        },
        "via": "BayWa Schnellladestation 4",
        "legs": [
          {
            "id": "5e8c34fe2cc60415d77dc94a",
            "distance": 74619,
            "duration": 2945,
            "consumption": 14.022,
            "rangeStart": 195000,
            "rangeStartKwh": 28,
            "rangeEnd": 97345,
            "rangeEndKwh": 13.978,
            "origin": {
              "id": null,
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  4.8979755,
                  52.3745403
                ]
              },
              "properties": {
                "addess": "Amsterdam, North Holland, The Netherlands",
                "temp": 11.52,
                "pressure": 1031
              }
            },
            "destination": {
              "id": null,
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  5.6117284297943115,
                  52.06440082406267
                ]
              },
              "properties": {
                "address": "De Poel (A30 Ede - Barneveld HMP 11.8), Ede, Gelderland, NL",
                "temp": 23,
                "pressure": 1013.25
              }
            },
            "type": "station",
            "name": "Fastned De Poel",
            "stationId": "5e8595aad3406c06083c8f76",
            "operatorId": "5e85839fd3406c6b9f3b8fc3",
            "chargeTime": 974,
            "evse": {
              "uid": "57830",
              "status": "UNKNOWN",
              "connectors": [
                {
                  "standard": "CHADEMO",
                  "power": 50
                }
              ]
            },
            "connector": {
              "standard": "CHADEMO",
              "power": 50
            },
            "plugsAvailable": 2,
            "plugsCount": 2
          },
          {
            "id": "5e8c34fe2cc60436277dc949",
            "distance": 76708,
            "duration": 2694,
            "consumption": 15.531,
            "rangeStart": 156000,
            "rangeStartKwh": 22.4,
            "rangeEnd": 47837,
            "rangeEndKwh": 6.869,
            "origin": {
              "id": null,
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  5.6117284297943115,
                  52.06440082406267
                ]
              },
              "properties": {
                "address": "De Poel (A30 Ede - Barneveld HMP 11.8), Ede, Gelderland, NL",
                "temp": 23,
                "pressure": 1013.25
              }
            },
            "destination": {
              "id": null,
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [
                  6.41907267506761,
                  51.94840944992789
                ]
              },
              "properties": {
                "address": "Tandembos, Doetinchemseweg, 7054 CD Oude IJsselstreek, The Netherlands",
                "temp": 12.55,
                "pressure": 1032
              }
            },
            "type": "final",
            "name": "Tandembos, Doetinchemseweg, 7054 CD Oude IJsselstreek, The Netherlands",
            "stationId": "",
            "operatorId": "",
            "chargeTime": 0,
            "evse": null,
            "connector": null,
            "plugsAvailable": 0,
            "plugsCount": 0
          }
        ],
        "stationsAlongRoute": [
          {
            "id": "5e8472ee86a7893516b4c236",
            "location": {
              "type": "Point",
              "coordinates": [
                174.778519,
                -41.292701
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 308
          },
          {
            "id": "5e8472dd86a7896055b4c1b0",
            "location": {
              "type": "Point",
              "coordinates": [
                174.774923,
                -36.869245
              ]
            },
            "speed": "fast",
            "status": "busy",
            "preferredOperator": true,
            "distance": 276
          },
          {
            "id": "5e8472e186a7890273b4c1d0",
            "location": {
              "type": "Point",
              "coordinates": [
                174.775189,
                -36.849508
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 890
          },
          {
            "id": "5e8472eb86a789877eb4c221",
            "location": {
              "type": "Point",
              "coordinates": [
                174.95142,
                -40.987489
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 153
          },
          {
            "id": "5e8472eb86a789a28eb4c21f",
            "location": {
              "type": "Point",
              "coordinates": [
                174.98174,
                -40.918804
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 1818
          },
          {
            "id": "5e8472e886a7896484b4c206",
            "location": {
              "type": "Point",
              "coordinates": [
                175.400028,
                -39.417303
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 8
          },
          {
            "id": "5e8472ea86a789f3c1b4c21a",
            "location": {
              "type": "Point",
              "coordinates": [
                175.152736,
                -40.763595
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 67
          },
          {
            "id": "5e8472e986a7897b29b4c213",
            "location": {
              "type": "Point",
              "coordinates": [
                175.386466,
                -40.174447
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 164
          },
          {
            "id": "5e8472e586a789445fb4c1f8",
            "location": {
              "type": "Point",
              "coordinates": [
                175.163076,
                -38.33225
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 81
          },
          {
            "id": "5e8472dc86a7891a7ab4c1ae",
            "location": {
              "type": "Point",
              "coordinates": [
                174.794549,
                -36.890082
              ]
            },
            "speed": "fast",
            "status": "busy",
            "preferredOperator": true,
            "distance": 230
          },
          {
            "id": "5e8472e486a789251ab4c1f2",
            "location": {
              "type": "Point",
              "coordinates": [
                175.328916,
                -38.008473
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 486
          },
          {
            "id": "5e8472ea86a7890bfeb4c219",
            "location": {
              "type": "Point",
              "coordinates": [
                175.284152,
                -40.623516
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 54
          },
          {
            "id": "5e8472ee86a7897860b4c233",
            "location": {
              "type": "Point",
              "coordinates": [
                174.776116,
                -41.284599
              ]
            },
            "speed": "fast",
            "status": "error",
            "preferredOperator": false,
            "distance": 267
          },
          {
            "id": "5e8472ef86a7893446b4c241",
            "location": {
              "type": "Point",
              "coordinates": [
                174.797143,
                -41.318419
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 2497
          },
          {
            "id": "5edf3db983254c3a4ed21946",
            "location": {
              "type": "Point",
              "coordinates": [
                174.983637,
                -37.192743
              ]
            },
            "speed": "turbo",
            "status": "unknown",
            "preferredOperator": false,
            "distance": 72
          },
          {
            "id": "5e8472ea86a78974dbb4c218",
            "location": {
              "type": "Point",
              "coordinates": [
                175.281212,
                -40.47165
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 462
          },
          {
            "id": "5e8472ee86a7897eb0b4c235",
            "location": {
              "type": "Point",
              "coordinates": [
                174.782858,
                -41.291425
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 562
          },
          {
            "id": "5e8472e386a789dcdfb4c1eb",
            "location": {
              "type": "Point",
              "coordinates": [
                175.273749,
                -37.778893
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 1730
          },
          {
            "id": "5e8472ec86a7893ad9b4c226",
            "location": {
              "type": "Point",
              "coordinates": [
                174.840789,
                -41.134453
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 388
          },
          {
            "id": "5e8472ee86a78941d7b4c237",
            "location": {
              "type": "Point",
              "coordinates": [
                174.774566,
                -41.29457
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 9
          },
          {
            "id": "5e8472dc86a78942fdb4c1ab",
            "location": {
              "type": "Point",
              "coordinates": [
                174.762623,
                -36.84537
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": true,
            "distance": 1287
          },
          {
            "id": "5e8472e286a7891bdab4c1d9",
            "location": {
              "type": "Point",
              "coordinates": [
                174.879214,
                -36.988096
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 595
          },
          {
            "id": "5e8472db86a789ad54b4c1a9",
            "location": {
              "type": "Point",
              "coordinates": [
                174.932611,
                -37.048889
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": true,
            "distance": 1382
          },
          {
            "id": "5e8472ed86a7890444b4c22a",
            "location": {
              "type": "Point",
              "coordinates": [
                174.868515,
                -41.22281
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 4827
          },
          {
            "id": "5e8472ea86a789afa7b4c21b",
            "location": {
              "type": "Point",
              "coordinates": [
                175.02426,
                -40.861299
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 1221
          },
          {
            "id": "5e8472e186a78917c6b4c1d3",
            "location": {
              "type": "Point",
              "coordinates": [
                174.828352,
                -36.860782
              ]
            },
            "speed": "fast",
            "status": "free",
            "preferredOperator": false,
            "distance": 4054
          }
        ],
      },
      "status": "done"
    }
  }
}
</code-block>
</playground>

## Response

On success, the HTTP status code in the response header is `200` and the response body contains the attributes you requested.

On error the header status code is an error code and the response body contains an error response object. The error response object can be any of the following;

<errors name=""></errors>