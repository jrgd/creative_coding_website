# Simple logging app

This is a basic experiments of a logging app. It takes no argument but one: the text content of the log. The content could use eventually be parsed ansd so we could/should use meta, commands and status in there. The script is executed locally via php.

Further research/experimentations:
1. make it working via Alfred/Albert, CLI and web by analysing the context it's run in, $_GET or $argv. 
  → review url bar logging tool
2. if it was to run on the web, what is the real point?
  → The main idea here is to have a way to log notes simply from a phone or any devices.
  what are the alternatives here?

## Documentation
### Change log
  21 Jan
    - basic use of .env file to set where the log file is stored; this allows to use SyncThing with the log file.
  19 Jan 2022
    - logs contain the single and double quotes from the input
    - log file is consolidated in one single file
    - not a single software can replace self discpline
    - adds human-readable date after the timestamp
### Install with Alfred.app
  - create a keyword trigger
  - create a 'Run Script' Action
  - set Language: 
    /bin/zsh
  - insert in Script:
      ```/usr/local/bin/php /Users/jeromerigaud/tools/logger/log.php "{query}"```
  - link the trigger to the action
### Use from CLI
  ```php ./log.php I'm also able to invoke the "software" from the command line```
  :+todo fix:  there is still an escape error and the single quote gets crushed
### Other issues
  - to make it work in Alfred, I had to swap in the script the relative path for an absolute path
  - in Alfred: ideally I should be able to use /usr/bin/php as the language instead of running it through zsh to reach php.
  - shorter command: use a bash wrapper
