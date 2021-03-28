import React from 'react';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// const data = [{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.1370291,"lng":-86.80057459999999},"viewport":{"northeast":{"lat":36.1382982302915,"lng":-86.79925006970849},"southwest":{"lat":36.1356002697085,"lng":-86.8019480302915}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Pancake Pantry","opening_hours":{"open_now":true},"photos":[{"height":9000,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/101913232411922871255\">Josh Tovar</a>"],"photo_reference":"ATtYBwJ1Qddl-hRIMVxeNHmk-UfCzbfAC7Tdv0LOjUgNSNmotD3Rw37fFPlUMp7EQX8lSWEFyP3yUdrwmuB58QLIr3GwI6Wy23Akj6f2SCu9RQdD3z_ZgOSB-I1tj3U8olSkF7ntqLBcXa5DLE-NhoDluQSY8HEd8M8ajt4nw81AuymvUhSu","width":12000}],"place_id":"ChIJr-T8cp9mZIgR7LJlfcTnyKI","plus_code":{"compound_code":"45PX+RQ Nashville, TN, USA","global_code":"868M45PX+RQ"},"price_level":2,"rating":4.5,"reference":"ChIJr-T8cp9mZIgR7LJlfcTnyKI","scope":"GOOGLE","types":["restaurant","food","point_of_interest","establishment"],"user_ratings_total":3936,"vicinity":"1796 21st Avenue South, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.14608,"lng":-86.8093572},"viewport":{"northeast":{"lat":36.1475324802915,"lng":-86.80787721970849},"southwest":{"lat":36.1448345197085,"lng":-86.81057518029151}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"P.F. Chang's","opening_hours":{"open_now":true},"photos":[{"height":1677,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/115754769932764287391\">Daniel Best</a>"],"photo_reference":"ATtYBwJcLD7s7cbphS5Yyn-vRRekbAZAPbIhFDT4sCgGHs3SaYTaCm_Jgs9qoi2g0zrYk6QDJ49yBjN4qtSP-vHnJVP3ClfMZv9DkW5y8aJi01f9UjVbePd8kJDL9K9UiiKkb6j2np9VxVvJnlAL-CmJASjnBA4htMe3pJ514e87-ZlPT4-s","width":2628}],"place_id":"ChIJZVTrPrtmZIgRrfeX7-6q04w","plus_code":{"compound_code":"45WR+C7 Nashville, TN, USA","global_code":"868M45WR+C7"},"price_level":2,"rating":4.1,"reference":"ChIJZVTrPrtmZIgRrfeX7-6q04w","scope":"GOOGLE","types":["meal_takeaway","restaurant","food","point_of_interest","establishment"],"user_ratings_total":1271,"vicinity":"2525 W End Ste #2535, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.136344,"lng":-86.800786},"viewport":{"northeast":{"lat":36.1376795302915,"lng":-86.7994390697085},"southwest":{"lat":36.13498156970851,"lng":-86.8021370302915}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png","name":"Fido","opening_hours":{"open_now":true},"photos":[{"height":3024,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/117328147671197817862\">Fido</a>"],"photo_reference":"ATtYBwLedvNd5o5gtQZTpxOMIkm__r0J8ggP9VpgiE6uJPW6jq1hFVwG25Z503PiPEFX90IsTGVfsUJcp6ap0_k_eu1c1ZSvHVmG8m6HflRfl6uFkZaQAGdU12nStnRY8ZHHly-8VasBxRqjWQL9rpLccKqOF4Irgy9Vih9TwsRYwhcUjUBA","width":4032}],"place_id":"ChIJc7TLn59mZIgRRL3LMnrSolA","plus_code":{"compound_code":"45PX+GM Nashville, TN, USA","global_code":"868M45PX+GM"},"price_level":2,"rating":4.5,"reference":"ChIJc7TLn59mZIgRRL3LMnrSolA","scope":"GOOGLE","types":["cafe","restaurant","food","point_of_interest","store","establishment"],"user_ratings_total":1639,"vicinity":"1812 21st Avenue South, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.1425225,"lng":-86.81686649999999},"viewport":{"northeast":{"lat":36.1437965302915,"lng":-86.8153751697085},"southwest":{"lat":36.1410985697085,"lng":-86.81807313029151}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Maggiano's Little Italy","opening_hours":{"open_now":true},"photos":[{"height":300,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/100766615461892421270\">West End Avenue</a>"],"photo_reference":"ATtYBwIlYUdDnfLur2qK01UKyPdRlqVUlLIq6CnzzVMXoqTtevVjsIfxRYxHwSdmEdHMYZWLdWctqBqTosUIMdUiWvPNLbro6-4rOFZkWC3Ul54gu7eKCgn-qiRzLA5kOZm694WjACRr9I3qmtsnB9XexbMetTOrFWvyqwRPj4oVfMgBlTMA","width":300}],"place_id":"ChIJW5CdiK5mZIgRtqVwp4lY7ZU","plus_code":{"compound_code":"45VM+27 Nashville, TN, USA","global_code":"868M45VM+27"},"price_level":2,"rating":4.7,"reference":"ChIJW5CdiK5mZIgRtqVwp4lY7ZU","scope":"GOOGLE","types":["restaurant","bar","food","point_of_interest","establishment"],"user_ratings_total":3798,"vicinity":"3106 West End Avenue, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.15192630000001,"lng":-86.8049491},"viewport":{"northeast":{"lat":36.15320808029151,"lng":-86.80354306970851},"southwest":{"lat":36.15051011970851,"lng":-86.80624103029152}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png","name":"Cafe Coco - Cafe & Bistro","opening_hours":{"open_now":true},"photos":[{"height":2448,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/108678871507616529745\">John Ferreira</a>"],"photo_reference":"ATtYBwImptzPc1TCYPeahdWUXLwPPrQu-tX3QGsujUR0I51BIoMoPZBuU1CaGhMSieB3SM6zaBLuSG7bnnpHAkAxf714iRvCLzTcWeL8p7hfPVnZRU6vL3rxRKtOio-toZuTuK0jg5rjamN6z2-jMQV4jcVlKiICaTyrqM__RW3j1vMRB2yE","width":3264}],"place_id":"ChIJg0wQ7r5mZIgRRX-J9CCV_PQ","plus_code":{"compound_code":"552W+Q2 Nashville, TN, USA","global_code":"868M552W+Q2"},"price_level":1,"rating":4.2,"reference":"ChIJg0wQ7r5mZIgRRX-J9CCV_PQ","scope":"GOOGLE","types":["cafe","restaurant","food","point_of_interest","store","establishment"],"user_ratings_total":1153,"vicinity":"210 Louise Avenue, Elliston Place, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.14694899999999,"lng":-86.799182},"viewport":{"northeast":{"lat":36.14830328029151,"lng":-86.7979534197085},"southwest":{"lat":36.14560531970851,"lng":-86.80065138029151}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png","name":"Starbucks","opening_hours":{"open_now":true},"photos":[{"height":1960,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/117596267541670306951\">roberto volpi</a>"],"photo_reference":"ATtYBwJwStkMQcOs1HBPhdIm1IbPziOOvfgsumfbFWNQK3_EwrkTawu2T4sRmIL90UqGhuFdkf1MOuPhrlVvF1RBtdb-LpuMd2BlXaYnvnhEhQVbr4y-X2PaZoZ-ELKwVDT5zCxKIZKVgeyjJhALEg9wplS-Nwc5nOLMmFcUE0QVd4o7C3h8","width":4032}],"place_id":"ChIJ_wQxAZdmZIgRIkfru9Islwc","plus_code":{"compound_code":"46W2+Q8 Nashville, TN, USA","global_code":"868M46W2+Q8"},"price_level":2,"rating":4.3,"reference":"ChIJ_wQxAZdmZIgRIkfru9Islwc","scope":"GOOGLE","types":["cafe","restaurant","food","point_of_interest","store","establishment"],"user_ratings_total":645,"vicinity":"402 21st Avenue South, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.1454389,"lng":-86.80949439999999},"viewport":{"northeast":{"lat":36.1468401802915,"lng":-86.80816891970849},"southwest":{"lat":36.1441422197085,"lng":-86.8108668802915}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Central Bar + Kitchen - OPEN","opening_hours":{"open_now":false},"photos":[{"height":3000,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/116578712585030130049\">Central Bar + Kitchen - OPEN</a>"],"photo_reference":"ATtYBwJSDfRU-jukPzhgV2nltb8XIbNiR1gJysbGMid1p7UIh7Di0qsSYsJ7KEFNMqZhyrzCPSkARtTAqw0Cwnb5XyqaPOX8QoWDDGixLWT2V2TngFfzqlWZpe5zQ2Spf-txWAx0y2rBBTfpO20E7hphzHX9KR-aEN3McCExfQSS63SGL73K","width":6000}],"place_id":"ChIJ3-snKbtmZIgR2tWOBKQgwTE","plus_code":{"compound_code":"45WR+56 Nashville, TN, USA","global_code":"868M45WR+56"},"rating":3.7,"reference":"ChIJ3-snKbtmZIgR2tWOBKQgwTE","scope":"GOOGLE","types":["bar","restaurant","food","point_of_interest","establishment"],"user_ratings_total":23,"vicinity":"2555 West End Avenue, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.1505763,"lng":-86.8014321},"viewport":{"northeast":{"lat":36.15179083029149,"lng":-86.8005183197085},"southwest":{"lat":36.14909286970849,"lng":-86.80321628029151}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Ruth's Chris Steak House","opening_hours":{"open_now":false},"photos":[{"height":289,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/105685399900613951149\">Ruth&#39;s Chris Steak House</a>"],"photo_reference":"ATtYBwLcjCyXDwrgqW3B6_xqng7CnN6Hr-EfhlT2B_U69OZyE_aMwEoLpPVJ2v_D7toBHGB0BH2ZXuQv-LRhud8Z81GeZpYBokdX_1mj6J9ioCSrtCZh_Wav9KDTl7PskbM0UYqkthLG2uhn4FV-SQAvM34OGxQcnQXlsskWc352Ed_mJfEL","width":503}],"place_id":"ChIJSf7y-pVmZIgRnMUdIudF0DI","plus_code":{"compound_code":"552X+6C Nashville, TN, USA","global_code":"868M552X+6C"},"price_level":4,"rating":4.4,"reference":"ChIJSf7y-pVmZIgRnMUdIudF0DI","scope":"GOOGLE","types":["restaurant","food","point_of_interest","establishment"],"user_ratings_total":378,"vicinity":"2100 West End Avenue, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.1506136,"lng":-86.79645939999999},"viewport":{"northeast":{"lat":36.1520748802915,"lng":-86.79522131970849},"southwest":{"lat":36.1493769197085,"lng":-86.79791928029151}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Chuy's","opening_hours":{"open_now":true},"photos":[{"height":1294,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/111964809909405555652\">Minjae Kim</a>"],"photo_reference":"ATtYBwKJI1WsPSWh3oZaRM48D-5BVfMk39zkw44dyBGF1j2AFArkwHtSk7c35hh7sY8veoKNSMpbTzZWvp0_x5DggRP4y1O-vXz2aoCDAWWMO24ukeAhpcQvb6WwenFRbIeG9nyShMa23OlnbWRBxdtF7kc3YMKeV5Xe1sfJ5rmv21mrpNHh","width":1589}],"place_id":"ChIJe0ES8ZNmZIgR177W6Vh_d6I","plus_code":{"compound_code":"5623+6C Nashville, TN, USA","global_code":"868M5623+6C"},"price_level":2,"rating":4.4,"reference":"ChIJe0ES8ZNmZIgR177W6Vh_d6I","scope":"GOOGLE","types":["restaurant","food","point_of_interest","establishment"],"user_ratings_total":2063,"vicinity":"1901 Broadway, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.1503008,"lng":-86.8006401},"viewport":{"northeast":{"lat":36.1516987802915,"lng":-86.79942481970849},"southwest":{"lat":36.1490008197085,"lng":-86.8021227802915}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"QDOBA Mexican Eats","opening_hours":{"open_now":true},"photos":[{"height":3024,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/115225485874640260211\">QDOBA Mexican Eats</a>"],"photo_reference":"ATtYBwJ4ejgZvyuf9Zk8zftzVYduIWshxbKnHV-eoUmmNxJJvHrYr9wyRrpqppraTwp9GkMa8q_91eVztiROH1QYVEUXVCVtoG_v3jV0mbs7YeLVRLN_b5Aa2obhpXqUZAZ6MiwFsTiTZ1ndIyFB065p7UuMnT18HzkV-53BlDgtVg4en9OO","width":4032}],"place_id":"ChIJEeuu4JVmZIgRLPB34Q3fWWE","plus_code":{"compound_code":"552X+4P Nashville, TN, USA","global_code":"868M552X+4P"},"price_level":1,"rating":3.9,"reference":"ChIJEeuu4JVmZIgRLPB34Q3fWWE","scope":"GOOGLE","types":["bar","restaurant","food","point_of_interest","establishment"],"user_ratings_total":625,"vicinity":"2019 West End Avenue Bldg A, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.14578160000001,"lng":-86.8104786},"viewport":{"northeast":{"lat":36.14704503029152,"lng":-86.8092530197085},"southwest":{"lat":36.14434706970852,"lng":-86.81195098029151}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"J. Alexander's Redlands Grill","opening_hours":{"open_now":true},"photos":[{"height":2988,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/111346467984963220277\">Oliver Agh</a>"],"photo_reference":"ATtYBwLqwgU7kTRz_EIVhrwAhP6BO4VlJPMvGsAKKRVQmJVMUouXOculBA8bL1ABzgsWLon6FHPbpHf-YDMxg16iqGRVsqtPpqN_sDHiUQW63Chtdv2nMHHGIeRQAkTPnQX5LQfhXhkRBDX6KgjtDzXE8kGb13exymnJfuN1FJWGL1ybgKQ_","width":5312}],"place_id":"ChIJE3Ayz7pmZIgRb_LgtGYfHJ4","plus_code":{"compound_code":"45WQ+8R Nashville, TN, USA","global_code":"868M45WQ+8R"},"rating":4.5,"reference":"ChIJE3Ayz7pmZIgRb_LgtGYfHJ4","scope":"GOOGLE","types":["restaurant","food","point_of_interest","establishment"],"user_ratings_total":1488,"vicinity":"2609 West End Avenue, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.15166079999999,"lng":-86.79918219999999},"viewport":{"northeast":{"lat":36.1529874802915,"lng":-86.79799591970851},"southwest":{"lat":36.1502895197085,"lng":-86.80069388029152}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Amerigo Italian Restaurant","opening_hours":{"open_now":true},"photos":[{"height":1200,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/115391688213784653510\">Amerigo Italian Restaurant</a>"],"photo_reference":"ATtYBwLqGsC2Gm10eE4NaAfxlSEoN7lQxzuEYSrnrVsUJ8mBE2cHFu2iFhiEwU73Nmpuq9QtW8ROOoDrUTsj774nnJZlsTwV6NHNdGZug4ejl1x7YONYoZK9PDHbLT-hBDg7Nt3AghJ1bSc8unr9emE3Y3KjL0BtFgX0EpK4C1WjjRzdFXRS","width":1800}],"place_id":"ChIJT67YQpRmZIgRkolp4i5OmmM","plus_code":{"compound_code":"5622+M8 Nashville, TN, USA","global_code":"868M5622+M8"},"price_level":2,"rating":4.5,"reference":"ChIJT67YQpRmZIgRkolp4i5OmmM","scope":"GOOGLE","types":["bar","restaurant","food","point_of_interest","establishment"],"user_ratings_total":1641,"vicinity":"1920 West End Avenue, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.1520632,"lng":-86.80567769999999},"viewport":{"northeast":{"lat":36.1534975802915,"lng":-86.80442186970849},"southwest":{"lat":36.15079961970851,"lng":-86.8071198302915}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Jimmy Kelly’s Steakhouse","opening_hours":{"open_now":false},"photos":[{"height":2864,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/111421502406830584751\">Andy Crenshaw</a>"],"photo_reference":"ATtYBwKh3v_oRi1WNEc6kG6vivFy1YcTICQ62w2GDq1ZZXa2TV4ORrCsWMto_RNPb9x6d94K23b-jhLthuPJtD7uYgu9r2nKnuS35tbR2320bwrpNMUf2eVKCTljjGZCnyA-5G5ZkbfTPqluOCOL2sW03Tsm2fYNp4K6vx63_Zj5nZg4X0yK","width":3595}],"place_id":"ChIJlfSowr5mZIgRfuOnrlsgaNQ","plus_code":{"compound_code":"552V+RP Nashville, TN, USA","global_code":"868M552V+RP"},"price_level":4,"rating":4.3,"reference":"ChIJlfSowr5mZIgRfuOnrlsgaNQ","scope":"GOOGLE","types":["restaurant","food","point_of_interest","establishment"],"user_ratings_total":1150,"vicinity":"217 Louise Avenue, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.14414239999999,"lng":-86.8132771},"viewport":{"northeast":{"lat":36.1454310302915,"lng":-86.81205606970849},"southwest":{"lat":36.1427330697085,"lng":-86.8147540302915}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Chipotle Mexican Grill","opening_hours":{"open_now":true},"photos":[{"height":3024,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/100201960762355239004\">Paul Kang</a>"],"photo_reference":"ATtYBwLkfUA6lwDZfqaVH8xayzw1ybcrs9F3PfUWPfCE-AL7IXwj187y0Ksq2WmyMepwm1Zbr8LrdjKQTjuumY6tfVc0KIhnXAayoN6fS0fJPj4_tfmo47rRUGA7IOSsvVIsbbJRbU-EBJIPjWfjx2JKzr7OifgPb5yqXbbwkT2odPVAOC6m","width":4032}],"place_id":"ChIJtTtq569mZIgRJmF9-FwgN4s","plus_code":{"compound_code":"45VP+MM Nashville, TN, USA","global_code":"868M45VP+MM"},"price_level":1,"rating":3.5,"reference":"ChIJtTtq569mZIgRJmF9-FwgN4s","scope":"GOOGLE","types":["restaurant","food","point_of_interest","establishment"],"user_ratings_total":451,"vicinity":"2825 West End Avenue, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.14750749999999,"lng":-86.7990762},"viewport":{"northeast":{"lat":36.1488461302915,"lng":-86.79784811970849},"southwest":{"lat":36.1461481697085,"lng":-86.8005460802915}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Mellow Mushroom Nashville - Vanderbilt","opening_hours":{"open_now":true},"photos":[{"height":540,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/107664301150617541452\">Mellow Mushroom Nashville - Vanderbilt</a>"],"photo_reference":"ATtYBwJWjT8IQuPHyVA7YutsWp4jFtC_a_6CNmGonI7LpS2BRWTJiaFWs6gBAyyISYAM3S68FsMh_yIwvPVYuV1BUWzGzZGjPz41UYfsYqW0pt2HtI_px1a9NDlKDIUFCZCnjvPZ0GPBls7064rqhErVd1KBgP1ZVj1tbZr9X0jh_G-DKMY","width":720}],"place_id":"ChIJGWdU85ZmZIgRH0RWHv29Q5A","plus_code":{"compound_code":"46X2+29 Nashville, TN, USA","global_code":"868M46X2+29"},"price_level":2,"rating":4.3,"reference":"ChIJGWdU85ZmZIgRH0RWHv29Q5A","scope":"GOOGLE","types":["restaurant","food","point_of_interest","establishment"],"user_ratings_total":1023,"vicinity":"212 21st Avenue South, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.1438139,"lng":-86.812355},"viewport":{"northeast":{"lat":36.1452894802915,"lng":-86.8109194697085},"southwest":{"lat":36.1425915197085,"lng":-86.8136174302915}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Subway","opening_hours":{"open_now":true},"photos":[{"height":766,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/114360413550600178762\">Subway</a>"],"photo_reference":"ATtYBwLxuZwibNzvGqh3U7iefud0jUrs-TC77FopivOuAlWg-s0UaEeenwSp3h3I5uwYeKpTsWVjnX6lsZEGKxSMZMcsixhOCKd_oodp6pyov33TLeV0T6q--kclM1wx22xkWQPjnovXTvr29Bg7flj6HShQe5Ku_T10XNnKam-k2oDhWpLq","width":766}],"place_id":"ChIJx3zZ-a9mZIgR212C4bwy9bQ","plus_code":{"compound_code":"45VQ+G3 Nashville, TN, USA","global_code":"868M45VQ+G3"},"price_level":1,"rating":3.9,"reference":"ChIJx3zZ-a9mZIgR212C4bwy9bQ","scope":"GOOGLE","types":["meal_takeaway","restaurant","food","point_of_interest","establishment"],"user_ratings_total":61,"vicinity":"2817 West End Avenue, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.14828300000001,"lng":-86.7982547},"viewport":{"northeast":{"lat":36.1496169302915,"lng":-86.7967673197085},"southwest":{"lat":36.1469189697085,"lng":-86.7994652802915}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Giovanni Ristorante","opening_hours":{"open_now":true},"photos":[{"height":490,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/109962967492226282224\">Giovanni Ristorante</a>"],"photo_reference":"ATtYBwJE_BOid_DD81sXrT_iTHdAvLJ8kWwXE9z0WIFUUzs-zu9o0jcPvbs-ak8OUiSqHnWg1Z1yAAe8uVxPw-wCdBj0PsfkvN0_z3t9cAzeBvKMKxYbVjAM0ua1nUR0n3_6-hIuVLsVLe_NKOoD4Iy9tNiiYLiJMSTMnx19VwN0GRJAPpQk","width":1000}],"place_id":"ChIJO4vswZZmZIgRjGwiMJIaBMU","plus_code":{"compound_code":"46X2+8M Nashville, TN, USA","global_code":"868M46X2+8M"},"price_level":3,"rating":4.5,"reference":"ChIJO4vswZZmZIgRjGwiMJIaBMU","scope":"GOOGLE","types":["bar","restaurant","food","point_of_interest","establishment"],"user_ratings_total":231,"vicinity":"909 20th Avenue South, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.1520874,"lng":-86.80265949999999},"viewport":{"northeast":{"lat":36.1534719302915,"lng":-86.80156796970849},"southwest":{"lat":36.1507739697085,"lng":-86.80426593029149}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Krispy Kreme","opening_hours":{"open_now":true},"photos":[{"height":3024,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/114873572080972326366\">Mohamed Rafi</a>"],"photo_reference":"ATtYBwKGz3UuOqkwpuaoZbo31CZWCg9dj3CKb9zfy68UvnsTjDJdd3oQzMBR-NfCnfks-gYfh0Mr49YmWSy01LRib7sNFEOAvqYKf3VeA1GCOr6V2r3QjPY-LL394BvO6kWaHKC47y3EGCrddrhUIHGCC61ePNeJLNQ4PBzoir8Dumlo-Ekv","width":4032}],"place_id":"ChIJoe8aN75mZIgRHn6LWtzQy5w","plus_code":{"compound_code":"552W+RW Nashville, TN, USA","global_code":"868M552W+RW"},"price_level":1,"rating":4.2,"reference":"ChIJoe8aN75mZIgRHn6LWtzQy5w","scope":"GOOGLE","types":["bakery","cafe","restaurant","food","point_of_interest","store","establishment"],"user_ratings_total":922,"vicinity":"2103 Elliston Place, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.1371918,"lng":-86.79921550000002},"viewport":{"northeast":{"lat":36.1385523302915,"lng":-86.79784671970852},"southwest":{"lat":36.1358543697085,"lng":-86.80054468029152}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Cabana Taps","opening_hours":{"open_now":true},"photos":[{"height":3265,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/111803838872364197011\">Lisa Link</a>"],"photo_reference":"ATtYBwL0KIITN96UIrkHYMYxQ7uOq6QnzT9iFSNPmEh9R3N-wOGEDsCKJZHZ8wwSMGO1hxmBa2qsygjiCkMDL3GtPm9jbQebIKh2aMEVCaQQJ267eLctLR7EPm381rFI-d6GAdig3TrjciuK3pY2enzE6dfu7IjhK3cZYHIxJqZBDD_FZsOY","width":4898}],"place_id":"ChIJySu7_Z5mZIgRt2nk8rHp6ho","plus_code":{"compound_code":"46P2+V8 Nashville, TN, USA","global_code":"868M46P2+V8"},"price_level":2,"rating":4.2,"reference":"ChIJySu7_Z5mZIgRt2nk8rHp6ho","scope":"GOOGLE","types":["restaurant","food","point_of_interest","establishment"],"user_ratings_total":421,"vicinity":"1910 Belcourt Avenue, Nashville"},{"business_status":"OPERATIONAL","geometry":{"location":{"lat":36.15198829999999,"lng":-86.7968835},"viewport":{"northeast":{"lat":36.15328083029151,"lng":-86.79565226970851},"southwest":{"lat":36.15058286970851,"lng":-86.79835023029152}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png","name":"Midtown Cafe","opening_hours":{"open_now":true},"photos":[{"height":1440,"html_attributions":["<a href=\"https://maps.google.com/maps/contrib/109157188391716018441\">Danny Sulkin</a>"],"photo_reference":"ATtYBwId2PW6N1sqj7yKbHvvSUR5V-jhnzhQRbyptQPJlAqbqzwyUgrI3ftHSBP51RwUcLa-Qrf391KjH7Mffbd81U5LwNFsgXVW8ZCinlWhOo8qrePoy3Bj1iRwgPCzXouyE1JxoMv4RBj9U0oT9UdO9dPVjgd8Otnicndt4dKNoBYaXDPp","width":2560}],"place_id":"ChIJgaNOeJRmZIgR-rDDgsDqPbc","plus_code":{"compound_code":"5623+Q6 Nashville, TN, USA","global_code":"868M5623+Q6"},"price_level":2,"rating":4.6,"reference":"ChIJgaNOeJRmZIgR-rDDgsDqPbc","scope":"GOOGLE","types":["restaurant","food","point_of_interest","establishment"],"user_ratings_total":467,"vicinity":"102 19th Avenue South, Nashville"}];

