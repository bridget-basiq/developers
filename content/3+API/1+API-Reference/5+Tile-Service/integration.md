---
title: Integration
description: Integrating the tile service into Mapbox
order: 4
---

# Integration
Our Tile Services integrates easly with Mapbox, almost out of the box. You only need to tell Mapbox to put the `x-client-id` header on the request. To do that, you can use `transformRequest` in your Mapbox constructor.

## Example
Here is a snippet to give you an idea of how this will look when we combine everything together;

<code-block lang="js" prefix="Tile Service" title="Mapbox Integration">
var map = new mapboxgl.Map({
  container: 'map',
  center: [-122.420679, 37.772537],
  zoom: 13,
  transformRequest: (url, resourceType)=> {
    if(resourceType === 'Tile' && url.startsWith('https://api.chargetrip.io')) {
       return {
        url: url,
        headers: { "x-client-id": "5e8c22366f9c5f23ab0eff39" },
      }
    }
  }
});
</code-block>