# NL-Weatherr-API
This API returns the temperature of a city in the Netherlands. You can filter by city, date and time. The date can only be in the present up to and including today plus 10 days.

There is 1 endpoint available and that is:
```
https://api.weathhr.ml/predictions/{CITY}}/{DATE}/{TIME}/{FORMAT}
```

#### Parameters

| Parameter | Description                 | Required | Default                       | Example    |
|-----------|-----------------------------|----------|-------------------------------|------------|
| CITY      | The city in the Netherlands | Yes      | -                             | Amsterdam  |
| DATE      | The date                    | Yes      | -                             | 22-02-2021 |
| TIME      | The time                    | No       | Current hour in format: HH:00 | 09:00      |
| FORMAT    | The temperature format      | No       | celsius                       | fahrenheit |

##### Time formats 
Possible format options: `kelvin`, `rankine`, `delisle`, `newton`, `reaumur`, `romer`, `fahrenheit`, `celsius`

#### Stored predictions
After the predictions are retrieved from all sources, the average is calculated and stored in the local database. These predictions are refreshed every minute so that the latest version is always saved.

#### Important notes
Because there is so little data available as dummy, it was decided to fill all available data with the same dummy data. However, each available date has the times available in the preview, so from 00:00 to 10:00. **Times after this will not work in the API.**


#### Example
```
https://api.weathhr.ml/predictions/Amsterdam/23-02-2021/10:00/romer
```