const HomeScreen = ({navigation}) => {

    // Store and manage the fetched restaurant list.
    // Store and manage the location of the current user
    // Should have at least 4 decimal places to enable nearby search.
    // Currently are hard-coded values, will fetch them from locating
    // services or user settings later.
    const [lat, setLat] = useState(36.1447);
    const [lon, setLon] = useState(-86.8027);
    const [restaurantList, setRestaurantList] = useState([]);

    // Initialize the restaurant list.
    useEffect(() => {
        const init = async() => {
            const resList = await getRestaurantsFromApi();
            let resArray = []

            // Here we extract and store only the data that we want to keep from the list of complete objects
            for (var i = 0; i < resList.length; i++){
                resArray.push({
                    name: resList[i].name,
                    icon: resList[i].icon,
                    types: resList[i].types,
                    vicinity: resList[i].vicinity
                });
            }
            setRestaurantList(resArray);
            console.log("Restaurant list state: ", restaurantList);
        };

        init();
    }, []);

    // Fetch restaurants with Google Places API under the hood.
    const getRestaurantsFromApi = async() => {
      const url = 'https://i7vva9aayi.execute-api.us-east-2.amazonaws.com/dev/restaurants?lat=' + lat + "&lon=" + lon;
      const res = await fetch(url);
      const resJson = await res.json();
      return resJson.items;
    }

    
    // Render a restaurant item.
    const addItem = (item) => {
        // Get image url.
        const imageUrl = item.icon;
        const pic = {
            uri: imageUrl
        };

        // Get restaurant name.
        const restaurantName = item.name;

        // Get categories.
        const categories = item.types;
        const categoriesStr = categories[0] + ", " + categories[1];

        // Get address lines.
        const addressRaw = item.vicinity;
        const addressRawList = addressRaw.split(", ");
        const addressRow1 = addressRawList[0];
        const addressRow2 = addressRawList[1];

        return (
            <View style={{height: 150, alignItems: 'center', flex: 1, flexDirection: 'row', margin: 10, padding: 15, borderBottomColor: 'white', borderBottomWidth: 1}}>
                <Image source={pic} style={{width: 80, height: 80}}/>
                <View style={styles.textContainer}>
                    <Text style={{fontFamily: 'sans-serif', color: '#624630', fontWeight: 'bold'}}>{restaurantName}</Text>
                    <Text style={styles.textFont}>{categoriesStr}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textFont}>{addressRow1}</Text>
                    <Text style={styles.textFont}>{addressRow2}</Text>
                </View>
            </View>
        );
    }

    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    
    

    return (
        restaurantList.length == 0 ?
        (<View style={styles.container}>
            <View style={styles.topLeft}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} >
                                <MaterialIcons name="menu" size={40} color="#F07167" />
                </TouchableOpacity>
            </View>
            <View style={styles.topCenter}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Recommendations</Text>
            </View>
            <View style={styles.mainContent}>
                <Text>Loading Restaurant Recommendations ...</Text>
            </View>
        </View>)
        :
        (<View style={styles.container}>
            <View style={styles.topLeft}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} >
                                <MaterialIcons name="menu" size={40} color="#F07167" />
                </TouchableOpacity>
            </View>
            <View style={styles.topCenter}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Recommendations</Text>
            </View>
            <SafeAreaView style={styles.mainContent}>
                <FlatList
                    data={restaurantList}
                    renderItem={({item}) => addItem(item)}
                />
            </SafeAreaView>      
        </View>)
    )
}

 {/* Styling the restaurant list container and restaurant items */}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FED9B7',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%'
    },
    mainContent: {
        width: '100%',
        height: '88%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#FED9B7'
    },
    topCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '6%'
    },
    topLeft: {
        position: 'absolute',
        top: '5%',
        left: '5%'
    },
    item: {
        backgroundColor: '#FDFCDC',
        padding: 20,
        marginVertical: 1,
        marginHorizontal: 0,
      },
    title: {
        fontSize: 32,
    },
  
  textContainer: {
    alignItems: 'center',
    flex: 1
  },

  textFont: {
    fontFamily: 'sans-serif',
    color: '#624630'
  }
})

export default HomeScreen;
