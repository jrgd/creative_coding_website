a prototype for a bare/basic Kanban system using the Finder's folders and simple Applescript

```
  # a prototype for a bare/basic Kanban system using the Finder's folders and simple Applescript

  set window_height to 1080
  set window_width to 1280 #2560
  set small_window_q to 4
  set small_window_width to window_width / small_window_q
  set small_window_height to window_height / 2


  tell application "Finder"
    open "Macintosh HD:Users:jrgd:Kanban:kanban_folders:todo"
    open "Macintosh HD:Users:jrgd:Kanban:kanban_folders:doing"
    open "Macintosh HD:Users:jrgd:Kanban:kanban_folders:done"
    open "Macintosh HD:Users:jrgd:Kanban:kanban_folders:kaizen"
    open "Macintosh HD:Users:jrgd:Kanban:kanban_folders:backburner"
  end tell

  set basic_bounds_1 to {0, 0, small_window_width, window_height}
  set basic_bounds_2 to {small_window_width, 0, small_window_width * 2, window_height}
  set basic_bounds_3 to {small_window_width * 2, 0, small_window_width * 3, window_height}
  set basic_bounds_4 to {small_window_width * 3, 0, small_window_width * 4, small_window_height}
  set basic_bounds_5 to {small_window_width * 3, small_window_height, small_window_width * 4, window_height}

  set bounds of window "todo" of application "Finder" to basic_bounds_1
  set bounds of window "doing" of application "Finder" to basic_bounds_2
  set bounds of window "done" of application "Finder" to basic_bounds_3
  set bounds of window "kaizen" of application "Finder" to basic_bounds_4
  set bounds of window "backburner" of application "Finder" to basic_bounds_5

  tell window "todo" of application "Finder" to set sidebar width to 0
  tell window "doing" of application "Finder" to set sidebar width to 0
  tell window "done" of application "Finder" to set sidebar width to 0
  tell window "kaizen" of application "Finder" to set sidebar width to 0
  tell window "backburner" of application "Finder" to set sidebar width to 0
```