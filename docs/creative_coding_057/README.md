a CLI time/task tracker

# Creative Coding / Information Pipeline
## an ongoing coding/research seminar
<http://creativecoding.xyz>

## a CLI time/task tracker
Recording tasks and the time taken to accomplish.
```./rt.sh "Task description"```
ctrl+c (interrupt) to stop the tracker
The task and strat timestamp are saved in a CSV file when the tracker is started.
The interrupt command is used to execute a second php file that will record the timestamp, and calculate the time elapsed, writing the data in the CSV file (closing that entry line).