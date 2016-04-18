# Gameboy MIDI Chrome visuals
An HTML page to make MIDI controlled visuals via Chrome Browser.

This project is meant to send MIDI signals from a Gameboy to the computer but you can use/edit/improve the code to make it works on every MIDI software/instrument/machine.

## Requirements
- Chrome Browser (version 47 o later) or a browser that has [MIDI support](http://caniuse.com/#feat=midi)
- an [Arduinoboy](https://github.com/trash80/Arduinoboy)
- [LSDJ](http://littlesounddj.com) Arduinoboy version
- a Gameboy

## Settings
For now, visuals are triggered on the first 4 MIDI channels so, in order to make some colours on the screen you need to use them.
- First, set the arduinoboy on MIDIOUT mode
- Set the LSDJ song on MIDIOUT mode
- Connect the gameboy, the arduinoboy and the PC together
- Open the [index.html](index.html) with Chrome
- On LSDJ, set the MIDI commands on phrase section:<br>
__N__ Sends a MIDI Note – Absolute to the value placed in the effect. N00 sends note off, N01-N6F send notes 1 to 112.<br>
__Q__ Sends a MIDI Note relative to the current channel’s pitch. The effect value is a offset. so Q0C in PU1 would send a note 1 octave higher than what Pu1 is currently playing. This is useful as a table command to track midi notes as normal notes in the sequencer.<br>
__X__ Sends a MIDI CC – By default in Arduinoboy the high nibble selects a CC#, and the low nibble sends a value [0-F] to [0-127]. This can be changed to allow just 1 midi CC with a range of 00-6F, or 7 CCs with scaled or unscaled values.<br>
__Y__ Sends a program/patch/preset change.
- Watch the screen going nuts.

## Future releases
This is a quick project made in a couple of hours in the morning, so it's very limited. The main goal is to expand its features and give it more visuals.